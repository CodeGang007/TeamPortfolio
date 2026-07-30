import Image from "next/image";
import Link from "next/link";
import { site, stats } from "@/content/site";
import { Nudge, Pill, Shell } from "./primitives";

/**
 * Closing band — the illustrated bookend that answers the hero. Same pixel
 * world, same day, later light: the systems are up and running themselves.
 */
export default function FooterCta() {
  return (
    <section className="relative isolate overflow-hidden bg-bone py-20 sm:py-28">
      <div
        aria-hidden
        className="blueprint mask-fade-y absolute inset-0 -z-10"
      />

      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-20">
          <div>
            <h2 className="display-lg">
              <span className="text-ink">Bring us the system</span>{" "}
              <span className="text-mute">your company runs on</span>
            </h2>

            <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
              Tell us what it has to do. You will get a straight answer about
              what it takes to build, from the engineer who would build it —
              before you commit to anything.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Pill href="/contact">
                Talk to an engineer <Nudge />
              </Pill>
              <Pill href="/project-request/custom" variant="light">
                Brief us with documents
              </Pill>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-7">
              <a
                href={`mailto:${site.email}`}
                className="text-[0.875rem] font-medium text-signal hover:underline"
              >
                {site.email}
              </a>
              <span className="font-mono text-[0.62rem] uppercase tracking-wider text-mute">
                {stats.live} systems live · {stats.regions} regions · NDA by
                default
              </span>
            </div>
          </div>

          {/* Illustrated card — the hero's world at dusk */}
          <div className="relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-frame-lg">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src="/site/footer-pixel.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 22rem"
                className="object-cover [image-rendering:pixelated]"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/45 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[1.05rem] font-medium leading-snug text-white">
                  Five engineers.
                  <span className="text-white/65">
                    {" "}
                    {stats.live} systems that stay up.
                  </span>
                </p>
                <Link
                  href="/work"
                  className="mt-4 inline-flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-[0.8rem] font-medium text-ink transition-colors hover:bg-bone"
                >
                  See the work →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
