export interface GalleryItem {
  src: string;
  caption: string;
}

export interface ArchitectureLayer {
  layer: string;
  name: string;
  desc: string;
}

export interface DeepLearningModule {
  title: string;
  subtitle: string;
  description: string;
}

export interface Badge {
  label: string;
  value: string;
  sublabel?: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Outcome {
  label: string;
  value: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  gallery: GalleryItem[];
  link?: string;
  geography: string;
  sector: string;
  tagline: string;
  badges: Badge[];
  features: Feature[];
  deepLearning?: DeepLearningModule[];
  architecture: ArchitectureLayer[];
  stack: string[];
  outcomes: Outcome[];
  active: boolean;
  order: number;
  isPortfolio: true;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "verse-ai",
    title: "Verse AI",
    description:
      "Multi-tenant private ChatGPT for enterprise — 7-layer AWS architecture with RAG over company docs, cryptographic tenant isolation, and a multi-LLM gateway (Anthropic, OpenAI, Bedrock). Built for a Brazilian client, currently live in production.",
    category: "AI / Enterprise SaaS",
    image: "/projects/verse-ai-login.webp",
    gallery: [
      { src: "/projects/verse-ai-login.webp", caption: "Live login screen — Verse AI tenant portal" },
      { src: "/projects/verse-ai-aws-arch.webp", caption: "7-layer AWS architecture, modular by design" },
      { src: "/projects/verse-ai-chat-flow.webp", caption: "Chat request flow — from prompt to streamed response" },
      { src: "/projects/verse-ai-tenant-diagram.webp", caption: "Multi-tenant separation — each org gets its own private knowledge boundary" },
    ],
    link: "https://moovehubia.com.br",
    geography: "Brazil",
    sector: "Enterprise",
    tagline: "A private ChatGPT for the enterprise — built for a Brazilian client, currently in production.",
    badges: [
      { label: "MULTI-TENANT", value: "Enterprise SaaS" },
      { label: "HOSTED ON", value: "AWS (full stack)" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "moovehubia.com.br" },
    ],
    features: [
      {
        title: "Tenant isolation",
        description: "Each company gets its own private knowledge boundary, cryptographically separated from every other tenant.",
      },
      {
        title: "Instant answers",
        description: "RAG over the company's docs delivers grounded answers in seconds — no folder digging, no copy-paste.",
      },
      {
        title: "Conversational AI",
        description: "Natural multi-turn chat backed by a multi-LLM gateway (Anthropic, OpenAI, Bedrock, self-hosted).",
      },
    ],
    architecture: [
      { layer: "01", name: "Client Layer", desc: "External APIs · React / Next.js web · Tenant SDK widget" },
      { layer: "02", name: "Edge & Networking", desc: "CloudFront · Route 53 · WAF · API Gateway" },
      { layer: "03", name: "Application Layer", desc: "NestJS modular monolith on ECS Fargate w/ ALB" },
      { layer: "04", name: "AI / Inference", desc: "Bedrock · OpenAI · Anthropic · self-hosted SageMaker" },
      { layer: "05", name: "Async Processing", desc: "SQS ingestion + embedding queues, Fargate workers, DLQ" },
      { layer: "06", name: "Data & Storage", desc: "RDS Postgres MultiAZ · Qdrant vector DB · S3 · ElastiCache" },
      { layer: "07", name: "Observability & Sec", desc: "Cognito · KMS · Secrets Manager · CloudWatch · X-Ray" },
    ],
    stack: [
      "NestJS", "TypeScript", "PostgreSQL", "Qdrant", "Redis",
      "AWS Cognito", "AWS Bedrock", "OpenAI", "Anthropic", "SageMaker",
      "ECS Fargate", "S3", "SQS", "CloudFront", "WAF", "Route 53",
    ],
    outcomes: [
      { label: "Architecture", value: "Modular monolith, queue-decoupled async" },
      { label: "AI gateway", value: "Multi-LLM routing + embedding pipeline" },
      { label: "Status", value: "Actively used. Maintenance & roadmap ongoing." },
    ],
    active: true,
    order: 1,
    isPortfolio: true,
  },
  {
    id: "emedici",
    title: "eMedici",
    description:
      "Australia's leading medical-education Android app. Thousands of MCQs across specialties, mock exams that mirror Australian boards, OSCE stations, clinical case studies, and offline-first progress sync. 10K+ installs, 4.9★ on the Play Store.",
    category: "Mobile / Healthcare",
    image: "/projects/emedici-question-bank.webp",
    gallery: [
      { src: "/projects/emedici-question-bank.webp", caption: "Question Bank — live scoring across specialties" },
      { src: "/projects/emedici-osce.webp", caption: "OSCE Practice — solo or roleplay with friends" },
      { src: "/projects/emedici-mock-exam.webp", caption: "Mock Exam — 71% score, 97th percentile across Australia SA" },
    ],
    link: "https://play.google.com/store/apps/details?id=com.emedici.eMedici&pcampaignid=web_share",
    geography: "Australia",
    sector: "Healthcare",
    tagline: "Australia's leading medical-education Android app — built for EMEDICI2 PTY LTD, Adelaide.",
    badges: [
      { label: "DOWNLOADS", value: "10,000+", sublabel: "Google Play" },
      { label: "RATING", value: "4.9 ★", sublabel: "Play Store avg." },
      { label: "AUDIENCE", value: "Med students, junior doctors, registrars" },
      { label: "LIVE ON", value: "Google Play Store", sublabel: "com.emedici.eMedici" },
    ],
    features: [
      { title: "Thousands of MCQs", description: "Questions across specialties, designed to mirror real Australian clinical exams." },
      { title: "Mock exams", description: "Full-length mock exams that mirror Australian boards — timed, scored, and reviewed." },
      { title: "OSCE stations", description: "Clinical case studies and OSCE stations for practical exam preparation." },
      { title: "Offline-friendly", description: "Offline-friendly with progress sync — study anywhere, even without internet." },
    ],
    architecture: [],
    stack: ["Android", "Flutter"],
    outcomes: [
      { label: "Downloads", value: "10,000+ on Google Play" },
      { label: "Rating", value: "4.9★ average on Play Store" },
      { label: "Audience", value: "Medical students, junior doctors, and registrars across Australia" },
    ],
    active: true,
    order: 2,
    isPortfolio: true,
  },
  {
    id: "arm-tech",
    title: "ARM Tech ERP",
    description:
      "CementBook + TruckBook + FinanceBook — a complete 3-module ERP suite for a cement, fleet & cold-materials trader. Five deep-learning modules on top: LSTM demand forecasting, autoencoder anomaly detection, trip-profitability scoring, invoice OCR, and dealer-risk classification.",
    category: "ERP / Deep Learning",
    image: "/projects/armtech-dashboard.webp",
    gallery: [
      { src: "/projects/armtech-dashboard.webp", caption: "CementBook Dashboard — sales, profit, stock, receivables, payables, capital" },
      { src: "/projects/armtech-purchases.webp", caption: "Purchases — 63 rows, filterable by date, brand & supplier with Excel export" },
      { src: "/projects/armtech-truckbook.webp", caption: "TruckBook Dashboard — per-truck P&L, active trucks, total trips, monthly freight" },
      { src: "/projects/armtech-financebook.webp", caption: "FinanceBook — Revenue & Capital, bank breakdown, receivables & payables" },
    ],
    link: "https://cement-app.vercel.app",
    geography: "India",
    sector: "Trade & Logistics",
    tagline: "A 3-module ERP suite — CementBook, TruckBook, FinanceBook — for a cement, fleet & cold-materials trader.",
    badges: [
      { label: "CEMENTBOOK", value: "Purchases · Sales · Stock · Parties · Payments · Expenses" },
      { label: "TRUCKBOOK", value: "Fleet management with per-truck trip logs & profit tracking" },
      { label: "FINANCEBOOK", value: "Capital, bank, cash & receivables/payables accounting" },
      { label: "LIVE URL", value: "cement-app.vercel.app" },
    ],
    features: [
      { title: "Live profit", description: "Sales − purchases, refreshed on every entry." },
      { title: "Receivables view", description: "Customers who owe us, ranked & filterable." },
      { title: "Payables view", description: "Suppliers we owe, with aging and due dates." },
      { title: "Bank vs Cash", description: "Real-time net cash + bank reconciliation." },
      { title: "Brand mix", description: "Monthly sales breakdown by cement brand & type." },
      { title: "Excel export", description: "One-click export of any module's data." },
    ],
    deepLearning: [
      {
        title: "Demand Forecasting",
        subtitle: "LSTM + temporal features",
        description: "Predicts 7- to 30-day cement-bag demand per brand, godown & region — feeds purchase planning so stockouts and overstocks both drop.",
      },
      {
        title: "Anomaly Detection",
        subtitle: "Autoencoder on tx vectors",
        description: "Flags unusual entries in payments, expenses & bank movements — catches data-entry errors and suspicious activity in near real time.",
      },
      {
        title: "Trip Profitability",
        subtitle: "Tabular DL regressor",
        description: "Scores every potential truck trip on expected net profit using freight, fuel, route & driver features — guides dispatch in TruckBook.",
      },
      {
        title: "Invoice OCR",
        subtitle: "CNN backbone + Transformer",
        description: "Reads supplier bills from a phone camera and auto-fills purchase entries — cuts manual import time per bill from minutes to seconds.",
      },
      {
        title: "Dealer Risk Scoring",
        subtitle: "Tabular DL classifier",
        description: "Scores each dealer/party on dormancy and default risk, surfacing accounts that need a follow-up before they go cold.",
      },
    ],
    architecture: [
      { layer: "01", name: "Sources", desc: "Supabase (Postgres) — Sales & purchases ledgers, bank & cash transactions, truck trip logs, supplier invoices (images)" },
      { layer: "02", name: "Feature Pipeline", desc: "Nightly Airflow batch jobs — time-series feature builders, tabular cleaning & encoding, image preprocessing (OCR), feature store in Postgres" },
      { layer: "03", name: "Model Layer", desc: "LSTM — demand forecasting · Autoencoder — anomalies · Tabular DL — trip profit · CNN+Transformer — OCR · Tabular DL — dealer risk" },
      { layer: "04", name: "Serving", desc: "FastAPI inference service · Cached predictions in Redis · Surfaced in CementBook UI · Alerts via dashboard widgets · Excel-export ready outputs" },
    ],
    stack: ["Next.js", "React", "Supabase", "PostgreSQL", "FastAPI", "LSTM", "TensorFlow", "Airflow", "Redis", "Vercel"],
    outcomes: [
      { label: "Modules", value: "CementBook · TruckBook · FinanceBook" },
      { label: "AI modules", value: "5 deep-learning modules on one pipeline" },
      { label: "Stack", value: "Next.js · Supabase · SSO Auth · Excel export · Vercel deploy" },
    ],
    active: true,
    order: 3,
    isPortfolio: true,
  },
  {
    id: "ai-resume",
    title: "AI Resume Builder",
    description:
      "Paste a job description — get an ATS-optimized resume back in seconds. OpenAI GPT rewrites each section against the parsed posting. Next.js on AWS Amplify + CloudFront, FastAPI on EC2, fully dockerized with GitHub Actions CI/CD.",
    category: "AI / SaaS",
    image: "/projects/resume-ai-hero.webp",
    gallery: [
      { src: "/projects/resume-ai-hero.webp", caption: "Live homepage — paste a job description, get an ATS-optimized resume in seconds" },
      { src: "/projects/resume-ai-ats-score.webp", caption: "ATS Match Score — the same scanner recruiters use, keyword detection before and after" },
      { src: "/projects/resume-ai-examples.webp", caption: "Resume examples gallery — role-specific templates that get results" },
      { src: "/projects/resume-ai-arch.webp", caption: "Three-layer architecture — Data, Application & Presentation with GitHub Actions CI/CD" },
    ],
    link: "https://www.nailhiring.com/",
    geography: "USA",
    sector: "Early-stage SaaS",
    tagline: "US client. Paste a job description — get an ATS-optimized resume back in seconds.",
    badges: [
      { label: "AI ENGINE", value: "OpenAI GPT" },
      { label: "STACK", value: "Next.js · FastAPI · AWS" },
      { label: "STAGE", value: "Live · early-stage SaaS" },
      { label: "LIVE URL", value: "nailhiring.com" },
    ],
    features: [
      { title: "Paste the job post", description: "Drop in the description you are aiming at, plus the link if there is one." },
      { title: "Read and match", description: "It parses the posting and picks out the skills and keywords it asks for." },
      { title: "Rewrite with GPT", description: "OpenAI reworks each section so the resume speaks to that exact role." },
      { title: "Download, ATS ready", description: "You get back a formatted file built to clear the automated screeners." },
    ],
    architecture: [
      { layer: "Presentation", name: "Frontend", desc: "Next.js on AWS Amplify served via CloudFront. Google SSO + OAuth." },
      { layer: "Application", name: "Backend", desc: "FastAPI on EC2. Dockerized images pushed via GitHub Actions." },
      { layer: "AI Layer", name: "Intelligence", desc: "OpenAI API rewrites the resume against the parsed job description in real time." },
      { layer: "Data", name: "Storage", desc: "Supabase (Postgres) for structured records. S3 bucket for resume files." },
    ],
    stack: ["Next.js", "FastAPI", "OpenAI GPT", "AWS Amplify", "CloudFront", "EC2", "Docker", "GitHub Actions", "Supabase", "S3"],
    outcomes: [
      { label: "Output", value: "ATS-optimized resume in under 60 seconds" },
      { label: "CI/CD", value: "Fully dockerized with GitHub Actions on the rails" },
      { label: "Stage", value: "Live and moving fast" },
    ],
    active: true,
    order: 4,
    isPortfolio: true,
  },
  {
    id: "nestflow",
    title: "NestFlow",
    description:
      "Property management for landlords — properties, tenants, leases, and rent in one app. Microservices architecture: auth service, PDF contract generator, email worker for rent notices, MongoDB for records, Redis for sessions. Separate landlord and tenant portals.",
    category: "PropTech / Microservices",
    image: "/projects/nestflow-rents.webp",
    gallery: [
      { src: "/projects/nestflow-rents.webp", caption: "Rent dashboard — €107,040 outstanding across 4 leases" },
      { src: "/projects/nestflow-properties.webp", caption: "Properties list — all properties with tenants, location and rent" },
      { src: "/projects/nestflow-contract.webp", caption: "Tenant lease — contract details, billing, rental breakdown" },
      { src: "/projects/nestflow-property-detail.webp", caption: "Property detail — type, name, map location via OpenStreetMap" },
    ],
    geography: "Europe",
    sector: "PropTech",
    tagline: "A property management platform for landlords. Properties, tenants, leases and rent, all in one place.",
    badges: [
      { label: "ARCHITECTURE", value: "Microservices" },
      { label: "STACK", value: "Docker, MongoDB, Redis" },
      { label: "STAGE", value: "Live demo, in build" },
      { label: "MARKET", value: "Europe, landlords" },
    ],
    features: [
      { title: "Properties", description: "Add and manage all your properties in one place — details, documents, and status at a glance." },
      { title: "Tenant management", description: "Sign tenants, store their details, and track lease history across every property." },
      { title: "Leases & rent", description: "Raise the rent, track what's paid and what's overdue — all automated." },
      { title: "Dual portals", description: "Separate landlord and tenant portals — each user sees exactly what they need." },
    ],
    architecture: [
      { layer: "Frontend", name: "Front ends", desc: "Two web apps — one for landlords, one for tenants — behind a shared REST API." },
      { layer: "Services", name: "Microservices", desc: "Auth, billing and contracts split into small services that scale on their own." },
      { layer: "Async", name: "Workers", desc: "A PDF contract generator plus an email worker that sends rent notices and receipts." },
      { layer: "Data", name: "Storage", desc: "MongoDB keeps the records, Redis handles sessions and queues, all inside Docker." },
    ],
    stack: ["Microservices", "MongoDB", "Redis", "Docker"],
    outcomes: [
      { label: "Portals", value: "Separate landlord and tenant web apps" },
      { label: "Architecture", value: "Containerized microservices — one compose file brings the whole stack up" },
      { label: "Stage", value: "Live demo, actively in build" },
    ],
    active: true,
    order: 5,
    isPortfolio: true,
  },
  {
    id: "pinnacle-hms",
    title: "Pinnacle HMS",
    description:
      "The operating system for a working hospital — built for Pinnacle General Hospital and live in production. Six role-based portals (admin, reception, doctor, nurse, OT, accounts) over a modular domain model of 39 tables and 57 relationships, with per-role wallets, audit logs, and finance tracking, on a REST API + MySQL backend.",
    category: "Healthcare / SaaS",
    image: "/projects/pinnacle-admin.webp",
    gallery: [
      { src: "/projects/pinnacle-admin.webp", caption: "Admin dashboard — staffing, beds & finance in one command centre" },
      { src: "/projects/pinnacle-portals.webp", caption: "Six role-based portals — one secure staff sign-in" },
      { src: "/projects/pinnacle-doctor.webp", caption: "Doctor portal — weekly availability, patients, operation schedule & wallet" },
      { src: "/projects/pinnacle-reception.webp", caption: "Reception — intake, emergency & invoicing" },
      { src: "/projects/pinnacle-nurse.webp", caption: "Nurse — wards, beds & monitoring" },
      { src: "/projects/pinnacle-ot.webp", caption: "OT — surgery scheduling & surgeon/anaesthetist/nurse fee splits" },
      { src: "/projects/pinnacle-accounts.webp", caption: "Accounts — income, salaries & per-role wallets" },
      { src: "/projects/pinnacle-architecture.webp", caption: "Architecture — 39 tables, 57 relationships across five modules" },
    ],
    geography: "India",
    sector: "Healthcare",
    tagline: "The operating system for a working hospital — built for Pinnacle General Hospital, live in production.",
    badges: [
      { label: "DOMAIN MODEL", value: "Modular · 39 tables" },
      { label: "STACK", value: "REST API · MySQL" },
      { label: "STATUS", value: "Live in production" },
      { label: "SECTOR", value: "India · Healthcare" },
    ],
    features: [
      { title: "Six role portals", description: "Admin, reception, doctor, nurse, OT and accounts — one login, role-aware portals." },
      { title: "Live headcount", description: "Doctors, nurses, reception, accounts & OT staff — view or add staff in one click." },
      { title: "Wards & cabins", description: "Male, female, child & maternity wards; normal, AC & double-AC cabins with live occupancy." },
      { title: "Finance at a glance", description: "Credit, debit & income tracked monthly on the live ledger." },
      { title: "Audit & control", description: "Full activity log, system logs, specialties, tests & services — admin-managed." },
      { title: "Role-based auth", description: "Secure staff sign-in with per-role wallets and audit trails on every action." },
    ],
    architecture: [
      { layer: "01", name: "Patient Care", desc: "OPD, IPD, emergency & physio — admissions, beds, releases" },
      { layer: "02", name: "Diagnostics", desc: "Pathology & dental — test orders, results and billing logs" },
      { layer: "03", name: "Operations Theatre", desc: "Scheduling with surgeon, anaesthetist & nurse fee splits" },
      { layer: "04", name: "Finance & Wallets", desc: "Per-role wallets, income logs, salaries, creditors, tax" },
      { layer: "05", name: "Staff & Org", desc: "Admin, roles, doctor schedules, specialties & audit trail" },
    ],
    stack: ["REST API", "MySQL", "Role-based Auth", "Wallet ledger", "Audit logs"],
    outcomes: [
      { label: "Portals", value: "Six role-based portals on one login" },
      { label: "Domain model", value: "39 tables · 57 relationships across 5 modules" },
      { label: "Status", value: "Live in production at Pinnacle General Hospital" },
    ],
    active: true,
    order: 6,
    isPortfolio: true,
  },
];

export function getPortfolioProjectById(id: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.id === id);
}
