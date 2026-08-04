"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { site, stats } from "@/content/site";

/* ═══════════════════════════════════════════════════════════════════
   CONTACT FORM

   Styled from the marketing tokens (bone / ink / line / signal) rather
   than Tailwind's stock slate-and-blue. A form in default framework
   colours is the single fastest way to make an otherwise art-directed
   page look unfinished, and this one sits on the page a buyer reaches
   when they have already decided to talk to someone.
   ═══════════════════════════════════════════════════════════════════ */

type FormState = "idle" | "sending" | "sent" | "error";
const MESSAGE_LIMIT = 5000;

const fieldClass =
  "w-full rounded-lg border border-line bg-bone px-4 py-3 text-[0.9rem] text-ink placeholder:text-mute/60 transition-all duration-200 focus:border-signal focus:bg-paper focus:outline-none focus:ring-4 focus:ring-signal/10 disabled:opacity-50";

function Label({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <span className="flex items-baseline justify-between gap-4">
      <span className="mono-label">
        {children}
        <span aria-hidden className="ml-1 text-signal">
          *
        </span>
      </span>
      {aside}
    </span>
  );
}

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

  /* ── Sent ──────────────────────────────────────────────────────── */

  if (state === "sent") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-line bg-paper p-10 text-center shadow-frame-lg sm:p-16">
        <div aria-hidden className="blueprint-fine absolute inset-0 opacity-60" />
        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-signal-soft">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-signal" fill="none">
              <path
                d="m5 12.5 4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="display-md mt-7 text-ink">
            Delivered{" "}
            <span className="font-serif italic text-mute">to the founders.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
            Your message is in the founders&apos; Telegram already: no queue, no
            triage. An engineer will reply from {site.email}.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="mt-8 text-[0.875rem] font-medium text-signal underline-offset-4 hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const disabled = state === "sending";

  /* ── Form ──────────────────────────────────────────────────────── */

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-2xl border border-line bg-paper shadow-frame-lg"
    >
      {/* Header strip: same drafting treatment as the guided brief, so the
          two entry points on the site read as one family. */}
      <div className="blueprint-fine border-b border-line bg-bone-alt px-6 py-6 sm:px-10">
        <p className="mono-label !text-signal">Write to us</p>
        <h2 className="display-md mt-2.5 text-ink">
          A paragraph is enough{" "}
          <span className="font-serif italic text-mute">to start.</span>
        </h2>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <Label>Your name</Label>
            <input
              name="name"
              required
              autoComplete="name"
              disabled={disabled}
              className={`mt-2.5 ${fieldClass}`}
              placeholder="Priya Raman"
            />
          </label>
          <label className="block">
            <Label>Email</Label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={disabled}
              className={`mt-2.5 ${fieldClass}`}
              placeholder="you@company.com"
            />
          </label>
        </div>

        <label className="mt-6 block">
          <Label
            aside={
              <span className="font-mono text-[0.65rem] tabular-nums text-mute">
                {messageLength} / {MESSAGE_LIMIT}
              </span>
            }
          >
            What are you trying to ship?
          </Label>
          <textarea
            name="message"
            required
            rows={8}
            maxLength={MESSAGE_LIMIT}
            disabled={disabled}
            onChange={(e) => setMessageLength(e.target.value.length)}
            className={`mt-2.5 resize-y leading-relaxed ${fieldClass}`}
            placeholder="The system, the constraint, the deadline: whatever you have. If it is still vague, say that too; scoping it is part of the work."
          />
        </label>

        <div aria-live="polite">
          {state === "error" && (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.85rem] text-red-700"
            >
              {error}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-5 border-t border-line pt-7">
          <button
            type="submit"
            disabled={disabled}
            className="group inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3 text-[0.875rem] font-medium text-white shadow-[0_8px_24px_-8px_rgba(46,125,240,0.6)] transition-all duration-200 hover:shadow-[0_10px_30px_-8px_rgba(46,125,240,0.75)] disabled:cursor-wait disabled:opacity-60"
          >
            {state === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                Send it
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Proof strip: the page's own numbers, closing the card. */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-line bg-bone-alt px-6 py-4 font-mono text-[0.62rem] uppercase tracking-wider text-mute sm:px-10">
        <span>{stats.live} systems live</span>
        <span aria-hidden>·</span>
        <span>{stats.projectsDelivered} projects delivered</span>
        <span aria-hidden>·</span>
        <span>No sales layer</span>
      </div>
    </form>
  );
}
