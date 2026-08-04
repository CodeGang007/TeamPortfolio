import type { Metadata } from "next";
import Link from "next/link";
import { stats, marketsShort, marketsLong } from "@/content/site";
import { FadeUp, Item, Stagger } from "@/components/site/motion";
import { Gallery, Plate, SectionNav, TrustRow, VisualLead } from "@/components/site/blocks";
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
} from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Our values",
  description:
    "The five rules we actually work by, including the one that governs every number published on this site.",
  openGraph: { title: "Our values. CodeGang", url: "/our-values" },
  alternates: { canonical: "/our-values" },
};

const sections = [
  { id: "rules", label: "The rules" },
  { id: "truth", label: "Truth rule" },
  { id: "practice", label: "In practice" },
  { id: "culture", label: "Culture" },
] as const;

const trust = [
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: stats.clientsServed, label: "Clients served", sub: marketsShort },
  { value: String(stats.live), label: "Systems live", sub: "in production now" },
  { value: "", label: "Fabricated claims", sub: "none, by policy", pending: true },
] as const;

/**
 * These are the studio's operating rules, not marketing values. Each one has
 * a consequence attached, because a value with no cost is a slogan.
 */
const rules = [
  {
    n: "01",
    title: "Every claim has a system behind it",
    body: "If we cannot point at a production URL, a store listing, or a client who will confirm it, we do not put it on this site. That is why some numbers here are blank.",
    cost: "It makes our marketing shorter than our competitors'.",
  },
  {
    n: "02",
    title: "The engineer who builds it stays on it",
    body: "There is no delivery team taking over from a sales team. The person who scoped your system is the person maintaining it a year later.",
    cost: "It caps how many projects we can run at once.",
  },
  {
    n: "03",
    title: "Your repository, your cloud, your keys",
    body: "We work in your organisation from day one and deploy into your account. You own the code throughout, not on final payment.",
    cost: "We have no leverage if a relationship goes wrong.",
  },
  {
    n: "04",
    title: "Say no early",
    body: "If an assessment shows the data will not support the use case, we say so in week two. A dead project found early is cheaper than a shipped one nobody uses.",
    cost: "We turn down work we could have billed.",
  },
  {
    n: "05",
    title: "Written down beats remembered",
    body: "Scope, decisions, and runbooks are documents. When an engagement ends, your team can operate what we built without calling us.",
    cost: "Documentation time is real time, and it is in the estimate.",
  },
];

const practice = [
  { lead: "Numbers appear once", body: "Every figure on this site is computed from one source file. A stat cannot drift between two pages because it only exists in one place." },
  { lead: "Dates are never guessed", body: "Where we do not have a verified go-live date, the site shows no date at all rather than an approximation." },
  { lead: "Empty is better than invented", body: "Awards, reseller badges and open roles render an em dash until there is something real to put there. We removed the third-party rating slots outright rather than leave scores we have not earned sitting on the page." },
  { lead: "NDA work stays unnamed", body: "Most of our delivered projects cannot be itemised. We say so instead of inventing a portfolio." },
  { lead: "Placeholders look like placeholders", body: "Where artwork does not exist yet, the page shows a drafting plate marked 'image pending', not a stock photo pretending to be our office." },
  { lead: "Testimonials need written consent", body: "The testimonial section renders nothing until a client has given permission in writing." },
];

const culture = [
  { label: "Studio, at work", src: "/our-values/studio-five-of-us.jpg" },
  { label: "Review: pairing on the retrieval layer", src: "/our-values/review-retrieval-layer.jpg" },
  { label: "Whiteboard: schema for Pinnacle", src: "/our-values/whiteboard-pinnacle-schema.jpg" },
  { label: "Ship day. Verse AI cutover", src: "/our-values/ship-day-verse-ai.jpg" },
];

export default function OurValuesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow="Our values"
            plate={
              <Plate
                label="Studio: the operating rules"
                src="/our-values/operating-rules.jpg"
                alt="An engineer writing a numbered list of rules on a whiteboard, each with a handwritten cost noted beside it"
                ratio="4/3"
                className="shadow-frame"
              />
            }
          >
            <Display as="h1" size="xl" lead="Five rules," trail="each with a cost attached" />
            <Body className="mt-6 max-w-xl text-base">
              A value that costs nothing to hold is decoration. Each of these
              has a consequence we actually absorb: listed underneath it.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="#rules">
                Read the rules <Nudge />
              </Pill>
              <Pill href="/about" variant="light">
                About the studio
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ The rules ═══════════════════════════════════════════════ */}
      <Section tone="bone" id="rules" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="The rules"
            lead="What we hold to,"
            trail="and what it costs us"
          />
        </FadeUp>

        <Stagger className="mt-12 overflow-hidden rounded-xl border border-line bg-paper">
          {rules.map((r, i) => (
            <Item
              key={r.n}
              className={`grid gap-5 px-7 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <span
                aria-hidden
                className="font-serif text-[2.75rem] leading-none text-line-strong"
              >
                {r.n}
              </span>
              <div>
                <h3 className="text-[1.15rem] font-medium tracking-tight text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                  {r.body}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-bone-alt px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-mute">
                  <span aria-hidden className="text-signal">
                    cost
                  </span>
                  {r.cost}
                </p>
              </div>
            </Item>
          ))}
        </Stagger>
      </Section>

      {/* ══ Truth rule ══════════════════════════════════════════════ */}
      <Section tone="ink" id="truth" className="scroll-mt-32">
        <FadeUp>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mono-label !text-bone/45">The truth rule</p>
              <h2 className="display-lg mt-5 text-bone">
                Some numbers on this site{" "}
                <span className="text-bone/50">are deliberately blank</span>
              </h2>
            </div>
            <div className="space-y-5 text-[0.9375rem] leading-relaxed text-bone/70">
              <p>
                Our awards, reseller-badge and open-role slots render an em
                dash rather than a number. Several of our systems show no
                go-live date. The testimonials page carries exactly one quote,
                because that is how many we have written permission to
                publish.
              </p>
              <p>
                None of that is an oversight. A buyer who catches one fabricated
                figure is right to discount every other number on the page: so
                the blanks are load-bearing. They are what makes{" "}
                <span className="text-bone">
                  {stats.live} systems live across {marketsLong}
                </span>{" "}
                worth reading.
              </p>
              <p className="font-mono text-[0.72rem] uppercase tracking-wider text-bone/40">
                Every figure here is computed from one source file
              </p>
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* ══ In practice ═════════════════════════════════════════════ */}
      <Section tone="alt" id="practice" className="blueprint scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="In practice"
            lead="Six places"
            trail="you can check that we mean it"
            body="Each of these is verifiable on this site right now, without asking us."
          />
        </FadeUp>
        <FadeUp className="mt-12">
          <LeadIns items={practice} />
        </FadeUp>
      </Section>

      {/* ══ Culture ═════════════════════════════════════════════════ */}
      <Section tone="bone" id="culture" className="scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Culture"
            lead="One team,"
            trail="one room, no hand-off"
            body="Four scenes from how the studio actually works: a group review, a pairing session, a whiteboard mid-schema, a ship-day cutover."
          />
        </FadeUp>
        <div className="mt-12">
          <Gallery items={culture} />
        </div>
      </Section>

      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="!text-bone/45">Work with us</Eyebrow>
            <h2 className="display-lg mt-5 text-bone">
              If those rules sound like a fit{" "}
              <span className="text-bone/50">start a conversation</span>
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                Talk to an engineer <Nudge />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone/50"
              >
                Join the studio
              </Link>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
