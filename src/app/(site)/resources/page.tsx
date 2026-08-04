import type { Metadata } from "next";
import Link from "next/link";
import { services, industries } from "@/content/pages";
import { consoleProjects } from "@/content/projects";
import { stats } from "@/content/site";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import { Plate, SectionNav, TrustRow, VisualLead } from "@/components/site/blocks";
import {
  Body,
  Display,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Engineering notes, the questions we get asked most, and the full page index. No gated PDFs.",
  openGraph: { title: "Resources. CodeGang", url: "/resources" },
  alternates: { canonical: "/resources" },
};

const sections = [
  { id: "notes", label: "Engineering notes" },
  { id: "answers", label: "Straight answers" },
  { id: "index", label: "Page index" },
] as const;

const trust = [
  { value: String(consoleProjects.length), label: "Systems documented", sub: "case study each" },
  { value: String(services.length + industries.length), label: "Service pages", sub: "each proof-linked" },
  { value: "0", label: "Gated downloads", sub: "no email wall" },
  { value: "", label: "Published articles", sub: "none published yet", pending: true },
] as const;

/**
 * TRUTH RULE: none of these are written yet, so each carries an explicit
 * "not written yet" state rather than a dead link or a fake date. When one
 * is published it gets an `href` and the status disappears.
 */
const notes: {
  title: string;
  body: string;
  tag: string;
  from: string;
  href?: string;
}[] = [
  {
    title: "Tenant isolation in a RAG platform",
    body: "Why scoping retrieval at the storage layer beats filtering results after the fact, and what it costs in index management.",
    tag: "AI architecture",
    from: "Verse AI",
  },
  {
    title: "Five deep-learning modules, one pipeline",
    body: "Shared feature engineering across demand, price, and risk models, and where that sharing stops paying off.",
    tag: "Applied ML",
    from: "ARM Tech",
  },
  {
    title: "Modelling a hospital as 39 tables",
    body: "The clinical schema behind six role-based portals, and the relationships that took three attempts to get right.",
    tag: "Data modelling",
    from: "Pinnacle HMS",
  },
  {
    title: "Offline-first on a real exam day",
    body: "Sync, conflict resolution, and what breaks when a thousand students lose signal in the same building.",
    tag: "Mobile",
    from: "eMedici",
  },
  {
    title: "Three Tailwind failures that silently hide content",
    body: "Opacity modifiers on arbitrary colours, commas in arbitrary values, and reveal animations with an invisible resting state.",
    tag: "Front-end",
    from: "This site",
  },
  {
    title: "What a two-week AI assessment actually produces",
    body: "The architecture, the cost model, and the use cases we recommend killing.",
    tag: "Consulting",
    from: "Assessment practice",
  },
];

