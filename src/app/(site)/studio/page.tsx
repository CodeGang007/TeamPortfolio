import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { stats, site } from "@/content/site";
import WorldClock from "@/components/console/WorldClock";

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
    card: "linear-gradient(135deg, #1D4ED8 0%, #1E1B4B 100%)",
  },
  {
    name: "Subhadip Sasmal",
    focus: "Product design · UX",
    line: "Interfaces that respect the person using them.",
    quote: "Good design is the shortest path between a user and their goal.",
    avatar: "/avatars/founder-design.png",
    card: "linear-gradient(135deg, #4338CA 0%, #172554 100%)",
  },
  {
    name: "Sushant Choudhary",
    focus: "Strategy · Client engineering",
    line: "Runs the engagements and keeps the roadmap honest.",
    quote: "Scope honestly, then ship exactly that.",
    avatar: "/avatars/founder-strategy.png",
    card: "linear-gradient(135deg, #0E7490 0%, #172554 100%)",
  },
  {
    name: "Abhrajit",
    focus: "Software engineering",
    line: "Builds and hardens the systems behind the case studies.",
    quote: "Simple systems survive. Clever ones page you at 3 a.m.",
    avatar: "/avatars/founder-backend.png",
    card: "linear-gradient(135deg, #047857 0%, #0F172A 100%)",
  },
  {
    name: "Sourajit",
    focus: "Software engineering",
    line: "Ships features and keeps the pipelines green.",
    quote: "Code is read a hundred times more often than it is written.",
    avatar: "/avatars/founder-fullstack.png",
    card: "linear-gradient(135deg, #7C3AED 0%, #1E1B4B 100%)",
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

export default function StudioPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 lg:pb-20 lg:pt-36">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Studio
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Five engineers. No hand-off.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            CodeGang is a software engineering studio. We build production AI,
            multi-tenant platforms, and mobile apps for clients in Brazil,
            Australia, India, the USA, and Europe — and we keep them running
            after launch.
          </p>
          <WorldClock className="mt-8" />
        </div>
      </section>

      {/* Principles — MathCo-style ruled cards on a powder block */}
      <section className="bg-blue-100/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            How we work
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="border border-slate-900/25">
                <h3 className="border-b border-slate-900/25 px-6 py-4 text-base font-semibold text-slate-900">
                  {p.title}
                </h3>
                <p className="px-6 py-5 text-sm leading-relaxed text-slate-700">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section id="team" className="scroll-mt-20 border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            The faces of the studio
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Five engineers. The whole team still fits on one line of a standup.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {founders.map((f) => (
              <div
                key={f.name}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Poster panel — grid lines, big name, cutout avatar */}
                <div
                  className="relative overflow-hidden p-8"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), ${f.card}`,
                    backgroundSize: "44px 44px, 44px 44px, 100% 100%",
                  }}
                >
                  <p className="font-display text-3xl font-bold leading-[0.97] tracking-tight text-white sm:text-4xl">
                    {f.name.split(" ")[0]}
                    {f.name.includes(" ") && (
                      <>
                        <br />
                        {f.name.split(" ").slice(1).join(" ")}
                      </>
                    )}
                  </p>
                  <p className="mb-16 mt-4 max-w-[55%] text-sm font-semibold text-sky-300 sm:mb-20">
                    {f.focus}
                  </p>
                  <Image
                    src={f.avatar}
                    alt=""
                    width={200}
                    height={200}
                    className="absolute -bottom-1 right-3 h-32 w-32 object-contain drop-shadow-2xl sm:h-36 sm:w-36"
                  />
                </div>
                {/* Motto */}
                <figure className="p-7">
                  <blockquote className="font-display text-lg font-medium leading-snug tracking-tight text-slate-900">
                    &ldquo;{f.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-slate-500">
                    {f.line}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-blue-600 px-8 py-12 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="max-w-2xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Talk to the people who build it.
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
              >
                Chat with an engineer
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="rounded-lg border border-blue-300 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
