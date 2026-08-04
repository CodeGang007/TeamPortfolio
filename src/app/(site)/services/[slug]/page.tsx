import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/content/pages";
import PageTemplate from "@/components/site/PageTemplate";

/** Every service page is statically generated from content/pages.ts. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spec = serviceBySlug(slug);
  if (!spec) return {};
  return {
    title: spec.eyebrow,
    description: spec.intro,
    openGraph: {
      title: `${spec.eyebrow}. CodeGang`,
      description: spec.intro,
      url: `/services/${spec.slug}`,
    },
    alternates: { canonical: `/services/${spec.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spec = serviceBySlug(slug);
  if (!spec) notFound();
  return <PageTemplate spec={spec} kind="service" />;
}
