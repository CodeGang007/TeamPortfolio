"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ConsoleProject } from "@/content/projects";
import { Plate } from "./blocks";

/**
 * Filterable portfolio grid.
 *
 * Filters are derived from the projects themselves — a sector or region
 * chip cannot exist unless a real system carries it, so the filter bar can
 * never advertise work we have not done.
 */
export default function PortfolioGrid({
  projects,
  clientBySlug,
  shotBySlug,
}: {
  projects: ConsoleProject[];
  clientBySlug: Record<string, string>;
  /** Real production screenshot per slug, from data/portfolioProjects.ts. */
  shotBySlug: Record<string, string>;
}) {
  const [sector, setSector] = useState("All");
  const [status, setStatus] = useState<"all" | "live" | "building">("all");

  const sectors = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.sector)))],
    [projects],
  );

  const shown = projects.filter(
    (p) =>
      (sector === "All" || p.sector === sector) &&
      (status === "all" || p.status === status),
  );

  return (
    <div>
      {/* ── Filter bar ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono-label mr-1">Sector</span>
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
                sector === s
                  ? "border-ink bg-ink text-bone"
                  : "border-line bg-paper text-mute hover:border-line-strong hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mono-label mr-1">Status</span>
          {(
            [
              { k: "all", label: "All" },
              { k: "live", label: "Live" },
              { k: "building", label: "In build" },
            ] as const
          ).map((s) => (
            <button
              key={s.k}
              onClick={() => setStatus(s.k)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
                status === s.k
                  ? "border-signal bg-signal-soft text-ink"
                  : "border-line bg-paper text-mute hover:border-line-strong hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-wider text-mute">
          {shown.length} of {projects.length}
        </span>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────── */}
      <motion.ul layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-frame"
              >
                <Plate
                  label={`${p.name} — screen`}
                  src={shotBySlug[p.slug]}
                  alt={shotBySlug[p.slug] ? `${p.name} interface` : ""}
                  fit="contain"
                  ratio="16/10"
                  className="!rounded-none !border-0 !border-b !border-line"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                      {p.sector}
                    </span>
                    <span
                      aria-hidden
                      className={`ml-auto h-1.5 w-1.5 rounded-full ${
                        p.status === "live" ? "pulse-dot bg-signal" : "bg-line-strong"
                      }`}
                    />
                  </div>
                  <p className="mt-1 text-[0.8rem] font-medium text-mute">
                    {clientBySlug[p.slug] ?? p.city} · {p.city}
                  </p>
                  <h3 className="mt-2 text-[1.1rem] font-medium leading-snug tracking-tight text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
                  <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-wider text-signal">
                    {p.stack.join(" · ")}
                  </p>
                  <span className="mt-auto pt-4 text-[0.82rem] font-medium text-signal">
                    Read the case study
                    <span
                      aria-hidden
                      className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {shown.length === 0 ? (
        <p className="mt-10 text-center text-[0.9rem] text-mute">
          No systems match that combination.
        </p>
      ) : null}
    </div>
  );
}
