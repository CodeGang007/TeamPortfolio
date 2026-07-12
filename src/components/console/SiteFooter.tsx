import Link from "next/link";
import { nav, site, stats } from "@/content/site";
import { consoleProjects } from "@/content/projects";

const legal = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
  { name: "License", href: "/license" },
];

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 pt-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto_auto] md:gap-16">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              CodeGang
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A five-engineer studio. {stats.projectsDelivered} projects
              delivered for {stats.clientsServed} clients over the years —
              most under NDA. {stats.live} systems live in production right
              now across {stats.regions} regions.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Case studies
            </p>
            <ul className="mt-4 space-y-2.5">
              {consoleProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/project-request/custom"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                >
                  Start a project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { name: "GitHub", href: site.github },
                { name: "LinkedIn", href: site.linkedin },
                { name: "X", href: site.x },
              ].map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} CodeGang
          </p>
          <ul className="flex gap-6">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-slate-400 transition-colors hover:text-slate-600"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MathCo-style giant wordmark — cropped by the footer edge */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.23em] select-none text-center font-display text-[17.5vw] font-bold leading-none tracking-tight text-blue-600/10"
      >
        CodeGang
      </p>
    </footer>
  );
}
