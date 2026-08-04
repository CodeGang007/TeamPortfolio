import Link from "next/link";
import { stats, marketsShort } from "@/content/site";
import type { PageSpec } from "@/content/pages";
import { FadeUp, Item, Stagger } from "./motion";
import { Plate, TrustRow, VisualLead } from "./blocks";
import {
  Body,
  Display,
  Nudge,
  Pill,
  Section,
  SectionIntro,
  Shell,
} from "./primitives";

/* ═══════════════════════════════════════════════════════════════════
   SERVICES / INDUSTRIES INDEX
   The directory page in front of the twenty-odd generated pages.
   ═══════════════════════════════════════════════════════════════════ */

const trust = [
  { value: stats.projectsDelivered, label: "Projects delivered", sub: "most under NDA" },
  { value: stats.clientsServed, label: "Clients served", sub: marketsShort },
  { value: String(stats.live), label: "Systems live", sub: "in production now" },
  { value: String(stats.building), label: "In build", sub: "shipping next" },
] as const;

export default function IndexTemplate({
  eyebrow,
  lead,
  trail,
  intro,
  plate,
  plateSrc,
  plateAlt,
  items,
  base,
  closing,
}: {
  eyebrow: string;
  lead: string;
  trail: string;
  intro: string;
  plate: string;
  /** Omit and the plate renders as an explicit "image pending" drafting slot. */
  plateSrc?: string;
  plateAlt?: string;
  items: PageSpec[];
  base: string;
  closing: string;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow={eyebrow}
            plate={
              <Plate
                label={plate}
                src={plateSrc}
                alt={plateAlt}
                ratio="16/11"
                className="shadow-frame"
              />
            }
          >
            <Display as="h1" size="xl" lead={lead} trail={trail} />
            <Body className="mt-6 max-w-xl text-base">{intro}</Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="/contact">
                Talk to an engineer <Nudge />
              </Pill>
              <Pill href="/work" variant="light">
                See the systems
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <Section tone="bone">
        <FadeUp>
          <SectionIntro
            eyebrow="The directory"
            lead={`${items.length} pages,`}
            trail="each one backed by a shipped system"
            body="Every entry links to the case studies that substantiate it. If we could not point at a production system, the page would not be here."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Item key={s.slug} className="h-full">
              <Link
                href={`${base}/${s.slug}`}
                className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-200 hover:bg-white"
              >
                <h3 className="text-[1.05rem] font-medium leading-snug tracking-tight text-ink">
                  {s.nav}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">
                  {s.intro.split(/(?<=\.)\s/)[0]}
                </p>
                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-wider text-mute">
                  {s.proof.length} case {s.proof.length === 1 ? "study" : "studies"}
                </p>
                <span className="mt-auto pt-5 text-[0.82rem] font-medium text-signal">
                  Read more
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
          ))}
        </Stagger>
      </Section>

      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">{eyebrow}</p>
            <h2 className="display-lg mt-5 text-bone">
              {closing} <span className="text-bone/50">Tell us which one you need.</span>
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
