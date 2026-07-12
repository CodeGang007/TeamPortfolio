import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { getConsoleProject } from "@/content/projects";
import ContactForm from "@/components/console/ContactForm";
import WorldClock from "@/components/console/WorldClock";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are trying to ship. Your message lands in the founders' Telegram instantly — the engineer who answers is the one who will build it.",
  openGraph: {
    title: "Contact — CodeGang",
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
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 lg:pb-20 lg:pt-36">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Contact
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Tell us what you are trying to ship.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {aboutProject
              ? `You came from the ${aboutProject.name} case study — say so and skip the context-setting. `
              : ""}
            Your message lands in the founders&apos; Telegram the moment you
            send it. No form queue, no sales layer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_300px]">
          <ContactForm about={aboutProject?.slug} />

          <aside>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Prefer email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {site.email}
              </a>

              <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Detailed brief
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Have a scoped project with documents and requirements?
              </p>
              <Link
                href="/project-request/custom"
                className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Submit a full brief →
              </Link>

              <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Elsewhere
              </p>
              <ul className="mt-2 space-y-1.5">
                <li>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-14 border-t border-slate-200 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Wherever you are, one of these is business hours
          </p>
          <WorldClock />
        </div>
      </section>
    </>
  );
}
