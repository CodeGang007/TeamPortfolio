"use client";

import { stats } from "@/content/site";
import { useCountTo, useInView } from "./useInView";

/**
 * The numbers band. Values come from content/site.ts — the lifetime figures
 * are founder-asserted and carry the "most under NDA" qualifier wherever
 * they appear, per the truth rules in that file.
 *
 * `display` is what the reader sees; `to` only drives the count animation,
 * so "100+" animates to 100 and keeps its plus sign.
 */

const FIGURES = [
  {
    display: stats.projectsDelivered,
    to: 500,
    suffix: "+",
    label: "Projects delivered",
    note: "over the years · most under NDA",
  },
  {
    display: stats.clientsServed,
    to: 100,
    suffix: "+",
    label: "Clients served",
    note: "across five regions",
  },
  {
    display: String(stats.live),
    to: stats.live,
    suffix: "",
    label: "Systems live now",
    note: "in production, maintained by us",
  },
  {
    display: String(stats.regions),
    to: stats.regions,
    suffix: "",
    label: "Regions supported",
    note: "each in its own timezone",
  },
];

function Figure({
  fig,
  start,
}: {
  fig: (typeof FIGURES)[number];
  start: boolean;
}) {
  const v = useCountTo(start, fig.to, 1500);
  return (
    <div className="px-2">
      <p className="font-display text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-none tracking-tight text-ink tabular-nums">
        {Math.round(v)}
        <span className="text-signal">{fig.suffix}</span>
      </p>
      <p className="mt-3 text-[0.9rem] font-medium text-ink">{fig.label}</p>
      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-mute">
        {fig.note}
      </p>
    </div>
  );
}

export default function StatsBand() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-y border-line bg-bone py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="blueprint-fine mask-fade-y absolute inset-0 -z-10"
      />
      <div className="mx-auto w-full max-w-shell px-6 lg:px-10 xl:px-16">
        <p className="mono-label mb-12">By the numbers</p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FIGURES.map((f) => (
            <Figure key={f.label} fig={f} start={inView} />
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-[0.8rem] leading-relaxed text-mute">
          Lifetime figures are asserted by the founders and include years of
          NDA-covered client work that cannot be itemised publicly. The systems
          and regions counts are computed from the case studies on this site —
          you can check them.
        </p>
      </div>
    </section>
  );
}
