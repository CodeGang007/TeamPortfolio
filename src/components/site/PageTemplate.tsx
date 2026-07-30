import Link from "next/link";
import { consoleProjects } from "@/content/projects";
import { PORTFOLIO_PROJECTS } from "@/data/portfolioProjects";
import { stats } from "@/content/site";
import type { PageSpec } from "@/content/pages";
import { FadeUp, Item, Stagger } from "./motion";
import { Plate, SectionNav, TrustRow, VisualLead } from "./blocks";
import {
  Body,
  Display,
  Eyebrow,
  LeadIns,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "./primitives";

/* ═══════════════════════════════════════════════════════════════════
   SERVICE / INDUSTRY PAGE TEMPLATE

   Every page under /services and /industries renders through here from
   a single PageSpec, so the twenty-odd pages stay one component. If a
   page needs a bespoke section, it belongs in the spec as data — not as
   a fork of this file.
   ═══════════════════════════════════════════════════════════════════ */

const sections = [
  { id: "what", label: "What we build" },
  { id: "why", label: "Why it matters" },
  { id: "process", label: "How it runs" },
  { id: "proof", label: "Proof" },
  { id: "faq", label: "FAQ" },
] as const;

// Trust row. `pending` entries render an explicit blank — we do not publish
// a Clutch or Google score until a real one exists.
const trust = [
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: stats.clientsServed, label: "Clients served", sub: `${stats.regions} regions` },
  { value: String(stats.live), label: "Systems live", sub: "in production now" },
  { value: "", label: "Clutch rating", pending: true },
] as const;

const phases = [
  { n: "I", title: "Scope", body: "We agree what the system does and what shipping means, in writing." },
  { n: "II", title: "Build", body: "Short cycles in your repository, running before it is finished." },
  { n: "III", title: "Ship", body: "Deployed into your cloud account, reachable by a real user." },
  { n: "IV", title: "Stay", body: "Maintenance and roadmap by the same engineers who built it." },
];

