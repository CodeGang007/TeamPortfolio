import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { consoleProjects, getConsoleProject, daysLive } from "@/content/projects";
import { getPortfolioProjectById } from "@/data/portfolioProjects";
import { site, whatsappHref } from "@/content/site";
import StatusDot from "@/components/console/StatusDot";
import JsonLd from "@/components/console/JsonLd";

export function generateStaticParams() {
  return consoleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getConsoleProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    openGraph: {
      title: `${p.name} · CodeGang`,
      description: p.summary,
      url: `/work/${p.slug}`,
    },
    alternates: { canonical: `/work/${p.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getConsoleProject(slug);
  const deep = getPortfolioProjectById(slug);
  if (!p || !deep) notFound();

  const days = daysLive(p);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${site.domain}/work` },
      { "@type": "ListItem", position: 2, name: p.name, item: `${site.domain}/work/${p.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-signal-soft/60 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-32 lg:pb-20 lg:pt-36">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <Link href="/work" className="font-medium hover:text-slate-900">
              Case studies
            </Link>{" "}
            <span aria-hidden>/</span>{" "}
            <span className="text-slate-900">{p.name}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {p.name}
            </h1>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
              <StatusDot status={p.status} />
              <span className="text-xs font-semibold text-slate-700">
                {p.status === "live" ? "Live in production" : "In build"}
                {p.status === "live" && days !== null && ` · ${days} days`}
              </span>
            </span>
          </div>

          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-400">
            {p.region} · {p.city} · {p.sector}
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {deep.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-signal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2a6620]"
              >
                Visit the live system ↗
              </a>
            )}
            {deep.pdfUrl && (
              <a
                href={deep.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-signal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2a6620]"
              >
                Read the full deck (PDF) ↗
              </a>
            )}
            <Link
              href={`/contact?about=${p.slug}`}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Build something like this
            </Link>
          </div>
        </div>
      </section>

      {/* ── Facts strip ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deep.badges.map((b) => (
            <div
              key={b.label}
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {b.label}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">
                {b.value}
                {b.sublabel && (
                  <span className="ml-2 font-normal text-slate-500">
                    {b.sublabel}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      {deep.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Real screens, not mockups
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {deep.gallery.map((g, i) => (
              <figure
                key={g.src}
                className="self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {g.type === "video" ? (
                  <video src={g.src} controls playsInline className="w-full" />
                ) : (
                  <Image
                    src={g.src}
                    alt={g.caption}
                    width={1280}
                    height={800}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={i === 0}
                    // `h-auto` is load-bearing: width/height below are nominal,
                    // and without it the browser holds the 1280×800 box and
                    // clips every screenshot that is not 16:10 — the portrait
                    // phone captures lost most of their content.
                    className="h-auto w-full"
                  />
                )}
                <figcaption className="border-t border-slate-100 px-4 py-3 text-xs font-medium text-slate-500">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── What it does ─────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            What the system does
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deep.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep learning modules (ARM Tech) ─────────────────── */}
      {deep.deepLearning && deep.deepLearning.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Five deep-learning modules on one pipeline
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deep.deepLearning.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-signal">
                  {m.subtitle}
                </p>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Architecture ─────────────────────────────────────── */}
      {deep.architecture.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            How it is put together
          </h2>
          <div className="mt-8 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {deep.architecture.map((layer) => (
              <div
                key={`${layer.layer}-${layer.name}`}
                className="grid gap-1 border-b border-slate-100 px-6 py-4 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <p className="pt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {layer.name}
                </p>
                <p className="font-mono text-sm leading-relaxed text-slate-600">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Stack + outcomes ─────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Stack
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {deep.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-600"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Where it stands
              </h2>
              <dl className="mt-5">
                {deep.outcomes.map((o) => (
                  <div
                    key={o.label}
                    className="grid grid-cols-[7rem_1fr] gap-4 border-t border-slate-200 py-3"
                  >
                    <dt className="pt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {o.label}
                    </dt>
                    <dd className="text-sm text-slate-700">{o.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-signal px-8 py-12 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Need a system like {p.name}?
              </h2>
              <p className="mt-3 text-signal-soft">
                Tell us what you are trying to ship. The engineer who built
                this one answers.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/contact?about=${p.slug}`}
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-signal shadow-sm transition-colors hover:bg-signal-soft"
              >
                Start a project
              </Link>
              <a
                href={whatsappHref(
                  `Hi CodeGang, I just read the ${p.name} case study and want to build something similar.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1EBE5A]"
              >
                WhatsApp us
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`About ${p.name}`)}`}
                className="rounded-lg border border-signal/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a6620]"
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
