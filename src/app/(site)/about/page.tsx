import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { consoleProjects } from "@/content/projects";
import { getPortfolioProjectById } from "@/data/portfolioProjects";
import { clients, site, stats } from "@/content/site";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import {
  OutcomeCard,
  Plate,
  SectionNav,
  TrustRow,
} from "@/components/site/blocks";
import {
  Body,
  Eyebrow,
  LeadIns,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";
import {
  DeliveryStackDiagram,
  OperatingCycleDiagram,
  StrengthsVenn,
} from "@/components/site/AboutDiagrams";

export const metadata: Metadata = {
  title: "About",
  description: `A five-engineer studio. ${stats.projectsDelivered} projects delivered for ${stats.clientsServed} clients — most under NDA — with ${stats.live} systems live across ${stats.regions} regions.`,
  openGraph: {
    title: "About — CodeGang",
    description: "Five engineers, and the systems they keep running.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

// ── Image slots ────────────────────────────────────────────────────
// Set these once the AI-generated art exists (prompts delivered
// separately). Until then every slot below renders a clean CSS/plate
// fallback — never a broken image.
const HERO_IMAGE: string | undefined = "/about/hero-banner.jpg";
const STUDIO_IMAGE: string | undefined = "/about/studio-at-work.jpg";
const VALUES_MARK_IMAGE: string | undefined = "/about/values-mark.png";

const trustItems = [
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: stats.clientsServed, label: "Clients served", sub: `${stats.regions} regions` },
  { value: "", label: "Clutch rating", pending: true },
  { value: "", label: "Google rating", pending: true },
] as const;

/**
 * The road so far.
 *
 * TRUTH RULE: ordered by system, NOT by year — `liveSince` is null for
 * every project in content/projects.ts, and inventing a date to fill a
 * timeline would be exactly the kind of unsourceable claim this site
 * avoids elsewhere.
 */
const milestones = [
  {
    slug: "verse-ai",
    region: "Brazil",
    title: "Private AI for the enterprise",
    body: "A multi-tenant RAG platform on a 7-layer AWS stack, answering from a company's own documents with the retrieval trace attached.",
  },
  {
    slug: "emedici",
    region: "Australia",
    title: "Medical education, shipped to a store",
    body: "An Android app that med students, junior doctors and registrars are examined on — offline-first sync and store-ready release engineering.",
  },
  {
    slug: "pinnacle-hms",
    region: "India",
    title: "An operating system for a hospital",
    body: "Six role-based portals over one 39-table schema, carrying a patient episode from reception to billing with an audit trail behind it.",
  },
  {
    slug: "arm-tech",
    region: "India",
    title: "Deep learning inside the ERP",
    body: "Five models — forecasting, anomaly detection, OCR, risk, route cost — on the same pipeline as the transactional system.",
  },
  {
    slug: "ai-resume",
    region: "USA",
    title: "A product that proves itself in a minute",
    body: "Paste a job description, get an ATS-optimised resume back, with a score that moves for a visible, explainable reason.",
  },
  {
    slug: "nestflow",
    region: "Europe",
    title: "Property management on microservices",
    body: "Landlord and tenant portals over containerized services — one compose file brings the whole stack up. Still in build.",
  },
] as const;

const difference = [
  {
    lead: "What we do",
    body: "We build production software — AI platforms, multi-tenant SaaS, mobile apps, ERP suites and healthcare systems — and then keep them running. Every category maps to something already live.",
  },
  {
    lead: "How we do it",
    body: "Scope, build, ship, stay. Short cycles in your repository from day one, deployed into your cloud account, with the same five engineers on maintenance afterwards.",
  },
  {
    lead: "Why CodeGang",
    body: "There is no sales layer to get past and no delivery team you have not met. The engineer who scopes your system is the engineer who writes it.",
  },
];

const principles = [
  { lead: "Directness", body: "We say the tradeoff, not the pitch. If a deadline or a budget doesn't work, you hear that in the scoping call, not after the invoice." },
  { lead: "Ownership", body: "The engineer who scopes a system ships it and stays on it. Nothing gets handed to a support desk that has never opened the repo." },
  { lead: "Evidence", body: "Every claim on this site links to a system you can inspect — a live URL, a Play Store listing, a case study with real screens." },
  { lead: "Craft", body: "Code the next engineer can read — including future us, six months into maintaining what we built today." },
  { lead: "Momentum", body: "Short cycles and a staging URL from week one. You watch a system grow; you don't wait for a reveal." },
  { lead: "Candor", body: "Bad news travels as fast as good news. A slipping estimate gets a message the day it slips, not the day it's due." },
] as const;

const productionChecklist = [
  "Deployed into your cloud account — not a shared sandbox you have to migrate off later.",
  "CI/CD from the first commit — every system ships through the same pipeline it runs on in production.",
  "Code review on every change — nothing merges without a second pair of eyes from the studio.",
  "The engineer who built it maintains it — no handoff to a team that has never opened the repo.",
  "Weekly checkpoints, not milestones — you see real progress every week, not at the end of a quarter.",
];

/** A visually varied spread across the real case studies for the carousel. */
const exploreSlugs = [
  "verse-ai",
  "pinnacle-hms",
  "student-insights-suite",
  "arm-tech",
  "local-shops-analytics",
  "emedici",
] as const;

const marqueeItems = [
  "Production AI",
  "Multi-tenant SaaS",
  "Flutter & Android",
  "ERP + deep learning",
  "Business analytics",
  "AWS & CI/CD",
  "RAG platforms",
];

export default function AboutPage() {
  return (
    <>
      {/* ══ Hero ═══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-ink">
        {HERO_IMAGE ? (
          <div aria-hidden className="absolute inset-0 -z-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
          </div>
        ) : (
          <>
            <div aria-hidden className="glow-blue absolute inset-0 -z-20" />
            <div
              aria-hidden
              className="blueprint mask-fade-y absolute inset-0 -z-20 opacity-[0.14]"
            />
          </>
        )}

        <Shell className="relative pb-16 pt-40 sm:pt-48">
          <p className="mono-label !text-bone/50 mb-6">About</p>
          <h1 className="display-xl max-w-3xl text-bone">
            Five engineers.
            <br />
            <span className="text-bone/55">No sales layer in between.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/80">
            CodeGang is a five-engineer software studio. We ship production
            AI, multi-tenant platforms and mobile apps for clients in Brazil,
            Australia, India, the USA and Europe — and we stay on to keep
            them running after launch.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-[10px] bg-bone px-5 py-3 text-sm font-medium text-ink shadow-lg shadow-black/10 transition-all hover:bg-white"
            >
              Talk to an engineer <Nudge />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-[10px] bg-white/10 px-5 py-3 text-sm font-medium text-bone ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              See what we shipped
            </Link>
          </div>

          <div className="mt-14 [&_p]:!text-bone [&_.text-mute]:!text-bone/55">
            <TrustRow items={trustItems} />
          </div>
        </Shell>
      </section>

      {/* ══ Statement marquee ═══════════════════════════════════════ */}
      <section
        aria-hidden
        className="overflow-hidden border-b border-line bg-ink py-5"
      >
        <div className="marquee-track" style={{ "--marquee-dur": "46s" } as React.CSSProperties}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {marqueeItems.map((t) => (
                <span key={t} className="flex items-center">
                  <span className="px-7 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-bone/70">
                    {t}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-signal" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══ Statement ═══════════════════════════════════════════════ */}
      <Section tone="bone">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-5 justify-center">Why we exist</Eyebrow>
            <h2 className="display-md text-balance text-ink">
              Software that ships, and then{" "}
              <span className="text-signal">keeps shipping.</span>
            </h2>
            <Body className="mx-auto mt-6 max-w-2xl text-base">
              CodeGang exists because most studios optimise for the handoff —
              scope it, build it, hand you a repo, disappear. We do the
              opposite: the same five engineers who scope a system stay on it
              after launch, so the thing that shipped on day one still works
              on day five hundred.
            </Body>
          </div>
        </FadeUp>
      </Section>

      <SectionNav
        sections={[
          { id: "build", label: "How we build" },
          { id: "systems", label: "The road so far" },
          { id: "work", label: "Explore the work" },
          { id: "values", label: "What we stand for" },
          { id: "clients", label: "Who we build for" },
        ]}
      />

      {/* ══ Studio at work ══════════════════════════════════════════ */}
      <Section tone="alt">
        <FadeUp>
          <Plate
            label="The studio at work"
            src={STUDIO_IMAGE}
            alt={STUDIO_IMAGE ? "The CodeGang studio at work" : ""}
            ratio="2.2/1"
            className="shadow-frame-lg"
          />
          <p className="mono-label mt-4 text-center">
            Standups, architecture reviews, release day — same five people,
            every time.
          </p>
        </FadeUp>
      </Section>

      {/* ══ How we build ════════════════════════════════════════════ */}
      <Section tone="bone" id="build" bleed className="scroll-mt-32">
        <Shell className="space-y-20">
          <FadeUp>
            <SectionIntro
              eyebrow="How we build"
              lead="Engineering your delivery pipeline,"
              trail="four layers, one accountable team"
              body="Every system we ship sits on the same four layers — engineered by the same five people, from the interface a user touches down to the infrastructure that keeps it up."
            />
          </FadeUp>

          <FadeUp>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <DeliveryStackDiagram />
              <div>
                <LeadIns items={difference} className="!grid-cols-1 !gap-6" />
                <div className="mt-9 border-t border-line pt-7">
                  <Pill href="/studio">
                    Meet the studio <Nudge />
                  </Pill>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="border-t border-line pt-16">
              <Eyebrow className="mb-3">Studio operating model</Eyebrow>
              <h3 className="display-md max-w-xl text-ink">
                The value of a studio{" "}
                <span className="text-mute">that doesn&rsquo;t leave</span>
              </h3>
              <Body className="mt-4 max-w-2xl">
                A four-stage loop, not a four-stage project. Stay feeds
                straight back into the next Scope, so a system keeps
                improving instead of freezing the day it ships.
              </Body>
              <div className="mt-9">
                <OperatingCycleDiagram />
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="border-t border-line pt-16">
              <Eyebrow className="mb-3">Why the systems hold up</Eyebrow>
              <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <StrengthsVenn />
                <div className="space-y-6">
                  <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">
                      Production engineering —{" "}
                    </span>
                    We combine architecture, cloud infrastructure and
                    deployment practice to build systems that stay up, not
                    just ones that demo well.
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">
                      Applied AI —{" "}
                    </span>
                    RAG pipelines, multi-LLM gateways and deep-learning
                    modules embedded inside real business software, not a
                    standalone demo bolted on afterward.
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">
                      Design & usability —{" "}
                    </span>
                    Interfaces the actual end user runs their day on — a
                    nurse, a call-centre agent, a store manager — not just
                    the buyer who signed off on the build.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </Shell>

        <Link
          href="/contact"
          className="group absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-2 rounded-l-lg bg-ink px-3 py-4 text-bone shadow-frame-lg transition-colors hover:bg-ink-soft xl:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">
            Connect with us
          </span>
        </Link>
      </Section>

      {/* ══ The road so far ═════════════════════════════════════════ */}
      <Section tone="alt" id="systems" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="The road so far"
            lead="Six systems,"
            trail="and what each one had to solve"
            body="Ordered by system rather than by date — we publish go-live dates only once we can source them."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m) => {
            const p = consoleProjects.find((x) => x.slug === m.slug);
            const deep = getPortfolioProjectById(m.slug);
            return (
              <Item key={m.slug} className="h-full">
                <OutcomeCard
                  sector={m.region}
                  client={p?.name ?? m.title}
                  outcome={m.title}
                  metric={m.body}
                  href={`/work/${m.slug}`}
                  src={deep?.image}
                  status={p?.status === "building" ? "building" : "live"}
                />
              </Item>
            );
          })}
        </Stagger>
      </Section>

      {/* ══ Explore the work ════════════════════════════════════════ */}
      <Section tone="bone" id="work" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Explore the work"
            lead="Real systems,"
            trail="scroll to see more"
          />
        </FadeUp>

        <div className="mt-10 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:mx-0 lg:px-0">
          {exploreSlugs.map((slug) => {
            const deep = getPortfolioProjectById(slug);
            const p = consoleProjects.find((x) => x.slug === slug);
            if (!deep || !p) return null;
            return (
              <Link
                key={slug}
                href={`/work/${slug}`}
                className="group relative aspect-[4/5] w-[15rem] shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-ink shadow-frame sm:w-[17rem]"
              >
                {deep.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={deep.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-70 transition-opacity duration-300 group-hover:opacity-85"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-signal px-3.5 py-2">
                  <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white">
                    {p.sector}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[0.98rem] font-medium leading-snug text-white">
                    {p.name}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[0.78rem] font-medium text-white/80">
                    Read the case study
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ══ Built for production ════════════════════════════════════ */}
      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <FadeUp>
            <p className="mono-label !text-bone/45 mb-4">Built for production</p>
            <p className="font-display text-[clamp(3rem,7vw,5rem)] font-semibold leading-none text-bone">
              {stats.live}
            </p>
            <p className="mt-3 text-[0.95rem] text-bone/70">
              systems live in production right now, across {stats.regions}{" "}
              regions — not prototypes, not staging environments.
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-[0.95rem] leading-relaxed text-bone/70">
              A demo is easy. Software that survives a real customer, a real
              deadline and a real production incident is the actual job.
              Every system we ship follows the same five habits:
            </p>
            <ul className="mt-6 space-y-4">
              {productionChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20"
                  >
                    <Check className="h-3 w-3 text-signal" strokeWidth={3} />
                  </span>
                  <span className="text-[0.9rem] leading-relaxed text-bone/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </Section>

      {/* ══ What we stand for ═══════════════════════════════════════ */}
      <Section tone="bone" id="values" className="scroll-mt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <Plate
              label="What we're opinionated about"
              src={VALUES_MARK_IMAGE}
              alt={VALUES_MARK_IMAGE ? "CodeGang engineering principles mark" : ""}
              ratio="4/5"
            />
          </FadeUp>
          <FadeUp delay={0.05}>
            <Eyebrow className="mb-4">Our principles</Eyebrow>
            <h2 className="display-md max-w-lg text-ink">
              What we&rsquo;re opinionated about
            </h2>
            <Body className="mt-4 max-w-xl">
              Six things we hold the studio to, on every system regardless of
              client, budget or timeline.
            </Body>
            <LeadIns items={principles} className="mt-9 !grid-cols-1 sm:!grid-cols-2" />
          </FadeUp>
        </div>
      </Section>

      {/* ══ Who we build for ════════════════════════════════════════ */}
      <Section tone="alt" id="clients" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Who we build for"
            lead="Real organisations,"
            trail="each with a system behind the name"
            body="We do not pad this list with logos for optics — every name here has a system we built and still maintain."
          />
        </FadeUp>

        <Stagger className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c) => (
            <Item as="li" key={c.name} className="list-none">
              <Link
                href={`/work/${c.slug}`}
                className="group flex h-full flex-col justify-center rounded-xl border border-line bg-paper px-4 py-5 transition-all duration-200 hover:border-line-strong hover:shadow-frame"
              >
                <span className="text-[0.82rem] font-medium leading-tight text-ink">
                  {c.name}
                </span>
                <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                  {c.detail}
                </span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <Section tone="ink">
        <FadeUp>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="display-md max-w-xl text-bone">
              Bring us the system{" "}
              <span className="text-bone/50">your company runs on.</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                Talk to an engineer <Nudge />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center rounded-full border border-bone/25 px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-bone/10"
              >
                {site.email}
              </a>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
