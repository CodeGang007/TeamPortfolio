import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export interface ProjectRowData {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  category: string;
  image: string;
  geography?: string;
  sector?: string;
  stack?: string[];
  link?: string;
}

interface ProjectRowProps {
  project: ProjectRowData;
  index: number;
  /** First row above the fold — load its image eagerly for LCP. */
  priority?: boolean;
}

/**
 * Heizen-style full-width "line by line" case-study row.
 * Large screenshot on one side, copy on the other, alternating by index.
 */
export default function ProjectRow({ project, index, priority = false }: ProjectRowProps) {
  const reversed = index % 2 === 1;
  const accent = "text-brand-green";
  const accentBorder = "border-brand-green/30";
  const accentGlow = "hover:shadow-brand-green/10";
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
    <article
      className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Screenshot in browser chrome */}
      <Link
        href={`/project/${project.id}`}
        className={`card-shine relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] hover:border-brand-green/30 ${accentGlow} transition-all duration-500`}
      >
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/[0.06] bg-zinc-950/80">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green/60" />
          {project.link && (
            <span className="ml-3 hidden sm:block max-w-[240px] truncate text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-white/[0.06] rounded-md px-2.5 py-0.5">
              {project.link.replace(/^https?:\/\/(www\.)?/, "").split(/[?#]/)[0].replace(/\/$/, "")}
            </span>
          )}
        </div>
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </Link>

      {/* Copy */}
      <div className="relative flex flex-col">
        {/* number watermark */}
        <span
          aria-hidden
          className="absolute -top-14 -left-2 font-display text-[7rem] leading-none font-medium text-white/[0.04] select-none pointer-events-none"
        >
          {num}
        </span>
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-mono text-sm font-bold ${accent}`}>{num}</span>
          <span className="h-px w-10 bg-zinc-700" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-white mb-3">
          {project.title}
        </h3>

        {project.geography && (
          <span className="inline-flex items-center gap-1.5 text-sm text-zinc-400 mb-4">
            <MapPin className={`w-3.5 h-3.5 ${accent}`} />
            {project.geography}
            {project.sector && ` · ${project.sector}`}
          </span>
        )}

        <p className="text-zinc-400 text-base leading-relaxed mb-6 max-w-xl">
          {project.tagline || project.description}
        </p>

        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-7">
            {project.stack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full font-medium border bg-brand-green/5 text-brand-green/90 border-brand-green/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href={`/project/${project.id}`}
            className={`inline-flex items-center gap-2 text-sm font-semibold ${accent} group/btn`}
          >
            View case study
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit live
            </a>
          )}
        </div>
      </div>
    </article>
    </Reveal>
  );
}
