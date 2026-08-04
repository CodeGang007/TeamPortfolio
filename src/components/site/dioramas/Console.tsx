"use client";

import { useInView, useSequence } from "../useInView";

/**
 * Verse AI — private ChatGPT over a tenant's own documents.
 * The diorama shows the thing that actually matters to a buyer: the answer
 * arrives *with its retrieval trace*, and the trace is scoped to one tenant.
 *
 * Numbers here describe the architecture (7 layers, chunk scores), not
 * client data. Nothing in this component asserts a business metric.
 */

const SOURCES = [
  { doc: "policy-handbook-2026.pdf", page: "p. 42", score: 0.94 },
  { doc: "onboarding-sop.docx", page: "§ 3.1", score: 0.89 },
  { doc: "contract-template.pdf", page: "cl. 7", score: 0.81 },
  { doc: "finance-faq.md", page: "Q14", score: 0.76 },
];

const TENANTS = ["Acme Logistics", "Northwind Health", "MooveHub"];

export default function Console() {
  const { ref, inView } = useInView<HTMLDivElement>();
  // 0 → idle, 1 → question, 2 → retrieving, 3..6 → sources, 7 → answer
  const step = useSequence(inView, 7, 380);

  return (
    <div ref={ref} className="grid grid-cols-1 text-[11px] sm:grid-cols-[132px_1fr] sm:text-xs">
      {/* ── Tenant rail ──────────────────────────────────────────── */}
      <aside className="hidden border-r border-line bg-bone-alt/60 p-3 sm:block">
        <p className="mono-label mb-3 text-[0.55rem]">Workspace</p>
        <ul className="space-y-1">
          {TENANTS.map((t, i) => (
            <li
              key={t}
              className={`flex items-center gap-1.5 truncate rounded-md px-2 py-1.5 ${
                i === 0
                  ? "bg-paper font-medium text-ink shadow-sm ring-1 ring-line"
                  : "text-mute"
              }`}
            >
              <span
                aria-hidden
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  i === 0 ? "bg-signal" : "bg-line-strong"
                }`}
              />
              <span className="truncate">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-md border border-line bg-paper p-2">
          <p className="mono-label text-[0.5rem] leading-tight">
            Tenant isolation
          </p>
          <p className="mt-1 font-mono text-[0.6rem] text-signal">
            vector-scoped
          </p>
          <p className="mt-0.5 font-mono text-[0.55rem] text-mute">
            no cross-tenant reads
          </p>
        </div>
      </aside>

      {/* ── Thread ───────────────────────────────────────────────── */}
      <div className="flex min-h-[290px] flex-col bg-paper">
        <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line px-4 py-2.5">
          <span className="font-medium text-ink">Acme Logistics · Assistant</span>
          <span className="mono-label text-[0.55rem]">7-layer AWS stack</span>
        </header>

        <div className="flex-1 space-y-3 px-4 py-4">
          {/* Question */}
          <div
            className={`ml-auto w-fit max-w-[78%] rounded-lg rounded-br-sm bg-ink px-3 py-2 text-bone transition-all duration-500 ${
              step >= 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            What is our notice period for a fixed-term contractor?
          </div>

          {/* Retrieval trace */}
          <div
            className={`transition-all duration-500 ${
              step >= 2 ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="mono-label mb-1.5 text-[0.55rem]">
              Retrieved from 4 of 1,284 chunks
            </p>
            <ul className="space-y-1">
              {SOURCES.map((s, i) => (
                <li
                  key={s.doc}
                  className={`flex items-center gap-2 rounded-md border border-line bg-bone/70 px-2 py-1.5 transition-all duration-400 ${
                    step >= 3 + i
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0"
                  }`}
                >
                  <span className="truncate font-mono text-[0.62rem] text-ink-soft">
                    {s.doc}
                  </span>
                  <span className="font-mono text-[0.58rem] text-mute">
                    {s.page}
                  </span>
                  {/* Similarity bar: width encodes the score */}
                  <span className="ml-auto flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className="h-1 w-10 overflow-hidden rounded-full bg-line"
                    >
                      <span
                        className="block h-full rounded-full bg-signal transition-all duration-700"
                        style={{
                          width: step >= 3 + i ? `${s.score * 100}%` : "0%",
                        }}
                      />
                    </span>
                    <span className="font-mono text-[0.58rem] tabular-nums text-mute">
                      {s.score.toFixed(2)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Answer */}
          <div
            className={`w-fit max-w-[86%] rounded-lg rounded-bl-sm border border-line bg-bone px-3 py-2 text-ink-soft transition-all duration-500 ${
              step >= 7 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            Thirty days, per{" "}
            <span className="font-medium text-ink">clause 7</span> of the
            contract template, with the handbook exception for probation.
            <span className="caret" />
          </div>
        </div>

        <footer className="border-t border-line px-4 py-2.5">
          <div className="flex items-center gap-2 rounded-md border border-line bg-bone px-2.5 py-1.5">
            <span className="text-mute">Ask about your documents…</span>
            <span className="ml-auto grid h-5 w-5 place-items-center rounded bg-ink text-[0.6rem] text-bone">
              ↑
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
