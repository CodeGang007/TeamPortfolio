import { MetadataRoute } from "next";
import { consoleProjects } from "@/content/projects";
import { industries, services } from "@/content/pages";
import { site } from "@/content/site";

/**
 * Service and industry entries are derived from content/pages.ts rather than
 * hand-listed, so a new page enters the sitemap the moment its spec exists,
 * and a removed one cannot leave a 404 in here.
 *
 * TRUTH RULE, applied to crawlers.
 *
 * `lastModified` used to be `new Date()` on every entry, which told search
 * engines that all 61 URLs changed on every deploy: the privacy policy
 * untouched for months, every case study, everything. A lastmod that always
 * says "now" is one a crawler learns to ignore, so the signal is worthless
 * at exactly the moment a page genuinely has changed.
 *
 * Nothing in the content layer records when a page was last edited.
 * `liveSince` on a project is the date its system went to production, which
 * is a different fact and is null for all 21 anyway. So the field is omitted
 * rather than fabricated. Google treats a missing lastmod as unknown and
 * falls back to its own crawl heuristics, which is strictly better than a
 * timestamp it has learned to distrust.
 *
 * Same rule as every number on this site: if we cannot source it, we do not
 * publish it. Add real dates to the content layer and they belong here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
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
    "/start-a-project",
    // /project-templates is a redirect, not a page. Listing a redirect in the
    // sitemap advertises a URL that never renders.
  ].map((route) => ({
    url: `${site.domain}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const legal = ["/privacy", "/terms", "/cookies", "/license"].map((route) => ({
    url: `${site.domain}${route}`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const servicePages = services.map((s) => ({
    url: `${site.domain}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages = industries.map((s) => ({
    url: `${site.domain}/industries/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Highest priority after the homepage: the case studies are the evidence
  // every other page on the site points back at.
  const caseStudies = consoleProjects.map((p) => ({
    url: `${site.domain}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...marketing, ...servicePages, ...industryPages, ...caseStudies, ...legal];
}
