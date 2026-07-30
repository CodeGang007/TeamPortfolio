import type { Metadata } from "next";
import Link from "next/link";
import { clients, stats } from "@/content/site";
import { consoleProjects } from "@/content/projects";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import { Plate, SectionNav, TrustRow, VisualLead } from "@/components/site/blocks";
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
  title: "Partners",
  description: `The organisations our ${stats.live} live systems run for, and the two ways we partner with other teams.`,
  openGraph: { title: "Partners — CodeGang", url: "/partners" },
  alternates: { canonical: "/partners" },
};

const sections = [
  { id: "clients", label: "Who we build for" },
  { id: "models", label: "Partnership models" },
  { id: "platforms", label: "Platforms" },
  { id: "apply", label: "Become a partner" },
] as const;

const trust = [
  { value: stats.clientsServed, label: "Clients served", sub: `${stats.regions} regions` },
  { value: String(clients.length), label: "Named publicly", sub: "the rest under NDA" },
  { value: String(stats.live), label: "Systems live", sub: "in production now" },
  { value: "", label: "Reseller badges", pending: true },
] as const;

/**
 * Only two models, because those are the only two we have actually run.
 * A partner page that lists five tiers we have never used is noise.
 */
const models = [
  {
    n: "I",
    title: "White-label delivery",
    body: "Agencies and consultancies bring us in as the engineering team behind their own client relationship. We stay invisible: your repo, your branding, your project manager fronting it.",
    fit: "Design studios and consultancies with a client who needs a build.",
  },
  {
    n: "II",
    title: "Referral",
    body: "You introduce a project that is not a fit for you. We scope it, and you stay in the loop on progress if the client is happy for you to be.",
    fit: "Product people and founders with an inbound they cannot take.",
  },
];

const why = [
  { lead: "You keep the relationship", body: "On white-label work we do not contact your client independently or market to them afterwards." },
  { lead: "One engineer, named", body: "You get a named technical contact, not a rotating account manager." },
  { lead: "Estimates that hold", body: "Scope is written down before build starts, so a fixed quote to your client is safe to give." },
  { lead: "NDA by default", body: "Confidentiality is the starting position on every engagement, including yours." },
  { lead: "We say no", body: "If a project is outside what we have shipped, we tell you rather than learning on your client's budget." },
  { lead: "Handover included", body: "If you want to take maintenance in-house afterwards, the documentation to do that is part of delivery." },
];

/**
 * Platforms we have production experience on — not vendor partnership badges.
 * We hold none of those, and the trust row says so explicitly.
 */
const platforms = [
  { name: "AWS", detail: "Bedrock, ECS, RDS, OpenSearch — Verse AI's seven-layer stack" },
  { name: "Google Play", detail: "eMedici released and maintained on the store" },
  { name: "PostgreSQL", detail: "Every platform we run, including Pinnacle's 39-table schema" },
  { name: "Docker", detail: "Containerised delivery on all current builds" },
  { name: "Flutter", detail: "Cross-platform mobile, shipped to production" },
  { name: "Next.js", detail: "Front-end for the platforms and this site" },
];

export default function PartnersPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow="Partners"
            plate={<Plate label="Partners — engagement map" ratio="4/3" className="shadow-frame" />}
          >
            <Display size="xl" lead="Two ways to partner," trail="both of them real" />
            <Body className="mt-6 max-w-xl text-base">
              We have run white-label delivery and referral arrangements. Those
              are the two on this page. We hold no reseller badges, which is why
              that slot is blank.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="#models">
                See the models <Nudge />
              </Pill>
              <Pill href="/contact" variant="light">
                Start a conversation
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ Who we build for ════════════════════════════════════════ */}
      <Section tone="bone" id="clients" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Who we build for"
            lead="The names we can print,"
            trail="and the many we cannot"
            body={`${stats.clientsServed} clients over the studio's lifetime. These five have a live system we are permitted to name — the rest are under NDA and stay unnamed rather than being padded out with logos.`}
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => {
            const p = consoleProjects.find((x) => x.slug === c.slug);
            return (
              <Item key={c.name} className="h-full">
                <Link
                  href={`/work/${c.slug}`}
                  className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-200 hover:bg-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                      {c.detail}
                    </span>
                    <span
                      aria-hidden
                      className={`ml-auto h-1.5 w-1.5 rounded-full ${
                        p?.status === "live" ? "pulse-dot bg-signal" : "bg-line-strong"
                      }`}
                    />
                  </div>
                  <h3 className="mt-3 text-[1.05rem] font-medium leading-snug tracking-tight text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                    {p?.summary}
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
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              </Item>
            );
          })}
          <Item className="flex h-full flex-col justify-center bg-bone-alt/60 p-7">
            <p className="font-serif text-[2rem] leading-none text-line-strong">
              &mdash;
            </p>
            <p className="mt-4 text-[0.9rem] font-medium text-ink">
              The rest, under NDA
            </p>
            <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">
              Most of {stats.projectsDelivered} delivered projects cannot be
              itemised publicly. We would rather leave the space empty.
            </p>
          </Item>
        </Stagger>
      </Section>

      {/* ══ Models ══════════════════════════════════════════════════ */}
      <Section tone="alt" id="models" className="blueprint scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Partnership models"
            lead="Two arrangements"
            trail="we have actually run"
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-4 lg:grid-cols-2">
          {models.map((m) => (
            <Item
              key={m.n}
              className="group rounded-xl border border-line bg-paper p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-frame"
            >
              <span
                aria-hidden
                className="font-serif text-4xl leading-none text-line-strong transition-colors group-hover:text-signal/40"
              >
                {m.n}
              </span>
              <h3 className="mt-5 text-[1.2rem] font-medium tracking-tight text-ink">
                {m.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {m.body}
              </p>
              <p className="mt-5 border-t border-line pt-4 font-mono text-[0.62rem] uppercase tracking-wider text-mute">
                Fits — {m.fit}
              </p>
            </Item>
          ))}
        </Stagger>

        <FadeUp className="mt-14">
          <LeadIns items={why} />
        </FadeUp>
      </Section>

      {/* ══ Platforms ═══════════════════════════════════════════════ */}
      <Section tone="bone" id="platforms" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Platforms"
            lead="Production experience,"
            trail="not partnership badges"
            body="These are platforms we have shipped and maintained systems on. We are not a certified reseller of any of them, and this page will not pretend otherwise."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <Item key={p.name} className="bg-paper p-7">
              <h3 className="text-[1rem] font-medium tracking-tight text-ink">
                {p.name}
              </h3>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                {p.detail}
              </p>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ Apply ═══════════════════════════════════════════════════ */}
      <Section tone="ink" id="apply" className="scroll-mt-32">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">Become a partner</p>
            <h2 className="display-lg mt-5 text-bone">
              Tell us about the project{" "}
              <span className="text-bone/50">and who owns the relationship</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-bone/70">
              One email with the scope and the timeline is enough to start. It
              goes to the founders, not to a partner-programme inbox.
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Start a conversation <Nudge />
            </Link>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
