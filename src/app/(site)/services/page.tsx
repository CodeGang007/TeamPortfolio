import type { Metadata } from "next";
import { services } from "@/content/pages";
import { stats } from "@/content/site";
import IndexTemplate from "@/components/site/IndexTemplate";

export const metadata: Metadata = {
  title: "Services",
  description: `AI, SaaS, mobile, machine learning, design, DevOps and QA — every service backed by one of the ${stats.live} systems we have live in production.`,
  openGraph: {
    title: "Services — CodeGang",
    description: "Every service we sell is something we have already shipped.",
    url: "/services",
  },
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <IndexTemplate
      eyebrow="Our services"
      lead="Everything we sell"
      trail="is something we have already shipped"
      intro={`A software engineering company covering AI, platforms, mobile, and the infrastructure underneath them. ${stats.projectsDelivered} projects delivered for ${stats.clientsServed} clients — most under NDA.`}
      plate="Studio — capability wall"
      plateSrc="/services/capability-wall.webp"
      plateAlt="Two engineers in front of the wall of system diagrams the studio works against"
      items={services}
      base="/services"
      closing="Fourteen ways in."
    />
  );
}
