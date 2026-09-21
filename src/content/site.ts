// Every sitewide number, label, and link derives from here or from
// content/projects.ts. If a number appears twice on the site, it must
// appear exactly once in the codebase — here.

import { consoleProjects } from "./projects";

export const site = {
  name: "CodeGang",
  domain: "https://www.codegang.online",
  title: "CodeGang. Software engineering studio",
  description:
    "A software engineering company shipping production AI, multi-tenant platforms, and mobile apps for clients in Brazil, Australia, India, the USA, Europe, and the UAE.",
  email: "codegang0077@gmail.com",
  linkedin: "https://www.linkedin.com/company/code-gang",
  x: "https://x.com/CodeGang20",
  instagram: "https://www.instagram.com/codegang0077",
  /** Public wa.me number — digits only, country code first, no `+`. */
  whatsapp: "917908631466",
} as const;

/** Human-readable form of `site.whatsapp`, for anywhere the number is shown. */
export const whatsappDisplay = "+91 79086 31466";

/**
 * Build a wa.me deep link with a prefilled message.
 *
 * Every WhatsApp link on the site goes through here. The number previously
 * came straight from NEXT_PUBLIC_WA_NUMBER, which meant an unset env var
 * silently removed the button everywhere; `site.whatsapp` is the fallback so
 * that can't happen again, and the env var still wins if it is set.
 */
export function whatsappHref(message: string): string {
  const number = process.env.NEXT_PUBLIC_WA_NUMBER || site.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Named client markets, derived from the regions that actually have a live
 * system. We name them rather than counting them: "5 regions" is a number a
 * reader has to interpret, while "Brazil, Australia, India, the USA and
 * Europe" is the same fact stated in terms a buyer — and a search engine —
 * already understands.
 *
 * Order follows content/projects.ts, so a system in a new region adds itself.
 */
const REGION_NAMES = {
  BR: { long: "Brazil", short: "BR" },
  AU: { long: "Australia", short: "AU" },
  IN: { long: "India", short: "IN" },
  US: { long: "the USA", short: "US" },
  EU: { long: "Europe", short: "EU" },
  AE: { long: "the UAE", short: "AE" },
} as const;

const activeRegions = [...new Set(consoleProjects.map((p) => p.region))];

/** "Brazil, Australia, India, the USA and Europe" — for running prose. */
export const marketsLong: string = activeRegions
  .map<string>((r) => REGION_NAMES[r].long)
  .reduce((acc, name, i, arr) =>
    i === arr.length - 1 ? `${acc} and ${name}` : `${acc}, ${name}`
  );

/** "BR · AU · IN · US · EU" — for stat sub-labels and tight chrome. */
export const marketsShort = activeRegions
  .map((r) => REGION_NAMES[r].short)
  .join(" · ");

// Computed, never typed by hand.
export const stats = {
  /** Systems currently live in production. */
  live: consoleProjects.filter((p) => p.status === "live").length,
  /** Systems in active build. */
  building: consoleProjects.filter((p) => p.status === "building").length,
  /** Distinct regions with a system in them. */
  regions: new Set(consoleProjects.map((p) => p.region)).size,
  /** Lifetime figures asserted by the founders (2026-07-12) — includes years
   *  of NDA-covered client work that cannot be itemized publicly. Always
   *  present with the "most under NDA" qualifier. */
  clientsServed: "100+",
  projectsDelivered: "500+",
  /** eMedici installs — sourced from Google Play. Labelled as such, never as a company stat. */
  emediciInstalls: "10K+",
  /** eMedici Play Store rating. Label it `eMedici · Play Store`, never "average user rating". */
  emediciRating: "4.9",
} as const;

// Real client organisations / products our systems run for. Only names we
// can back with a live system — never pad this list with logos for optics.
export const clients = [
  { name: "MooveHub", detail: "Enterprise AI · Brazil", slug: "verse-ai" },
  { name: "EMEDICI2 PTY LTD", detail: "MedEd · Adelaide, Australia", slug: "emedici" },
  { name: "Pinnacle General Hospital", detail: "Healthcare · India", slug: "pinnacle-hms" },
  { name: "NailHiring", detail: "HR SaaS · USA", slug: "ai-resume" },
  { name: "ARM Tech", detail: "Trade & Logistics · India", slug: "arm-tech" },
  { name: "Navan", detail: "Corporate Travel & Expense · USA", slug: "navan" },
  { name: "Six Spa", detail: "Wellness & Hospitality · UK", slug: "six-spa" },
  { name: "Rerise", detail: "Health & Longevity · Ladera Ranch, USA", slug: "rerise" },
  { name: "BuyTicket", detail: "Marketplace / Ticketing · São Paulo, Brazil", slug: "buyticket" },
  { name: "CommonFloor", detail: "Real Estate / Marketplace · Bangalore, India", slug: "commonfloor" },
  { name: "Clear Investment Group", detail: "Real Estate Investment · Chicago, USA", slug: "clear-investment-group" },
  { name: "Pingo AI", detail: "Consumer AI / EdTech · San Francisco, USA", slug: "pingo-ai" },
  { name: "Opennote", detail: "Consumer AI / EdTech · San Francisco, USA", slug: "opennote" },
  { name: "Blaze.ai", detail: "MarTech / AI Marketing · San Francisco, USA", slug: "blaze-ai" },
] as const;

// The old flat `nav` array lived here. Navigation now has real structure —
// mega-menus in SiteHeader.tsx, derived columns in SiteFooter.tsx — and the
// service/industry entries come from content/pages.ts, so a stale duplicate
// list here would only be a way to ship a dead link.

/** Distinct cities for the world-clock ticker, in project order. */
export const clockCities = consoleProjects.reduce<
  { city: string; tz: string }[]
>((acc, p) => {
  if (!acc.some((c) => c.tz === p.tz)) acc.push({ city: p.city, tz: p.tz });
  return acc;
}, []);
