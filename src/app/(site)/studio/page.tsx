import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { stats, site } from "@/content/site";
import WorldClock from "@/components/console/WorldClock";
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
  LeadIns,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Five engineers. No sales layer, no hand-off — the engineer in the meeting is the one writing the code.",
  openGraph: {
    title: "Studio — CodeGang",
    description: "Five engineers. No sales layer, no hand-off.",
    url: "/studio",
  },
  alternates: { canonical: "/studio" },
};

// The public faces of the studio (the rest of the team stays off the site
// by choice). Mottos are theirs to edit in one place.
// TODO(team): real photos for Gourav, Subhadip, and Sushant are coming —
// drop them in public/avatars/ and swap the `avatar` paths below.
const founders = [
  {
    name: "Gourav Chakraborty",
    focus: "Full stack · System design",
    line: "Architecture and the code that has to survive production.",
    quote: "If it can't survive production, it isn't finished.",
    avatar: "/avatars/founder-eng.png",
  },
  {
    name: "Subhadip Sasmal",
    focus: "Product design · UX",
    line: "Interfaces that respect the person using them.",
    quote: "Good design is the shortest path between a user and their goal.",
    avatar: "/avatars/founder-design.png",
  },
  {
    name: "Sushant Choudhary",
    focus: "Strategy · Client engineering",
    line: "Runs the engagements and keeps the roadmap honest.",
    quote: "Scope honestly, then ship exactly that.",
    avatar: "/avatars/founder-strategy.png",
  },
  {
    name: "Abhrajit",
    focus: "Software engineering",
    line: "Builds and hardens the systems behind the case studies.",
    quote: "Simple systems survive. Clever ones page you at 3 a.m.",
    avatar: "/avatars/founder-backend.png",
  },
  {
    name: "Sourajit",
    focus: "Software engineering",
    line: "Ships features and keeps the pipelines green.",
    quote: "Code is read a hundred times more often than it is written.",
    avatar: "/avatars/founder-fullstack.png",
  },
];

const principles = [
  {
    title: "The engineer in the meeting writes the code.",
    body: "There are five of us and no account managers. Whoever scopes your system builds your system.",
  },
  {
    title: "We stay on after shipping.",
    body: "Most of our live systems are still under active maintenance and roadmap by us. Live means someone is watching it.",
  },
  {
    title: "Claims come with evidence.",
    body: "Every number on this site is computed from the systems themselves. If we can't source a stat, we don't publish it.",
  },
  {
    title: "Small on purpose.",
    body: `Five engineers, ${stats.live + stats.building} systems, ${stats.regions} regions. Small enough that nothing gets lost between the person who promised and the person who builds.`,
  },
];

const sections = [
  { id: "how-we-work", label: "How we work" },
  { id: "team", label: "The team" },
  { id: "engagement", label: "Engagement" },
  { id: "inside", label: "Inside the studio" },
] as const;

const trust = [
  { value: "5", label: "Engineers", sub: "the whole studio" },
  { value: String(stats.live), label: "Systems live", sub: `${stats.regions} regions` },
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: "0", label: "Account managers", sub: "no sales layer" },
] as const;

/** How an engagement actually runs, in the terms a buyer asks about. */
const engagement = [
  { lead: "Your repository", body: "We work in your organisation from the first commit. You own the code throughout, not on final payment." },
  { lead: "Your cloud", body: "Deployment goes into your account under your keys. We hand over infrastructure, not access to a hosted black box." },
  { lead: "Fixed scope, written down", body: "What the system does and what shipping means are agreed in writing before build starts." },
  { lead: "Timezone overlap agreed", body: "We work across five client regions and set the overlap explicitly rather than pretending it is free." },
  { lead: "Runbooks included", body: "Handover documentation is in the estimate, so ending an engagement is not a cliff." },
  { lead: "NDA by default", body: "Confidentiality is the starting position, which is why most of our delivered work is unnamed on this site." },
];

const inside = [
  { label: "Studio — the five of us" },
  { label: "Review — pairing on retrieval" },
  { label: "Whiteboard — clinical schema" },
  { label: "Ship day — Verse AI cutover" },
];

