import type { Metadata } from "next";
import Link from "next/link";
import { consoleProjects } from "@/content/projects";
import { PORTFOLIO_PROJECTS } from "@/data/portfolioProjects";
import { stats, marketsShort, marketsLong } from "@/content/site";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import {
  Gallery,
  OutcomeCard,
  Plate,
  SectionNav,
  TrustRow,
  VisualLead,
} from "@/components/site/blocks";
import {
  Body,
  Display,
  Eyebrow,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Work",
  description: `${stats.live} systems live in production across ${marketsLong}, ${stats.building} in build. Production AI, multi-tenant SaaS, mobile, ERP, and healthcare systems.`,
  openGraph: {
    title: "Work · CodeGang",
    description: `${stats.live} systems live in production across ${marketsLong}.`,
    url: "/work",
  },
  alternates: { canonical: "/work" },
};

const sections = [
  { id: "systems", label: "The systems" },
  { id: "expertise", label: "Expertise" },
  { id: "process", label: "How it runs" },
  { id: "inside", label: "Inside the work" },
] as const;

// Trust row. `pending` entries render as an explicit blank rather than a
// number we cannot source. Every value below is computed from projects.ts.
const trust = [
  {
    value: stats.projectsDelivered,
    label: "Projects delivered",
    sub: "most under NDA",
  },
  {
    value: stats.clientsServed,
    label: "Clients served",
    sub: marketsShort,
  },
  { value: String(stats.live), label: "Systems live", sub: "in production now" },
  { value: "0", label: "Account managers", sub: "you talk to the engineer" },
] as const;

/**
 * Outcome-led case cards. Each `outcome` and `metric` is sourced from the
 * case study it links to — never a claim we cannot substantiate there.
 */
const cases = [
  {
    slug: "verse-ai",
    sector: "Enterprise SaaS",
    client: "MooveHub · Brazil",
    outcome: "A private assistant over the company's own documents",
    metric: "7-layer AWS stack · tenant-isolated retrieval",
    src: "/projects/verse-ai-login.webp",
  },
  {
    slug: "emedici",
    sector: "Healthcare · Mobile",
    client: "EMEDICI2 PTY LTD · Australia",
    outcome: "Australia's medical students study for exams on it",
    metric: `${stats.emediciInstalls} installs · ${stats.emediciRating}★ Play Store`,
    src: "/projects/emedici-question-bank.webp",
  },
  {
    slug: "pinnacle-hms",
    sector: "Healthcare",
    client: "Pinnacle General Hospital · India",
    outcome: "A working hospital runs its entire day on it",
    metric: "6 role-based portals · 39 tables · 57 relationships",
    src: "/projects/pinnacle-portals.webp",
  },
  {
    slug: "arm-tech",
    sector: "Trade & Logistics",
    client: "ARM Tech · India",
    outcome: "Forecasts the buyer acts on, inside the ERP itself",
    metric: "5 deep-learning modules on one pipeline",
    src: "/projects/armtech-dashboard.webp",
  },
  {
    slug: "ai-resume",
    sector: "HR SaaS",
    client: "NailHiring · USA",
    outcome: "An ATS-ready resume in under a minute",
    metric: "live at nailhiring.com",
    src: "/projects/resume-ai-ats-score.webp",
  },
  {
    slug: "nestflow",
    sector: "PropTech",
    client: "NestFlow · Europe",
    outcome: "Properties, tenants, leases and rent in one place",
    metric: "containerized microservices · in build",
    src: "/projects/nestflow-properties.webp",
  },
] as const;

const expertise = [
  { title: "AI & GenAI engineering", body: "Private RAG platforms, multi-LLM gateways, embedding pipelines, tenant-isolated knowledge bases.", proof: "verse-ai" },
  { title: "SaaS product development", body: "Multi-tenant architecture, backend, frontend, and the deployment pipeline that keeps it shippable.", proof: "verse-ai" },
  { title: "Mobile app development", body: "Flutter and native Android with offline-first sync and store-ready release engineering.", proof: "emedici" },
  { title: "Applied machine learning", body: "Forecasting, anomaly detection, OCR, and risk scoring deployed inside business software.", proof: "arm-tech" },
  { title: "Enterprise systems", body: "ERPs, hospital management, and role-based platforms with the domain modelling they depend on.", proof: "pinnacle-hms" },
  { title: "Cloud & DevOps", body: "AWS architecture, Docker, CI/CD: infrastructure that survives the system's own success.", proof: "ai-resume" },
];

const phases = [
  { n: "I", title: "Scope", body: "We agree what the system does and what shipping means, in writing." },
  { n: "II", title: "Build", body: "Short cycles in your repository, running before it is finished." },
  { n: "III", title: "Ship", body: "Deployed into your cloud account, reachable by a real user." },
  { n: "IV", title: "Stay", body: "Maintenance and roadmap by the same engineers who built it." },
];