export default function PageTemplate({
  spec,
  kind,
}: {
  spec: PageSpec;
  kind: "service" | "industry";
}) {
  const base = kind === "service" ? "/services" : "/industries";
  const backLabel = kind === "service" ? "All services" : "All industries";

  const proofProjects = spec.proof
    .map((slug) => consoleProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // The page leads with a real screen from its first proof system rather than a
  // placeholder — these screenshots already exist in data/portfolioProjects.ts,
  // keyed by the same slug, so there is no reason to draw an empty plate.
  const leadProject = PORTFOLIO_PROJECTS.find((p) => p.id === spec.proof[0]);
  const leadShot = leadProject?.gallery[0];

  // A second screen for the "why it matters" band, drawn from further into the
  // same gallery so the two visuals on the page are never the same image.
  const secondShot = leadProject?.gallery[1] ?? leadProject?.gallery[0];

  return (
    <>
      {/* ══ Page head ═══════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <Link
            href={base}
            className="mono-label mb-8 inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            <span aria-hidden>←</span> {backLabel}
          </Link>

          <VisualLead
            eyebrow={spec.eyebrow}
            plate={
              <figure>
                <Plate
                  label={leadShot?.caption ?? spec.plate}
                  src={leadShot?.src}
                  alt={leadShot ? leadShot.caption : ""}
                  ratio="16/11"
                  className="shadow-frame"
                />
                {leadShot && leadProject ? (
                  <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2">
                    <span className="mono-label">{leadProject.title}</span>
                    <Link
                      href={`/work/${leadProject.id}`}
                      className="text-[0.78rem] font-medium text-signal hover:underline"
                    >
                      see the case study →
                    </Link>
                  </figcaption>
                ) : null}
              </figure>
            }
          >
            <Display size="xl" lead={spec.lead} trail={spec.trail} />
            <Body className="mt-6 max-w-xl text-base">{spec.intro}</Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="/contact">
                Talk to an engineer <Nudge />
              </Pill>
              <Pill href="#proof" variant="light">
                See the proof
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ What we build ═══════════════════════════════════════════ */}
      <Section tone="bone" id="what" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="What we build"
            lead="The work itself,"
            trail="component by component"
            body="Everything listed here is something we have built into a production system, not a capability we are willing to attempt."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {spec.offerings.map((o, i) => (
            <Item
              key={o.title}
              className="group relative bg-paper p-7 transition-colors duration-200 hover:bg-white"
            >
              <span
                aria-hidden
                className="font-mono text-[0.6rem] uppercase tracking-widest text-line-strong"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[1.02rem] font-medium leading-snug tracking-tight text-ink">
                {o.title}
              </h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">
                {o.body}
              </p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100"
              />
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ Why it matters ══════════════════════════════════════════ */}
      <Section tone="alt" id="why" className="blueprint scroll-mt-32">
        <FadeUp>
          <VisualLead
            eyebrow="Why it matters"
            reverse
            plate={
              <Plate
                label={secondShot?.caption ?? `${spec.nav} — outcome board`}
                src={secondShot?.src}
                alt={secondShot ? secondShot.caption : ""}
                ratio="4/3"
                className="shadow-frame"
              />
            }
          >
            <Display size="md" lead="What changes" trail="once it is running" />
            <Body className="mt-5 max-w-lg">
              Three things a buyer of this work should be able to hold us to.
            </Body>
          </VisualLead>
        </FadeUp>

        <FadeUp className="mt-12">
          <LeadIns items={spec.outcomes} />
        </FadeUp>

        <FadeUp className="mt-14">
          <Eyebrow className="mb-5">Stack we use for this</Eyebrow>
          <ul className="flex flex-wrap gap-2">
            {spec.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-paper px-3.5 py-1.5 font-mono text-[0.68rem] text-ink-soft transition-colors hover:border-signal/45 hover:text-ink"
              >
                {t}
              </li>
            ))}
          </ul>
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

      {/* ══ Proof ═══════════════════════════════════════════════════ */}
      <Section tone="alt" id="proof" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Proof"
            lead="The systems"
            trail="that back this page"
            body="Nothing above is a capability we have not already shipped. These are the case studies it comes from."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proofProjects.map((p) => (
            <Item key={p.slug} className="h-full">
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-frame"
              >
                <Plate
                  label={`${p.name} — screen`}
                  src={PORTFOLIO_PROJECTS.find((x) => x.id === p.slug)?.image}
                  alt={`${p.name} interface`}
                  ratio="16/10"
                  className="!rounded-none !border-0 !border-b !border-line"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                      {p.sector}
                    </span>
                    <span
                      aria-hidden
                      className={`ml-auto h-1.5 w-1.5 rounded-full ${
                        p.status === "live" ? "pulse-dot bg-signal" : "bg-line-strong"
                      }`}
                    />
                  </div>
                  <h3 className="mt-3 text-[1.1rem] font-medium tracking-tight text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
                  <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-wider text-mute">
                    {p.city} · {p.stack.join(" · ")}
                  </p>
                  <span className="mt-auto pt-5 text-[0.82rem] font-medium text-signal">
                    Read the case study
                    <span
                      aria-hidden
                      className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ FAQ ═════════════════════════════════════════════════════ */}
      <Section tone="bone" id="faq" className="scroll-mt-32">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <SectionIntro eyebrow="FAQ" lead="Questions" trail="we get asked" />
          </FadeUp>
          <FadeUp>
            <div className="overflow-hidden rounded-xl border border-line bg-paper">
              {spec.faq.map((f, i) => (
                <details
                  key={f.q}
                  className={`group px-6 py-5 ${i > 0 ? "border-t border-line" : ""}`}
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-[1rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="shrink-0 text-lg text-mute transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-xl pt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">{spec.eyebrow}</p>
            <h2 className="display-lg mt-5 text-bone">
              Tell us what you need built{" "}
              <span className="text-bone/50">and we will tell you what it takes</span>
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                Talk to an engineer <Nudge />
              </Link>
              <Link
                href={base}
                className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone/50"
              >
                {backLabel}
              </Link>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