export default function StudioPage() {
  return (
    <>
      {/* ══ Page head ═══════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div
          aria-hidden
          className="blueprint mask-fade-y absolute inset-0 -z-10"
        />
        <Shell>
          <VisualLead
            eyebrow="Studio"
            plate={
              <Plate
                label="Studio — the five of us"
                ratio="16/11"
                className="shadow-frame"
              />
            }
          >
            <Display size="xl" lead="Five engineers." trail="No hand-off." />
            <Body className="mt-6 max-w-xl text-base">
              CodeGang is a software engineering studio. We build production AI,
              multi-tenant platforms, and mobile apps for clients in Brazil,
              Australia, India, the USA and Europe — and we keep them running
              after launch.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="#team">
                Meet the team <Nudge />
              </Pill>
              <Pill href="/our-values" variant="light">
                Read our values
              </Pill>
            </div>
          </VisualLead>

          <WorldClock className="mt-12" />

          <div className="mt-12">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ Principles ══════════════════════════════════════════════ */}
      <Section tone="alt" id="how-we-work" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            align="center"
            eyebrow="How we work"
            lead="Four rules"
            trail="we do not break"
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <Item
              key={p.title}
              className="overflow-hidden rounded-xl border border-line bg-paper"
            >
              <h3 className="border-b border-line px-6 py-4 text-[0.95rem] font-medium text-ink">
                {p.title}
              </h3>
              <p className="px-6 py-5 text-[0.875rem] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ The team ════════════════════════════════════════════════ */}
      <Section tone="bone" id="team" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="The team"
            lead="The faces"
            trail="of the studio"
            body="Five engineers. The whole team still fits on one line of a standup."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {founders.map((f) => (
            <Item
              key={f.name}
              className="group overflow-hidden rounded-xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-frame"
            >
              {/* Poster panel — blueprint grid, name set large, cutout portrait */}
              <div className="blueprint-fine relative overflow-hidden bg-bone-alt px-6 pb-0 pt-6">
                <p className="text-[1.6rem] font-medium leading-[1.05] tracking-tight text-ink">
                  {f.name.split(" ")[0]}
                  {f.name.includes(" ") && (
                    <>
                      <br />
                      <span className="text-mute">
                        {f.name.split(" ").slice(1).join(" ")}
                      </span>
                    </>
                  )}
                </p>
                <p className="mono-label mb-14 mt-3 max-w-[58%] !text-signal">
                  {f.focus}
                </p>
                <Image
                  src={f.avatar}
                  alt=""
                  width={200}
                  height={200}
                  className="absolute -bottom-1 right-2 h-32 w-32 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-36 sm:w-36"
                />
              </div>

              <figure className="border-t border-line p-6">
                <blockquote className="font-serif text-[1.2rem] leading-snug text-ink">
                  &ldquo;{f.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[0.82rem] text-mute">
                  {f.line}
                </figcaption>
              </figure>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ Engagement ══════════════════════════════════════════════ */}
      <Section tone="alt" id="engagement" className="blueprint scroll-mt-32">
        <FadeUp>
          <VisualLead
            eyebrow="Engagement"
            reverse
            plate={
              <Plate
                label="Engagement — scope to handover"
                ratio="1/1"
                className="shadow-frame"
              />
            }
          >
            <Display size="md" lead="What working with us" trail="actually looks like" />
            <Body className="mt-5 max-w-lg">
              Six terms that hold on every engagement, whether it runs a month
              or a year.
            </Body>
          </VisualLead>
        </FadeUp>
        <FadeUp className="mt-12">
          <LeadIns items={engagement} />
        </FadeUp>
        <FadeUp className="mt-10">
          <Link
            href="/services"
            className="inline-block text-[0.875rem] font-medium text-signal hover:underline"
          >
            See every service we offer →
          </Link>
        </FadeUp>
      </Section>

      {/* ══ Inside the studio ═══════════════════════════════════════ */}
      <Section tone="bone" id="inside" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Inside the studio"
            lead="Photographs pending"
            trail="rather than stock photography"
            body="These fill in with real pictures of the room and the work. Until they exist they stay marked, which is the same rule that governs every number on this site."
          />
        </FadeUp>
        <div className="mt-12">
          <Gallery items={inside} />
        </div>
      </Section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <Section tone="ink">
        <FadeUp>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="display-md max-w-xl text-bone">
              Talk to the people{" "}
              <span className="text-bone/50">who actually build it.</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-[10px] bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                Chat with an engineer <Nudge />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center rounded-[10px] border border-bone/25 px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-bone/10"
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
