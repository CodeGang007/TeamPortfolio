"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  budgets,
  buildTypes,
  engagements,
  startingPoints,
  timelines,
  type Choice,
} from "@/content/brief";
import { site, stats, whatsappHref, marketsShort } from "@/content/site";

/* ═══════════════════════════════════════════════════════════════════
   PROJECT BRIEF: guided, five steps, no sign-in.

   One decision per screen. Nobody fills twenty fields for a company
   they have not spoken to yet, so the form earns each answer: the
   cheap, interesting choices come first and the contact details come
   last, once there is something to lose by abandoning.

   The rail on the right is not decoration. Watching the brief assemble
   itself is what makes a five-step form feel short: you can always see
   how much you have already banked.
   ═══════════════════════════════════════════════════════════════════ */

const STEPS = [
  { id: "build", label: "System" },
  { id: "context", label: "Problem" },
  { id: "scope", label: "Scope" },
  { id: "extras", label: "Detail" },
  { id: "you", label: "You" },
] as const;

const MAX_FILES = 8;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

interface Attachment {
  id: string;
  name: string;
  size: string;
  file: File;
}

type Form = {
  buildType: string;
  startingPoint: string;
  budget: string;
  timeline: string;
  engagement: string;
  description: string;
  links: string;
  notes: string;
  name: string;
  email: string;
  company: string;
  phone: string;
};

const EMPTY: Form = {
  buildType: "",
  startingPoint: "",
  budget: "",
  timeline: "",
  engagement: "",
  description: "",
  links: "",
  notes: "",
  name: "",
  email: "",
  company: "",
  phone: "",
};

function humanSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function labelOf(list: Choice[], id: string) {
  return list.find((c) => c.id === id)?.label;
}

/* ── Choice card ─────────────────────────────────────────────────── */