/**
 * Real production screens, taken from each project's own gallery in
 * data/portfolioProjects.ts with the caption it already carries there. One per
 * system so the strip reads as a survey rather than a deep dive.
 */
const insideShots = PORTFOLIO_PROJECTS.slice(0, 4).map((p) => ({
  label: p.gallery[0]?.caption ?? `${p.title}: screen`,
  src: p.gallery[0]?.src,
  fit: "contain" as const,
  href: `/work/${p.id}`,
}));

export default function WorkPage() {
  return (
    <>
      {/* ══ Page head ═══════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow="Case studies"
            plate={
              <Plate
                label="Studio: working the architecture"
                src="/about/studio-at-work.jpg"
                alt="Three of the studio walking through a system's architecture at the whiteboard"
                ratio="4/3"
                className="shadow-frame"
              />
            }
          >
            <Display as="h1" size="xl" lead="Our experience," trail="live and checkable" />
            <Body className="mt-6 max-w-xl text-base">
              {stats.live} systems live in production across {marketsLong}, {stats.building} in build. The status next to each one is
              computed from this site&apos;s own data, not claimed.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="#systems">
                See the systems <Nudge />
              </Pill>
              <Pill href="/contact" variant="light">
                Start a project
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ The systems ═════════════════════════════════════════════ */}
      <Section tone="bone" id="systems" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="The systems"
            lead={`${stats.live} systems live,`}
            trail="six of them, and what each changed"
            body="Every card leads with the outcome. Each links to the case study that backs it."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const p = consoleProjects.find((x) => x.slug === c.slug);
            return (
              <Item key={c.slug} className="h-full">
                <OutcomeCard
                  sector={c.sector}
                  client={c.client}
                  outcome={c.outcome}
                  metric={c.metric}
                  href={`/work/${c.slug}`}
                  src={c.src}
                  status={p?.status === "building" ? "building" : "live"}
                />
              </Item>
            );
          })}
        </Stagger>
      </Section>

      {/* ══ Expertise ═══════════════════════════════════════════════ */}
      <Section tone="alt" id="expertise" className="blueprint scroll-mt-32">
        <FadeUp>
          <VisualLead
            eyebrow="Our expertise"
            reverse
            plate={<Plate
              label="Architecture: whiteboard"
              src="/our-values/whiteboard-pinnacle-schema.jpg"
              alt="The Pinnacle HMS schema, worked out on a whiteboard before any code"
              ratio="1/1"
              className="shadow-frame"
            />}
          >
            <Display
              lead="Everything we sell"
              trail="is something we have already shipped"
              size="md"
            />
            <Body className="mt-5 max-w-lg">
              Each capability links to the production system that proves it:               with its stack, its screens, and its live status.
            </Body>
          </VisualLead>
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            {expertise.map((e, i) => (
              <details
                key={e.title}
                className={`group px-6 py-5 ${i > 0 ? "border-t border-line" : ""}`}
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[1.05rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {e.title}
                  <span
                    aria-hidden
                    className="shrink-0 text-lg text-mute transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pt-3">
                  <p className="max-w-xl text-[0.9rem] leading-relaxed text-ink-soft">
                    {e.body}
                  </p>
                  <Link
                    href={`/work/${e.proof}#top`}
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-signal hover:underline"
                  >
                    See the system that proves it →
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* ══ How it runs ═════════════════════════════════════════════ */}
      <Section tone="bone" id="process" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            align="center"
            eyebrow="How it runs"
            lead="Four stages,"
            trail="and you can leave after any of them"
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => (
            <Item
              key={p.n}
              className="group rounded-xl border border-line bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-frame"
            >
              <span
                aria-hidden
                className="font-serif text-4xl leading-none text-line-strong transition-colors group-hover:text-signal/40"
              >
                {p.n}
              </span>
              <p className="mt-4 text-[0.95rem] font-medium text-ink">{p.title}</p>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ Inside the work ═════════════════════════════════════════ */}
      <Section tone="alt" id="inside" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Inside the work"
            lead="Screens from the systems"
            trail="that are live right now"
            body="Real interfaces from production, not mock-ups. Where a screen is still under NDA review it stays a placeholder."
          />
        </FadeUp>
        <div className="mt-12">
          <Gallery items={insideShots} />
        </div>
      </Section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">Proof over promises</p>
            <h2 className="display-lg mt-5 text-bone">
              Every claim on this page{" "}
              <span className="text-bone/50">has a live system behind it</span>
            </h2>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Talk to an engineer <Nudge />
            </Link>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
