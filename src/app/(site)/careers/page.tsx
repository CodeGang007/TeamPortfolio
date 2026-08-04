import type { Metadata } from "next";
import Link from "next/link";
import { marketsShort, site, stats } from "@/content/site";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import { Gallery, Plate, SectionNav, TrustRow, VisualLead } from "@/components/site/blocks";
import {
  Body,
  Display,
  LeadIns,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "A software engineering company. No open roles posted right now: open applications go straight to the founders.",
  openGraph: { title: "Careers · CodeGang", url: "/careers" },
  alternates: { canonical: "/careers" },
};

const sections = [
  { id: "roles", label: "Open roles" },
  { id: "life", label: "How we work" },
  { id: "process", label: "Hiring process" },
  { id: "apply", label: "Apply" },
] as const;

const trust = [
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: String(stats.live), label: "Systems live", sub: "in production now" },
  { value: stats.clientsServed, label: "Clients served", sub: marketsShort },
  { value: "", label: "Open roles", sub: "none posted today", pending: true },
] as const;

/**
 * TRUTH RULE: there are no verified open positions. Rather than invent a
 * jobs board, this page states that plainly and keeps open applications
 * open. Add real roles here when they exist.
 */
const interests = [
  {
    title: "Backend / AI engineering",
    body: "Python and FastAPI, retrieval pipelines, model gateways, and the data modelling underneath them.",
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "AWS"],
  },
  {
    title: "Full-stack product engineering",
    body: "Next.js and TypeScript across multi-tenant platforms, with real ownership of the surface you build.",
    stack: ["TypeScript", "Next.js", "React", "Node.js", "Tailwind"],
  },
  {
    title: "Mobile engineering",
    body: "Flutter and native Android, offline-first sync, and store release engineering.",
    stack: ["Flutter", "Dart", "Kotlin", "Firebase"],
  },
  {
    title: "DevOps / platform",
    body: "AWS architecture, containerisation, CI/CD, and the observability that makes an on-call rota humane.",
    stack: ["AWS", "Docker", "Terraform", "GitHub Actions"],
  },
];

const life = [
  { lead: "You own a system", body: "Not a ticket queue. You take a system from scope to production and stay on it afterwards." },
  { lead: "You talk to clients", body: "There is no account layer between you and the person using what you built." },
  { lead: "Your work is visible", body: "Nothing you ship disappears into a monorepo nobody reads. It is in front of a client within weeks." },
  { lead: "Review is written", body: "Reasoning goes in the pull request, so decisions are inspectable months later." },
  { lead: "Documentation is the job", body: "Runbooks and handover docs are in the estimate, not squeezed in on a Friday." },
  { lead: "Timezones overlap deliberately", body: "We work across Brazil, Australia, India, the USA and Europe, and agree the overlap rather than pretending it is free." },
];

const process = [
  { n: "I", title: "Email", body: "Send code we can read: a repository, a package, anything you actually built." },
  { n: "II", title: "Conversation", body: "Forty-five minutes with an engineer about what you built and why you chose it." },
  { n: "III", title: "Paid exercise", body: "A small, scoped piece of real work. Paid at our normal rate, and yours to keep." },
  { n: "IV", title: "Decision", body: "A yes or a no with reasons, within a week. No silent pipelines." },
];

const culture = [
  { label: "Studio, at work", src: "/our-values/studio-five-of-us.jpg" },
  { label: "Pairing: retrieval layer", src: "/our-values/review-retrieval-layer.jpg" },
  { label: "Whiteboard: clinical schema", src: "/our-values/whiteboard-pinnacle-schema.jpg" },
  { label: "Ship day", src: "/our-values/ship-day-verse-ai.jpg" },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow="Careers"
            plate={<Plate
              label="Studio, at work"
              src="/our-values/studio-five-of-us.jpg"
              alt="The team around a standing desk, mid-review of a pull request"
              ratio="4/3"
              className="shadow-frame"
            />}
          >
            <Display as="h1" size="xl" lead="A senior engineering team." trail="Occasionally, one more." />
            <Body className="mt-6 max-w-xl text-base">
              We have no verified open positions today, so this page does not
              list any. Open applications are read by the founders, and the
              disciplines we hire into are below.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href={`mailto:${site.email}?subject=Open%20application`} external>
                Send an open application <Nudge />
              </Pill>
              <Pill href="/our-values" variant="light">
                Read how we work
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ Roles ═══════════════════════════════════════════════════ */}
      <Section tone="bone" id="roles" className="scroll-mt-32">
        <FadeUp>
          <div className="rounded-xl border border-dashed border-line-strong bg-bone-alt/60 px-7 py-6">
            <p className="mono-label">Open roles</p>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">None posted right now.</span>{" "}
              We do not keep evergreen listings open to collect résumés. When a
              seat exists it appears here with a scope and a salary band.
            </p>
          </div>
        </FadeUp>

        <FadeUp className="mt-14">
          <SectionIntro
            eyebrow="Disciplines"
            lead="What we hire into"
            trail="when we hire at all"
            body="An open application against one of these is worth sending even with nothing posted."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {interests.map((r) => (
            <Item
              key={r.title}
              className="rounded-xl border border-line bg-paper p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-frame"
            >
              <h3 className="text-[1.1rem] font-medium tracking-tight text-ink">
                {r.title}
              </h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
                {r.body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {r.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line bg-bone px-3 py-1 font-mono text-[0.62rem] text-mute"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ Life ════════════════════════════════════════════════════ */}
      <Section tone="alt" id="life" className="blueprint scroll-mt-32">
        <FadeUp>
          <VisualLead
            eyebrow="How we work"
            reverse
            plate={<Plate
              label="Review: pairing session"
              src="/our-values/review-retrieval-layer.jpg"
              alt="Two engineers pairing over the retrieval layer during review"
              ratio="1/1"
              className="shadow-frame"
            />}
          >
            <Display size="md" lead="Small enough" trail="that your work is visible" />
            <Body className="mt-5 max-w-lg">
              Six things that are true of working here, including the ones that
              will not suit everybody.
            </Body>
          </VisualLead>
        </FadeUp>
        <FadeUp className="mt-12">
          <LeadIns items={life} />
        </FadeUp>
      </Section>

      {/* ══ Process ═════════════════════════════════════════════════ */}
      <Section tone="bone" id="process" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            align="center"
            eyebrow="Hiring process"
            lead="Four steps,"
            trail="and the exercise is paid"
          />
        </FadeUp>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
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

      {/* ══ Culture ═════════════════════════════════════════════════ */}
      <Section tone="alt">
        <FadeUp>
          <SectionIntro
            eyebrow="The studio"
            lead="Photographs pending"
            trail="rather than stock photography"
          />
        </FadeUp>
        <div className="mt-12">
          <Gallery items={culture} />
        </div>
      </Section>

      {/* ══ Apply ═══════════════════════════════════════════════════ */}
      <Section tone="ink" id="apply" className="scroll-mt-32">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">Apply</p>
            <h2 className="display-lg mt-5 text-bone">
              Send something you built{" "}
              <span className="text-bone/50">and why you built it that way</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-bone/70">
              A repository beats a résumé. One paragraph on a decision you would
              now make differently beats a cover letter.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${site.email}?subject=Open%20application`}
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                {site.email} <Nudge />
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone/50"
              >
                See what you would work on
              </Link>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
