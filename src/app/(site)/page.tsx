import Link from "next/link";
import type { Metadata } from "next";

import { consoleProjects } from "@/content/projects";
import { getPortfolioProjectById } from "@/data/portfolioProjects";
import { clients, site, stats, marketsLong } from "@/content/site";
import { testimonials } from "@/content/testimonials";

import HeroScene from "@/components/site/HeroScene";
import WordGrid from "@/components/site/WordGrid";
import FooterCta from "@/components/site/FooterCta";
import StatsBand from "@/components/site/StatsBand";
import Console from "@/components/site/dioramas/Console";
import Stack from "@/components/site/dioramas/Stack";
import Hospital from "@/components/site/dioramas/Hospital";
import Forecast from "@/components/site/dioramas/Forecast";
import Mobile from "@/components/site/dioramas/Mobile";
import Ats from "@/components/site/dioramas/Ats";
import JsonLd from "@/components/console/JsonLd";
import { FadeUp, Item, Parallax, Stagger } from "@/components/site/motion";
import {
  Body,
  Display,
  Eyebrow,
  Frame,
  LeadIns,
  LiveChip,
  Nudge,
  Pill,
  Rule,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
  },
};

/* ── Content ──────────────────────────────────────────────────────
   Every claim below is backed by a system in content/projects.ts or
   describes process. No rates, no invented guarantees, no fake logos.
   ───────────────────────────────────────────────────────────────── */

const platformLeadIns = [
  {
    lead: "Engineers, not account managers",
    body: "The person in your first call writes the code. There is no sales layer and no hand-off to a delivery team you have never met.",
  },
  {
    lead: "Production or nothing",
    body: "We measure ourselves in systems that are live and maintained, not in prototypes. Most of what we have shipped is still under our maintenance.",
  },
  {
    lead: "Yours to keep",
    body: "Your repository, your cloud account, your data. We build so the system survives us: documented, tested, and handed over whole.",
  },
];

// Each entry is one repeating feature band, mirroring the reference layout:
// numeral, headline, copy, dual CTA, diorama.
const systemBands = [
  {
    n: "01",
    slug: "verse-ai",
    eyebrow: "AI & GenAI engineering",
    lead: "Private AI over your own documents,",
    trail: "with the retrieval trace attached",
    body: "Verse AI gives an enterprise a private assistant over its own files. Every answer arrives with the chunks it came from, and every chunk is scoped to one tenant, so a buyer can audit the answer instead of trusting it.",
    proof: "Live for MooveHub in São Paulo",
    diorama: <Console />,
    caption: "Verse AI: assistant with retrieval trace",
  },
  {
    n: "02",
    slug: "pinnacle-hms",
    eyebrow: "Enterprise systems",
    lead: "Six role-based portals,",
    trail: "one schema underneath",
    body: "Pinnacle HMS runs a working hospital. Reception, OPD, diagnostics, pharmacy, billing and admin each get their own portal, but a patient episode is one record moving across 39 tables and 57 relationships with an audit trail behind it.",
    proof: "Live in a hospital in Kolkata",
    diorama: <Hospital />,
    caption: "Pinnacle HMS: one patient episode across six portals",
  },
  {
    n: "03",
    slug: "arm-tech",
    eyebrow: "Applied machine learning",
    lead: "Deep learning inside the ERP,",
    trail: "not inside a notebook",
    body: "ARM Tech runs purchasing, fleet and finance for a cement trader. Five deep-learning modules sit on the same pipeline as the transactional system, so a forecast is something the buyer acts on in the app rather than a slide in a review.",
    proof: "Live for a trading business in Kolkata",
    diorama: <Forecast />,
    caption: "ARM Tech ERP, LSTM demand forecast",
  },
  {
    n: "04",
    slug: "emedici",
    eyebrow: "Mobile app development",
    lead: "Mobile built for a real audience,",
    trail: "shipped to a real store",
    body: "eMedici teaches medical students across Australia. Offline-first sync, store-ready release engineering, and a question engine that has to stay correct: because the people using it are being examined on it.",
    proof: `eMedici · Play Store · ${stats.emediciInstalls} installs, ${stats.emediciRating}★`,
    diorama: <Mobile />,
    caption: "eMedici: question engine",
  },
  {
    n: "05",
    slug: "ai-resume",
    eyebrow: "SaaS product development",
    lead: "A product that earns its keep",
    trail: "in the first sixty seconds",
    body: "AI Resume Builder turns a pasted job description into an ATS-optimised resume. The whole product is one loop: paste, score, rewrite, download, and the score has to move for a visible, explainable reason.",
    proof: "Live at nailhiring.com",
    diorama: <Ats />,
    caption: "AI Resume Builder, ATS match report",
  },
] as const;

