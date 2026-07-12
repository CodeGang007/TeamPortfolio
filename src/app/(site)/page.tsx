import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BrainCircuit,
  Layers,
  Smartphone,
  LineChart,
  Building2,
  Cloud,
} from "lucide-react";
import { consoleProjects } from "@/content/projects";
import { clients, site, stats } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { getPortfolioProjectById } from "@/data/portfolioProjects";
import GlobeWordmark from "@/components/console/GlobeWordmark";
import ProcessFlow from "@/components/console/ProcessFlow";
import Marquee from "@/components/console/Marquee";
import StatusDot from "@/components/console/StatusDot";
import JsonLd from "@/components/console/JsonLd";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/console/CountUp";

export const metadata: Metadata = {
  title: {
    absolute: site.title,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
  },
};

// Every answer here must stay verifiable from content/ or describe process,
// not promises. No rates, no invented guarantees.
const faq = [
  {
    q: "Who actually writes the code?",
    a: "The five engineers on the team page. There is no sales layer and no hand-off — the engineer in the meeting is the one writing the code.",
  },
  {
    q: "What do you build?",
    a: "Production AI systems (RAG, multi-LLM gateways), multi-tenant SaaS platforms, mobile apps, ERP suites with applied deep learning, and healthcare systems. Every one of those categories maps to a system we have shipped — see the case studies.",
  },
  {
    q: "How does an engagement run?",
    a: "We scope the system with you, agree on what shipping means, build it, deploy it, and stay on for maintenance and roadmap. Most of our live systems are still under active maintenance by us.",
  },
  {
    q: "Do you work across time zones?",
    a: `Yes. Our clients are in ${stats.regions} regions — Brazil, Australia, India, the USA, and Europe — and every system stays supported in its own timezone.`,
  },
  {
    q: "Can you work under NDA?",
    a: "Yes, and most of our client work is under one. That is why this site shows regions, statuses, and stacks rather than client internals.",
  },
];

const services = [
  {
    icon: BrainCircuit,
    title: "AI & GenAI engineering",
    body: "Private RAG platforms, multi-LLM gateways (Anthropic, OpenAI, Bedrock), embedding pipelines, and tenant-isolated knowledge bases your team can actually deploy.",
    proof: "verse-ai",
    proofLabel: "Verse AI — live in Brazil",
  },
  {
    icon: Layers,
    title: "SaaS product development",
    body: "Multi-tenant platforms end to end — architecture, backend, frontend, and the deployment pipeline that keeps them shippable week after week.",
    proof: "verse-ai",
    proofLabel: "Verse AI — 7-layer AWS stack",
  },
  {
    icon: Smartphone,
    title: "Mobile app development",
    body: "Flutter and native Android apps built for real audiences, with offline-first sync and store-ready release engineering.",
    proof: "emedici",
    proofLabel: `eMedici — ${stats.emediciInstalls} installs, ${stats.emediciRating}★`,
  },
  {
    icon: LineChart,
    title: "Applied machine learning",
    body: "Demand forecasting, anomaly detection, OCR, and risk scoring — deep-learning modules deployed inside business software, not notebooks.",
    proof: "arm-tech",
    proofLabel: "ARM Tech — 5 DL modules in an ERP",
  },
  {
    icon: Building2,
    title: "Enterprise systems",
    body: "ERPs, hospital management, role-based platforms with audit trails, wallets, and the domain modelling they depend on.",
    proof: "pinnacle-hms",
    proofLabel: "Pinnacle HMS — a working hospital runs on it",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    body: "AWS architecture, Docker, CI/CD with GitHub Actions — infrastructure designed so the system survives its own success.",
    proof: "ai-resume",
    proofLabel: "AI Resume — dockerized CI/CD on AWS",
  },
];

