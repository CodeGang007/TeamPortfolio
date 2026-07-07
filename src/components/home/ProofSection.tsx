import Reveal from "@/components/ui/Reveal";

// Real, checkable numbers only — no aspirational stats.
const STATS = [
  { value: "6", label: "Products live in production" },
  { value: "5", label: "Countries shipped to" },
  { value: "10K+", label: "End users on shipped products" },
  { value: "4.9★", label: "Average Play Store rating" },
];

const DIFFERENTIATORS = [
  {
    title: "You talk to the people building it.",
    description:
      "No layers between brief and build — the engineer in the meeting is the one writing the code.",
  },
  {
    title: "Production-grade by default.",
    description:
      "Multi-tenant, observable, queue-decoupled systems on day one — not after the rewrite.",
  },
  {
    title: "AI without the hand-waving.",
    description:
      "Concrete RAG, forecasting, and OCR pipelines running today for live enterprise users.",
  },
  {
    title: "Comfortable across geographies.",
    description:
      "Active engagements across Brazilian, Australian, Indian, European, and US time zones.",
  },
];

export default function ProofSection() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-green mb-4">
            Why work with us
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white">
            Small team. Senior hands.
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="card-shine p-7 rounded-2xl border border-white/[0.07] bg-zinc-900/40 text-center transition-colors duration-300 hover:border-brand-green/25"
              >
                <div className="font-display text-4xl md:text-6xl font-medium text-gradient-emerald mb-2">
                  {value}
                </div>
                <div className="text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {DIFFERENTIATORS.map(({ title, description }, i) => (
            <Reveal key={title} delay={(i % 2) * 70}>
              <div className="flex gap-4">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
