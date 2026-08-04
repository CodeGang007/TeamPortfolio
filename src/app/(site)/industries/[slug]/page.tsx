import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industryBySlug } from "@/content/pages";
import PageTemplate from "@/components/site/PageTemplate";

/** Every industry page is statically generated from content/pages.ts. */
export function generateStaticParams() {
  return industries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spec = industryBySlug(slug);
  if (!spec) return {};
  return {
    title: spec.eyebrow,
    description: spec.intro,
    openGraph: {
      title: `${spec.eyebrow} · CodeGang`,
      description: spec.intro,
      url: `/industries/${spec.slug}`,
    },
    alternates: { canonical: `/industries/${spec.slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spec = industryBySlug(slug);
  if (!spec) notFound();
  return <PageTemplate spec={spec} kind="industry" />;
}
