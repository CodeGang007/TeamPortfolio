// The single source of truth for the six systems.
// Every number, region, and status on the site derives from this file.
//
// TRUTH RULES (do not break these):
// - `status` must reflect reality. NestFlow is `building` until it has a live URL.
// - `liveSince` is the real production date. If we don't know it, it stays null
//   and the site shows no day-count for that system. NEVER guess a date.
// - Deep case-study content (features, architecture, galleries) lives in
//   `src/data/portfolioProjects.ts` and is joined by slug.

export type Region = "BR" | "AU" | "IN" | "US" | "EU";
export type SystemStatus = "live" | "building";

export interface ConsoleProject {
  slug: string;
  name: string;
  region: Region;
  city: string; // drives the world clock
  tz: string; // IANA timezone
  sector: string;
  status: SystemStatus;
  /** Real production go-live date (YYYY-MM-DD) or null if unverified. */
  liveSince: string | null;
  liveUrl?: string;
  summary: string;
  stack: string[];
}

export const consoleProjects: ConsoleProject[] = [
  {
    slug: "verse-ai",
    name: "Verse AI",
    region: "BR",
    city: "São Paulo",
    tz: "America/Sao_Paulo",
    sector: "Enterprise SaaS",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    liveUrl: "https://moovehubia.com.br",
    summary: "Private ChatGPT for the enterprise. Multi-tenant RAG on a 7-layer AWS stack.",
    stack: ["NestJS", "Postgres", "Qdrant", "Bedrock"],
  },
  {
    slug: "emedici",
    name: "eMedici",
    region: "AU",
    city: "Adelaide",
    tz: "Australia/Adelaide",
    sector: "Healthcare · Mobile",
    status: "live",
    liveSince: null, // TODO(team): Play Store release date — do not guess
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.emedici.eMedici",
    summary: "Australia's leading medical-education Android app. 10K+ installs.",
    stack: ["Android", "Flutter"],
  },
  {
    slug: "arm-tech",
    name: "ARM Tech ERP",
    region: "IN",
    city: "Kolkata",
    tz: "Asia/Kolkata",
    sector: "Trade & Logistics",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    liveUrl: "https://cement-app.vercel.app",
    summary: "3-module ERP with five deep-learning modules on one pipeline.",
    stack: ["Next.js", "Supabase", "FastAPI", "LSTM"],
  },
  {
    slug: "ai-resume",
    name: "AI Resume Builder",
    region: "US",
    city: "New York",
    tz: "America/New_York",
    sector: "Early-stage SaaS",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    liveUrl: "https://www.nailhiring.com",
    summary: "Paste a job description, get an ATS-optimized resume back in seconds.",
    stack: ["Next.js", "FastAPI", "OpenAI", "AWS"],
  },
  {
    slug: "nestflow",
    name: "NestFlow",
    region: "EU",
    city: "Berlin",
    tz: "Europe/Berlin",
    sector: "PropTech",
    status: "building", // no live URL yet — stays honest until it ships
    liveSince: null,
    summary: "Property management for landlords. Containerized microservices.",
    stack: ["Microservices", "MongoDB", "Redis", "Docker"],
  },
  {
    slug: "pinnacle-hms",
    name: "Pinnacle HMS",
    region: "IN",
    city: "Kolkata",
    tz: "Asia/Kolkata",
    sector: "Healthcare",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    summary: "The operating system for a working hospital. Six role-based portals.",
    stack: ["REST API", "MySQL", "39 tables"],
  },
];

export function getConsoleProject(slug: string): ConsoleProject | undefined {
  return consoleProjects.find((p) => p.slug === slug);
}

/** Whole days since the system went live, or null when liveSince is unverified. */
export function daysLive(p: ConsoleProject, now = new Date()): number | null {
  if (!p.liveSince) return null;
  const since = new Date(`${p.liveSince}T00:00:00Z`);
  const days = Math.floor((now.getTime() - since.getTime()) / 86_400_000);
  return days >= 0 ? days : null;
}
