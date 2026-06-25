import { Metadata, ResolvingMetadata } from 'next';
import { ProjectService } from '@/services/projects';
import { PORTFOLIO_PROJECTS, getPortfolioProjectById } from '@/data/portfolioProjects';
import AppLayout from "@/components/AppLayout";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { notFound } from 'next/navigation';
import Breadcrumbs from "@/components/seo/Breadcrumbs";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = await props.params;
  const previousImages = (await parent).openGraph?.images || [];

  const portfolio = getPortfolioProjectById(id);
  const project = portfolio ?? (await ProjectService.getProjectById(id).then(d => d.exists() ? d.data() : null));

  if (!project) return { title: 'Project Not Found | CodeGang' };

  return {
    title: `${project.title} | CodeGang Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} | CodeGang Projects`,
      description: project.description,
      images: project.image ? [project.image, ...previousImages] : previousImages,
    },
  };
}

// ── Shared detail view ────────────────────────────────────────────────────────
function ProjectDetailView({ p, id }: { p: any; id: string }) {
  return (
    <AppLayout>
      <Breadcrumbs
        items={[
          { name: 'Home', item: '/' },
          { name: 'Projects', item: '/project' },
          { name: p.title, item: `/project/${id}` },
        ]}
      />
      <div className="min-h-screen bg-black text-white pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">

          {/* Back */}
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* ── HEADER ────────────────────────────────────────── */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs tracking-widest uppercase">
                {p.category}
              </span>
              {p.geography && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
                  <MapPin className="w-3 h-3" />
                  {p.geography}
                  {p.sector && ` — ${p.sector}`}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 mb-4 leading-tight">
              {p.title}
            </h1>
            {p.tagline && (
              <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed mb-6">
                {p.tagline}
              </p>
            )}
            {p.badges && p.badges.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {p.badges.map((b: { label: string; value: string; sublabel?: string }, i: number) => (
                  <div key={i} className="flex flex-col px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 min-w-[120px]">
                    <span className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">{b.label}</span>
                    <span className="text-sm font-semibold text-white">{b.value}</span>
                    {b.sublabel && <span className="text-[10px] text-zinc-500 mt-0.5">{b.sublabel}</span>}
                  </div>
                ))}
              </div>
            )}
          </header>

          {/* ── HERO IMAGE ────────────────────────────────────── */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 mb-6 shadow-2xl">
            {p.image ? (
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-zinc-700 font-mono text-6xl">
                {p.title?.charAt(0)}
              </div>
            )}
          </div>

          {/* ── GALLERY ───────────────────────────────────────── */}
          {p.gallery && p.gallery.length > 1 && (
            <section className="mb-14">
              <h2 className="text-xs tracking-widest uppercase text-zinc-500 mb-4">Screenshots & Diagrams</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {p.gallery.slice(1).map((item: { src: string; caption: string }, i: number) => (
                  <div key={i} className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 px-4 py-3 leading-relaxed">{item.caption}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── DESCRIPTION ───────────────────────────────────── */}
          <section className="mb-14">
            <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl">{p.description}</p>
          </section>

          {/* ── FEATURES ──────────────────────────────────────── */}
          {p.features && p.features.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xs tracking-widest uppercase text-zinc-500 mb-6">Product</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {p.features.map((f: { title: string; description: string }, i: number) => (
                  <div key={i} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── DEEP LEARNING ─────────────────────────────────── */}
          {p.deepLearning && p.deepLearning.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xs tracking-widest uppercase text-zinc-500 mb-2">Deep Learning Modules</h2>
              <p className="text-sm text-zinc-400 mb-6">
                Five DL modules layered on top of the dashboards — turning raw transactional data into operational decisions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {p.deepLearning.map((dl: { title: string; subtitle: string; description: string }, i: number) => (
                  <div key={i} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <h3 className="text-sm font-semibold text-white mb-1">{dl.title}</h3>
                    <span className="text-[11px] text-brand-green font-mono mb-3 block">{dl.subtitle}</span>
                    <p className="text-sm text-zinc-400 leading-relaxed">{dl.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── ARCHITECTURE ──────────────────────────────────── */}
          {p.architecture && p.architecture.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xs tracking-widest uppercase text-zinc-500 mb-6">Architecture</h2>
              <div className="space-y-2">
                {p.architecture.map((a: { layer: string; name: string; desc: string }, i: number) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 items-start">
                    <span className="text-xs font-mono text-brand-green shrink-0 w-8 mt-0.5">{a.layer}</span>
                    <div>
                      <span className="text-sm font-semibold text-white">{a.name}</span>
                      <p className="text-sm text-zinc-400 mt-0.5">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── STACK + OUTCOMES ──────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {p.stack && p.stack.length > 0 && (
              <section>
                <h2 className="text-xs tracking-widest uppercase text-zinc-500 mb-4">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
            {p.outcomes && p.outcomes.length > 0 && (
              <section>
                <h2 className="text-xs tracking-widest uppercase text-zinc-500 mb-4">Outcomes</h2>
                <div className="space-y-3">
                  {p.outcomes.map((o: { label: string; value: string }, i: number) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[11px] tracking-widest uppercase text-zinc-500">{o.label}</span>
                      <span className="text-sm text-zinc-200 mt-0.5">{o.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── CTAs ──────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-800">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-green text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,65,0.2)]"
              >
                Visit Live Site
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            <Link
              href="/contactus"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-zinc-900 text-white font-bold border border-zinc-800 hover:bg-zinc-800 transition-all hover:scale-105"
            >
              Start Similar Project
            </Link>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

// ── Page entry ────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage(props: Props) {
  const { id } = await props.params;

  // 1. Check static portfolio projects first (slug-based, no auth needed)
  const portfolioProject = getPortfolioProjectById(id);
  if (portfolioProject) {
    return <ProjectDetailView p={portfolioProject} id={id} />;
  }

  // 2. Fall back to Firestore for admin-added projects
  const docSnap = await ProjectService.getProjectById(id);
  if (!docSnap.exists()) notFound();

  return <ProjectDetailView p={docSnap.data()} id={id} />;
}
