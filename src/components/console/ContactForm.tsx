"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { site } from "@/content/site";

type FormState = "idle" | "sending" | "sent" | "error";
const MESSAGE_LIMIT = 5000;

export default function ContactForm({ about }: { about?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");
  const [messageLength, setMessageLength] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          about,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong.");
      }
      setState("sent");
      form.reset();
      setMessageLength(0);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <p className="flex items-center gap-2.5">
          <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold text-emerald-900">
            Delivered
          </span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-emerald-800">
          Your message is in the founders&apos; Telegram already. An engineer
          will reply from {site.email}.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const disabled = state === "sending";

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Name <span className="text-red-500">*</span>
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            disabled={disabled}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Email <span className="text-red-500">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={disabled}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="mt-5 block">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-slate-700">
            What are you trying to ship? <span className="text-red-500">*</span>
          </span>
          <span className="text-xs text-slate-400">
            {messageLength}/{MESSAGE_LIMIT}
          </span>
        </div>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={MESSAGE_LIMIT}
          disabled={disabled}
          onChange={(e) => setMessageLength(e.target.value.length)}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
          placeholder="The system, the constraint, the deadline — whatever you have."
        />
      </label>

      <div aria-live="polite">
        {state === "error" && (
          <p
            className="mt-4 flex items-center gap-2.5 text-sm font-medium text-red-600"
            role="alert"
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-red-500" />
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Send it
          </>
        )}
      </button>
    </form>
  );
}
