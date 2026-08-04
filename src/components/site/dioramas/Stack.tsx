"use client";

import { useEffect, useState } from "react";
import { useInView } from "../useInView";

/**
 * The seven-layer stack a Verse AI request actually traverses. This is the
 * page's centrepiece diagram — the equivalent of an org chart, except every
 * box is infrastructure we wrote and operate.
 *
 * A request token walks the stack on a loop so the diagram is never static.
 */

const LAYERS = [
  { n: 1, name: "Edge · CDN", tech: "CloudFront", note: "TLS, caching, WAF" },
  { n: 2, name: "API gateway", tech: "ALB + NestJS", note: "routing, rate limits" },
  { n: 3, name: "Auth & tenancy", tech: "JWT + RLS", note: "tenant resolved here" },
  { n: 4, name: "Orchestrator", tech: "NestJS", note: "prompt assembly, tools" },
  { n: 5, name: "Retrieval", tech: "Qdrant", note: "vector search, scoped" },
  { n: 6, name: "Model gateway", tech: "Bedrock · OpenAI", note: "failover, budgets" },
  { n: 7, name: "Data", tech: "Postgres · S3", note: "documents, audit log" },
];

export default function Stack() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setActive(LAYERS.length - 1);
      return;
    }
    let i = -1;
    const id = setInterval(() => {
      i = i + 1 > LAYERS.length + 1 ? 0 : i + 1;
      setActive(i);
    }, 620);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="bg-paper p-4 sm:p-5">
      <header className="mb-4 flex items-center justify-between">
        <p className="text-[0.8rem] font-medium text-ink">
          Request path · Verse AI
        </p>
        <span className="mono-label text-[0.55rem]">7 layers</span>
      </header>

      <ol className="relative space-y-1.5">
        {/* spine */}
        <span
          aria-hidden
          className="absolute left-[13px] top-3 bottom-3 w-px bg-line"
        />

        {LAYERS.map((l, i) => {
          const on = active === i;
          const passed = active > i;
          return (
            <li key={l.n} className="relative flex items-center gap-3">
              {/* node */}
              <span
                aria-hidden
                className={`relative z-10 grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full border font-mono text-[0.6rem] transition-all duration-300 ${
                  on
                    ? "scale-110 border-signal bg-signal text-white shadow-[0_0_0_4px_rgba(52,125,38,0.14)]"
                    : passed
                      ? "border-signal/40 bg-signal-soft text-signal"
                      : "border-line bg-bone text-mute"
                }`}
              >
                {l.n}
              </span>

              <div
                className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300 ${
                  on
                    ? "border-signal/40 bg-signal-soft/50"
                    : "border-line bg-bone/60"
                }`}
              >
                <span className="text-[0.75rem] font-medium text-ink">
                  {l.name}
                </span>
                <span className="hidden font-mono text-[0.6rem] text-mute sm:inline">
                  {l.note}
                </span>
                <span className="ml-auto shrink-0 rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[0.56rem] text-ink-soft">
                  {l.tech}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3">
        <span className="font-mono text-[0.6rem] text-mute">
          every layer written, deployed and maintained by us
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.6rem] text-signal">
          <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
          in production
        </span>
      </footer>
    </div>
  );
}
