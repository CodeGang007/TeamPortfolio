import { MetadataRoute } from "next";
import { consoleProjects } from "@/content/projects";
import { industries, services } from "@/content/pages";
import { site } from "@/content/site";

/**
 * Service and industry entries are derived from content/pages.ts rather than
 * hand-listed, so a new page enters the sitemap the moment its spec exists —
 * and a removed one cannot leave a 404 in here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const marketing = [
    "",
    "/services",
    "/industries",
    "/portfolio",
    "/work",
    "/about",
    "/our-values",
    "/studio",
    "/partners",
    "/testimonials",
    "/careers",
    "/resources",
    "/contact",
    "/project-templates",
  ].map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const legal = ["/privacy", "/terms", "/cookies", "/license"].map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const servicePages = services.map((s) => ({
    url: `${site.domain}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages = industries.map((s) => ({
    url: `${site.domain}/industries/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Highest priority after the homepage: the case studies are the evidence
  // every other page on the site points back at.
  const caseStudies = consoleProjects.map((p) => ({
    url: `${site.domain}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...marketing, ...servicePages, ...industryPages, ...caseStudies, ...legal];
}
