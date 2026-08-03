import { Cloud, Sparkles, LayoutTemplate } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   ABOUT-PAGE DIAGRAMS
   Three bespoke, coded (not photographic) illustrations for the About
   page — a layered delivery stack, a four-stage operating cycle, and a
   three-strength Venn. Plain HTML/CSS/SVG so labels stay crisp and
   editable, and so the page never depends on an AI-generated image
   rendering text correctly.
   ═══════════════════════════════════════════════════════════════════ */

const STACK_LAYERS = [
  { name: "Product & Interfaces", desc: "Web, mobile and admin surfaces end users actually touch" },
  { name: "Application Engineering", desc: "APIs, auth, business logic, third-party integrations" },
  { name: "AI & Data Systems", desc: "RAG pipelines, deep-learning modules, ETL" },
  { name: "Cloud Infrastructure", desc: "AWS / Azure, CI/CD, observability, security" },
] as const;

/** Layered stack — mirrors the "value proposition" diagram, CodeGang's stack instead. */
export function DeliveryStackDiagram() {
  return (
    <div className="relative pl-9 sm:pl-11">
      <span
        aria-hidden
        className="absolute bottom-2 left-0 top-2 w-px bg-line-strong"
      />
      <span
        aria-hidden
        className="mono-label absolute left-0 top-1/2 origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap tracking-[0.16em]"
        style={{ transformOrigin: "left center" }}
      >
        CODEGANG DELIVERY STACK
      </span>

      <div className="space-y-2.5">
        {STACK_LAYERS.map((layer, i) => {
          const isCore = i === 1 || i === 2;
          return (
            <div
              key={layer.name}
              className={`relative rounded-lg border px-4 py-3.5 transition-colors ${
                isCore
                  ? "border-signal/40 bg-signal-soft"
                  : "border-line bg-paper"
              }`}
              style={{ marginLeft: `${i * 14}px`, marginRight: `${i * 14}px` }}
            >
              <p
                className={`text-[0.85rem] font-medium ${
                  isCore ? "text-ink" : "text-ink-soft"
                }`}
              >
                {layer.name}
              </p>
              <p className="mt-0.5 text-[0.72rem] leading-snug text-mute">
                {layer.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 pl-3.5">
        <span aria-hidden className="font-mono text-mute">
          ↓
        </span>
        <span className="inline-flex items-center rounded-full bg-ink px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-bone">
          Production
        </span>
      </div>

      <p className="mono-label absolute -right-1 top-0 hidden text-right sm:block">
        the engineering core →
      </p>
    </div>
  );
}

const PHASES = [
  { n: "I", title: "Scope", body: "We agree what the system does and what shipping means, in writing." },
  { n: "II", title: "Build", body: "Short cycles in your repository, running before it is finished." },
  { n: "III", title: "Ship", body: "Deployed into your cloud account, reachable by a real user." },
  { n: "IV", title: "Stay", body: "Maintenance and roadmap by the same engineers who built it." },
] as const;

/** Four-stage loop — mirrors the "lab operating model" cycle diagram. */
export function OperatingCycleDiagram() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PHASES.map((p, i) => (
          <div key={p.n} className="relative">
            <div className="rounded-lg border border-line bg-paper p-4">
              <span className="font-mono text-[0.65rem] text-signal">{p.n}</span>
              <p className="mt-1 text-[0.9rem] font-medium text-ink">{p.title}</p>
              <p className="mt-1.5 text-[0.72rem] leading-snug text-mute">
                {p.body}
              </p>
            </div>
            {i < PHASES.length - 1 ? (
              <span
                aria-hidden
                className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 font-mono text-line-strong sm:block"
              >
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span aria-hidden className="font-mono text-[0.7rem] text-line-strong">
          ↺
        </span>
        <p className="font-mono text-[0.62rem] uppercase tracking-wider text-mute">
          Repeats for every release — Stay feeds the next Scope
        </p>
      </div>
    </div>
  );
}

const STRENGTHS = [
  { icon: Cloud, label: "Production Engineering", style: { top: "4%", left: "8%" } },
  { icon: Sparkles, label: "Applied AI", style: { top: "4%", right: "8%" } },
  { icon: LayoutTemplate, label: "Design & Usability", style: { bottom: "0%", left: "50%", transform: "translateX(-50%)" } },
] as const;

/** Three overlapping circles around a shared centre — mirrors the strengths Venn. */
export function StrengthsVenn() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <div
        aria-hidden
        className="absolute left-[6%] top-[6%] h-[62%] w-[62%] rounded-full border border-signal/50 bg-signal/[0.07] mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute right-[6%] top-[6%] h-[62%] w-[62%] rounded-full border border-signal/50 bg-signal/[0.07] mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute bottom-[2%] left-1/2 h-[62%] w-[62%] -translate-x-1/2 rounded-full border border-signal/50 bg-signal/[0.07] mix-blend-multiply"
      />

      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-lg font-semibold tracking-tight text-ink">
        Build
      </span>

      {STRENGTHS.map((s) => (
        <div
          key={s.label}
          className="absolute flex w-24 flex-col items-center gap-1.5 text-center"
          style={s.style}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper shadow-frame">
            <s.icon aria-hidden className="h-4 w-4 text-signal" />
          </span>
          <span className="text-[0.68rem] font-medium leading-tight text-ink-soft">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
