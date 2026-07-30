import type { Metadata } from "next";
import Link from "next/link";
import { consoleProjects } from "@/content/projects";
import { clients, site, stats } from "@/content/site";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import {
  Gallery,
  Plate,
  SectionNav,
  TrustRow,
  VisualLead,
} from "@/components/site/blocks";
import {
  Body,
  Display,
  Eyebrow,
  LeadIns,
  LiveChip,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

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

// Inline hero figures. `display` is what a reader sees; these come straight
// from content/site.ts so they can never drift from the rest of the site.
const trustItems = [
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: stats.clientsServed, label: "Clients served", sub: `${stats.regions} regions` },
  { value: "", label: "Clutch rating", pending: true },
  { value: "", label: "Google rating", pending: true },
] as const;

const heroStats = [
  { value: stats.projectsDelivered, label: "Projects delivered" },
  { value: stats.clientsServed, label: "Clients served" },
  { value: String(stats.live), label: "Systems live now" },
  { value: String(stats.regions), label: "Regions supported" },
];

/**
 * The road so far.
 *
 * TRUTH RULE: this is deliberately ordered by system, NOT by year. We do not
 * have verified go-live dates — `liveSince` is null for every project in
 * content/projects.ts — and inventing a founding year or milestone dates to
 * fill a timeline would be exactly the kind of unsourceable claim the rest of
 * this site avoids.
 *
 * TODO(team): once real dates exist, add a `year` to each entry below and to
 * `liveSince` in content/projects.ts, then render it in the rail.
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

const marqueeItems = [
  "Production AI",
  "Multi-tenant SaaS",
  "Flutter & Android",
  "ERP + deep learning",
  "Hospital systems",
  "AWS & CI/CD",
  "RAG platforms",
];

export default function AboutPage() {
  return (
    <>
      {/* ══ Hero + inline stat row ══════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-b border-line bg-bone pb-14 pt-40 sm:pt-48">
        <div
          aria-hidden
          className="blueprint mask-fade-y absolute inset-0 -z-10"
        />
        <Shell>
          <VisualLead
            eyebrow="About"
            plate={<Plate label="The studio at work" ratio="4/3" className="shadow-frame" />}
          >
            <Display
              size="xl"
              lead="We build the software"
              trail="companies actually run on"
            />
            <Body className="mt-6 max-w-xl text-base">
              CodeGang is a five-engineer software studio. We ship production AI,
              multi-tenant platforms and mobile apps for clients in Brazil,
              Australia, India, the USA and Europe — and we stay on to keep them
              running after launch.
            </Body>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trustItems} />
          </div>

          <p className="mt-6 max-w-2xl font-mono text-[0.65rem] leading-relaxed text-mute">
            Lifetime figures are asserted by the founders and include years of
            NDA-covered work that cannot be itemised publicly. Systems and
            regions are computed from the case studies on this site.
          </p>
        </Shell>
      </section>

      <SectionNav
        sections={[
          { id: "history", label: "The road so far" },
          { id: "difference", label: "How we differ" },
          { id: "culture", label: "Inside the studio" },
          { id: "clients", label: "Who we build for" },
        ]}
      />

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

      {/* ══ The road so far ═════════════════════════════════════════ */}
      <Section tone="bone" id="history" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="The road so far"
            lead="Six systems,"
            trail="and what each one had to solve"
            body="Ordered by system rather than by date — we publish go-live dates only once we can source them."
          />
        </FadeUp>

        <Stagger className="mt-12">
          <ol className="relative">
            <span
              aria-hidden
              className="absolute bottom-4 left-[7px] top-4 w-px bg-line"
            />
            {milestones.map((m) => {
              const p = consoleProjects.find((x) => x.slug === m.slug);
              return (
                <Item key={m.slug} as="li" className="relative pb-10 pl-10 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                      p?.status === "live"
                        ? "border-signal bg-paper"
                        : "border-line-strong bg-bone"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.62rem] uppercase tracking-wider text-mute">
                      {m.region}
                    </span>
                    {p ? (
                      <LiveChip tone={p.status === "live" ? "live" : "building"}>
                        {p.status === "live" ? "live" : "in build"}
                      </LiveChip>
                    ) : null}
                  </div>
                  <h3 className="mt-2 text-[1.15rem] font-medium tracking-tight text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-ink-soft">
                    {m.body}
                  </p>
                  <Link
                    href={`/work/${m.slug}`}
                    className="mt-3 inline-block text-[0.82rem] font-medium text-signal hover:underline"
                  >
                    {p?.name ?? "Read the case study"} →
                  </Link>
                </Item>
              );
            })}
          </ol>
        </Stagger>
      </Section>

      {/* ══ How we make a difference ════════════════════════════════ */}
      <Section tone="alt" id="difference" className="blueprint scroll-mt-32">
        <FadeUp>
          <SectionIntro
            align="center"
            eyebrow="How we make a difference"
            lead="What we do,"
            trail="how we do it, and why us"
          />
        </FadeUp>
        <FadeUp className="mt-12">
          <LeadIns items={difference} />
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Body className="max-w-md">
              The five engineers behind all of it are on the studio page — names,
              focus, and what each of them is opinionated about.
            </Body>
            <Pill href="/studio">
              Meet the studio <Nudge />
            </Pill>
          </div>
        </FadeUp>
      </Section>

      {/* ══ Inside the studio ═══════════════════════════════════════ */}
      <Section tone="bone" id="culture" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Inside the studio"
            lead="Five people,"
            trail="one room, a lot of whiteboard"
            body="Photos are being collected — these slots fill in as we add them."
          />
        </FadeUp>
        <div className="mt-12">
          <Gallery
            items={[
              { label: "Standup" },
              { label: "Architecture review" },
              { label: "Release day" },
              { label: "The whiteboard" },
            ]}
          />
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