const chapters = [
  {
    n: "I",
    title: "Scope",
    body: "We work out what the system has to do and what shipping means. You leave with a written scope you could hand to anyone, including someone who is not us.",
  },
  {
    n: "II",
    title: "Build",
    body: "Short cycles against that scope, in your repository from day one. You see the system running before it is finished, not a status report about it.",
  },
  {
    n: "III",
    title: "Ship",
    body: "Deployment, environments, CI/CD and the release itself. Live means a real user can reach it in your cloud account, not a demo on ours.",
  },
  {
    n: "IV",
    title: "Stay",
    body: "Maintenance and roadmap. Most of the systems on this page are still under active maintenance by the same engineers who built them.",
  },
] as const;

const industries = [
  {
    name: "Healthcare",
    body: "eMedici trains medical students across Australia; Pinnacle HMS runs a working hospital in India.",
    systems: "eMedici · Pinnacle HMS",
    href: "/work/pinnacle-hms",
  },
  {
    name: "Enterprise SaaS",
    body: "Verse AI gives enterprises a private assistant over their own documents, with tenant isolation on a 7-layer AWS stack.",
    systems: "Verse AI",
    href: "/work/verse-ai",
  },
  {
    name: "Trade & Logistics",
    body: "ARM Tech runs purchasing, fleet and finance, with five deep-learning modules feeding decisions daily.",
    systems: "ARM Tech ERP",
    href: "/work/arm-tech",
  },
  {
    name: "PropTech",
    body: "NestFlow gives landlords properties, tenants, leases and rent in one place, on containerized microservices.",
    systems: "NestFlow",
    href: "/work/nestflow",
  },
  {
    name: "HR & Recruiting",
    body: "AI Resume Builder turns a job description into an ATS-optimised resume in under a minute.",
    systems: "AI Resume Builder",
    href: "/work/ai-resume",
  },
] as const;

const faq = [
  {
    q: "Who actually writes the code?",
    a: "The engineers on the studio page. There is no sales layer and no hand-off: the engineer in the meeting is the one writing the code.",
  },
  {
    q: "What do you build?",
    a: "Production AI systems (RAG, multi-LLM gateways), multi-tenant SaaS platforms, mobile apps, ERP suites with applied deep learning, and healthcare systems. Every one of those maps to a system we have shipped: see the case studies.",
  },
  {
    q: "How does an engagement run?",
    a: "We scope the system with you, agree on what shipping means, build it, deploy it, and stay on for maintenance and roadmap. Most of our live systems are still under active maintenance by us.",
  },
  {
    q: "Do you work across time zones?",
    a: `Yes. Our clients are in ${marketsLong}, and every system stays supported in its own timezone.`,
  },
  {
    q: "Can you work under NDA?",
    a: "Yes, and most of our client work is under one. That is why this site shows regions, statuses and stacks rather than client internals.",
  },
] as const;

