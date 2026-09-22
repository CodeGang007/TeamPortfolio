import type { Metadata } from "next";
import Link from "next/link";
import { consoleProjects } from "@/content/projects";
import { PORTFOLIO_PROJECTS, hasCaseStudy } from "@/data/portfolioProjects";
import { clients, stats, marketsShort, marketsLong } from "@/content/site";
import { FadeUp } from "@/components/site/motion";
import { Gallery, Plate, SectionNav, TrustRow, VisualLead } from "@/components/site/blocks";
import PortfolioGrid from "@/components/site/PortfolioGrid";
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
  title: "Portfolio",
  description: `Every system we have built, filterable by sector and status: ${stats.live} live across ${marketsLong}, ${stats.building} in build.`,
  openGraph: { title: "Portfolio · CodeGang", url: "/portfolio" },
  alternates: { canonical: "/portfolio" },
};

const sections = [
  { id: "grid", label: "All systems" },
  { id: "screens", label: "Screens" },
  { id: "nda", label: "Under NDA" },
] as const;

const trust = [
  { value: String(consoleProjects.length), label: "Systems documented", sub: `${consoleProjects.filter((p) => hasCaseStudy(p.slug)).length} with a full case study` },
  { value: String(stats.live), label: "Live in production", sub: marketsShort },
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: "", label: "Awards", sub: "none entered for", pending: true },
] as const;

const clientBySlug = Object.fromEntries(
  clients.map((c) => [c.slug, c.name]),
) as Record<string, string>;

/**
 * Real production screenshots, joined by slug from data/portfolioProjects.ts.
 * These already existed — every card and every tile below is an actual
 * interface, not a placeholder.
 */
const shotBySlug = Object.fromEntries(
  PORTFOLIO_PROJECTS.map((p) => [p.id, p.image]),
) as Record<string, string>;

/**
 * The screens strip. Two per system so the wall stays even, drawn from each
 * project's own gallery with its real caption.
 */
const screens = PORTFOLIO_PROJECTS.flatMap((p) =>
  // Stills only — a project's video walkthrough gets its own player on the
  // case-study page, not a spot in this screenshot strip.
  p.gallery
    .filter((g) => g.type !== "video")
    .slice(0, 2)
    .map((g) => ({
      label: g.caption,
      src: g.src,
      // Screenshots, not photos: aspect ratios run 0.56 (phone) to 2.97.
      fit: "contain" as const,
      href: `/work/${p.id}`,
    })),
);

export default function PortfolioPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow="Portfolio"
            plate={
              <Plate
                label="Systems wall, all builds"
                src="/portfolio/systems-wall.webp"
                alt="An engineer reviewing the wall of printed screens from every live system"
                ratio="4/3"
                className="shadow-frame"
              />
            }
          >
            <Display as="h1" size="xl" lead="Every system," trail="filterable and checkable" />
            <Body className="mt-6 max-w-xl text-base">
              {consoleProjects.length} documented systems: {stats.live} live in
              production across {marketsLong}, {stats.building} in
              build. Filter by sector or status; each card opens the case study.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="#grid">
                Browse the systems <Nudge />
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

      {/* ══ Grid ════════════════════════════════════════════════════ */}
      <Section tone="bone" id="grid" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="All systems"
            lead="The whole shelf,"
            trail="nothing curated out"
            body="In-build systems are shown as in-build. A portfolio that only shows finished work tells you nothing about how the studio actually runs."
          />
        </FadeUp>
        <div className="mt-12">
          <PortfolioGrid
            projects={consoleProjects}
            clientBySlug={clientBySlug}
            shotBySlug={shotBySlug}
          />
        </div>
      </Section>

      {/* ══ Screens ═════════════════════════════════════════════════ */}
      <Section tone="alt" id="screens" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Screens"
            lead="Interfaces from production,"
            trail="not mock-ups"
            body="Two screens from each system, with the captions they carry in the case study. Every tile links to the build it came from."
          />
        </FadeUp>
        <div className="mt-12">
          <Gallery items={screens} />
        </div>
      </Section>

      {/* ══ NDA ═════════════════════════════════════════════════════ */}
      <Section tone="bone" id="nda" className="scroll-mt-32">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <SectionIntro
              eyebrow="Under NDA"
              lead="Most of what we build"
              trail="we are not allowed to name"
            />
          </FadeUp>
          <FadeUp>
            <div className="space-y-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              <p>
                {stats.projectsDelivered} projects for {stats.clientsServed}{" "}
                clients over the studio&apos;s lifetime.{" "}
                {consoleProjects.length} of them are documented here: the rest
                run under client confidentiality agreements.
              </p>
              <p>
                That does not put them out of reach. We can take you through the
                architecture, the stack, the integrations and the outcome of a
                comparable system without naming the client it was built for.
              </p>
              <p>
                Tell us your sector and we will tell you what we have already
                shipped in it.
              </p>
              <Link
                href="/contact"
                className="inline-block text-[0.875rem] font-medium text-signal hover:underline"
              >
                Ask about work in your sector →
              </Link>
            </div>
          </FadeUp>
        </div>
      </Section>

      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">Proof over promises</p>
            <h2 className="display-lg mt-5 text-bone">
              Every card on this page{" "}
              <span className="text-bone/50">opens a system you can inspect</span>
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
