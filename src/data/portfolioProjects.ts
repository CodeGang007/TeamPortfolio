export interface GalleryItem {
  src: string;
  caption: string;
  /** Defaults to "image" when omitted — existing galleries stay untouched. */
  type?: "image" | "video";
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
  /** Original source deck/report, offered as a "read the full thing" download. */
  pdfUrl?: string;
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
    id: "coba",
    title: "COBA",
    description:
      "A creative community hub opening on the first floor of Nation Towers Mall, Al Bateen, Abu Dhabi. We built the brand system and the bilingual website end to end \u2014 English and Russian, the week\u2019s programme, the rooms and what they cost, the founders\u2019 story \u2014 and then the layer most studios hand off: the Instagram launch campaign, the story-highlight set, and the three-minute loop that plays on the screen inside the mall.",
    category: "Brand & Web / Community",
    image: "/projects/coba-hero.webp",
    gallery: [
      { src: "/projects/coba-hero.webp", caption: "Homepage \u2014 \u201cA creative community hub for children, families and adults\u201d" },
      { src: "/projects/coba-week.webp", caption: "Our community \u2014 the programme, in English, Russian and Arabic" },
      { src: "/projects/coba-community.webp", caption: "\u201cWhich one are you?\u201d \u2014 the three ways to be part of COBA" },
    ],
    link: "https://cobauae.com",
    geography: "Abu Dhabi, UAE",
    sector: "Community & Hospitality",
    tagline:
      "One roof for children, families and adults \u2014 the brand, the bilingual site, and the screen in the mall.",
    badges: [
      { label: "REGION", value: "Abu Dhabi, UAE" },
      { label: "STACK", value: "Next.js \u00b7 TypeScript \u00b7 Vercel" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "cobauae.com" },
    ],
    features: [
      { title: "Bilingual by construction", description: "Every page ships in English and Russian off one content layer, with Arabic running through the brand furniture rather than bolted on as a third translation." },
      { title: "The week, not a brochure", description: "The programme is modelled as what actually happens \u2014 mornings, afternoons, evenings, weekends \u2014 so a parent can find their slot instead of reading a services list." },
      { title: "Brand system applied", description: "The crossbar-less COBA wordmark, the owl mark and the plaster-and-olive palette carried from the brand book into the site, the social set and the in-mall screen." },
      { title: "Launch campaign", description: "A scroll-through carousel in both languages, a story set carrying the link, eight highlight covers, and a three-minute silent loop for the mall screen." },
    ],
    architecture: [],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    outcomes: [
      { label: "Scope", value: "Brand system, bilingual website, Instagram launch set, in-mall screen loop" },
      { label: "Languages", value: "English and Russian, with Arabic brand furniture throughout" },
      { label: "Status", value: "Live at cobauae.com ahead of the doors opening" },
    ],
    active: true,
    order: 22,
    isPortfolio: true,
  },
  {
    id: "verse-ai",
    title: "Verse AI",
    description:
      "Multi-tenant private ChatGPT for enterprise — 7-layer AWS architecture with RAG over company docs, cryptographic tenant isolation, and a multi-LLM gateway (Anthropic, OpenAI, Bedrock). Built for a Brazilian client, currently live in production.",
    category: "AI / Enterprise SaaS",
    image: "/projects/verse-ai-login.webp",
    gallery: [
      { src: "/projects/verse-ai-system-architecture.webp", caption: "Full system architecture — Next.js frontend, NestJS backend with an LLM gateway, and a Postgres + Qdrant + Redis data layer routing across five LLM providers" },
      { src: "/projects/verse-ai-rag-architecture.webp", caption: "RAG pipeline — ingestion (extraction, chunking, TF-IDF and dense embedding into Qdrant) and retrieval (hybrid cosine + BM25 search, RRF, reranking) feeding the LLM orchestrator" },
      { src: "/projects/verse-ai-chunking.gif", caption: "Knowledge Base ingestion — live document parsing and chunk-level inspection against the source PDF" },
      { src: "/projects/verse-ai-clustering-summarization.webp", caption: "Hierarchical clustering and cross-chunk summarization — indexed alongside raw chunks for higher-level retrieval" },
      { src: "/projects/verse-ai-tenant-diagram.webp", caption: "Multi-tenant separation — each org gets its own private knowledge boundary" },
      { src: "/projects/verse-ai-login.webp", caption: "Live login screen — Verse AI tenant portal" },
      { src: "/projects/verse-ai-aws-arch.webp", caption: "7-layer AWS architecture, modular by design" },
      { src: "/projects/verse-ai-chat-flow.webp", caption: "Chat request flow — from prompt to streamed response" },
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
  {
    id: "student-insights-suite",
    title: "Student Insights Suite",
    description:
      "A four-campus school was running enrolment, attendance and disability-compliance reporting off disconnected exports — nobody could answer \"how many students enrolled this quarter\" without manually reconciling spreadsheets from each campus. We built a six-page Power BI suite on one shared data model: demographics, NCCD compliance, a live student-residence map, enrolment trends with year-over-year growth, attendance by campus and cohort, and — the page that changed how the data gets trusted — an automated Data Quality Overview that counts blank and missing fields per table on every refresh, so a bad data load gets caught before it reaches a report.",
    category: "Business Analytics / Education",
    image: "/projects/student-insights-demographics.webp",
    gallery: [
      { src: "/projects/student-insights-demographics.webp", caption: "Student Demographics — age, gender, campus and country of birth in one view" },
      { src: "/projects/student-insights-nccd.webp", caption: "NCCD — disability category and adjustment-level compliance reporting" },
      { src: "/projects/student-insights-residence-map.webp", caption: "Student Residence by Postcode — every enrolment plotted across greater Melbourne" },
      { src: "/projects/student-insights-enrolment-trends.webp", caption: "Enrolment Trends — quarterly enrolment vs exit, net change and YoY growth" },
      { src: "/projects/student-insights-attendance.webp", caption: "Attendance Overview — attendance rate by year, campus, age and postcode" },
      { src: "/projects/student-insights-data-quality.webp", caption: "Data Quality Overview — automated blank-field checks across every source table" },
    ],
    pdfUrl: "/projects/student-insights-suite-deck.pdf",
    geography: "Australia",
    sector: "Business Analytics",
    tagline: "Four campuses, one data model — enrolment, attendance and NCCD compliance in one Power BI suite.",
    badges: [
      { label: "CAMPUSES", value: "4", sublabel: "Sunshine, South Melbourne, City, Prahran" },
      { label: "REPORTS", value: "6-page Power BI suite" },
      { label: "COMPLIANCE", value: "NCCD-ready reporting" },
      { label: "DATA QUALITY", value: "Automated blank-field checks" },
    ],
    features: [
      { title: "Enrolment trends", description: "Quarterly enrolment vs exit, net change and year-over-year growth, broken down by campus, age and gender." },
      { title: "NCCD compliance", description: "Disability category and adjustment-level reporting built to the Nationally Consistent Collection of Data standard." },
      { title: "Attendance overview", description: "Attendance rate sliced by year, campus, age, gender and postcode, with a three-year trend line." },
      { title: "Residence mapping", description: "Every enrolled student's postcode plotted on a live map, sized by student count." },
      { title: "Data quality checks", description: "An automated page that counts blank fields per table so staff catch a data problem before it reaches a report." },
    ],
    architecture: [
      { layer: "01", name: "Source data", desc: "Student information system exports — enrolment, attendance, demographic and NCCD extracts" },
      { layer: "02", name: "Modelling", desc: "Power Query transforms feeding a shared DAX star schema joining campus, term and student dimensions" },
      { layer: "03", name: "Reporting", desc: "Six Power BI report pages with synced slicers for school year, campus and cohort" },
      { layer: "04", name: "Governance", desc: "A dedicated data-quality page scoring blank and missing fields per table on every refresh" },
    ],
    stack: ["Power BI", "Power Query", "DAX", "Azure Maps"],
    outcomes: [
      { label: "Coverage", value: "522 students across 4 campuses in one model" },
      { label: "Compliance", value: "NCCD reporting built to the national standard" },
      { label: "Trust", value: "Staff catch data gaps before they reach a report, not after" },
    ],
    active: true,
    order: 7,
    isPortfolio: true,
  },
  {
    id: "sales-performance-report",
    title: "Sales Performance Report",
    description:
      "Sales, ops and finance each pulled their own spreadsheet export to check sales, order quantity and customer counts — and every export used a different date range, so the numbers never quite matched by the time everyone sat down in the same meeting. We built a single interactive Power BI report with three independently swappable KPI panels: any panel can show Total Sales, Total Qty or Total Customers, each with its own time-range toggle from one week to all-time, its own prior-period comparison, and its own trend line. Two people can now look at the exact same report and compare different metrics across different windows without either of them touching a spreadsheet.",
    category: "Business Analytics",
    image: "/projects/sales-performance-1.webp",
    gallery: [
      { src: "/projects/sales-performance-1.webp", caption: "Total Sales, Qty and Customers — each panel independently toggled by time range" },
      { src: "/projects/sales-performance-2.webp", caption: "Every toggle recalculates its own trend line and prior-period delta instantly" },
      { src: "/projects/sales-performance-3.webp", caption: "Panels are fully swappable — any KPI in any position, per viewer's preference" },
      { src: "/projects/sales-performance-walkthrough.mp4", caption: "Full walkthrough — swapping KPIs and time ranges live in Power BI", type: "video" },
    ],
    geography: "USA",
    sector: "Business Analytics",
    tagline: "One interactive Power BI report, three swappable KPI panels, no more spreadsheet reconciling.",
    badges: [
      { label: "KPI PANELS", value: "3 independently swappable" },
      { label: "TIME RANGES", value: "1 week to all-time, per panel" },
      { label: "COMPARISON", value: "Automatic prior-period delta" },
      { label: "REFRESH", value: "Scheduled Power BI dataset refresh" },
    ],
    features: [
      { title: "Swappable KPIs", description: "Each panel's dropdown swaps between Total Sales, Total Qty and Total Customers — no separate report needed per metric." },
      { title: "Independent time windows", description: "Every panel toggles its own range — 1 week to all-time — so two metrics can be compared across different periods at once." },
      { title: "Prior-period deltas", description: "Every number ships with its change versus the previous period, in both absolute and percentage terms." },
      { title: "Trend sparkline", description: "A trend line with moving average sits under every panel so a spike reads as signal or noise at a glance." },
    ],
    architecture: [
      { layer: "01", name: "Data source", desc: "Client's transactional sales records, refreshed on a scheduled Power BI dataset refresh" },
      { layer: "02", name: "Modelling", desc: "Power Query transforms feeding a DAX measure library shared across all three panels" },
      { layer: "03", name: "Report", desc: "A single interactive Power BI page — synced slicers, independent per-panel time intelligence" },
    ],
    stack: ["Power BI", "DAX", "Power Query"],
    outcomes: [
      { label: "Before", value: "Separate spreadsheet exports per team, per metric, per time window" },
      { label: "After", value: "One shared report — every team looks at the same numbers" },
      { label: "Format", value: "Live Power BI report, walked through on video" },
    ],
    active: true,
    order: 8,
    isPortfolio: true,
  },
  {
    id: "call-centre-dashboard",
    title: "Call Centre Dashboard",
    description:
      "Call centre leadership only found out about a bad service day — a blown service level, a spike in abandoned calls — after the fact, buried in a Salesforce case report built for support tickets, not call operations. We built a two-page Power BI dashboard fed directly by Salesforce call data: a Call Stats page tracking service level, abandon rate and handle time against a rolling date range, and an Agent Stats page breaking every metric down per agent. A team lead can now see who needs coaching before the queue backs up, not after month-end.",
    category: "Business Analytics",
    image: "/projects/call-centre-stats.webp",
    gallery: [
      { src: "/projects/call-centre-stats.webp", caption: "Call Stats — service level, abandon rate and handle time across 21,661 calls" },
      { src: "/projects/call-centre-agents.webp", caption: "Agent Stats — per-agent call volume, talk time and after-call work" },
    ],
    geography: "USA",
    sector: "Business Analytics",
    tagline: "A Salesforce-native call centre dashboard — service level and agent performance, live.",
    badges: [
      { label: "CALLS TRACKED", value: "21,661", sublabel: "across 42 days" },
      { label: "SOURCE", value: "Salesforce Service Cloud" },
      { label: "SERVICE LEVEL", value: "48.32% live" },
      { label: "AGENTS", value: "Per-agent scorecards" },
    ],
    features: [
      { title: "Service-level tracking", description: "Service level, abandon rate and abandon count tracked against a rolling date range, not a monthly export." },
      { title: "Disposition breakdown", description: "Top 10 call dispositions ranked by volume, so recurring issues surface without a manual tally." },
      { title: "Skill-level service", description: "Service level broken out by skill queue — Support, Service, OM, Sales — so a bottleneck in one queue doesn't hide behind a blended average." },
      { title: "Per-agent scorecards", description: "Talk time, hold time, after-call work and handle time per agent, sortable, for one-on-one coaching conversations." },
    ],
    architecture: [
      { layer: "01", name: "Source", desc: "Salesforce Service Cloud call and case objects" },
      { layer: "02", name: "Modelling", desc: "Power Query pulls call, agent and disposition tables into a shared DAX model" },
      { layer: "03", name: "Reporting", desc: "Two synced Power BI pages — Call Stats and Agent Stats — filterable by skill and date range" },
    ],
    stack: ["Power BI", "Salesforce", "DAX"],
    outcomes: [
      { label: "Visibility", value: "Service level and abandon rate visible same-day, not after month-end" },
      { label: "Coaching", value: "Per-agent handle time and after-call work make coaching conversations specific" },
      { label: "Source", value: "Built directly on Salesforce — no separate call-logging system" },
    ],
    active: true,
    order: 9,
    isPortfolio: true,
  },
  {
    id: "local-shops-analytics",
    title: "Local Shops Analytics",
    description:
      "\"Shop Local\", a multi-state US grocery and local-shop retail network, had sales, returns and customer data scattered across store-level systems with no way to compare performance across stores, categories or customer segments — nobody could answer which store or product line was actually losing money without a manual pull per store. We built an Azure Data Factory + Azure Functions ETL pipeline that lands and transforms the data into Azure SQL Database on a schedule, then a Power BI suite on top — a Summary page, a Product Analysis drilldown, a Customer Analysis view, and a store-level map — so category managers and store ops can see revenue, returns and customer behaviour down to a single store and product.",
    category: "Business Analytics / Retail",
    image: "/projects/shop-local-summary.webp",
    gallery: [
      { src: "/projects/shop-local-summary.webp", caption: "Summary — total customers, revenue, returns and best/least performing store, brand and product" },
      { src: "/projects/shop-local-trends.webp", caption: "Monthly trend — sales, returns and product revenue month over month across two years" },
      { src: "/projects/shop-local-product-analysis.webp", caption: "Product Analysis — category to brand to product drilldown, with low-fat/recyclable breakdown" },
      { src: "/projects/shop-local-customer-analysis.webp", caption: "Customer Analysis — revenue by gender, marital status, occupation and top customers by state" },
    ],
    geography: "USA",
    sector: "Business Analytics",
    tagline: "Azure Data Factory ETL feeding a Power BI suite for a multi-state US retail network.",
    badges: [
      { label: "ETL", value: "Azure Data Factory + Azure Functions" },
      { label: "WAREHOUSE", value: "Azure SQL Database" },
      { label: "REVENUE TRACKED", value: "$2bn", sublabel: "across 8,803 customers" },
      { label: "COVERAGE", value: "Store-level drill-down, US-wide" },
    ],
    features: [
      { title: "Automated ETL", description: "Azure Data Factory pipelines trigger Azure Functions to clean and load store, product and transaction data into Azure SQL Database on a schedule — no manual exports." },
      { title: "Executive summary", description: "Total revenue, sales quantity, returns and best/least performing category, product, brand and store in one page." },
      { title: "Product analysis", description: "Sales and returns drilldown by category, brand and product, plus a low-fat/recyclable breakdown for compliance-minded buyers." },
      { title: "Customer analysis", description: "Revenue by gender, marital status and occupation, plus a top-15 customer leaderboard by sales quantity." },
      { title: "Store drill-down map", description: "Every store plotted geographically, sized by quantity sold, drillable from state down to individual address." },
    ],
    architecture: [
      { layer: "01", name: "Ingestion", desc: "Azure Data Factory pipelines pull raw store, product and transaction data on a schedule" },
      { layer: "02", name: "Transform", desc: "Azure Functions clean, validate and reshape the data before load" },
      { layer: "03", name: "Warehouse", desc: "Azure SQL Database holds the modelled star schema" },
      { layer: "04", name: "Reporting", desc: "Power BI connects live to Azure SQL — Summary, Product Analysis and Customer Analysis pages" },
    ],
    stack: ["Azure Data Factory", "Azure Functions", "Azure SQL Database", "Power BI"],
    outcomes: [
      { label: "Pipeline", value: "Fully automated Azure Data Factory + Functions ETL — no manual data pulls" },
      { label: "Scale", value: "$2bn in tracked revenue across 8,803 customers and 815K units sold" },
      { label: "Granularity", value: "Store-level drill-down from national total to a single address" },
    ],
    active: true,
    order: 10,
    isPortfolio: true,
  },
  {
    id: "navan",
    title: "Navan",
    description:
      "Joined Navan's backend engineering team on a contract basis, working across their FastAPI and Node.js services. Fixed and hardened API routes and middleware powering business travel, hotel and flight booking at scale.",
    category: "Backend Engineering / Corporate Travel",
    image: "/projects/navan-flight-booking.webp",
    gallery: [
      { src: "/projects/navan-flight-booking.webp", caption: "In-policy vs out-of-policy fare comparison on a live flight booking" },
      { src: "/projects/navan-hotel-booking.webp", caption: "Hotel search — policy pricing guidance and map-based results" },
      { src: "/projects/navan-mobile-app.webp", caption: "Trip itinerary and hotel search on mobile" },
    ],
    link: "https://navan.com",
    geography: "USA",
    sector: "Corporate Travel & Expense",
    tagline: "Contract backend engineer on Navan's FastAPI & Node.js services powering live corporate travel booking.",
    badges: [
      { label: "ENGAGEMENT", value: "Contract · Backend Engineering" },
      { label: "STACK", value: "FastAPI · Node.js · PostgreSQL" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "navan.com" },
    ],
    features: [
      { title: "Backend on FastAPI & Node.js", description: "Debugged and rebuilt API routes and middleware across their dual-stack backend, keeping booking and expense flows reliable in production." },
      { title: "PostgreSQL on AWS RDS", description: "Owned schema changes, query tuning and reliability work on the production database layer behind live corporate bookings." },
      { title: "Google Maps & third-party APIs", description: "Integrated the Google Maps API plus several external providers for payments, inventory and notifications into the backend." },
    ],
    architecture: [],
    stack: ["FastAPI", "Node.js", "PostgreSQL", "AWS RDS", "Google Maps API"],
    outcomes: [
      { label: "Role", value: "Contract backend engineer on Navan's engineering team" },
      { label: "Scope", value: "API routes, middleware, and database reliability across booking & expense flows" },
      { label: "Status", value: "Live in production, corporate travel at scale" },
    ],
    active: true,
    order: 11,
    isPortfolio: true,
  },
  {
    id: "six-spa",
    title: "Six Spa",
    description:
      "A private contrast-therapy spa in the UK Midlands, built and designed as a private sanctuary — fusion sauna, cold plunge, steam room and a guided four-step recovery journey. We built the marketing and booking website end to end: the facilities showcase, memberships, gift-card shop, FAQ and policies, and the animated \"Journey\" science section explaining the heat-cold-heat-decompress protocol.",
    category: "Web Design / Hospitality",
    image: "/projects/six-spa-hero.webp",
    gallery: [
      { src: "/projects/six-spa-hero.webp", caption: "Homepage — \"A private sanctuary for recovery and silence\"" },
      { src: "/projects/six-spa-facilities.webp", caption: "Facilities — Fusion Sauna and Steam Room, shot in the actual space" },
      { src: "/projects/six-spa-journey.webp", caption: "The Journey — animated four-step contrast-therapy science section" },
    ],
    link: "https://www.sixprivatespa.co.uk",
    geography: "United Kingdom",
    sector: "Wellness & Hospitality",
    tagline: "A private sanctuary for recovery and silence — booking site for a UK Midlands contrast-therapy spa.",
    badges: [
      { label: "REGION", value: "Midlands, UK" },
      { label: "STACK", value: "Next.js · Tailwind CSS · Framer Motion" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "sixprivatespa.co.uk" },
    ],
    features: [
      { title: "Facilities showcase", description: "Fusion sauna, steam room, cold plunge and decompress zones, each with its own full-bleed feature card." },
      { title: "The Journey", description: "An animated four-step science section walking guests through the heat-cold-heat-decompress contrast-therapy protocol." },
      { title: "Memberships & gift cards", description: "Membership tiers and a gift-card shop alongside packages, FAQ and studio policies." },
      { title: "Direct booking", description: "A persistent \"Book Now\" call to action across every page, built for conversion." },
    ],
    architecture: [],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    outcomes: [
      { label: "Scope", value: "Full marketing site — home, facilities, memberships, products, gift cards, FAQ, policies" },
      { label: "Design", value: "Dark, minimal editorial look built around real spa photography" },
      { label: "Status", value: "Live in production for a UK Midlands spa brand" },
    ],
    active: true,
    order: 12,
    isPortfolio: true,
  },
  {
    id: "rerise",
    title: "Rerise",
    description:
      "Rerise sells Core100, a 13-active mitochondrial health protocol, as a 90-day commitment — a harder sell than a typical impulse-buy supplement, to an audience of health-conscious 40–65 year-olds who expect evidence over hype. We built the site around that problem: a \"Root Cause\" section reframes fatigue, brain fog and slow recovery as one underlying mechanism — mitochondrial dysfunction and NAD+ depletion — before any product appears. Every active ingredient carries its own cited trial statistic instead of a blanket \"clinically proven\" claim. And an interactive Day 1–4 → Day 30 → Day 60 → Day 90 timeline sets expectations for gradual, cumulative results up front, so buyers don't churn early on a long-commitment purchase. A separate Practitioners track runs alongside the consumer funnel, with Shopify and Klaviyo handling checkout and the lifecycle emails that reinforce the same 90-day timeline after purchase.",
    category: "Web Design / DTC Health & Wellness",
    image: "/projects/rerise-hero.webp",
    gallery: [
      { src: "/projects/rerise-hero.webp", caption: "Homepage — \"Upgrade your cellular energy system with Core100\"" },
      { src: "/projects/rerise-root-cause.webp", caption: "The Root Cause — reframing fatigue and brain fog as mitochondrial dysfunction, before the product pitch" },
      { src: "/projects/rerise-benefits.webp", caption: "Ingredient-level evidence — NAD+/NADH up 38% vs 14% on placebo in a 60-day trial" },
    ],
    link: "https://rerisehealth.com",
    geography: "USA",
    sector: "Health & Longevity / DTC",
    tagline: "A root-cause science narrative and a 90-day milestone timeline, built to justify a premium subscription protocol.",
    badges: [
      { label: "MODEL", value: "DTC · 90-day subscription protocol" },
      { label: "STACK", value: "Shopify · Klaviyo" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "rerisehealth.com" },
    ],
    features: [
      { title: "Root-cause narrative", description: "Reframes fatigue, brain fog and slow recovery as symptoms of one mechanism — mitochondrial dysfunction — so visitors get a diagnosis before a pitch." },
      { title: "Ingredient-level evidence", description: "Every active ingredient ships with its own cited trial data — a 38% NAD+/NADH increase vs 14% on placebo, for example — replacing generic \"clinically proven\" claims with falsifiable numbers." },
      { title: "90-day milestone timeline", description: "An interactive Day 1–4 → Day 30 → Day 60 → Day 90 timeline sets expectations for cumulative results up front, reducing early drop-off on a long-commitment purchase." },
      { title: "Consumer + practitioner tracks", description: "A dedicated Practitioners section runs alongside the consumer funnel, so the same protocol sells direct and gets referred through clinicians." },
    ],
    architecture: [],
    stack: ["Shopify", "Klaviyo"],
    outcomes: [
      { label: "Problem", value: "Justify a premium 90-day protocol to a skeptical, science-literate 40–65 audience" },
      { label: "Approach", value: "Root-cause education, cited per-ingredient trial data, and a milestone timeline in place of hype-driven DTC copy" },
      { label: "Status", value: "Live storefront, consumer and practitioner channels running side by side" },
    ],
    active: true,
    order: 13,
    isPortfolio: true,
  },
  {
    id: "buyticket",
    title: "BuyTicket",
    description:
      "BuyTicket is one of Brazil's largest secondary marketplaces for event tickets, connecting sellers and buyers nationwide — football, Carnaval, Rock in Rio, World Cup matches, and touring artists all move through it. As part of the MVP team, I built the entire backend on Bubble.io: the database structure, core workflows, and business logic behind buying, selling, and listing tickets. I also built the organizer onboarding flow, letting event organizers from several Brazilian states list and manage their own events on the platform. The result was a functional, scalable ticketing marketplace ready to launch and grow.",
    category: "Marketplace / Bubble.io",
    image: "/projects/buyticket-hero.webp",
    gallery: [
      { src: "/projects/buyticket-hero.webp", caption: "Homepage — \"Watch the World Cup matches with the best shows\"" },
      { src: "/projects/buyticket-events.webp", caption: "Featured events and category browsing — Rock in Rio, World Cup, Iron Maiden, BTS" },
      { src: "/projects/buyticket-worldcup.webp", caption: "World Cup campaign hero — seasonal takeover of the homepage" },
    ],
    link: "https://buyticketbrasil.com",
    geography: "Brazil",
    sector: "Marketplace / Ticketing",
    tagline: "Backend build on Bubble.io for Brazil's largest secondary ticket marketplace.",
    badges: [
      { label: "MY ROLE", value: "Backend Developer — MVP build" },
      { label: "STACK", value: "Bubble.io" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "buyticketbrasil.com" },
    ],
    features: [
      { title: "Database structure", description: "Designed the core data model behind listings, tickets, sellers, buyers, and transactions." },
      { title: "Buy, sell, list workflows", description: "Built the core Bubble.io workflows and business logic that run every ticket purchase, sale, and listing on the platform." },
      { title: "Organizer onboarding", description: "Built the flow that lets event organizers across several Brazilian states list and manage their own events on the platform." },
      { title: "MVP, launch-ready", description: "Delivered a functional, scalable marketplace as part of the MVP team, ready to launch and grow." },
    ],
    architecture: [],
    stack: ["Bubble.io"],
    outcomes: [
      { label: "Role", value: "Backend Developer on the MVP build team" },
      { label: "Scope", value: "Database structure, core workflows, and business logic, plus organizer onboarding" },
      { label: "Status", value: "Live — one of Brazil's largest secondary ticket marketplaces" },
    ],
    active: true,
    order: 14,
    isPortfolio: true,
  },
  {
    id: "commonfloor",
    title: "CommonFloor",
    description:
      "Since 2020, our engineers have been part of the backend team at CommonFloor — India's largest real estate marketplace, live since 2007 and covering 400+ cities with hundreds of thousands of active listings. At that scale, the core problem is relevance and reliability: a buyer searching a locality like Whitefield, Bangalore needs to go from thousands of results down to the handful that actually match their budget, BHK, and carpet-area requirements, and every one of those listings has to stay accurate as agents and organizers add, update, and manage properties continuously. We work across three parts of that problem — the search and filtering engine behind property discovery, the listings and agent/CRM systems that keep property data and lead flow accurate, and the platform infrastructure that keeps the marketplace running at India-wide scale.",
    category: "Real Estate / Marketplace",
    image: "/projects/commonfloor-hero.webp",
    gallery: [
      { src: "/projects/commonfloor-hero.webp", caption: "Homepage — city-wide property search across Buy, Rent, Villas, Plots and Luxury" },
      { src: "/projects/commonfloor-search.webp", caption: "Search results — 398 Whitefield listings filtered by property type, BHK, budget, brokerage and carpet area" },
      { src: "/projects/commonfloor-listing.webp", caption: "Property detail page — pricing, carpet area, features and agent contact" },
    ],
    link: "https://www.commonfloor.com",
    geography: "India",
    sector: "Real Estate / Marketplace",
    tagline: "Backend engineering team member since 2020 on one of India's largest real estate marketplaces.",
    badges: [
      { label: "ENGAGEMENT", value: "Backend team · ongoing since 2020" },
      { label: "SCOPE", value: "Search, listings/CRM, platform infra" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "commonfloor.com" },
    ],
    features: [
      { title: "Search & filtering at scale", description: "Backend behind the property search and filter engine — location, price, BHK, carpet area, and amenities — that narrows hundreds of thousands of listings down to what actually matches a buyer's criteria." },
      { title: "Listings & agent CRM", description: "Systems behind property listing management, agent accounts, and the contact-agent lead flow that connects buyers to sellers and brokers." },
      { title: "Platform infrastructure", description: "Backend services and infrastructure work that keep the marketplace reliable across 400+ Indian cities and hundreds of thousands of live listings." },
    ],
    architecture: [],
    stack: ["Search & Filtering", "Listings & Agent CRM", "Platform APIs"],
    outcomes: [
      { label: "Role", value: "Backend engineering team member, engaged since 2020" },
      { label: "Scope", value: "Search and filtering, listings and agent/CRM systems, and platform infrastructure" },
      { label: "Status", value: "Live — one of India's largest real estate marketplaces, 400+ cities" },
    ],
    active: true,
    order: 15,
    isPortfolio: true,
  },
  {
    id: "clear-investment-group",
    title: "Clear Investment Group",
    description:
      "Clear Investment Group is a vertically integrated multifamily real estate investment firm with a 22-year track record — $600M+ in historical transactions and 76 portfolios closed since 2001. Their site had to do two jobs at once: turn a complex, operationally dense business — self-managed acquisitions, rehab, leasing, and property management across secondary and tertiary US markets — into something an individual investor or financial advisor could evaluate in minutes, and route very different visitors (prospective investors, advisors, property sellers, and existing limited partners) to the right path without making any of them dig. We built the WordPress site a few years back: the animated track-record section that puts the firm's real numbers front and center as the first trust signal, the Acquisitions strategy pages that explain the firm's workforce-housing thesis to brokers and sellers, and the gated Investor Portals login for existing LPs.",
    category: "Web Design / Real Estate Investment",
    image: "/projects/clearinvestment-hero.webp",
    gallery: [
      { src: "/projects/clearinvestment-hero.webp", caption: "Homepage — \"A Vertically Integrated Private & Multifamily Real Estate Investment Firm\"" },
      { src: "/projects/clearinvestment-stats.webp", caption: "Track record — 110+ combined years, 76 portfolios, 62.8% average yield, 37.3% net IRR, $600M+ in transactions" },
      { src: "/projects/clearinvestment-acquisitions.webp", caption: "Acquisitions — \"Multifamily Property Acquisition Strategy\" for sellers and brokers" },
    ],
    link: "https://www.clearinvestmentgroup.com",
    geography: "USA",
    sector: "Real Estate Investment",
    tagline: "A WordPress site built to turn a 22-year track record into a credible pitch for investors, advisors, and sellers alike.",
    badges: [
      { label: "ENGAGEMENT", value: "WordPress site build" },
      { label: "STACK", value: "WordPress" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "clearinvestmentgroup.com" },
    ],
    features: [
      { title: "Track record, above the fold", description: "An animated stats section putting the firm's real numbers — 110+ combined years of leadership experience, 76 portfolios closed since 2001, 62.8% average yield, 37.3% net IRR, $600M+ in historical transactions — in front of every visitor before they scroll past the hero." },
      { title: "Dual-audience navigation", description: "Separate paths for individual investors, financial advisors, and property sellers, so each visitor reaches the content built for them instead of one generic pitch." },
      { title: "Acquisitions strategy, explained", description: "Pages that lay out the firm's Class C workforce-housing thesis and turnaround process for brokers and sellers bringing them deals." },
      { title: "Gated investor portal", description: "A secure Investor Portals login path for existing limited partners, kept separate from the public marketing site." },
    ],
    architecture: [],
    stack: ["WordPress"],
    outcomes: [
      { label: "Scope", value: "Full WordPress marketing site — home, investing, acquisitions, company, investor portals" },
      { label: "Design", value: "Track record and fund performance presented as the primary trust signal" },
      { label: "Status", value: "Live in production for an established Chicago-based investment firm" },
    ],
    active: true,
    order: 16,
    isPortfolio: true,
  },
  {
    id: "ghl-automation",
    title: "GoHighLevel Chatbot & Automation",
    description:
      "Designed and implemented a multi-channel chatbot and automation system to capture, qualify, and nurture leads across SMS, email, web chat, and social platforms. Built intelligent conversation flows that respond instantly to inquiries, collect lead data, book appointments, and trigger follow-up sequences automatically inside GoHighLevel. Integrated the chatbot logic with CRM pipelines, tagging, and workflows so messaging stays consistent and handoff between channels is seamless — deployed across a 4-location setup with dedicated triggers per channel (SMS, WhatsApp, Facebook, Instagram).",
    category: "AI Automation / CRM",
    image: "/projects/ghl-workflow-overview.webp",
    gallery: [
      { src: "/projects/ghl-workflow-overview.webp", caption: "Full workflow — SMS, WhatsApp, Facebook and Instagram triggers branching into per-location Conversation AI logic" },
      { src: "/projects/ghl-workflow-detail.webp", caption: "Trigger and condition logic — routing each channel's reply into its own Conversation AI branch" },
      { src: "/projects/ghl-workflow-list.webp", caption: "Published workflow — 829 contacts enrolled across the 4-location chatbot setup" },
    ],
    geography: "USA",
    sector: "AI Automation / CRM",
    tagline: "Multi-channel chatbot and automation system built inside GoHighLevel — lead capture, qualification, and booking across SMS, email, web chat and social.",
    badges: [
      { label: "MY ROLE", value: "AI Automation Architect" },
      { label: "STACK", value: "GoHighLevel · Chatbot · Meta API" },
      { label: "STATUS", value: "Live in production" },
      { label: "PUBLISHED", value: "Jul 19, 2026" },
    ],
    features: [
      { title: "Multi-channel lead capture", description: "Dedicated triggers for SMS, WhatsApp, Facebook and Instagram replies, each routed into its own conversation flow." },
      { title: "Conversation AI qualification", description: "Intelligent conversation flows that respond instantly, collect lead data, and qualify inquiries before handoff." },
      { title: "Automated booking & follow-up", description: "Conversation flows that book appointments and trigger follow-up sequences automatically, with no manual intervention." },
      { title: "CRM-integrated handoff", description: "Chatbot logic tied into CRM pipelines, tagging, and workflows, so messaging stays consistent and handoff between channels is seamless." },
    ],
    architecture: [],
    stack: ["GoHighLevel", "Chatbot", "Meta API", "CRM Automation"],
    outcomes: [
      { label: "Role", value: "AI Automation Architect" },
      { label: "Scale", value: "829 contacts enrolled across a 4-location chatbot setup" },
      { label: "Status", value: "Published and live in production" },
    ],
    active: true,
    order: 17,
    isPortfolio: true,
  },
  {
    id: "epicor-kinetic",
    title: "Epicor Kinetic Implementation",
    description:
      "We're an Epicor Kinetic implementation partner for manufacturing clients across several fields — discrete and process manufacturers who needed the platform configured around how they actually run production, not a generic rollout. Our scope covers core ERP configuration (Financials, Production Management, and Supply Chain Management modules set up against each client's real production and planning process), integrations and data migration (connecting Kinetic to existing plant-floor, IoT, and MES systems, and migrating legacy data without a stoppage in production), and BI, reporting, and analytics built on top of Kinetic so operational and financial reporting live in one place instead of a spreadsheet bolted onto the ERP.",
    category: "ERP Implementation / Manufacturing",
    image: "/projects/epicor-kinetic-dashboard.webp",
    gallery: [
      { src: "/projects/epicor-kinetic-dashboard.webp", caption: "Executive dashboard — production, delivery and inventory KPIs reported from Kinetic data" },
      { src: "/projects/epicor-kinetic-mes.webp", caption: "Plant-floor monitoring — line status, OEE and active alerts fed by the MES/IoT integration" },
      { src: "/projects/epicor-kinetic-planning.webp", caption: "Production scheduling and inventory planning — supply vs. demand tracked against real stock levels" },
    ],
    geography: "USA",
    sector: "Manufacturing / ERP Implementation",
    tagline: "Epicor Kinetic implementation partner for manufacturing clients — ERP configuration, MES/IoT integration, and BI built around how each plant actually runs.",
    badges: [
      { label: "PARTNERSHIP", value: "Epicor Kinetic implementation" },
      { label: "STACK", value: "Epicor Kinetic · MES/IoT · BI & Reporting" },
      { label: "STATUS", value: "Live in production" },
      { label: "SCOPE", value: "Manufacturing, multiple fields" },
    ],
    features: [
      { title: "Core ERP configuration", description: "Financials, Production Management, and Supply Chain Management modules configured against each client's real production and planning process, not a generic rollout." },
      { title: "Plant-floor & MES integration", description: "Kinetic connected to existing plant-floor, IoT, and MES systems so machine and quality data flows into the ERP instead of staying siloed on the floor." },
      { title: "Legacy data migration", description: "Historical production, financial, and inventory data migrated into Kinetic without a stoppage in production." },
      { title: "BI, reporting & analytics", description: "Dashboards and reporting built on top of Kinetic so operational and financial reporting live in one place instead of a spreadsheet bolted onto the ERP." },
    ],
    architecture: [],
    stack: ["Epicor Kinetic", "MES/IoT Integration", "BI & Reporting", "Data Migration"],
    outcomes: [
      { label: "Role", value: "Epicor Kinetic implementation partner" },
      { label: "Scope", value: "Core ERP configuration, MES/IoT integration, data migration, and BI/reporting" },
      { label: "Coverage", value: "Manufacturing clients across multiple fields" },
    ],
    active: true,
    order: 18,
    isPortfolio: true,
  },
  {
    id: "pingo-ai",
    title: "Pingo AI",
    description:
      "Pingo AI is a YC-backed conversational language-learning app — instead of drills and vocab lists, learners practice real-time spoken conversations with an AI partner across 25+ languages, with pronunciation and delivery corrected mid-conversation. As part of the contract engineering team, we worked across the mobile app, the backend, and the conversational AI integration — shipping feature work end to end rather than owning a single layer. Pingo is used by 6M+ learners and rated 4.8 on the App Store and Google Play.",
    category: "Consumer AI / EdTech",
    image: "/projects/pingo-hero.webp",
    gallery: [
      { src: "/projects/pingo-hero.webp", caption: "Homepage — \"Finally. Someone to speak with.\"" },
      { src: "/projects/pingo-conversations.webp", caption: "Roleplay scenarios — real-time conversation practice across Korean, Spanish, Italian, Portuguese, French and Japanese" },
      { src: "/projects/pingo-testimonials.webp", caption: "Learner reviews — 4.8 rating from 6M+ App Store and Google Play users" },
    ],
    link: "https://pingo.ai",
    geography: "USA",
    sector: "Consumer AI / EdTech",
    tagline: "Contract engineering across mobile, backend, and conversational AI for a YC-backed language-learning app used by 6M+ learners.",
    badges: [
      { label: "MY ROLE", value: "Contract full-stack engineering" },
      { label: "STACK", value: "Mobile · Conversational AI · Feature engineering" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "pingo.ai" },
    ],
    features: [
      { title: "Real-time spoken practice", description: "Full-stack work on the core conversation loop — talk with Pingo in 25+ languages and get pronunciation and delivery corrected mid-conversation." },
      { title: "Adaptive learning paths", description: "Feature work on the system that adapts each learner's path and remembers their level, mistakes, and goals between sessions." },
      { title: "Custom roleplay scenarios", description: "Built out scenario-based conversation flows — from a first hello in Korean to a mock interview in Japanese — so practice matches what a learner actually needs." },
      { title: "Mobile app delivery", description: "Shipped features across the iOS and Android apps that now serve 6M+ learners at a 4.8 rating." },
    ],
    architecture: [],
    stack: ["Mobile App Development", "Conversational AI Integration", "Feature Engineering"],
    outcomes: [
      { label: "Role", value: "Contract engineer across mobile, backend, and AI integration" },
      { label: "Scale", value: "6M+ learners, 4.8 rating on the App Store and Google Play" },
      { label: "Status", value: "Live in production, YC-backed" },
    ],
    active: true,
    order: 19,
    isPortfolio: true,
  },
  {
    id: "opennote",
    title: "Opennote",
    description:
      "Opennote is a YC-backed AI study platform built around Galileo, an AI thinking partner that answers questions and explains concepts against a student's own notes and materials — replacing the five separate apps students usually juggle for notes, lectures, and flashcards. As part of the contract engineering team, we worked across the frontend notebook UI and the Galileo AI tutor integration, shipping feature work end to end. Opennote was used by 50,000+ students; it was acquired by Reducto in 2026.",
    category: "Consumer AI / EdTech",
    image: "/projects/opennote-hero.webp",
    gallery: [
      { src: "/projects/opennote-hero.webp", caption: "Homepage — \"The notebook that thinks with you\"" },
      { src: "/projects/opennote-galileo.webp", caption: "Meet Galileo — the AI thinking partner answering questions in context" },
      { src: "/projects/opennote-video-library.webp", caption: "Video Library — concepts turned into generated explainer videos on demand" },
    ],
    link: "https://www.opennote.com",
    geography: "USA",
    sector: "Consumer AI / EdTech",
    tagline: "Contract engineering across the frontend and AI tutor integration for a YC-backed AI study platform used by 50,000+ students.",
    badges: [
      { label: "MY ROLE", value: "Contract full-stack engineering" },
      { label: "STACK", value: "Frontend · AI Tutor Integration · Feature engineering" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "opennote.com" },
    ],
    features: [
      { title: "Galileo AI tutor", description: "Feature work on Galileo, the AI thinking partner that answers questions and explains concepts in context against a student's own notes and materials." },
      { title: "Notes, recorder & practice tools", description: "Built out the notebook editor, the recorder that turns audio and YouTube links into instant notes, and inline flashcard and quiz generation." },
      { title: "Visual concept generation", description: "Worked on the video and diagram generation library that turns a concept into a visual explanation on demand." },
    ],
    architecture: [],
    stack: ["Frontend Development", "AI Tutor Integration", "Feature Engineering"],
    outcomes: [
      { label: "Role", value: "Contract engineer across frontend and AI tutor integration" },
      { label: "Scale", value: "Used by 50,000+ students across the platform" },
      { label: "Status", value: "Live; acquired by Reducto in 2026" },
    ],
    active: true,
    order: 20,
    isPortfolio: true,
  },
  {
    id: "blaze-ai",
    title: "Blaze.ai",
    description:
      "Blaze.ai is a YC-backed all-in-one AI marketing platform — organic content, paid ads, landing pages, reputation management, and an AI SDR, positioned as \"marketing done for you\" instead of a stack of separate tools or an agency retainer. As part of the contract engineering team, we worked on the content generation engine and dashboard, shipping feature work across the platform. Blaze is rated 4.8 on Trustpilot and Capterra, with customers seeing an average 2.3x follower growth and 4.1x Meta ad ROAS.",
    category: "MarTech / AI Marketing",
    image: "/projects/blaze-hero.webp",
    gallery: [
      { src: "/projects/blaze-hero.webp", caption: "Homepage — \"Marketing done for you\"" },
      { src: "/projects/blaze-content.webp", caption: "Generated content — real campaign output across social, ads and email, not templated AI filler" },
      { src: "/projects/blaze-pillars.webp", caption: "The five pillars — organic content, paid ads, landing pages, reputation and AI SDR in one dashboard" },
    ],
    link: "https://www.blaze.ai",
    geography: "USA",
    sector: "MarTech / AI Marketing",
    tagline: "Contract engineering on the content generation engine and dashboard for a YC-backed all-in-one AI marketing platform.",
    badges: [
      { label: "MY ROLE", value: "Contract full-stack engineering" },
      { label: "STACK", value: "Content generation · Dashboard · Feature engineering" },
      { label: "STATUS", value: "Live in production" },
      { label: "LIVE URL", value: "blaze.ai" },
    ],
    features: [
      { title: "Organic content engine", description: "Feature work on the content generation engine that produces on-brand social, blog, email and Google Business posts across 8 channels." },
      { title: "Paid ads from what already works", description: "Built out the flow that turns top-performing organic content directly into Google and Meta ad campaigns instead of separate ad-spend guesswork." },
      { title: "Reputation & AI SDR dashboard", description: "Dashboard work on the reputation-monitoring and AI SDR surfaces that track reviews and qualify inbound leads automatically." },
    ],
    architecture: [],
    stack: ["Content Generation Engine", "Dashboard Development", "Feature Engineering"],
    outcomes: [
      { label: "Role", value: "Contract engineer across the content engine and dashboard" },
      { label: "Scale", value: "4.8 rating on Trustpilot and Capterra" },
      { label: "Status", value: "Live in production, YC-backed" },
    ],
    active: true,
    order: 21,
    isPortfolio: true,
  },
];

export function getPortfolioProjectById(id: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.id === id);
}

/** Whether a console system has a deep case study behind it.
 *  Anything that links to /work/<slug> must check this first: an engagement
 *  can be listed on the console without a case-study page existing. */
export function hasCaseStudy(id: string): boolean {
  return PORTFOLIO_PROJECTS.some((p) => p.id === id);
}
