"use client";

import { useInView, useSequence } from "../useInView";

/**
 * Pinnacle HMS — the operating system for a working hospital.
 * Six role-based portals over one schema. The diorama walks a single
 * patient episode through all six so the reader sees the hand-offs the
 * system is actually responsible for.
 *
 * 39 tables / 57 relationships are architecture facts from the case study.
 */

const PORTALS = [
  { role: "Reception", act: "Register · assign MRN", tables: 6 },
  { role: "OPD", act: "Consult · prescribe", tables: 8 },
  { role: "Diagnostics", act: "Order · report", tables: 7 },
  { role: "Pharmacy", act: "Dispense · deduct stock", tables: 6 },
  { role: "Billing", act: "Invoice · settle wallet", tables: 7 },
  { role: "Admin", act: "Audit · roles · reports", tables: 5 },
];

export default function Hospital() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const step = useSequence(inView, PORTALS.length, 520);

  return (
    <div ref={ref} className="bg-paper p-4 sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[0.8rem] font-medium text-ink">
            Patient episode · MRN 04417
          </p>
          <p className="mono-label mt-0.5 text-[0.55rem]">
            one schema · 39 tables · 57 relationships
          </p>
        </div>
        <span className="rounded-full border border-line bg-bone px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-wider text-mute">
          role-based access
        </span>
      </header>

      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PORTALS.map((p, i) => {
          const done = step > i + 1;
          const active = step === i + 1;
          const touched = step >= i + 1;
          return (
            <li
              key={p.role}
              className={`relative overflow-hidden rounded-lg border p-3 transition-all duration-500 ${
                active
                  ? "border-signal/45 bg-signal-soft/60 shadow-sm"
                  : touched
                    ? "border-line bg-bone"
                    : "border-line bg-bone/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[0.78rem] font-medium transition-colors ${
                    touched ? "text-ink" : "text-mute"
                  }`}
                >
                  {p.role}
                </span>
                <span
                  aria-hidden
                  className={`grid h-4 w-4 place-items-center rounded-full text-[0.55rem] transition-all duration-300 ${
                    done
                      ? "bg-signal text-white"
                      : active
                        ? "bg-signal/20 text-signal"
                        : "bg-line text-transparent"
                  }`}
                >
                  {done ? "✓" : "•"}
                </span>
              </div>

              <p
                className={`mt-1 text-[0.68rem] leading-snug transition-colors ${
                  touched ? "text-ink-soft" : "text-mute/60"
                }`}
              >
                {p.act}
              </p>

              <p className="mono-label mt-2 text-[0.5rem]">
                {p.tables} tables
              </p>

              {/* Progress sweep on the active portal */}
              {active ? (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[rise-in_0.5s_ease] bg-signal"
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <footer className="mt-4 flex items-center gap-2 border-t border-line pt-3">
        <span
          aria-hidden
          className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal"
        />
        <p className="font-mono text-[0.6rem] text-mute">
          {step >= PORTALS.length
            ? "episode closed · audit trail written"
            : `hand-off ${Math.min(step, PORTALS.length)} of ${PORTALS.length}`}
        </p>
      </footer>
    </div>
  );
}
