"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Interactive delivery flow — how a problem becomes a scalable system.
// Every stage cites the real system that proves we actually work this way.
const steps = [
  {
    title: "Decode",
    tag: "Understand the domain",
    body: "We start inside your domain, not inside an editor — entities, roles, constraints, and the failure modes that keep you up at night. The domain model comes before any code.",
    proof: "Pinnacle HMS — 39 tables and 57 relationships mapped before the first endpoint",
    href: "/work/pinnacle-hms",
  },
  {
    title: "Scope",
    tag: "Agree what shipping means",
    body: "One written scope: what ships, what does not, and how we will both know it is done. Modules get names and boundaries on day one.",
    proof: "ARM Tech — scoped as three named modules: CementBook, TruckBook, FinanceBook",
    href: "/work/arm-tech",
  },
  {
    title: "Architect",
    tag: "Design for scale first",
    body: "Multi-tenancy, queues, data isolation, and cost ceilings are architecture decisions, not refactors. We design the system for its tenth customer, not its first demo.",
    proof: "Verse AI — 7-layer AWS stack with cryptographic tenant isolation",
    href: "/work/verse-ai",
  },
  {
    title: "Build",
    tag: "Ship in increments",
    body: "CI/CD from the first week, deployable at every step. You watch the system grow in a staging URL, not in a slide deck.",
    proof: "AI Resume — fully dockerized CI/CD on GitHub Actions from week one",
    href: "/work/ai-resume",
  },
  {
    title: "Harden",
    tag: "Make it survive production",
    body: "Load, auth boundaries, backups, observability. The whole stack must come up from scratch with one command — because one day it will have to.",
    proof: "NestFlow — containerized microservices; one compose file brings the stack up",
    href: "/work/nestflow",
  },
  {
    title: "Run",
    tag: "Stay on after launch",
    body: "Live means someone is watching it. We keep maintenance and roadmap after shipping, in your timezone.",
    proof: "5 systems live right now across 5 regions — see the board",
    href: "/work",
  },
];

export default function ProcessFlow() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div>
      {/* Track — desktop */}
      <div className="relative hidden md:block">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-5 h-0.5 bg-slate-300"
        />
        <div
          aria-hidden
          className="absolute left-0 top-5 h-0.5 bg-blue-600 transition-all duration-500"
          style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
        />
        <ol className="relative grid grid-cols-6">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col items-center">
              <button
                onClick={() => setActive(i)}
                aria-current={i === active ? "step" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-all duration-300 ${
                  i <= active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-400 hover:border-blue-400"
                }`}
              >
                {i + 1}
              </button>
              <button
                onClick={() => setActive(i)}
                className={`mt-3 text-sm font-semibold transition-colors ${
                  i === active ? "text-blue-700" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {s.title}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Track — mobile: horizontal chips */}
      <ol className="flex gap-2 overflow-x-auto pb-2 md:hidden">
        {steps.map((s, i) => (
          <li key={s.title} className="shrink-0">
            <button
              onClick={() => setActive(i)}
              aria-current={i === active ? "step" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === active
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-300"
              }`}
            >
              {i + 1}. {s.title}
            </button>
          </li>
        ))}
      </ol>

      {/* Detail panel */}
      <div
        key={active}
        className="console-fade mt-10 overflow-hidden rounded-3xl border border-slate-900/15 bg-white/70"
      >
        <div className="grid md:grid-cols-[1fr_auto]">
          <div className="p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-700">
              Step {active + 1} of {steps.length} · {step.tag}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
              {step.body}
            </p>
            <Link
              href={step.href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              {step.proof}
              <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
            </Link>
          </div>
          <div
            aria-hidden
            className="hidden select-none items-end p-6 font-display text-[7rem] font-bold leading-none text-blue-600/10 md:flex"
          >
            {String(active + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
