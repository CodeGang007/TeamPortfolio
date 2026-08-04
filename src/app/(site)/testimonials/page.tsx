import type { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/content/testimonials";
import { clients, stats, marketsShort } from "@/content/site";
import { consoleProjects } from "@/content/projects";
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
  title: "Testimonials",
  description:
    "We publish client quotes only with written permission. Until then, the evidence is the live systems themselves.",
  openGraph: { title: "Testimonials · CodeGang", url: "/testimonials" },
  alternates: { canonical: "/testimonials" },
};

const sections = [
  { id: "quotes", label: "Client quotes" },
  { id: "instead", label: "Check this instead" },
  { id: "policy", label: "Our policy" },
] as const;

const trust = [
  { value: stats.clientsServed, label: "Clients served", sub: marketsShort },
  { value: String(stats.live), label: "Systems live", sub: "verifiable now" },
  { value: "1", label: "Published quotes", sub: "on video" },
  { value: "0", label: "Invented quotes", sub: "always" },
] as const;

const liveProof = consoleProjects.filter((p) => p.status === "live");

// Google Drive video ID for the one client testimonial we have written
// permission to publish. Swap/extend this the same way `testimonials.ts`
// is extended — real, permissioned material only.
const videoTestimonialId = "10j-CGCPGF7XiiW8ogbnai1dhSUnAw3El";

