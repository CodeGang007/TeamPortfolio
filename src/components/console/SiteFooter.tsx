import Link from "next/link";
import { site, stats, whatsappHref, marketsLong } from "@/content/site";
import { consoleProjects } from "@/content/projects";
import { industries, services } from "@/content/pages";

/**
 * Footer columns.
 *
 * Services and industries are derived from content/pages.ts rather than
 * hand-listed, so a new page appears here the moment its spec exists and a
 * removed one cannot leave a dead link behind.
 */
const company = [
  { name: "About us", href: "/about" },
  { name: "Our values", href: "/our-values" },
  { name: "How we work", href: "/studio" },
  { name: "Partners", href: "/partners" },
  { name: "Careers", href: "/careers" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

const legal = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
  { name: "License", href: "/license" },
];

/**
 * Case studies grouped by sector so the footer column stays scannable as
 * the list grows. A project not yet placed in a group falls into "More" —
 * it still appears, it just hasn't been sorted yet.
 */
const caseStudyGroups = [
  { label: "AI & Automation", slugs: ["verse-ai", "ai-resume", "ghl-automation", "pingo-ai", "opennote", "blaze-ai"] },
  { label: "Healthcare", slugs: ["emedici", "pinnacle-hms"] },
  { label: "Business Analytics", slugs: ["student-insights-suite", "sales-performance-report", "call-centre-dashboard", "local-shops-analytics"] },
  { label: "ERP & Enterprise Systems", slugs: ["arm-tech", "epicor-kinetic"] },
  { label: "Real Estate & Property", slugs: ["commonfloor", "clear-investment-group", "nestflow"] },
  { label: "Commerce, Travel & Hospitality", slugs: ["buyticket", "navan", "six-spa", "rerise"] },
];

const elsewhere = [
  {
    name: "WhatsApp",
    href: whatsappHref(
      "Hi CodeGang — I found you through codegang.online and want to discuss a project."
    ),
  },
  { name: "LinkedIn", href: site.linkedin },
  { name: "X", href: site.x },
  { name: "Instagram", href: site.instagram },
];

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-line bg-bone-alt">
      <div className="mx-auto max-w-shell px-6 pt-16 lg:px-10 xl:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_0.7fr] lg:gap-12">
          <div className="max-w-sm">
            <p className="font-serif text-[1.75rem] leading-none text-ink">
              CodeGang
            </p>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-soft">
              A software engineering company. {stats.projectsDelivered} projects
              delivered for {stats.clientsServed} clients over the years — most
              under NDA. {stats.live} systems live in production right now
              across {marketsLong}.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-[0.875rem] font-medium text-signal hover:underline"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="mono-label">Services</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[0.85rem] text-ink-soft transition-colors hover:text-ink"
                  >
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label">Industries</p>
            <ul className="mt-4 space-y-2.5">
              {industries.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/industries/${s.slug}`}
                    className="text-[0.85rem] text-ink-soft transition-colors hover:text-ink"
                  >
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mono-label mt-8">Case studies</p>
            {(() => {
              const grouped = new Set(caseStudyGroups.flatMap((g) => g.slugs));
              const leftover = consoleProjects.filter((p) => !grouped.has(p.slug));
              const groups = leftover.length
                ? [...caseStudyGroups, { label: "More", slugs: leftover.map((p) => p.slug) }]
                : caseStudyGroups;
              return groups.map((group) => {
                const items = group.slugs
                  .map((slug) => consoleProjects.find((p) => p.slug === slug))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p));
                if (items.length === 0) return null;
                return (
                  <div key={group.label} className="mt-5 first:mt-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-wider text-mute/70">
                      {group.label}
                    </p>
                    <ul className="mt-2 space-y-2.5">
                      {items.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/work/${p.slug}`}
                            className="text-[0.85rem] text-ink-soft transition-colors hover:text-ink"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              });
            })()}
          </div>

          <div>
            <p className="mono-label">Company</p>
            <ul className="mt-4 space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.85rem] text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/portfolio"
                  className="text-[0.85rem] text-ink-soft transition-colors hover:text-ink"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/start-a-project"
                  className="text-[0.85rem] font-medium text-signal transition-colors hover:underline"
                >
                  Start a project →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mono-label">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((s) => (
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
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.65rem] text-mute">
            © {new Date().getFullYear()} CodeGang · NDA by default
          </p>
          <ul className="flex flex-wrap gap-6">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[0.65rem] text-mute transition-colors hover:text-ink-soft"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant wordmark, cropped by the footer edge. */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.24em] select-none text-center font-serif text-[19vw] leading-none tracking-tight text-ink/[0.055]"
      >
        CodeGang
      </p>
    </footer>
  );
}