function ChoiceCard({
  choice,
  selected,
  onSelect,
}: {
  choice: Choice;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex h-full flex-col items-start gap-2 overflow-hidden rounded-xl border p-5 pl-6 text-left transition-all duration-300 ${
        selected
          ? "border-signal/60 bg-signal-soft/60 shadow-frame"
          : "border-line bg-paper hover:-translate-y-1 hover:border-line-strong hover:shadow-frame"
      }`}
    >
      {/* Accent edge: the whole selected state in one stroke. */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-signal transition-transform duration-300 ${
          selected ? "scale-y-100" : "scale-y-0"
        }`}
      />
      <span
        aria-hidden
        className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-200 ${
          selected
            ? "scale-100 border-signal bg-signal"
            : "scale-90 border-line-strong bg-transparent group-hover:border-mute"
        }`}
      >
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 text-white transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
          fill="none"
        >
          <path
            d="M2.5 6.2 5 8.6l4.5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="max-w-[86%] text-[0.95rem] font-medium leading-snug text-ink">
        {choice.label}
      </span>
      <span className="text-[0.82rem] leading-relaxed text-mute">{choice.hint}</span>
    </button>
  );
}

function ChoiceGrid({
  choices,
  value,
  onChange,
  columns = 2,
}: {
  choices: Choice[];
  value: string;
  onChange: (id: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-3 ${
        columns === 3 ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {choices.map((c) => (
        <ChoiceCard
          key={c.id}
          choice={c}
          selected={value === c.id}
          onSelect={() => onChange(c.id)}
        />
      ))}
    </div>
  );
}

/* ── Field chrome ────────────────────────────────────────────────── */

const fieldClass =
  "w-full rounded-lg border border-line bg-bone px-4 py-3 text-[0.9rem] text-ink placeholder:text-mute/60 transition-all duration-200 focus:border-signal focus:bg-paper focus:outline-none focus:ring-4 focus:ring-signal/10";

function Field({
  label,
  optional,
  children,
  hint,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mono-label">
        {label}
        {optional ? (
          <span className="ml-2 normal-case tracking-normal text-mute/60">optional</span>
        ) : (
          <span aria-hidden className="ml-1 text-signal">
            *
          </span>
        )}
      </span>
      {hint && <span className="mt-1.5 block text-[0.82rem] text-mute">{hint}</span>}
      <span className="mt-2.5 block">{children}</span>
    </label>
  );
}

/** Editorial step heading — serif trail is the same move the rest of the site
 *  uses for pull quotes, and it stops the form reading like a dashboard. */
function StepHead({ n, lead, trail }: { n: number; lead: string; trail?: string }) {
  return (
    <div className="mb-8">
      <p className="mono-label !text-signal">
        Step {n}: {STEPS[n - 1].label}
      </p>
      <h2 className="display-md mt-3 text-balance text-ink">
        {lead}{" "}
        {trail && <span className="font-serif italic text-mute">{trail}</span>}
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

export default function BriefForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [files, setFiles] = useState<Attachment[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const set = useCallback(
    <K extends keyof Form>(key: K, value: Form[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      setError("");
    },
    []
  );

  const goTo = useCallback((next: number) => {
    setStep(next);
    setError("");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /** Step 1 is a single choice, so picking an answer IS the "next" click. */
  const pick = useCallback(
    <K extends keyof Form>(key: K, value: Form[K]) => {
      set(key, value);
      window.setTimeout(() => goTo(1), 220);
    },
    [set, goTo]
  );

  const canAdvance = useMemo(() => {
    if (step === 0) return Boolean(form.buildType);
    if (step === 1) return form.description.trim().length > 12;
    if (step === 2) return Boolean(form.budget && form.timeline);
    return true;
  }, [step, form]);

  /** What the rail shows. Only answered rows render, so it grows as you go. */
  const summary = useMemo(
    () =>
      [
        { k: "Building", v: labelOf(buildTypes, form.buildType) },
        { k: "Starting from", v: labelOf(startingPoints, form.startingPoint) },
        { k: "Budget", v: labelOf(budgets, form.budget) },
        { k: "Timeline", v: labelOf(timelines, form.timeline) },
        { k: "Engagement", v: labelOf(engagements, form.engagement) },
      ].filter((r) => r.v),
    [form]
  );

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const next: Attachment[] = [];
    for (const file of Array.from(incoming)) {
      if (file.size > MAX_FILE_BYTES) {
        setError(`${file.name} is over 10 MB.`);
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${next.length}`,
        name: file.name,
        size: humanSize(file.size),
        file,
      });
    }
    setFiles((f) => [...f, ...next].slice(0, MAX_FILES));
  }, []);

  /** Unsigned Cloudinary upload — the same preset the dashboard already uses.
   *  A failed upload never blocks the brief; the text is what matters. */
  const uploadFiles = useCallback(async () => {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloud || !preset || files.length === 0) return [];

    const uploaded: { name: string; url: string }[] = [];
    for (const a of files) {
      try {
        const fd = new FormData();
        fd.append("file", a.file);
        fd.append("upload_preset", preset);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud}/auto/upload`,
          { method: "POST", body: fd }
        );
        const data = await res.json();
        if (data.secure_url) uploaded.push({ name: a.name, url: data.secure_url });
      } catch {
        /* best effort */
      }
    }
    return uploaded;
  }, [files]);

  const submit = useCallback(async () => {
    if (!form.name.trim()) return setError("We need a name to reply to.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("That email does not look right.");
    // Phone is required: the fastest engagements start on a call, and a
    // number is what lets an engineer skip three days of email tag.
    if (form.phone.replace(/\D/g, "").length < 7)
      return setError("A phone or WhatsApp number is required so we can reach you.");

    setSending(true);
    setError("");
    try {
      const uploaded = await uploadFiles();
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, files: uploaded }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }, [form, uploadFiles]);

  /* ── Sent ──────────────────────────────────────────────────────── */

  if (done) {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-line bg-paper p-8 text-center shadow-frame-lg sm:p-16"
      >
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
            It is with the founders{" "}
            <span className="font-serif italic text-mute">already.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
            Your brief landed in the founders&apos; Telegram the moment you sent
            it. An engineer will reply, usually within a business day, and a
            copy is on its way to {form.email}.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappHref(
                `Hi CodeGang, I just sent a project brief through the site (${form.name}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1EBE5A]"
            >
              Continue on WhatsApp
            </a>
            <Link
              href="/work"
              className="inline-flex items-center rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-bone-alt"
            >
              Read what we shipped
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── Steps ─────────────────────────────────────────────────────── */

  const stepBody = [
    <div key="build">
      <StepHead n={1} lead="What are you" trail="trying to build?" />
      <ChoiceGrid
        choices={buildTypes}
        value={form.buildType}
        onChange={(v) => pick("buildType", v)}
        columns={3}
      />
    </div>,

    <div key="context">
      <StepHead n={2} lead="Describe the problem" trail="in your own words." />
      <div className="space-y-8">
        <Field
          label="What needs to exist, and why now?"
          hint="A paragraph beats a specification. What breaks today, who feels it, and what changes if it works."
        >
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={7}
            maxLength={5000}
            autoFocus
            placeholder="Our operations team runs the whole purchasing process out of spreadsheets. Three people spend a day a week reconciling them, and we still find errors at month end…"
            className={`${fieldClass} resize-y leading-relaxed`}
          />
          <span className="mt-1.5 block text-right font-mono text-[0.65rem] text-mute">
            {form.description.length} / 5000
          </span>
        </Field>

        <div>
          <p className="mono-label mb-3">Where does it start from?</p>
          <ChoiceGrid
            choices={startingPoints}
            value={form.startingPoint}
            onChange={(v) => set("startingPoint", v)}
          />
        </div>
      </div>
    </div>,

    <div key="scope">
      <StepHead n={3} lead="Scope and timing." trail="Rough is fine." />
      <div className="space-y-9">
        <div>
          <p className="mono-label mb-3">Budget</p>
          <ChoiceGrid
            choices={budgets}
            value={form.budget}
            onChange={(v) => set("budget", v)}
            columns={3}
          />
        </div>
        <div>
          <p className="mono-label mb-3">Timeline</p>
          <ChoiceGrid
            choices={timelines}
            value={form.timeline}
            onChange={(v) => set("timeline", v)}
          />
        </div>
        <div>
          <p className="mono-label mb-3">How you want to work with us</p>
          <ChoiceGrid
            choices={engagements}
            value={form.engagement}
            onChange={(v) => set("engagement", v)}
            columns={3}
          />
        </div>
      </div>
    </div>,

    <div key="extras">
      <StepHead n={4} lead="Anything that helps" trail="us scope it faster." />
      <div className="space-y-7">
        <Field
          label="Links"
          optional
          hint="A live site, a design file, a requirements doc: anything we can read."
        >
          <textarea
            value={form.links}
            onChange={(e) => set("links", e.target.value)}
            rows={3}
            placeholder={"https://yourproduct.com\nhttps://figma.com/file/…"}
            className={`${fieldClass} resize-y`}
          />
        </Field>

        <div>
          <p className="mono-label">
            Files
            <span className="ml-2 normal-case tracking-normal text-mute/60">optional</span>
          </p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInput.current?.click()}
            className={`mt-2.5 cursor-pointer rounded-xl border border-dashed p-9 text-center transition-all duration-200 ${
              dragging
                ? "scale-[1.01] border-signal bg-signal-soft/50"
                : "border-line-strong bg-bone hover:border-signal/50 hover:bg-paper"
            }`}
          >
            <p className="text-[0.875rem] font-medium text-ink">
              Drop files, or click to choose
            </p>
            <p className="mt-1.5 text-[0.8rem] text-mute">
              PDF, docs, spreadsheets, screenshots: up to {MAX_FILES} files, 10 MB each
            </p>
            <input
              ref={fileInput}
              type="file"
              multiple
              hidden
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between rounded-lg border border-line bg-paper px-4 py-2.5"
                >
                  <span className="truncate text-[0.85rem] text-ink">{f.name}</span>
                  <span className="ml-4 flex shrink-0 items-center gap-3">
                    <span className="font-mono text-[0.7rem] text-mute">{f.size}</span>
                    <button
                      type="button"
                      onClick={() => setFiles((x) => x.filter((i) => i.id !== f.id))}
                      className="text-mute transition-colors hover:text-ink"
                      aria-label={`Remove ${f.name}`}
                    >
                      ✕
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Field label="Anything else" optional>
          <textarea
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="Constraints, compliance requirements, an internal deadline, a team we would be working alongside…"
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>
    </div>,

    <div key="you">
      <StepHead n={5} lead="Where do we" trail="send the answer?" />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name">
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            placeholder="Priya Raman"
            className={fieldClass}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </Field>
        <Field
          label="Phone or WhatsApp"
          hint="The fastest projects start on a call. We will not cold-call you."
        >
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+91 79086 31466"
            className={fieldClass}
          />
        </Field>
        <Field label="Company" optional>
          <input
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            autoComplete="organization"
            placeholder="Where you work"
            className={fieldClass}
          />
        </Field>
      </div>
      <p className="mt-7 border-t border-line pt-5 text-[0.82rem] leading-relaxed text-mute">
        Your brief goes straight to the founders&apos; Telegram. No CRM
        sequence, no sales call booked on your behalf, and confidentiality is
        the default: you do not need an NDA in place to describe the problem.
      </p>
    </div>,
  ];

  return (
    <div
      ref={topRef}
      className="grid scroll-mt-32 items-start gap-8 lg:grid-cols-[1fr_19rem] lg:gap-10"
    >
      {/* ══ Form panel ═══════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-frame-lg">
        {/* Progress header */}
        <div className="blueprint-fine relative border-b border-line bg-bone-alt px-6 pb-5 pt-6 sm:px-10">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
            {STEPS.map((s, i) => {
              const state = i === step ? "current" : i < step ? "done" : "todo";
              return (
                <li key={s.id} className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => i < step && goTo(i)}
                    disabled={i > step}
                    className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[0.78rem] font-medium transition-all duration-200 ${
                      state === "current"
                        ? "bg-ink text-bone shadow-pill"
                        : state === "done"
                          ? "text-ink-soft hover:bg-bone"
                          : "cursor-default text-mute/50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[0.68rem] transition-colors ${
                        state === "current"
                          ? "bg-bone/20 text-bone"
                          : state === "done"
                            ? "bg-signal text-white"
                            : "bg-line text-mute"
                      }`}
                    >
                      {state === "done" ? "✓" : i + 1}
                    </span>
                    <span className={state === "todo" ? "hidden sm:inline" : ""}>
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className="hidden h-px w-4 bg-line-strong lg:block" />
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full rounded-full bg-signal"
              initial={false}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Step body */}
        <div className="px-6 py-9 sm:px-10 sm:py-11">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={STEPS[step].id}
              initial={reduced ? false : { opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: -22 }}
              transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              {stepBody[step]}
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.p
              role="alert"
              initial={reduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-7 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.85rem] text-red-700"
            >
              {error}
            </motion.p>
          )}

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-7">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-[0.85rem] font-medium text-mute transition-colors hover:text-ink disabled:invisible"
            >
              ← Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => goTo(step + 1)}
                disabled={!canAdvance}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.875rem] font-medium text-bone transition-all duration-200 hover:shadow-frame disabled:cursor-not-allowed disabled:opacity-30"
              >
                Continue
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={sending}
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3 text-[0.875rem] font-medium text-white shadow-[0_8px_24px_-8px_rgba(46,125,240,0.6)] transition-all duration-200 hover:shadow-[0_10px_30px_-8px_rgba(46,125,240,0.75)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send the brief"}
                {!sending && (
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══ Rail ═════════════════════════════════════════════════════ */}
      <aside className="lg:sticky lg:top-32">
        <div className="rounded-2xl border border-line bg-bone-alt p-6">
          <p className="mono-label">Your brief so far</p>

          {summary.length === 0 ? (
            <p className="mt-4 text-[0.85rem] leading-relaxed text-mute">
              It assembles here as you answer. Nothing is sent until the last
              step, and nothing is stored before that.
            </p>
          ) : (
            <dl className="mt-4 space-y-3.5">
              <AnimatePresence initial={false}>
                {summary.map((row) => (
                  <motion.div
                    key={row.k}
                    initial={reduced ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-l-2 border-signal/40 pl-3"
                  >
                    <dt className="font-mono text-[0.62rem] uppercase tracking-wider text-mute">
                      {row.k}
                    </dt>
                    <dd className="mt-0.5 text-[0.85rem] leading-snug text-ink">
                      {row.v}
                    </dd>
                  </motion.div>
                ))}
              </AnimatePresence>
            </dl>
          )}

          <div className="mt-7 border-t border-line pt-5">
            <figure>
              <blockquote className="font-serif text-[1.05rem] leading-snug text-ink">
                &ldquo;The engineer in the meeting writes the code.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-[0.78rem] text-mute">
                {stats.live} systems live · {marketsShort} · NDA by
                default
              </figcaption>
            </figure>
          </div>
        </div>

        <p className="mt-5 px-1 text-[0.82rem] leading-relaxed text-mute">
          Would rather just talk?{" "}
          <a href={`mailto:${site.email}`} className="text-signal hover:underline">
            {site.email}
          </a>
        </p>
      </aside>
    </div>
  );
}