const industries = [
  {
    name: "Healthcare",
    body: "eMedici trains medical students across Australia; Pinnacle HMS runs a working hospital in India — six role-based portals over 39 tables and 57 relationships.",
    systems: "eMedici · Pinnacle HMS",
  },
  {
    name: "Enterprise SaaS",
    body: "Verse AI gives enterprises a private ChatGPT over their own documents, with cryptographic tenant isolation on a 7-layer AWS stack.",
    systems: "Verse AI",
  },
  {
    name: "Trade & Logistics",
    body: "ARM Tech runs purchasing, fleet, and finance for a cement trader — with five deep-learning modules feeding decisions daily.",
    systems: "ARM Tech ERP",
  },
  {
    name: "PropTech",
    body: "NestFlow gives landlords properties, tenants, leases, and rent in one place, on containerized microservices.",
    systems: "NestFlow",
  },
  {
    name: "HR & Recruiting",
    body: "AI Resume Builder turns a pasted job description into an ATS-optimized resume in under a minute, live at nailhiring.com.",
    systems: "AI Resume Builder",
  },
];

const marqueeItems = [
  "Production AI",
  "RAG platforms",
  "Multi-tenant SaaS",
  "Flutter & Android",
  "ERP + deep learning",
  "Healthcare systems",
  "AWS architecture",
  "Next.js",
  "CI/CD",
];

