"use client";

import { useCountTo, useInView, useSequence } from "../useInView";

/**
 * AI Resume Builder (nailhiring.com) — paste a job description, get an
 * ATS-optimised resume back. The diorama shows the mechanic that sells it:
 * the score moves because specific missing keywords got matched.
 *
 * Scores here illustrate the product's own scoring UI. They are not a
 * placement or hiring-outcome claim.
 */

const KEYWORDS = [
  { term: "Kubernetes", was: false },
  { term: "Terraform", was: false },
  { term: "CI/CD", was: true },
  { term: "Go", was: false },
  { term: "observability", was: false },
  { term: "PostgreSQL", was: true },
];

const R = 26;
const C = 2 * Math.PI * R;

export default function Ats() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const score = useCountTo(inView, 92, 1400);
  const step = useSequence(inView, KEYWORDS.length, 260);

  return (
    <div ref={ref} className="bg-paper p-4 sm:p-5">
      <header className="mb-4 flex items-center justify-between">
        <p className="text-[0.8rem] font-medium text-ink">ATS match report</p>
        <span className="rounded-full border border-line bg-bone px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-wider text-mute">
          under 60s
        </span>
      </header>

      <div className="flex items-center gap-5">
        {/* ── Score dial ─────────────────────────────────────────── */}
        <div className="relative shrink-0">
          <svg viewBox="0 0 64 64" className="h-[76px] w-[76px] -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="#E2DFD8"
              strokeWidth="5"
            />
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="#347D26"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (score / 100) * C}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-lg font-semibold tabular-nums text-ink">
              {Math.round(score)}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-[0.72rem] text-mute">
            Before{" "}
            <span className="font-mono text-ink-soft line-through">54</span>{" "}
            <span aria-hidden className="mx-1 text-line-strong">
              →
            </span>{" "}
            after{" "}
            <span className="font-mono font-semibold text-ink">
              {Math.round(score)}
            </span>
          </p>
          <p className="mt-1.5 text-[0.72rem] leading-snug text-ink-soft">
            Rewritten against the pasted job description: bullets re-scoped,
            missing keywords surfaced, formatting flattened for the parser.
          </p>
        </div>
      </div>

      {/* ── Keyword chips ────────────────────────────────────────── */}
      <div className="mt-4">
        <p className="mono-label mb-2 text-[0.55rem]">Keyword coverage</p>
        <ul className="flex flex-wrap gap-1.5">
          {KEYWORDS.map((k, i) => (
            <li
              key={k.term}
              className={`rounded-md border px-2 py-1 font-mono text-[0.6rem] transition-all duration-400 ${
                step >= i + 1
                  ? k.was
                    ? "border-line bg-bone text-mute"
                    : "border-signal/40 bg-signal-soft text-ink"
                  : "border-line bg-bone/50 text-transparent"
              }`}
            >
              {k.term}
              {step >= i + 1 && !k.was ? (
                <span aria-hidden className="ml-1 text-signal">
                  +
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-2.5 font-mono text-[0.55rem] text-mute">
          <span className="text-signal">+4 added</span> · 2 already present
        </p>
      </div>
    </div>
  );
}
