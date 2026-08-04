import type { Metadata } from "next";
import Link from "next/link";
import { briefFaqs } from "@/content/brief";
import { site, stats, marketsLong } from "@/content/site";
import BriefForm from "@/components/site/BriefForm";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import {
  Body,
  Display,
  Section,
  SectionIntro,
  Shell,
} from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Send a project brief straight to the engineers who would build it. No sign-in, no sales call, no NDA needed first: a reply from a founder, usually within one business day.",
  openGraph: {
    title: "Start a project. CodeGang",
    description:
      "Send a project brief straight to the engineers who would build it. No sign-in, no sales layer.",
    url: "/start-a-project",
  },
  alternates: { canonical: "/start-a-project" },
};

/**
 * FAQPage structured data, generated from the same array the page renders.
 * Answer engines quote these directly, so the visible answer and the machine
 * readable one are the same string by construction.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: briefFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const promises = [
  {
    n: "01",
    title: "It reaches a founder, not a queue",
    body: "The brief lands in the founders' Telegram the moment you send it. Nobody triages it, scores it, or drops it into a nurture sequence.",
  },
  {
    n: "02",
    title: "An engineer answers",
    body: "Usually inside a business day, with questions about the problem rather than a link to somebody's calendar.",
  },
  {
    n: "03",
    title: "You get scope in writing",
    body: "If it is a fit, you get phases, architecture and an estimate you can hold us to: yours to keep whether or not you build with us.",
  },
];

export default function StartAProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ══ Page head ═══════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-bone pb-10 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <div className="max-w-3xl">
            <p className="mono-label !text-signal">Start a project</p>
            <Display
              as="h1"
              size="xl"
              className="mt-5"
              lead="Tell us what you need built."
              trail="An engineer reads it."
            />
            <Body className="mt-6 max-w-xl text-base">
              Five short steps, no sign-in, and no sales layer on the other
              side. Your brief goes straight to the founders of a software
              engineering company with {stats.live} systems live across{" "}
              {marketsLong}, and the person who replies is the person
              who would build yours.
            </Body>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.68rem] uppercase tracking-wider text-mute">
              <li>No account needed</li>
              <li aria-hidden>·</li>
              <li>NDA by default</li>
              <li aria-hidden>·</li>
              <li>Reply in one business day</li>
            </ul>
          </div>
        </Shell>
      </section>

      {/* ══ The form ════════════════════════════════════════════════ */}
      <section id="brief" className="scroll-mt-32 bg-bone pb-20">
        <Shell>
          <BriefForm />
        </Shell>
      </section>

      {/* ══ What happens next ═══════════════════════════════════════ */}
      <Section tone="alt" className="blueprint">
        <FadeUp>
          <SectionIntro
            align="center"
            eyebrow="After you send it"
            lead="Three things happen,"
            trail="and none of them is a discovery call"
          />
        </FadeUp>
        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {promises.map((p) => (
            <Item
              key={p.n}
              className="group rounded-xl border border-line bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-frame"
            >
              <span
                aria-hidden
                className="font-mono text-[0.7rem] tracking-widest text-line-strong transition-colors group-hover:text-signal"
              >
                {p.n}
              </span>
              <p className="mt-4 text-[0.95rem] font-medium text-ink">{p.title}</p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ FAQ: the AEO surface ═══════════════════════════════════ */}
      <Section tone="bone">
        <FadeUp>
          <SectionIntro
            eyebrow="Before you write"
            lead="The questions"
            trail="everyone asks first"
          />
        </FadeUp>
        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {briefFaqs.map((f) => (
            <FadeUp key={f.q}>
              <h3 className="text-[0.95rem] font-medium text-ink">{f.q}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {f.a}
              </p>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* ══ CTA ═════════════════════════════════════════════════════ */}
      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">Not ready for a brief?</p>
            <h2 className="display-lg mt-5 text-bone">
              Read what we shipped{" "}
              <span className="text-bone/50">before you write a word</span>
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                {stats.live} systems, in production →
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center rounded-full border border-bone/25 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone/50"
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