export default function TestimonialsPage() {
  const hasQuotes = testimonials.length > 0 || Boolean(videoTestimonialId);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-bone pb-12 pt-40 sm:pt-48">
        <div aria-hidden className="blueprint mask-fade-y absolute inset-0 -z-10" />
        <Shell>
          <VisualLead
            eyebrow="Testimonials"
            plate={
              <Plate
                label="In their words"
                src="/about/studio-at-work.jpg"
                alt="An engineer walking a client through a system, mid-explanation at the whiteboard"
                ratio="4/3"
                className="shadow-frame"
              />
            }
          >
            <Display as="h1" size="xl" lead="One quote so far," trail="and it's real" />
            <Body className="mt-6 max-w-xl text-base">
              Most of our work sits under NDA, and we will not publish a client
              quote without written permission. Below is the first one we have
              that permission for, on video, from the client themselves: plus
              evidence you can check without us for everything else.
            </Body>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="#instead">
                Check the systems instead <Nudge />
              </Pill>
              <Pill href="/work" variant="light">
                All case studies
              </Pill>
            </div>
          </VisualLead>

          <div className="mt-14">
            <TrustRow items={trust} />
          </div>
        </Shell>
      </section>

      <SectionNav sections={sections} />

      {/* ══ Quotes ══════════════════════════════════════════════════ */}
      <Section tone="bone" id="quotes" className="scroll-mt-32">
        {hasQuotes ? (
          <>
            <FadeUp>
              <SectionIntro
                eyebrow="Client quotes"
                lead="In their words,"
                trail="with their permission"
              />
            </FadeUp>

            {videoTestimonialId ? (
              <FadeUp>
                <div className="mt-12 overflow-hidden rounded-xl border border-line bg-paper">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://drive.google.com/file/d/${videoTestimonialId}/preview`}
                      className="h-full w-full"
                      allow="autoplay"
                      allowFullScreen
                      title="Client video testimonial"
                    />
                  </div>
                  <div className="border-t border-line px-6 py-4">
                    <p className="mono-label">Video testimonial</p>
                    <p className="mt-1.5 text-[0.85rem] text-mute">
                      Published with the client&rsquo;s written permission.
                    </p>
                  </div>
                </div>
              </FadeUp>
            ) : null}

            {testimonials.length > 0 ? (
              <Stagger
                className={`grid gap-4 md:grid-cols-2 ${videoTestimonialId ? "mt-8" : "mt-12"}`}
              >
                {testimonials.map((t) => (
                  <Item
                    key={t.quote}
                    className="rounded-xl border border-line bg-paper p-8"
                  >
                    <blockquote className="font-serif text-[1.35rem] leading-snug text-ink">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-line pt-4">
                      <p className="text-[0.9rem] font-medium text-ink">{t.author}</p>
                      <p className="mt-0.5 text-[0.82rem] text-mute">
                        {t.role} · {t.org}
                      </p>
                      <Link
                        href={`/work/${t.slug}`}
                        className="mt-3 inline-block text-[0.82rem] font-medium text-signal hover:underline"
                      >
                        See the system it refers to →
                      </Link>
                    </figcaption>
                  </Item>
                ))}
              </Stagger>
            ) : null}
          </>
        ) : (
          <FadeUp>
            <div className="blueprint-fine grid place-items-center rounded-xl border border-dashed border-line-strong bg-bone-alt/60 px-7 py-20 text-center">
              <div className="max-w-lg">
                <p className="font-serif text-[3.5rem] leading-none text-line-strong">
                  &mdash;
                </p>
                <p className="mono-label mt-6">Client quotes</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Nothing published yet. This section renders the moment a real,
                  permissioned quote exists, and not one moment before.
                </p>
                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-wider text-mute/70">
                  awaiting written consent
                </p>
              </div>
            </div>
          </FadeUp>
        )}
      </Section>

      {/* ══ Check this instead ══════════════════════════════════════ */}
      <Section tone="alt" id="instead" className="blueprint scroll-mt-32">
        <FadeUp>
          <SectionIntro
            eyebrow="Check this instead"
            lead="Harder evidence"
            trail="than a quote we wrote ourselves"
            body="Every system below is reachable right now. A working URL is a stronger reference than a sentence in quotation marks."
          />
        </FadeUp>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {liveProof.map((p) => {
            const client = clients.find((c) => c.slug === p.slug);
            return (
              <Item key={p.slug} className="h-full">
                <div className="flex h-full flex-col bg-paper p-7">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                      {p.sector}
                    </span>
                    <span
                      aria-hidden
                      className="pulse-dot ml-auto h-1.5 w-1.5 rounded-full bg-signal"
                    />
                  </div>
                  <h3 className="mt-3 text-[1.05rem] font-medium tracking-tight text-ink">
                    {p.name}
                  </h3>
                  {client ? (
                    <p className="mt-1 text-[0.8rem] font-medium text-mute">
                      {client.name}
                    </p>
                  ) : null}
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-4 pt-5">
                    <Link
                      href={`/work/${p.slug}`}
                      className="text-[0.82rem] font-medium text-signal hover:underline"
                    >
                      Case study →
                    </Link>
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.82rem] font-medium text-ink-soft hover:text-ink hover:underline"
                      >
                        Open it live ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </Section>

      {/* ══ Policy ══════════════════════════════════════════════════ */}
      <Section tone="bone" id="policy" className="scroll-mt-32">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <SectionIntro eyebrow="Our policy" lead="Why this page" trail="fills up slowly" />
          </FadeUp>
          <FadeUp>
            <div className="space-y-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              <p>
                A buyer who catches one fabricated testimonial is right to
                discount every other claim on the site. That risk is not worth
                the six sentences it would buy us, which is why there is one
                quote here and not twenty.
              </p>
              <p>
                So we require three things before a quote appears here: it was
                actually said, the person who said it has given written
                permission, and it names the system it refers to so you can go
                and look at that system yourself.
              </p>
              <p>
                Most of our {stats.projectsDelivered} delivered projects sit
                under NDA, which makes the third condition the hard one. We
                would rather show you {stats.live} live systems than a wall of
                unattributable praise.
              </p>
              <p className="font-mono text-[0.72rem] uppercase tracking-wider text-mute">
                The same rule governs every number on this site
              </p>
              <Link
                href="/our-values"
                className="inline-block text-[0.875rem] font-medium text-signal hover:underline"
              >
                Read the rest of the rules →
              </Link>
            </div>
          </FadeUp>
        </div>
      </Section>

      <Section tone="ink">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mono-label !text-bone/45">References</p>
            <h2 className="display-lg mt-5 text-bone">
              Want to speak to a client?{" "}
              <span className="text-bone/50">Ask, and we will ask them</span>
            </h2>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Request a reference <Nudge />
            </Link>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
