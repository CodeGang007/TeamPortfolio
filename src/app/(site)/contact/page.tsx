import type { Metadata } from "next";
import Link from "next/link";
import { site, stats, whatsappDisplay, whatsappHref, marketsShort, marketsLong } from "@/content/site";
import WhatsAppGlyph from "@/components/console/WhatsAppGlyph";
import { getConsoleProject } from "@/content/projects";
import ContactForm from "@/components/console/ContactForm";
import WorldClock from "@/components/console/WorldClock";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import { Plate, TrustRow, VisualLead } from "@/components/site/blocks";
import {
  Body,
  Display,
  LeadIns,
  Nudge,
  Rule,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

const trust = [
  { value: "<24h", label: "First reply", sub: "from an engineer" },
  { value: "0", label: "Sales calls", sub: "no qualification layer" },
  { value: String(stats.live), label: "Systems live", sub: marketsShort },
  { value: "None", label: "Minimum budget", sub: "we do not set one" },
] as const;

/** What actually happens after you press send. */
const afterwards = [
  { n: "I", title: "It reaches us", body: "The message lands in the founders' Telegram immediately. There is no queue and nobody triages it." },
  { n: "II", title: "An engineer replies", body: "Usually within a day, with questions about the problem rather than a calendar link." },
  { n: "III", title: "A call, if useful", body: "Forty-five minutes with the person who would build it. No deck, no discovery theatre." },
  { n: "IV", title: "Scope in writing", body: "If it is a fit, you get scope, phases, and an estimate you can hold us to." },
];

const expect = [
  { lead: "No NDA needed first", body: "Confidentiality is our default position. Send the NDA if you want one on file, but do not wait on it to describe the problem." },
  { lead: "We will say no", body: "If it is outside what we have shipped, we tell you rather than learning on your budget." },
  { lead: "Rough is fine", body: "A paragraph about the problem beats a specification document. We would rather help shape the scope." },
  { lead: "You keep the estimate", body: "Scope and architecture from a first conversation are yours, whether or not you build with us." },
  { lead: "Founders, not a funnel", body: "There is no CRM sequence behind this form. The founders read it." },
  { lead: "Timezones", body: `We work across ${marketsLong}, so one of the clocks below is always business hours.` },
];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are trying to ship. Your message lands in the founders' Telegram instantly: the engineer who answers is the one who will build it.",
  openGraph: {
    title: "Contact · CodeGang",
    description: "Tell us what you are trying to ship.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ about?: string }>;
}) {
  const { about } = await searchParams;
  const aboutProject = about ? getConsoleProject(about) : undefined;

  return (
    <>
      {/* ══ Page head ═══════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-b border-line bg-bone pb-12 pt-40 sm:pt-48">
        <div
          aria-hidden
          className="blueprint mask-fade-y absolute inset-0 -z-10"
        />
        <Shell>
          <VisualLead
            eyebrow="Contact"
            plate={
              <Plate
                label="Studio, where the message lands"
                src="/contact/message-lands.jpg"
                alt="A phone lighting up with a notification on a desk beside a laptop showing code"
                ratio="16/11"
                className="shadow-frame"
              />
            }
          >
            <Display
              as="h1"
              size="xl"
              lead="Tell us what"
              trail="you are trying to ship."
            />
            <Body className="mt-6 max-w-xl text-base">
              {aboutProject
                ? `You came from the ${aboutProject.name} case study: say so and skip the context-setting. `
                : ""}
              Your message lands in the founders&apos; Telegram the moment you
              send it. No form queue, no sales layer.
            </Body>
            <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-wider text-mute">
              <a href={`mailto:${site.email}`} className="text-signal hover:underline">
                {site.email}
              </a>{" "}
              · NDA by default
            </p>
          </VisualLead>

          <div className="mt-12">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      {/* ══ Form ════════════════════════════════════════════════════ */}
      <section className="bg-bone py-16 sm:py-20">
        <Shell>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <FadeUp>
              <ContactForm about={aboutProject?.slug} />
            </FadeUp>

            <FadeUp delay={0.1}>
              <aside className="rounded-2xl border border-line bg-bone-alt p-6 lg:sticky lg:top-32">
                <p className="mono-label">Prefer email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block text-[0.875rem] font-medium text-signal hover:underline"
                >
                  {site.email}
                </a>

                <Rule className="my-6" />

                <p className="mono-label">Message us</p>
                <a
                  href={whatsappHref(
                    "Hi CodeGang, I want to discuss a project."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-[#1EBE5A]"
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  WhatsApp {whatsappDisplay}
                </a>

                <Rule className="my-6" />

                <p className="mono-label">Detailed brief</p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                  Have a scoped project with documents and requirements?
                </p>
                <Link
                  href="/start-a-project"
                  className="mt-2 inline-block text-[0.85rem] font-medium text-signal hover:underline"
                >
                  Submit a full brief →
                </Link>

                <Rule className="my-6" />

                <p className="mono-label">Elsewhere</p>
                <ul className="mt-2 space-y-1.5">
                  {[
                    { name: "LinkedIn", href: site.linkedin },
                    { name: "X", href: site.x },
                  ].map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.85rem] text-ink-soft transition-colors hover:text-ink"
                      >
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <Rule className="my-6" />

                <p className="font-mono text-[0.62rem] uppercase leading-relaxed tracking-wider text-mute">
                  {stats.live} systems live · {marketsShort} · NDA by
                  default
                </p>
              </aside>
            </FadeUp>
          </div>

          <FadeUp className="mt-16 border-t border-line pt-8">
            <p className="mono-label mb-4">
              Wherever you are, one of these is business hours
            </p>
            <WorldClock />
          </FadeUp>
        </Shell>
      </section>

      {/* ══ What happens next ═══════════════════════════════════════ */}
      <Section tone="alt" className="blueprint">
        <FadeUp>
          <SectionIntro
            align="center"
            eyebrow="What happens next"
            lead="Four steps,"
            trail="and none of them is a discovery call"
          />
        </FadeUp>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {afterwards.map((s) => (
            <Item
              key={s.n}
              className="group rounded-xl border border-line bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-frame"
            >
              <span
                aria-hidden
                className="font-serif text-4xl leading-none text-line-strong transition-colors group-hover:text-signal/40"
              >
                {s.n}
              </span>
              <p className="mt-4 text-[0.95rem] font-medium text-ink">{s.title}</p>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ What to expect ══════════════════════════════════════════ */}
      <Section tone="bone">
        <FadeUp>
          <SectionIntro
            eyebrow="What to expect"
            lead="Six things"
            trail="worth knowing before you write"
          />
        </FadeUp>
        <FadeUp className="mt-12">
          <LeadIns items={expect} />
        </FadeUp>
      </Section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">Or skip the form</p>
            <h2 className="display-lg mt-5 text-bone">
              Email the founders directly{" "}
              <span className="text-bone/50">and say what you need built</span>
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                {site.email} <Nudge />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone/50"
              >
                Browse services
              </Link>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