// Structured data. Every field mirrors something stated on the page — the
// FAQ entries are the same objects rendered below, so they can never drift.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.domain}#organization`,
      name: site.name,
      url: site.domain,
      email: site.email,
      description: site.description,
      sameAs: [site.linkedin, site.x],
    },
    {
      "@type": "FAQPage",
      "@id": `${site.domain}#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroScene />

      {/* ══ Proof band ══════════════════════════════════════════════ */}
      <section className="border-b border-line bg-bone py-14">
        <Shell>
          <Stagger as="ul" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((c) => (
              <Item as="li" key={c.name}>
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

          <p className="mt-8 text-center text-[0.9375rem] text-mute">
            <span className="font-medium text-ink">
              {stats.projectsDelivered} projects
            </span>{" "}
            delivered for{" "}
            <span className="font-medium text-ink">
              {stats.clientsServed} clients
            </span>{" "}
            over the years, most under NDA.{" "}
            <span className="font-medium text-ink">{stats.live} systems</span>{" "}
            are live in production right now.
          </p>
        </Shell>
      </section>

      {/* ══ What the studio is ══════════════════════════════════════ */}
      <Section tone="bone" id="studio">
        <FadeUp>
          <SectionIntro
            align="center"
            size="xl"
            lead="CodeGang is a software engineering company"
            trail="that ships systems companies run on"
          />
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="grid items-start gap-4 lg:grid-cols-2">
            <Frame size="lg" label="Verse AI: request path">
              <Stack />
            </Frame>
            <Frame size="lg" label="Verse AI: assistant with retrieval trace">
              <Console />
            </Frame>
          </div>
        </FadeUp>

        <FadeUp className="mt-12">
          <LeadIns items={platformLeadIns} />
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Body className="max-w-md">
              Bring us the system you need built, and we will tell you what it
              actually takes, before you commit to anything.
            </Body>
            <Pill href="/contact">
              Talk to an engineer <Nudge />
            </Pill>
          </div>
        </FadeUp>
      </Section>

      {/* ══ Repeating system bands ══════════════════════════════════ */}
      <Section tone="alt" id="systems" className="blueprint">
        <FadeUp>
          <SectionIntro
            eyebrow="What we build"
            lead="Five systems,"
            trail="five different problems"
            body="Each of these is live, maintained by us, and open to a technical reference call."
          />
        </FadeUp>

        <div className="mt-14 space-y-16 lg:space-y-20">
          {systemBands.map((s, i) => (
            <FadeUp key={s.slug}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl leading-none text-line-strong">
                      {s.n}
                    </span>
                    <Eyebrow>{s.eyebrow}</Eyebrow>
                  </div>

                  <Display
                    lead={s.lead}
                    trail={s.trail}
                    size="md"
                    className="mt-4"
                  />

                  <Body className="mt-5 max-w-lg">{s.body}</Body>

                  {/* A claim and the link that settles it, side by side. The
                      URL comes from projects.ts so it can never drift. */}
                  <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <LiveChip>live</LiveChip>
                    <span className="text-[0.8rem] text-mute">{s.proof}</span>
                    {(() => {
                      const url = consoleProjects.find(
                        (p) => p.slug === s.slug,
                      )?.liveUrl;
                      if (!url) return null;
                      const store = url.includes("play.google.com");
                      return (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.8rem] font-medium text-signal hover:underline"
                        >
                          {store ? "View on Play Store" : "Open it live"} ↗
                        </a>
                      );
                    })()}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Pill href={`/work/${s.slug}`} variant="light">
                      Read the case study <Nudge />
                    </Pill>
                    <Pill href="/contact" variant="ghost">
                      Build something like it
                    </Pill>
                  </div>
                </div>

                <Frame size="lg" label={s.caption}>
                  {s.diorama}
                </Frame>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* ══ How an engagement runs ══════════════════════════════════ */}
      <Section tone="bone" id="process">
        <FadeUp>
          <SectionIntro
            align="center"
            eyebrow="How we work"
            lead="Four stages,"
            trail="and you can leave after any of them"
            body="No lock-in, no phased invoice you cannot exit. If the scope says the system is wrong, we would rather tell you at stage one."
          />
        </FadeUp>

        <Stagger
          as="ol"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
            {chapters.map((c) => (
              <Item
                as="li"
                key={c.n}
                className="group relative overflow-hidden rounded-xl border border-line bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-frame"
              >
                <span
                  aria-hidden
                  className="font-serif text-5xl leading-none text-line-strong transition-colors duration-200 group-hover:text-signal/40"
                >
                  {c.n}
                </span>
                <p className="mt-5 text-[0.95rem] font-medium text-ink">
                  {c.title}
                </p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                  {c.body}
                </p>
              </Item>
            ))}
        </Stagger>

        <FadeUp className="mt-10 text-center">
          <Pill href="/studio">
            How the studio works <Nudge />
          </Pill>
        </FadeUp>
      </Section>

      {/* ══ Industries ══════════════════════════════════════════════ */}
      <Section tone="alt" id="industries">
        <FadeUp>
          <SectionIntro
            eyebrow="Where our systems run"
            lead="Five sectors,"
            trail="each with a system behind it"
          />
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            {industries.map((ind, i) => (
              <Link
                key={ind.name}
                href={ind.href}
                className={`group grid gap-2 px-6 py-6 transition-colors hover:bg-bone/70 sm:grid-cols-[minmax(0,13rem)_1fr_auto] sm:items-center sm:gap-6 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <span className="text-[1rem] font-medium text-ink">
                  {ind.name}
                </span>
                <span className="text-[0.875rem] leading-relaxed text-ink-soft">
                  {ind.body}
                </span>
                <span className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-wider text-mute">
                  {ind.systems}
                  <span
                    aria-hidden
                    className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* ══ Word grid ═══════════════════════════════════════════════ */}
      <Section tone="bone" id="capabilities">
        <FadeUp>
          <SectionIntro
            align="center"
            lead="Everything a company needs built,"
            trail="under one roof"
            body="AI platforms, SaaS products, mobile apps, ERP suites, cloud infrastructure, shipped by the same team, so nothing gets lost between vendors."
          />
        </FadeUp>

        <FadeUp className="mt-12">
          <WordGrid />
        </FadeUp>

        <FadeUp className="mt-12">
          <LeadIns
            items={[
              {
                lead: "One team, one contract",
                body: "The AI work and the ERP work and the mobile work are the same people, so integration is not a project of its own.",
              },
              {
                lead: "Every region supported",
                body: `Systems live across ${marketsLong}, each one supported in its own timezone rather than in ours.`,
              },
              {
                lead: "NDA by default",
                body: "Most of our work is under one. This site shows regions, statuses and stacks rather than client internals: deliberately.",
              },
            ]}
          />
        </FadeUp>
      </Section>

      {/* ══ Live board ══════════════════════════════════════════════ */}
      <Section tone="ink" id="live">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mono-label !text-bone/45">Live board</p>
              <h2 className="display-lg mt-4 text-bone">
                Every system we have shipped,{" "}
                <span className="text-bone/50">and its real status</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-[10px] border border-bone/20 px-5 py-2.5 text-sm font-medium text-bone transition-colors hover:bg-bone/10"
            >
              All case studies <Nudge />
            </Link>
          </div>
        </FadeUp>

        <FadeUp className="mt-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-bone/15">
                  {["System", "Sector", "Region", "Stack", "Status"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="pb-3 font-mono text-[0.6rem] uppercase tracking-wider text-bone/40"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consoleProjects.map((p) => (
                  <tr
                    key={p.slug}
                    className="group border-b border-bone/10 transition-colors hover:bg-bone/[0.04]"
                  >
                    <td className="py-4 pr-4">
                      {/* Only link rows that have a case study behind them —
                          an engagement listed here without one would point at
                          /work/<slug> and 404. */}
                      {getPortfolioProjectById(p.slug) ? (
                        <Link
                          href={`/work/${p.slug}`}
                          className="text-[0.9rem] font-medium text-bone"
                        >
                          {p.name}
                          <span
                            aria-hidden
                            className="ml-2 inline-block text-signal opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            →
                          </span>
                        </Link>
                      ) : (
                        <span className="text-[0.9rem] font-medium text-bone">
                          {p.name}
                        </span>
                      )}
                      <p className="mt-0.5 max-w-xs text-[0.75rem] leading-snug text-bone/45">
                        {p.summary}
                      </p>
                    </td>
                    <td className="py-4 pr-4 text-[0.8rem] text-bone/60">
                      {p.sector}
                    </td>
                    <td className="py-4 pr-4 font-mono text-[0.72rem] text-bone/60">
                      {p.city} · {p.region}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="flex flex-wrap gap-1">
                        {p.stack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded border border-bone/15 px-1.5 py-0.5 font-mono text-[0.58rem] text-bone/55"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.status === "live"
                              ? "pulse-dot bg-emerald-400"
                              : "bg-bone/35"
                          }`}
                        />
                        <span
                          className={
                            p.status === "live"
                              ? "text-emerald-300"
                              : "text-bone/45"
                          }
                        >
                          {p.status}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </Section>

      {/* ══ Numbers ═════════════════════════════════════════════════ */}
      <StatsBand />

      {/* ══ Testimonials: renders only when a real quote exists ════ */}
      {testimonials.length > 0 ? (
        <Section tone="bone" id="testimonials">
          <FadeUp>
            <SectionIntro
              align="center"
              eyebrow="In their words"
              lead="What the people who run these systems"
              trail="say about them"
            />
          </FadeUp>
          <FadeUp className="mt-12">
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure
                  key={t.author}
                  className="rounded-xl border border-line bg-paper p-7"
                >
                  <blockquote className="font-serif text-xl leading-snug text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-[0.85rem] text-ink">
                      <span className="font-medium">{t.author}</span>
                      <span className="text-mute">
                        {" "}
                        · {t.role}, {t.org}
                      </span>
                    </span>
                    <Link
                      href={`/work/${t.slug}`}
                      className="font-mono text-[0.6rem] uppercase tracking-wider text-signal"
                    >
                      the system →
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>
          </FadeUp>
        </Section>
      ) : null}

      {/* ══ FAQ ═════════════════════════════════════════════════════ */}
      <Section tone="alt" id="faq">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <FadeUp>
            <Eyebrow className="mb-5">Questions</Eyebrow>
            <Display
              lead="The things"
              trail="everyone asks first"
              size="md"
            />
            <Body className="mt-5">
              If yours is not here, ask an engineer directly: you will get an
              answer from the person who would build it.
            </Body>
            <Pill href="/contact" variant="light" className="mt-7">
              Ask a question <Nudge />
            </Pill>
          </FadeUp>

          <FadeUp>
            <dl>
              {faq.map((f, i) => (
                <div key={f.q} className={i > 0 ? "border-t border-line" : ""}>
                  <dt className="pt-6 text-[1rem] font-medium text-ink">
                    {f.q}
                  </dt>
                  <dd className="pb-6 pt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </Section>

      {/* ══ Closing CTA ═════════════════════════════════════════════ */}
      <FooterCta />
    </>
  );
}
