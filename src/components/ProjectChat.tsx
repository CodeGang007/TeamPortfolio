"use client";

import { useEffect, useRef, useState } from "react";
import {
    collection,
    doc,
    addDoc,
    setDoc,
    onSnapshot,
    query,
    orderBy,
    limitToLast,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { ref as sref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebaseDb";
import { storage } from "@/lib/firebaseStorage";
import { useAuth } from "@/contexts/AuthContext";
import { X, Send, Mic, Square, MessageSquare } from "lucide-react";

interface ChatMessage {
    id: string;
    uid: string;
    name: string;
    role: string;
    text?: string;
    audioUrl?: string;
    at?: Timestamp;
}

interface Presence {
    uid: string;
    name?: string;
    typingAt?: Timestamp;
    lastSeenAt?: Timestamp;
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER; // e.g. 9198XXXXXXXX (digits only)

// Realtime per-project chat on Firestore (the app's provisioned backend):
// text + voice notes (Storage), typing indicator and seen receipts via a
// presence subcollection. Server-side enforcement belongs in Firestore rules
// for projectChats/** and Storage rules for chat-audio/**.
export default function ProjectChat({
    projectId,
    projectTitle,
    open,
    onClose,
}: {
    projectId: string;
    projectTitle: string;
    open: boolean;
    onClose: () => void;
}) {
    const { user, role } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [presence, setPresence] = useState<Presence[]>([]);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [recording, setRecording] = useState(false);
    const [sendingAudio, setSendingAudio] = useState(false);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const lastTypingWrite = useRef(0);

    const messagesCol = () => collection(db, "projectChats", projectId, "messages");
    const presenceDoc = (uid: string) => doc(db, "projectChats", projectId, "presence", uid);

    // Subscribe to messages + presence
    useEffect(() => {
        if (!open || !user) return;

        const offMsgs = onSnapshot(
            query(messagesCol(), orderBy("at", "asc"), limitToLast(100)),
            (snap) => {
                setMessages(
                    snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChatMessage, "id">) }))
                );
                setError("");
            },
            (err) => {
                console.error("chat subscribe failed", err);
                setError(
                    err.code === "permission-denied"
                        ? "Chat is blocked by Firestore security rules — allow read/write on projectChats/** for signed-in users."
                        : `Could not load chat: ${err.code || err.message}`
                );
            }
        );

        const offPresence = onSnapshot(
            collection(db, "projectChats", projectId, "presence"),
            (snap) => {
                setPresence(
                    snap.docs.map((d) => ({ uid: d.id, ...(d.data() as Omit<Presence, "uid">) }))
                );
            },
            () => {} // presence is best-effort
        );

        return () => {
            offMsgs();
            offPresence();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, user, projectId]);

    // Mark seen while open
    useEffect(() => {
        if (!open || !user) return;
        setDoc(
            presenceDoc(user.uid),
            { name: user.displayName || user.email || "User", lastSeenAt: serverTimestamp() },
            { merge: true }
        ).catch(() => {});
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, user, projectId, messages.length]);

    if (!open || !user) return null;

    const senderMeta = {
        uid: user.uid,
        name: user.displayName || user.email || "User",
        role: role || "client",
    };

    // Founders get a heads-up in Telegram; failures never block the chat.
    const notifyTelegram = (preview: string) => {
        fetch("/api/telegram-notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: `💬 <b>Project chat</b> — ${projectTitle}\n${senderMeta.name} (${senderMeta.role}): ${preview}`,
            }),
        }).catch(() => {});
    };

    const markTyping = () => {
        const now = Date.now();
        if (now - lastTypingWrite.current < 1500) return; // throttle writes
        lastTypingWrite.current = now;
        setDoc(
            presenceDoc(user.uid),
            { name: senderMeta.name, typingAt: serverTimestamp() },
            { merge: true }
        ).catch(() => {});
    };

    const sendText = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setText("");
        try {
            await addDoc(messagesCol(), { ...senderMeta, text: trimmed, at: serverTimestamp() });
            notifyTelegram(trimmed.slice(0, 200));
        } catch (e) {
            const err = e as { code?: string; message?: string };
            console.error("chat send failed", e);
            setText(trimmed); // give the draft back
            setError(
                err.code === "permission-denied"
                    ? "Send blocked by Firestore security rules — allow writes on projectChats/** for signed-in users."
                    : `Send failed: ${err.code || err.message}`
            );
        }
    };

    const startRecording = async () => {
        setError("");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
                ? "audio/webm;codecs=opus"
                : "audio/webm";
            const rec = new MediaRecorder(stream, { mimeType: mime });
            chunksRef.current = [];
            rec.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
            rec.onstop = async () => {
                stream.getTracks().forEach((t) => t.stop());
                const blob = new Blob(chunksRef.current, { type: mime });
                if (blob.size < 800) return; // ignore accidental taps
                setSendingAudio(true);
                try {
                    const path = `chat-audio/${projectId}/${Date.now()}-${user.uid}.webm`;
                    const snap = await uploadBytes(sref(storage, path), blob);
                    const url = await getDownloadURL(snap.ref);
                    await addDoc(messagesCol(), { ...senderMeta, audioUrl: url, at: serverTimestamp() });
                    notifyTelegram("🎙 voice note");
                } catch (e) {
                    const err = e as { code?: string; message?: string };
                    console.error("voice note failed", e);
                    setError(
                        String(err.code).includes("unauthorized") || String(err.code).includes("permission")
                            ? "Voice upload blocked by Storage security rules — allow writes on chat-audio/** for signed-in users."
                            : `Voice note failed: ${err.code || err.message}`
                    );
                } finally {
                    setSendingAudio(false);
                }
            };
            recorderRef.current = rec;
            rec.start();
            setRecording(true);
        } catch (e) {
            console.error("microphone unavailable", e);
            setError("Microphone unavailable — check browser permissions.");
        }
    };

    const stopRecording = () => {
        recorderRef.current?.stop();
        setRecording(false);
    };

    const now = Date.now();
    const othersTyping = presence
        .filter(
            (p) =>
                p.uid !== user.uid &&
                p.typingAt &&
                now - p.typingAt.toMillis() < 4000
        )
        .map((p) => p.name || "Someone");

    const othersLastSeen = Math.max(
        0,
        ...presence
            .filter((p) => p.uid !== user.uid && p.lastSeenAt)
            .map((p) => p.lastSeenAt!.toMillis())
    );
    const myLastMsg = [...messages].reverse().find((m) => m.uid === user.uid);
    const seen =
        myLastMsg?.at != null && othersLastSeen >= myLastMsg.at.toMillis();

    const fmt = (ts?: Timestamp) =>
        ts ? ts.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

    const waHref = WA_NUMBER
        ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              `Hi CodeGang — about the project "${projectTitle}" (${projectId}).`
          )}`
        : null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[90] bg-slate-900/30 backdrop-blur-[2px]"
                onClick={onClose}
            />
            {/* Panel */}
            <aside className="fixed bottom-0 right-0 top-0 z-[91] flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl">
                <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <MessageSquare size={18} />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Project discussion</p>
                            <p className="max-w-[200px] truncate text-xs text-slate-500">{projectTitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {waHref && (
                            <a
                                href={waHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Continue on WhatsApp"
                                className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
                            >
                                {/* WhatsApp glyph */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3Z" />
                                </svg>
                                WhatsApp
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Close chat"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </header>

                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                    {messages.length === 0 && !error && (
                        <p className="mt-10 text-center text-sm text-slate-400">
                            No messages yet. Start the discussion — text or voice.
                        </p>
                    )}
                    {messages.map((m) => {
                        const mine = m.uid === user.uid;
                        return (
                            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                                        mine
                                            ? "rounded-br-md bg-blue-600 text-white"
                                            : "rounded-bl-md bg-slate-100 text-slate-900"
                                    }`}
                                >
                                    {!mine && (
                                        <p className="mb-0.5 text-[11px] font-semibold text-blue-700">
                                            {m.name}
                                            <span className="ml-1.5 font-normal capitalize text-slate-400">{m.role}</span>
                                        </p>
                                    )}
                                    {m.text && <p className="text-sm leading-relaxed">{m.text}</p>}
                                    {m.audioUrl && (
                                        // eslint-disable-next-line jsx-a11y/media-has-caption
                                        <audio controls preload="metadata" src={m.audioUrl} className="mt-1 h-10 w-56 max-w-full" />
                                    )}
                                    <p className={`mt-1 text-right text-[10px] ${mine ? "text-blue-200" : "text-slate-400"}`}>
                                        {fmt(m.at)}
                                        {mine && m.id === myLastMsg?.id && seen && " · Seen"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    {othersTyping.length > 0 && (
                        <p className="text-xs italic text-slate-400">{othersTyping.join(", ")} typing…</p>
                    )}
                    <div ref={bottomRef} />
                </div>

                <footer className="border-t border-slate-200 p-4">
                    {error && (
                        <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-700" role="alert">
                            {error}
                        </p>
                    )}
                    {recording ? (
                        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <span className="flex items-center gap-2 text-sm font-medium text-red-600">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                                Recording voice note…
                            </span>
                            <button
                                onClick={stopRecording}
                                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500"
                            >
                                <Square size={12} /> Stop & send
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-end gap-2">
                            <textarea
                                rows={1}
                                value={text}
                                onChange={(e) => {
                                    setText(e.target.value);
                                    markTyping();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendText();
                                    }
                                }}
                                placeholder="Write a message…"
                                className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                onClick={startRecording}
                                disabled={sendingAudio}
                                title="Record a voice note"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600 disabled:opacity-50"
                            >
                                <Mic size={18} />
                            </button>
                            <button
                                onClick={sendText}
                                disabled={!text.trim()}
                                title="Send"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-500 disabled:opacity-40"
                            >
                                <Send size={17} />
                            </button>
                        </div>
                    )}
                    {sendingAudio && <p className="mt-2 text-xs text-slate-400">Uploading voice note…</p>}
                </footer>
            </aside>
        </>
    );
}