const stackChips = [
  "Anthropic", "OpenAI", "AWS Bedrock", "SageMaker", "Qdrant", "TensorFlow",
  "NestJS", "FastAPI", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase",
  "Next.js", "React", "TypeScript", "Flutter", "Android",
  "AWS", "ECS Fargate", "CloudFront", "Docker", "GitHub Actions", "Airflow", "Vercel",
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* ── Hero — dark, with the globe→wordmark particle morph ── */}
      <section className="relative overflow-hidden bg-[#0C1017]">
        <div
          aria-hidden
          className="glow-blue pointer-events-none absolute inset-0"
        />
        {/* Slow-morphing blobs — compositor-cheap ambience */}
        <div
          aria-hidden
          className="blob left-[-8%] top-[-12%] h-[420px] w-[420px] bg-blue-600/40"
        />
        <div
          aria-hidden
          className="blob right-[-6%] top-[30%] h-[360px] w-[360px] bg-indigo-500/30"
          style={{ animationDelay: "-9s" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-32 md:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot"
              />
              {stats.live} systems live in production right now
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
              AI engineering partner for scalable SaaS &amp; enterprise
              platforms
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              We design, ship, and run production systems — private RAG
              platforms, multi-tenant SaaS, mobile apps, and ERP with applied
              deep learning — across {stats.regions} regions.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-blue-50"
              >
                See case studies
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
              >
                Talk to an engineer
              </Link>
            </div>
          </div>

          {/* The morph: particles on a rotating globe fly into CODEGANG.
              Transparent canvas — the section glow shows through. */}
          <div className="relative mx-auto max-w-6xl">
            <GlobeWordmark className="h-auto w-full" />
          </div>

          {/* Honest numbers, labelled sources */}
          <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 py-10 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { v: stats.projectsDelivered, l: "projects delivered" },
              { v: stats.clientsServed, l: "clients · most under NDA" },
              { v: String(stats.live), l: "systems live now" },
              { v: String(stats.regions), l: "regions served" },
              { v: stats.emediciInstalls, l: "installs · eMedici" },
              { v: `${stats.emediciRating}★`, l: "Play Store · eMedici" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <dt className="sr-only">{s.l}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight text-white">
                  <CountUp value={s.v} />
                </dd>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                  {s.l}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Client banner — real organisations, real systems ─── */}
      <section className="border-b border-white/10 bg-[#0C1017] pb-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Running in production for
        </p>
        <Marquee className="mt-7" duration="45s">
          {clients.map((c) => (
            <Link
              key={c.name}
              href={`/work/${c.slug}`}
              className="group mr-16 flex shrink-0 items-baseline gap-3 opacity-80 transition-opacity hover:opacity-100"
            >
              <span className="font-display text-2xl font-semibold tracking-tight text-white">
                {c.name}
              </span>
              <span className="hidden font-mono text-xs uppercase tracking-wider text-slate-400 sm:inline">
                {c.detail}
              </span>
            </Link>
          ))}
        </Marquee>
      </section>

      {/* ── Marquee band ─────────────────────────────────────── */}
      <div className="relative z-10 -my-5 -rotate-1">
        <Marquee className="bg-blue-600 py-3.5 shadow-lg" duration="36s">
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="flex items-center gap-6 pr-6 font-mono text-sm font-medium uppercase tracking-wider text-white"
            >
              {item}
              <span aria-hidden className="text-blue-300">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="dot-grid mx-auto max-w-7xl px-6 pb-16 pt-24 lg:pb-24 lg:pt-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Services
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What we build
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every service maps to a system we have already shipped — and can
            show you.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
            <Link
              href={`/work/${s.proof}`}
              className="group block h-full rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/[0.06] hover:ring-slate-200"
            >
              <span className="inline-flex rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 p-3 text-white shadow-md shadow-blue-600/20">
                <s.icon aria-hidden className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {s.body}
              </p>
              <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                {s.proofLabel}
                <ArrowRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </p>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Industries — MathCo-style powder color block ─────── */}
      <section id="industries" className="scroll-mt-20 bg-blue-100/60">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Industries
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Where our systems run
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-4xl">
            {industries.map((ind, i) => (
              <details
                key={ind.name}
                className="group border-b border-slate-900/15 py-6 last:border-b-0"
                open={i === 0}
              >
                <summary className="grid cursor-pointer list-none grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-xl font-semibold text-slate-400/70 transition-colors group-open:text-blue-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {ind.name}
                  </h3>
                  <span
                    aria-hidden
                    className="text-xl text-slate-400 group-open:hidden"
                  >
                    +
                  </span>
                  <span
                    aria-hidden
                    className="hidden text-xl text-slate-400 group-open:inline"
                  >
                    −
                  </span>
                </summary>
                <div className="grid grid-cols-[3.5rem_1fr] gap-4">
                  <span aria-hidden />
                  <div className="pt-3">
                    <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                      {ind.body}
                    </p>
                    <p className="mt-3 font-mono text-xs uppercase tracking-wider text-slate-400">
                      {ind.systems}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* The flow — how each problem becomes a scalable system */}
          <div className="mx-auto mt-20 max-w-5xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                The flow
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                How we decode a problem and make it scale
              </h3>
              <p className="mt-3 text-slate-600">
                Same six stages in every industry — each one proven by a
                system that is live right now.
              </p>
            </Reveal>
            <div className="mt-10">
              <ProcessFlow />
            </div>
          </div>
        </div>
      </section>

      {/* ── Case studies — dark stacked panel ────────────────── */}
      <section className="bg-[#0C1017] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Case studies
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Proven systems, live status attached
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              View all {consoleProjects.length}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          {/* Sticky-stacked cards — each one parks a little lower */}
          <div className="mt-12 space-y-8">
            {consoleProjects.map((p, i) => {
              const deep = getPortfolioProjectById(p.slug);
              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group sticky block overflow-hidden rounded-3xl border border-white/10 bg-[#151A22] shadow-2xl"
                  style={{ top: `${96 + i * 20}px` }}
                >
                  <div className="grid gap-0 md:grid-cols-2">
                    {deep && (
                      <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                        <Image
                          src={deep.image}
                          alt={`${p.name} — product screenshot`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-r from-transparent to-[#151A22]/40"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center p-8 lg:p-10">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-slate-300">
                          / {p.sector} /
                        </span>
                        <span className="flex items-center gap-1.5">
                          <StatusDot status={p.status} />
                          <span className="text-xs font-medium text-slate-400">
                            {p.status === "live"
                              ? "Live in production"
                              : "In build"}
                          </span>
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">
                        {p.name}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                        {p.summary}
                      </p>
                      <p className="mt-4 font-mono text-xs text-slate-500">
                        {p.region} · {p.city} · {p.stack.join(" · ")}
                      </p>
                      <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:border-white/60">
                        View case study
                        <ArrowRight
                          aria-hidden
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Evidence panel — all systems + giant honest stat ─── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-sm lg:grid-cols-2">
          <div className="bg-[#0C1017] p-8 lg:p-12">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              All systems, reporting
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              The status column is computed, not claimed.
            </p>
            <ul className="mt-8 space-y-4">
              {consoleProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 transition-colors hover:border-white/25"
                  >
                    <span className="flex items-center gap-3">
                      <StatusDot status={p.status} />
                      <span className="text-sm font-medium text-white">
                        {p.name}
                      </span>
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                      {p.region} ·{" "}
                      {p.status === "live" ? "LIVE" : "IN BUILD"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 p-10 text-center lg:p-12">
            <p className="stat-outline font-display text-7xl font-bold tracking-tight sm:text-8xl">
              <CountUp value={stats.emediciInstalls} duration={1800} />
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-blue-200">
              installs · eMedici · Google Play
            </p>
            <p className="mt-10 font-display text-5xl font-semibold text-white">
              <CountUp value={`${stats.emediciRating}★`} duration={1800} />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-blue-200">
              Play Store rating · eMedici
            </p>
          </div>
        </div>
      </section>

      {/* ── KPI receipts — every number names its system ─────── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "7-layer", l: "AWS architecture", src: "Verse AI" },
            { v: "39 · 57", l: "tables · relationships", src: "Pinnacle HMS" },
            { v: "5", l: "deep-learning modules", src: "ARM Tech ERP" },
            { v: "6", l: "role-based portals", src: "Pinnacle HMS" },
          ].map((k, i) => (
            <Reveal key={`${k.v}-${k.l}`} delay={i * 70}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <p className="font-display text-3xl font-semibold tracking-tight text-slate-900">
                <CountUp value={k.v} />
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">{k.l}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-blue-600">
                {k.src}
              </p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Client feedback — a real client, on camera ────────── */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Client feedback
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Hear it from a client, on camera
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              A client review of the multi-tenant WhatsApp audit platform we
              built for them — unedited, straight from our channel. Most of
              our work is under NDA; when a client is willing to say it on
              camera, we let them do the talking.
            </p>
            <a
              href="https://www.youtube.com/@CodeGang007"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              More on our YouTube channel
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
          <div className="mx-auto w-full max-w-[300px]">
            <div className="overflow-hidden rounded-[2rem] border-8 border-slate-900 bg-slate-900 shadow-2xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/cvpkOsyEPR4"
                title="Client review — Multi-Tenant WhatsApp Audit Platform"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="aspect-[9/16] w-full"
              />
            </div>
            <p className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-slate-400">
              Client review · WhatsApp audit platform
            </p>
          </div>
        </div>
      </section>

      {/* ── Client feedback — renders only when real quotes exist ── */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Client feedback
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What the people running our systems say
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={`${t.org}-${t.author}`}
                className="flex flex-col rounded-3xl bg-[#0C1017] p-8"
              >
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-blue-500"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {t.role}, {t.org}
                  </p>
                  <Link
                    href={`/work/${t.slug}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    See the system
                    <ArrowRight aria-hidden className="h-3 w-3" />
                  </Link>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── Tech stack marquee ───────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Technology
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            The stack behind the systems
          </h2>
          <p className="mt-3 text-slate-600">
            Pulled from what is actually running in production — not a logo
            wall.
          </p>
        </Reveal>
        <div className="mt-10 space-y-4">
          <Marquee duration="55s">
            {stackChips.slice(0, 13).map((t) => (
              <span
                key={t}
                className="mr-4 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-mono text-sm text-slate-700 shadow-sm"
              >
                {t}
              </span>
            ))}
          </Marquee>
          <Marquee duration="55s" reverse>
            {stackChips.slice(13).map((t) => (
              <span
                key={t}
                className="mr-4 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-mono text-sm text-slate-700 shadow-sm"
              >
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-16 lg:py-24">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-blue-600">
          FAQ
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Common questions
        </h2>
        <div className="mt-10">
          {faq.map((f) => (
            <details
              key={f.q}
              className="group border-t border-slate-200 py-5 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-slate-400 group-open:hidden">
                  +
                </span>
                <span
                  aria-hidden
                  className="hidden text-slate-400 group-open:inline"
                >
                  −
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA — dark rounded panel ───────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0C1017] px-8 py-16 text-center lg:px-16 lg:py-20">
          <div aria-hidden className="glow-blue pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="blob left-[10%] top-[-30%] h-[300px] w-[300px] bg-blue-600/40"
          />
          <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Have a system that needs to exist?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Tell us what you are trying to ship. Your message lands in the
            founders&apos; Telegram the moment you send it.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-50"
            >
              Start a project
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
