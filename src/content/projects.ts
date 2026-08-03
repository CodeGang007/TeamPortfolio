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

export const consoleProjects = [
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
  {
    slug: "student-insights-suite",
    name: "Student Insights Suite",
    region: "AU",
    city: "Melbourne",
    tz: "Australia/Melbourne",
    sector: "Business Analytics",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    summary: "Four-campus school analytics — enrolment, attendance and NCCD compliance in one Power BI suite.",
    stack: ["Power BI", "Power Query", "DAX"],
  },
  {
    slug: "sales-performance-report",
    name: "Sales Performance Report",
    region: "US",
    city: "Chicago",
    tz: "America/Chicago",
    sector: "Business Analytics",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    summary: "One interactive Power BI report, three swappable KPI panels, no more spreadsheet reconciling.",
    stack: ["Power BI", "DAX", "Power Query"],
  },
  {
    slug: "call-centre-dashboard",
    name: "Call Centre Dashboard",
    region: "US",
    city: "Denver",
    tz: "America/Denver",
    sector: "Business Analytics",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    summary: "A Salesforce-native call centre dashboard — service level and agent performance, live.",
    stack: ["Power BI", "Salesforce", "DAX"],
  },
  {
    slug: "local-shops-analytics",
    name: "Local Shops Analytics",
    region: "US",
    city: "Seattle",
    tz: "America/Los_Angeles",
    sector: "Business Analytics",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    summary: "Azure Data Factory ETL feeding a Power BI suite for a multi-state US retail network.",
    stack: ["Azure Data Factory", "Azure SQL Database", "Power BI"],
  },
  {
    slug: "navan",
    name: "Navan",
    region: "US",
    city: "Palo Alto",
    tz: "America/Los_Angeles",
    sector: "Corporate Travel & Expense",
    status: "live",
    liveSince: null, // contract engagement — start date not for public listing
    liveUrl: "https://navan.com",
    summary: "Contract backend engineer on Navan's FastAPI & Node.js services powering live travel and expense booking.",
    stack: ["FastAPI", "Node.js", "PostgreSQL", "AWS RDS"],
  },
  {
    slug: "six-spa",
    name: "Six Spa",
    region: "EU",
    city: "Birmingham",
    tz: "Europe/London",
    sector: "Wellness & Hospitality",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    liveUrl: "https://www.sixprivatespa.co.uk",
    summary: "A private sanctuary for recovery and silence — booking site for a UK Midlands contrast-therapy spa.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    slug: "buyticket",
    name: "BuyTicket",
    region: "BR",
    city: "São Paulo",
    tz: "America/Sao_Paulo",
    sector: "Marketplace / Ticketing",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    liveUrl: "https://buyticketbrasil.com",
    summary: "Backend build on Bubble.io for Brazil's largest secondary ticket marketplace — database, workflows, and organizer onboarding behind buying, selling, and listing tickets.",
    stack: ["Bubble.io"],
  },
  {
    slug: "commonfloor",
    name: "CommonFloor",
    region: "IN",
    city: "Bangalore",
    tz: "Asia/Kolkata",
    sector: "Real Estate / Marketplace",
    status: "live",
    liveSince: null, // contract engagement, ongoing since 2020 — not the company's own launch date
    liveUrl: "https://www.commonfloor.com",
    summary: "Backend engineering team member since 2020 — search and filtering, listings/agent CRM, and platform infrastructure behind one of India's largest real estate marketplaces.",
    stack: ["Search & Filtering", "Listings & Agent CRM", "Platform APIs"],
  },
  {
    slug: "clear-investment-group",
    name: "Clear Investment Group",
    region: "US",
    city: "Chicago",
    tz: "America/Chicago",
    sector: "Real Estate Investment",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    liveUrl: "https://www.clearinvestmentgroup.com",
    summary: "WordPress site for a 22-year multifamily real estate investment firm — track record, fund offerings, and a gated investor portal built to convert investors, advisors, and sellers.",
    stack: ["WordPress"],
  },
  {
    slug: "ghl-automation",
    name: "GoHighLevel Chatbot & Automation",
    region: "US",
    city: "Dallas",
    tz: "America/Chicago",
    sector: "AI Automation / CRM",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    summary: "Multi-channel chatbot and automation system inside GoHighLevel — SMS, email, web chat and social lead capture, qualification, and booking across a 4-location setup.",
    stack: ["GoHighLevel", "Chatbot", "Meta API", "CRM Automation"],
  },
  {
    slug: "epicor-kinetic",
    name: "Epicor Kinetic Implementation",
    region: "US",
    city: "Austin",
    tz: "America/Chicago",
    sector: "Manufacturing / ERP Implementation",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    summary: "Epicor Kinetic implementation partner for manufacturing clients across several fields — ERP configuration, MES/IoT integration, data migration, and BI built around how each plant actually runs.",
    stack: ["Epicor Kinetic", "MES/IoT Integration", "BI & Reporting", "Data Migration"],
  },
  {
    slug: "pingo-ai",
    name: "Pingo AI",
    region: "US",
    city: "San Francisco",
    tz: "America/Los_Angeles",
    sector: "Consumer AI / EdTech",
    status: "live",
    liveSince: null, // contract engagement — not the company's own launch date
    liveUrl: "https://pingo.ai",
    summary: "Contract engineering across mobile, backend, and conversational AI for Pingo AI, a YC-backed language-learning app used by 6M+ learners.",
    stack: ["Mobile App Development", "Conversational AI Integration", "Feature Engineering"],
  },
  {
    slug: "opennote",
    name: "Opennote",
    region: "US",
    city: "San Francisco",
    tz: "America/Los_Angeles",
    sector: "Consumer AI / EdTech",
    status: "live",
    liveSince: null, // contract engagement — not the company's own launch date
    liveUrl: "https://www.opennote.com",
    summary: "Contract engineering across the frontend and AI tutor integration for Opennote, a YC-backed AI study platform used by 50,000+ students.",
    stack: ["Frontend Development", "AI Tutor Integration", "Feature Engineering"],
  },
  {
    slug: "blaze-ai",
    name: "Blaze.ai",
    region: "US",
    city: "San Francisco",
    tz: "America/Los_Angeles",
    sector: "MarTech / AI Marketing",
    status: "live",
    liveSince: null, // contract engagement — not the company's own launch date
    liveUrl: "https://www.blaze.ai",
    summary: "Contract engineering on the content generation engine and dashboard for Blaze.ai, a YC-backed all-in-one AI marketing platform.",
    stack: ["Content Generation Engine", "Dashboard Development", "Feature Engineering"],
  },
  {
    slug: "rerise",
    name: "Rerise",
    region: "US",
    city: "Ladera Ranch",
    tz: "America/Los_Angeles",
    sector: "Health & Longevity / DTC",
    status: "live",
    liveSince: null, // TODO(team): real go-live date — do not guess
    liveUrl: "https://rerisehealth.com",
    summary: "DTC site for Core100, a 13-active mitochondrial health protocol — root-cause science and a 90-day milestone timeline built to justify a premium subscription purchase.",
    stack: ["Shopify", "Klaviyo"],
  },
] satisfies ConsoleProject[];

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
