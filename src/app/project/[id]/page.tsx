import { Metadata, ResolvingMetadata } from 'next';
import { ProjectService } from '@/services/projects';
import AppLayout from "@/components/AppLayout";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const docSnap = await ProjectService.getProjectById(params.id);

  if (!docSnap.exists()) {
    return {
      title: 'Project Not Found | CodeGang',
    };
  }

  const project = docSnap.data();
  const previousImages = (await parent).openGraph?.images || [];

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

import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default async function ProjectDetailPage(props: Props) {
  const params = await props.params;
  const docSnap = await ProjectService.getProjectById(params.id);

  if (!docSnap.exists()) {
    notFound();
  }

  const project = docSnap.data();

  return (
    <AppLayout>
      <Breadcrumbs 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Projects', item: '/project' },
          { name: project.title, item: `/project/${params.id}` }
        ]} 
      />
      <div className="min-h-screen bg-black text-white pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Back Navigation */}
          <Link 
            href="/project"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <main>
            {/* Header */}
            <div className="mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm mb-4">
                {project.category || 'Project'}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Image Preview */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 mb-12 shadow-2xl">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-zinc-700 font-mono text-6xl">
                  {project.title.charAt(0)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.link && (
                <a 
                  href={project.link}
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
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
