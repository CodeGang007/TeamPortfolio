"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ about }: { about?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");

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
          will reply from support@codegang.online.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="text-sm font-medium text-slate-700">
          What are you trying to ship?
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="The system, the constraint, the deadline — whatever you have."
        />
      </label>

      {state === "error" && (
        <p
          className="mt-4 flex items-center gap-2.5 text-sm font-medium text-red-600"
          role="alert"
        >
          <span aria-hidden className="h-2 w-2 rounded-full bg-red-500" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send it"}
      </button>
    </form>
  );
}