const answers = [
  {
    q: "Who owns the code?",
    a: "You do, from the first commit, not on final payment. We work in your repository under your organisation.",
  },
  {
    q: "Where does it run?",
    a: "Your cloud account, under your keys. We hand over infrastructure, not access to a hosted black box.",
  },
  {
    q: "What happens when the engagement ends?",
    a: "You get runbooks and a documented handover, written during the build rather than assembled at the end.",
  },
  {
    q: "How big is the team?",
    a: "A senior engineering team across design, delivery and custom solutioning, with onsite coverage in the USA. We staff each engagement with named engineers who stay on it: the person who scoped your system is still on it a year later.",
  },
  {
    q: "Do you sign NDAs?",
    a: "NDA is the default position, which is why most of our delivered work is not named anywhere on this site.",
  },
  {
    q: "Can we talk to a client?",
    a: "Ask, and we will ask them. We do not publish quotes without written permission, but we will make an introduction where the client agrees.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow="Resources"
            plate={
              <Plate
                label="Notes: engineering write-ups"
                src="/resources/notes-desk.jpg"
                alt="An engineer's notebook with hand-sketched pipeline architecture, open on a desk beside a laptop showing code"
                ratio="4/3"
                className="shadow-frame"
              />
            }
          >
            <Display as="h1" size="xl" lead="Notes from the builds," trail="none of them gated" />
            <Body className="mt-6 max-w-xl text-base">
              Six write-ups drawn from systems we actually shipped. None are
              published yet, so each is marked as such: an unwritten article is
              not a lead magnet.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="#answers">
                Straight answers <Nudge />
              </Pill>
              <Pill href="/work" variant="light">
                Read the case studies
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ Notes ═══════════════════════════════════════════════════ */}
      <Section tone="bone" id="notes" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Engineering notes"
            lead="What we would write up,"
            trail="drawn from systems we shipped"
            body="Each note comes out of a specific build. When one is published, its card becomes a link and the pending marker disappears."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((n) => {
            const inner = (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.58rem] uppercase tracking-wider text-signal">
                    {n.tag}
                  </span>
                  <span className="ml-auto font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                    {n.from}
                  </span>
                </div>
                <h3 className="mt-4 text-[1.02rem] font-medium leading-snug tracking-tight text-ink">
                  {n.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">
                  {n.body}
                </p>
                <p className="mt-auto pt-5 font-mono text-[0.6rem] uppercase tracking-wider text-mute/70">
                  {n.href ? "Read the note →" : "not written yet"}
                </p>
              </>
            );

            return (
              <Item key={n.title} className="h-full">
                {n.href ? (
                  <Link
                    href={n.href}
                    className="group flex h-full flex-col bg-paper p-7 transition-colors duration-200 hover:bg-white"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col bg-paper p-7">{inner}</div>
                )}
              </Item>
            );
          })}
        </Stagger>
      </Section>

      {/* ══ Answers ═════════════════════════════════════════════════ */}
      <Section tone="alt" id="answers" className="blueprint scroll-mt-32">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <SectionIntro
              eyebrow="Straight answers"
              lead="Six questions"
              trail="asked on every first call"
            />
          </FadeUp>
          <FadeUp>
            <div className="overflow-hidden rounded-xl border border-line bg-paper">
              {answers.map((a, i) => (
                <details
                  key={a.q}
                  className={`group px-6 py-5 ${i > 0 ? "border-t border-line" : ""}`}
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[1rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {a.q}
                    <span
                      aria-hidden
                      className="shrink-0 text-lg text-mute transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-xl pt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                    {a.a}
                  </p>
                </details>
              ))}
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ══ Page index ══════════════════════════════════════════════ */}
      <Section tone="bone" id="index" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Page index"
            lead="Everything on this site,"
            trail="in one list"
            body={`${services.length} services, ${industries.length} industries, and ${consoleProjects.length} case studies, each one linked to the production system behind it.`}
          />
        </FadeUp>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {[
            { title: "Services", base: "/services", items: services.map((s) => ({ label: s.nav, slug: s.slug })) },
            { title: "Industries", base: "/industries", items: industries.map((s) => ({ label: s.nav, slug: s.slug })) },
            { title: "Case studies", base: "/work", items: consoleProjects.map((p) => ({ label: p.name, slug: p.slug })) },
          ].map((col) => (
            <FadeUp key={col.title}>
              <p className="mono-label border-b border-line pb-3">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it.slug}>
                    <Link
                      href={`${col.base}/${it.slug}`}
                      className="group inline-flex items-baseline gap-2 text-[0.9rem] text-ink-soft transition-colors hover:text-ink"
                    >
                      <span
                        aria-hidden
                        className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        →
                      </span>
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">No email wall</p>
            <h2 className="display-lg mt-5 text-bone">
              Nothing here is gated{" "}
              <span className="text-bone/50">because a PDF is not a relationship</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-bone/70">
              If you want the architecture behind one of our {stats.live} live
              systems explained, ask an engineer directly. That is faster than a
              whitepaper and considerably more accurate.
            </p>
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
