import { MetadataRoute } from "next";
import { consoleProjects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work",
    "/studio",
    "/contact",
    "/project-templates",
    "/privacy",
    "/terms",
    "/cookies",
    "/license",
  ].map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const caseStudies = consoleProjects.map((p) => ({
    url: `${site.domain}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...routes, ...caseStudies];
}
