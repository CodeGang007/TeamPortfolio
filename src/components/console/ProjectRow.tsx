import Link from "next/link";
import Image from "next/image";
import type { ConsoleProject } from "@/content/projects";
import { getPortfolioProjectById } from "@/data/portfolioProjects";
import StatusDot from "./StatusDot";

// Case-study card: real screenshot, honest status chip, stack summary.
export default function ProjectRow({
  project,
  metric,
}: {
  project: ConsoleProject;
  metric?: string;
}) {
  const deep = getPortfolioProjectById(project.slug);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[0.08]"
    >
      {deep && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100 bg-slate-50">
          <Image
            src={deep.image}
            alt={`${project.name}: product screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Status chip lives on the image: visible before any scroll */}
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
            <StatusDot status={project.status} />
            <span className="text-xs font-semibold text-slate-700">
              {project.status === "live" ? "Live in production" : "In build"}
            </span>
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {project.name}
          </h3>
          <span className="rounded-full bg-signal-soft p-2 text-signal opacity-0 transition-opacity group-hover:opacity-100">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
          {project.region} · {project.city} · {project.sector}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {project.summary}
        </p>
        {metric && (
          <p className="mt-3 text-sm font-semibold text-slate-900">{metric}</p>
        )}
        <p className="mt-auto pt-4 font-mono text-xs text-slate-400">
          {project.stack.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
