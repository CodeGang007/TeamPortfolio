import {
  Code2,
  Smartphone,
  Cloud,
  BrainCircuit,
  Boxes,
  Workflow,
  Star,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const cardBase =
  "card-shine group relative h-full flex flex-col rounded-2xl border border-white/[0.07] bg-zinc-900/40 p-7 transition-all duration-300 hover:border-brand-green/30 hover:-translate-y-0.5 overflow-hidden";

function TechTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-auto pt-5">
      {tags.map((t) => (
        <span
          key={t}
          className="text-[11px] text-zinc-500 border border-white/[0.07] rounded-full px-2.5 py-1"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function CellHeader({
  icon: Icon,
  proof,
}: {
  icon: React.ElementType;
  proof?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="w-11 h-11 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center transition-colors group-hover:bg-brand-green/15">
        <Icon className="w-5 h-5" />
      </div>
      {proof && (
        <span className="text-[11px] font-medium text-brand-green/80 bg-brand-green/10 rounded-full px-2.5 py-1">
          {proof}
        </span>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-green mb-4">
            What we build
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
            Systems that move the business.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
            Six practice areas, one standard: it ships to production and stays
            there.
          </p>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* Featured — Applied AI (wide, with code decoration) */}
          <Reveal className="md:col-span-4">
            <div className={cardBase}>
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 80% 0%, rgba(16,185,129,0.08), transparent 65%)",
                }}
              />
              <div className="relative grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-8 h-full">
                <div className="flex flex-col">
                  <CellHeader icon={BrainCircuit} proof="Running for live users" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Applied AI &amp; ML
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    RAG pipelines, multi-LLM gateways (Anthropic, OpenAI,
                    Bedrock), demand forecasting, anomaly detection, and
                    invoice OCR — shipped to enterprise users, not demoed.
                  </p>
                  <TechTags tags={["OpenAI", "Bedrock", "PyTorch", "Qdrant"]} />
                </div>

                {/* decorative pipeline snippet */}
                <div className="hidden sm:block card-shine self-center rounded-xl border border-white/[0.07] bg-zinc-950/80 p-4 font-mono text-[11px] leading-6 text-zinc-500">
                  <p><span className="text-brand-green">const</span> answer = <span className="text-zinc-300">await</span> rag.query({"{"}</p>
                  <p className="pl-4">tenant: <span className="text-brand-green">&quot;acme&quot;</span>,</p>
                  <p className="pl-4">docs: vectorStore,</p>
                  <p className="pl-4">llm: gateway.route(<span className="text-brand-green">&quot;auto&quot;</span>),</p>
                  <p>{"}"});</p>
                  <p className="text-zinc-600">// grounded answer in seconds</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile — big rating stat */}
          <Reveal className="md:col-span-2" delay={70}>
            <div className={cardBase}>
              <CellHeader icon={Smartphone} />
              <h3 className="text-xl font-semibold text-white mb-2">Mobile Apps</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Native-quality Android &amp; cross-platform — incl. Australia&apos;s
                leading medical-education app.
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-medium text-gradient-emerald">10K+</span>
                <span className="inline-flex items-center gap-1 text-sm text-zinc-300">
                  installs · 4.9 <Star className="w-3.5 h-3.5 text-brand-green fill-brand-green" />
                </span>
              </div>
              <TechTags tags={["Android", "Flutter"]} />
            </div>
          </Reveal>

          {/* Web Platforms */}
          <Reveal className="md:col-span-2" delay={0}>
            <div className={cardBase}>
              <CellHeader icon={Code2} proof="Live in production" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Web Platforms &amp; APIs
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Next.js, NestJS &amp; FastAPI — modular monoliths and
                multi-tenant SaaS that hold up under load.
              </p>
              <TechTags tags={["Next.js", "NestJS", "FastAPI"]} />
            </div>
          </Reveal>

          {/* Cloud & DevOps */}
          <Reveal className="md:col-span-2" delay={70}>
            <div className={cardBase}>
              <CellHeader icon={Cloud} proof="7-layer AWS stacks" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Cloud &amp; DevOps
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                ECS Fargate, CloudFront, SQS, RDS Multi-AZ, Cognito. Dockerized,
                CI/CD on GitHub Actions.
              </p>
              <TechTags tags={["AWS", "Docker", "GitHub Actions"]} />
            </div>
          </Reveal>

          {/* ERP */}
          <Reveal className="md:col-span-2" delay={140}>
            <div className={cardBase}>
              <CellHeader icon={Boxes} proof="Multi-module, live" />
              <h3 className="text-xl font-semibold text-white mb-2">
                ERP &amp; Business Systems
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Real-time P&amp;L dashboards, Excel export, and deep-learning
                decision modules built in.
              </p>
              <TechTags tags={["PostgreSQL", "Supabase", "Redis"]} />
            </div>
          </Reveal>

          {/* Data Pipelines — full width strip */}
          <Reveal className="md:col-span-6" delay={0}>
            <div className={`${cardBase} md:flex-row md:items-center md:gap-10`}>
              <div className="flex items-center gap-5 md:w-1/3">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Data Pipelines</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed md:flex-1 mt-3 md:mt-0">
                Nightly Airflow ETL, vector embedding queues, feature stores,
                and FastAPI inference layers — wired directly into product
                dashboards.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0">
                {["Airflow", "Qdrant", "Redis", "FastAPI"].map((t) => (
                  <span key={t} className="text-[11px] text-zinc-500 border border-white/[0.07] rounded-full px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
