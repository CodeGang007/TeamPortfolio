import Reveal from "@/components/ui/Reveal";

// "How we run a project" — real engagement model, zero JS animation.
const STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We sit with your team, walk the workflows, and write a one-page brief everyone agrees on before any code is written.",
    tags: ["Workflow mapping", "One-page brief", "Success criteria"],
  },
  {
    number: "02",
    title: "Architect",
    description:
      "We diagram the system end-to-end — every box, queue, and database — and pick a stack you can actually maintain.",
    tags: ["System diagrams", "Stack selection", "Cost model"],
  },
  {
    number: "03",
    title: "Ship in slices",
    description:
      "Two-week increments to staging. Real users touch the product early, so surprises stop being expensive.",
    tags: ["2-week increments", "Staging early", "User feedback"],
  },
  {
    number: "04",
    title: "Operate",
    description:
      "Observability, alerts, and a clear hand-off doc. We stay on retainer for as long as the product is moving fast.",
    tags: ["Monitoring", "Hand-off docs", "Retainer support"],
  },
];

export default function Process() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-green mb-4">
            How we work
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
            From brief to production, in slices.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
            The same four steps on every engagement — so you always know where
            the project stands.
          </p>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* connector line across the steps (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[46px] left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"
          />
          {STEPS.map(({ number, title, description, tags }, i) => (
            <Reveal key={number} delay={i * 70}>
              <div className="card-shine relative h-full flex flex-col p-7 rounded-2xl border border-white/[0.07] bg-zinc-900/40 transition-colors duration-300 hover:border-brand-green/25">
                <span className="relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full border border-brand-green/30 bg-zinc-950 font-display text-brand-green text-xs font-medium mb-6">
                  {number}
                </span>
                <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-grow mb-6">
                  {description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-zinc-500 border border-white/[0.06] rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
