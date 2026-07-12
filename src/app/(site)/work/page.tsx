import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { consoleProjects } from "@/content/projects";
import { stats } from "@/content/site";
import { getPortfolioProjectById } from "@/data/portfolioProjects";
import StatusDot from "@/components/console/StatusDot";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: `${stats.live} systems live in production across ${stats.regions} regions, ${stats.building} in build. Production AI, multi-tenant SaaS, mobile, ERP, and healthcare systems.`,
  openGraph: {
    title: "Work — CodeGang",
    description: `${stats.live} systems live in production across ${stats.regions} regions.`,
    url: "/work",
  },
  alternates: { canonical: "/work" },
};

// Every sentence below is sourced from the systems themselves —
// src/data/portfolioProjects.ts and content/projects.ts. No invented numbers.
const caseCopy: Record<string, { art: string; story: string; tint: string }> = {
  "verse-ai": {
    art: "/illustrations/verse.png",
    story:
      "A Brazilian enterprise needed a private ChatGPT over its own documents. We built a multi-tenant RAG platform on a 7-layer AWS stack — Qdrant vector search, Bedrock and OpenAI behind one gateway, cryptographic tenant isolation — live at moovehubia.com.br.",
    tint: "from-blue-700 to-indigo-900",
  },
  emedici: {
    art: "/illustrations/emedici.png",
    story:
      "Australia's leading medical-education Android app, built for EMEDICI2 PTY LTD in Adelaide. 10,000+ downloads and a 4.9★ Play Store average, serving med students, junior doctors, and registrars across the country.",
    tint: "from-teal-600 to-blue-900",
  },
  "arm-tech": {
    art: "/illustrations/arm.png",
    story:
      "A three-module ERP — CementBook, TruckBook, FinanceBook — for a cement, fleet and cold-materials trader, with five deep-learning modules on one pipeline: LSTM demand forecasting, anomaly detection, trip profitability, invoice OCR, and dealer risk scoring.",
    tint: "from-indigo-700 to-slate-900",
  },
  "ai-resume": {
    art: "/illustrations/resume.png",
    story:
      "US early-stage SaaS: paste a job description, get an ATS-optimized resume back in under 60 seconds. Next.js and FastAPI on AWS, fully dockerized CI/CD on GitHub Actions — live at nailhiring.com.",
    tint: "from-violet-700 to-indigo-950",
  },
  nestflow: {
    art: "/illustrations/nestflow.png",
    story:
      "Property management for European landlords — properties, tenants, leases and rent in one place. Separate landlord and tenant portals on containerized microservices; one compose file brings the whole stack up. In build, live demo running.",
    tint: "from-emerald-700 to-slate-900",
  },
  "pinnacle-hms": {
    art: "/illustrations/pinnacle.png",
    story:
      "The operating system for a working hospital. Six role-based portals — reception, doctor, nurse, OT, accounts, admin — over a modular 39-table domain model with 57 relationships, live at Pinnacle General Hospital, India.",
    tint: "from-cyan-700 to-blue-950",
  },
};

const expertise = [
  {
    title: "AI & GenAI engineering",
    body: "Private RAG platforms, multi-LLM gateways, embedding pipelines, tenant-isolated knowledge bases.",
    proof: "verse-ai",
  },
  {
    title: "SaaS product development",
    body: "Multi-tenant architecture, backend, frontend, and the deployment pipeline that keeps it shippable.",
    proof: "verse-ai",
  },
  {
    title: "Mobile app development",
    body: "Flutter and native Android with offline-first sync and store-ready release engineering.",
    proof: "emedici",
  },
  {
    title: "Applied machine learning",
    body: "Forecasting, anomaly detection, OCR, and risk scoring deployed inside business software.",
    proof: "arm-tech",
  },
  {
    title: "Enterprise systems",
    body: "ERPs, hospital management, and role-based platforms with the domain modelling they depend on.",
    proof: "pinnacle-hms",
  },
  {
    title: "Cloud & DevOps",
    body: "AWS architecture, Docker, CI/CD — infrastructure that survives the system's own success.",
    proof: "ai-resume",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* ── Powder hero — MathCo services style ──────────────── */}
      <section className="flex min-h-[68vh] items-center justify-center bg-blue-100/60 px-6 pt-16">
        <div className="mx-auto max-w-4xl py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Case studies
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.04] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Our experience,
            <br />
            live and checkable
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            {stats.live} systems live in production across {stats.regions}{" "}
            regions, {stats.building} in build. The status next to each one is
            computed, not claimed.
          </p>
          <a
            href="#experience"
            aria-label="Scroll to case studies"
            className="mx-auto mt-12 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-white shadow-md"
          >
            <ArrowDown aria-hidden className="h-5 w-5 text-blue-700" />
          </a>
        </div>
      </section>

      {/* ── Expertise — statement + split with expanders ─────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Our expertise
          </p>
          <p className="mt-4 font-display text-xl font-medium leading-relaxed tracking-tight text-slate-800 sm:text-2xl">
            Everything we sell is something we have already shipped. Each
            capability below links to the production system that proves it —
            with its stack, its screens, and its live status.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Visual panel — real product, framed */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 p-6 sm:p-10">
            <figure className="overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/projects/verse-ai-login.webp"
                alt="Verse AI tenant portal — live login screen"
                width={1280}
                height={800}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="w-full"
              />
            </figure>
            <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-wider text-blue-200">
              Verse AI — live in production, Brazil
            </figcaption>
          </div>

          {/* Expandable capability list */}
          <div>
            {expertise.map((e, i) => (
              <details
                key={e.title}
                className="group border-b border-slate-300 py-5 first:border-t"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-xl font-semibold tracking-tight text-slate-900 [&::-webkit-details-marker]:hidden">
                  {e.title}
                  <span aria-hidden className="text-xl text-slate-400 group-open:hidden">
                    +
                  </span>
                  <span aria-hidden className="hidden text-xl text-slate-400 group-open:inline">
                    −
                  </span>
                </summary>
                <div className="pt-3">
                  <p className="max-w-xl text-sm leading-relaxed text-slate-600">
                    {e.body}
                  </p>
                  <Link
                    href={`/work/${e.proof}#top`}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    See the system that proves it
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statement band ───────────────────────────────────── */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Proof over promises
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Every claim on this page has a live system behind it
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
          >
            Talk to an engineer
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Case cards — MathCo "Our Experience" style ───────── */}
      <section id="experience" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            The systems
          </h2>
          <Link
            href="/contact"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Start a project
          </Link>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {consoleProjects.map((p, i) => {
            const deep = getPortfolioProjectById(p.slug);
            const copy = caseCopy[p.slug];
            if (!deep || !copy) return null;
            return (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <Link href={`/work/${p.slug}`} className="group block">
                  {/* Image panel with vertical sector spine */}
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${copy.tint} pl-10`}
                  >
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 top-0 flex w-10 items-center justify-center border-r border-white/15 bg-white/10"
                    >
                      <span
                        className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/80"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {p.sector}
                      </span>
                    </span>
                    <div className="relative flex aspect-[16/11] items-center justify-center overflow-hidden p-8">
                      <Image
                        src={copy.art}
                        alt={`${p.name} — illustration`}
                        width={700}
                        height={550}
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                        className="max-h-full w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <StatusDot status={p.status} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {p.status === "live" ? "Live in production" : "In build"}{" "}
                      · {p.region}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {copy.story}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Read the case study
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
