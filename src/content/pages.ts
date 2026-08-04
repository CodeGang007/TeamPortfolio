/**
 * SERVICE + INDUSTRY PAGE DATA
 *
 * One entry per marketing page. Both route templates
 * (`/services/[slug]`, `/industries/[slug]`) render entirely from here, so
 * a new page is a data edit, never a new component.
 *
 * TRUTH RULES apply exactly as they do everywhere else:
 *  - `proof` may only list slugs that exist in content/projects.ts. Every
 *    capability we sell has to point at a system we actually shipped.
 *  - No numbers live here. Counts come from content/site.ts so a figure is
 *    never typed twice.
 *  - Nothing in `outcomes` may claim a measured result we cannot source
 *    from the linked case study.
 */

import type { consoleProjects } from "./projects";

/** Every slug that exists in content/projects.ts — derived, never hand-listed. */
export type ProofSlug = (typeof consoleProjects)[number]["slug"];

export type PageSpec = {
  slug: string;
  /** Short label used in the nav and on index cards. */
  nav: string;
  eyebrow: string;
  /** H1 renders as `lead` in ink, `trail` in mute. */
  lead: string;
  trail: string;
  /** Meta description and hero paragraph. */
  intro: string;
  /** Drafting-plate caption for the hero visual slot. */
  plate: string;
  /** What we actually build under this heading. */
  offerings: { title: string; body: string }[];
  /** Why a buyer should care — bold lead-in + sentence. */
  outcomes: { lead: string; body: string }[];
  /** Tools we have used in production for this work. */
  stack: string[];
  /** Case studies that substantiate the page. */
  proof: ProofSlug[];
  faq: { q: string; a: string }[];
};

/* ════════════════════════════════════════════════════════════════════
   SERVICES
   ════════════════════════════════════════════════════════════════════ */

export const services: PageSpec[] = [
  {
    slug: "ai-development",
    nav: "AI development",
    eyebrow: "AI development services",
    lead: "AI that ships",
    trail: "into the product, not into a slide deck",
    intro:
      "We build AI features that live inside real software: retrieval over a company's own documents, tenant-isolated knowledge bases, and model gateways that keep working when a provider goes down.",
    plate: "Verse AI: retrieval trace",
    offerings: [
      { title: "Retrieval-augmented platforms", body: "Ingestion, chunking, embeddings, and a vector store your team controls, so answers cite your documents instead of the open web." },
      { title: "Multi-LLM gateways", body: "One interface in front of several providers, with routing, retries, and cost accounting per tenant." },
      { title: "Tenant-isolated knowledge", body: "Every query is scoped to one customer's corpus at the storage layer, not filtered after the fact." },
      { title: "Evaluation harnesses", body: "Golden question sets and regression runs so a prompt change cannot quietly make answers worse." },
      { title: "Streaming interfaces", body: "Token-by-token UI with cancellation, retry, and a trace panel that shows which sources were used." },
      { title: "Deployment into your cloud", body: "The system runs in your AWS account under your keys. We hand over the infrastructure, not a hosted black box." },
    ],
    outcomes: [
      { lead: "Answers you can audit", body: "Every response carries the source chunks it was drawn from, so a wrong answer is diagnosable rather than mysterious." },
      { lead: "No vendor lock", body: "The gateway means swapping a model is a config change, not a rewrite." },
      { lead: "Built by the people who run it", body: "The engineers who design the retrieval layer are the ones who keep it alive afterwards." },
    ],
    stack: ["Python", "FastAPI", "AWS Bedrock", "OpenSearch", "LangChain", "PostgreSQL", "Docker", "Next.js"],
    proof: ["verse-ai", "ai-resume", "pingo-ai", "opennote", "blaze-ai"],
    faq: [
      { q: "Do you use our data to train models?", a: "No. Your corpus is used for retrieval only, inside infrastructure you own. Nothing is sent to a training pipeline." },
      { q: "Can this run entirely in our cloud?", a: "Yes: that is the default. We deploy into your account so the data never leaves your perimeter." },
      { q: "What if the model provider changes pricing?", a: "The gateway abstracts the provider. Routing to a different model is a configuration change." },
    ],
  },
  {
    slug: "ai-chatbot-development",
    nav: "AI chatbot development",
    eyebrow: "AI chatbot development",
    lead: "Assistants that know",
    trail: "your business, not the internet",
    intro:
      "A chatbot is only useful when it is grounded in your own material. We build assistants over your documents, your product data, and your policies, with the retrieval trace visible so nobody has to take an answer on faith.",
    plate: "Assistant: grounded answer with sources",
    offerings: [
      { title: "Document-grounded chat", body: "Upload, index, and query your handbooks, contracts, and specs with citations on every answer." },
      { title: "Product and catalogue assistants", body: "Natural-language search over structured data, so a question returns the right SKU rather than a paragraph." },
      { title: "Escalation to a human", body: "Confidence thresholds and clean hand-off with the full conversation attached." },
      { title: "Channel delivery", body: "Web widget, in-app panel, or WhatsApp: the same engine behind each surface." },
      { title: "Guardrails", body: "Scope limits, refusal behaviour, and PII handling defined before launch, not patched after an incident." },
      { title: "Conversation analytics", body: "What people actually ask, what went unanswered, and which documents are missing." },
    ],
    outcomes: [
      { lead: "Fewer repeat questions", body: "The assistant absorbs the questions your team answers a hundred times a month." },
      { lead: "Grounded, not guessed", body: "If the corpus does not contain an answer, it says so instead of inventing one." },
      { lead: "A record of the gaps", body: "Unanswered questions become a documentation backlog you can act on." },
    ],
    stack: ["Next.js", "FastAPI", "OpenAI / Bedrock", "pgvector", "Redis", "WebSockets"],
    proof: ["verse-ai", "pingo-ai", "ghl-automation", "opennote"],
    faq: [
      { q: "How do you stop it making things up?", a: "Retrieval-first: the model only answers from retrieved chunks, and returns a refusal when nothing relevant is found." },
      { q: "Can it read PDFs and scans?", a: "Yes. OCR sits in the ingestion pipeline for scanned documents." },
      { q: "Who can see which documents?", a: "Access is scoped per tenant and per role at query time, mirroring your existing permissions." },
    ],
  },
  {
    slug: "ai-agent-development",
    nav: "AI agent development",
    eyebrow: "AI agent development",
    lead: "Agents that do the work",
    trail: "and leave an audit trail",
    intro:
      "An agent that takes actions in your systems needs boundaries, retries, and a log. We build agents with explicit tool contracts, human approval gates on anything irreversible, and a full trace of every step.",
    plate: "Agent run: step trace and tool calls",
    offerings: [
      { title: "Tool-calling agents", body: "Typed tool definitions over your APIs, with validation before anything is executed." },
      { title: "Approval gates", body: "Irreversible steps pause for a human. The agent proposes; a person confirms." },
      { title: "Multi-step workflows", body: "Plan, execute, verify, with a bounded step budget so a loop cannot run away." },
      { title: "Observability", body: "Every run is stored: inputs, tool calls, outputs, cost, and duration." },
      { title: "Failure handling", body: "Retries with backoff, deterministic fallbacks, and a clear stop condition." },
      { title: "Integration layer", body: "Connectors into the CRM, ERP, or ticketing system the agent needs to touch." },
    ],
    outcomes: [
      { lead: "Bounded autonomy", body: "The agent can only call the tools you defined, with the arguments those tools accept." },
      { lead: "Reviewable", body: "Any run can be replayed step by step when someone asks what happened." },
      { lead: "Costed", body: "Per-run token and time cost is recorded, so the business case stays measurable." },
    ],
    stack: ["Python", "TypeScript", "MCP", "Celery", "PostgreSQL", "Docker"],
    proof: ["verse-ai", "arm-tech", "ghl-automation", "blaze-ai"],
    faq: [
      { q: "Will it act without asking?", a: "Only for steps you mark as safe. Anything destructive or outward-facing routes through an approval gate." },
      { q: "What happens when a tool fails?", a: "The run retries with backoff, then stops and surfaces the error rather than improvising around it." },
      { q: "Can we add our own tools later?", a: "Yes: tools are declarative. Adding one is a definition plus a handler." },
    ],
  },
  {
    slug: "ai-consulting",
    nav: "AI consulting",
    eyebrow: "AI consulting",
    lead: "A short engagement",
    trail: "that tells you what is actually buildable",
    intro:
      "Before a build, a two-to-three week assessment: what your data can support, what the model layer costs at your volume, and which of your ideas is worth doing first. You leave with an architecture and an estimate, whether or not you build it with us.",
    plate: "Assessment: architecture and cost model",
    offerings: [
      { title: "Data readiness review", body: "What you hold, where it lives, and what has to change before retrieval or training is viable." },
      { title: "Use-case scoring", body: "Each candidate ranked by value, effort, and risk, with the ones we would not build called out." },
      { title: "Reference architecture", body: "The actual diagram: services, storage, model routing, and where your data crosses a boundary." },
      { title: "Cost modelling", body: "Token, inference, and infrastructure cost projected at your real volume, not a demo's." },
      { title: "Build-or-buy", body: "An honest read on which parts should be an off-the-shelf product instead of custom software." },
      { title: "Delivery plan", body: "Phases, dependencies, and what shipping means for the first one." },
    ],
    outcomes: [
      { lead: "No sunk cost", body: "You find out a use case is not viable in week two, not month six." },
      { lead: "Yours to keep", body: "The architecture and estimate are your documents regardless of who builds it." },
      { lead: "Engineer-led", body: "The assessment is run by the people who would build it, so the estimate is a commitment rather than a guess." },
    ],
    stack: ["Architecture review", "Cost modelling", "Data audit", "Prototype"],
    proof: ["verse-ai", "arm-tech", "epicor-kinetic"],
    faq: [
      { q: "How long does it take?", a: "Two to three weeks for most scopes, depending on how many systems we need to look at." },
      { q: "Do we have to build with you afterwards?", a: "No. The deliverable is standalone and detailed enough for another team to execute." },
      { q: "Will you tell us not to build something?", a: "Regularly. A use case that fails on data quality or unit economics is worth killing early." },
    ],
  },
  {
    slug: "generative-ai-development",
    nav: "Generative AI development",
    eyebrow: "Generative AI development",
    lead: "Generation with",
    trail: "a structure behind it",
    intro:
      "Generated text is only useful when it lands in a format the next system can consume. We build generation pipelines with schemas, validation, and a review step: documents, summaries, and structured extractions that hold their shape.",
    plate: "Generation pipeline: schema and review",
    offerings: [
      { title: "Structured generation", body: "Schema-constrained output so downstream code gets fields, not prose it has to parse." },
      { title: "Document assembly", body: "Long-form documents composed from templates, retrieved context, and validated sections." },
      { title: "Extraction pipelines", body: "Unstructured input in, typed records out, with confidence scores and a review queue." },
      { title: "Summarisation at scale", body: "Batch pipelines over large corpora with deduplication and cost control." },
      { title: "Human-in-the-loop review", body: "A queue where a person accepts, edits, or rejects, and the edits feed the eval set." },
      { title: "Versioned prompts", body: "Prompts live in the repository under review, with regression runs on every change." },
    ],
    outcomes: [
      { lead: "Parsable output", body: "Schema validation means malformed generations fail loudly instead of corrupting a record." },
      { lead: "Improvable", body: "Reviewer edits accumulate into an evaluation set that measures whether changes actually help." },
      { lead: "Predictable cost", body: "Batching and caching keep per-document cost inside a number you can plan around." },
    ],
    stack: ["Python", "Pydantic", "OpenAI / Bedrock", "Celery", "PostgreSQL", "S3"],
    proof: ["ai-resume", "verse-ai", "blaze-ai", "opennote"],
    faq: [
      { q: "How do you keep output on-format?", a: "Schema-constrained decoding plus validation. Anything that fails the schema is retried or routed to review." },
      { q: "Can a person review before it goes out?", a: "Yes, and we recommend it for anything customer-facing until the eval set proves it out." },
      { q: "Does prompt tuning need an engineer every time?", a: "No: prompts are versioned assets your team can edit, with regression runs guarding the change." },
    ],
  },
  {
    slug: "machine-learning-development",
    nav: "Machine learning development",
    eyebrow: "Machine learning development",
    lead: "Models that run",
    trail: "inside business software",
    intro:
      "Forecasting, anomaly detection, OCR, and risk scoring, deployed inside the ERP or platform where somebody actually acts on the number, not sitting in a notebook nobody opens.",
    plate: "ARM Tech: forecast board",
    offerings: [
      { title: "Demand and price forecasting", body: "Sequence models trained on your history, with the confidence band shown next to the number." },
      { title: "Anomaly detection", body: "Baselines per entity so an alert means something unusual for that account, not merely a large value." },
      { title: "OCR and document parsing", body: "Invoices, forms, and scans converted to typed records with a confidence-driven review queue." },
      { title: "Risk and quality scoring", body: "Ranked outputs with the contributing factors exposed, so a score can be argued with." },
      { title: "Training pipelines", body: "Reproducible runs, versioned datasets, and metrics tracked across every retrain." },
      { title: "In-product delivery", body: "The prediction appears in the screen where the decision is made, not in a separate dashboard." },
    ],
    outcomes: [
      { lead: "Used, not admired", body: "A forecast inside the purchasing screen changes an order. One in a report does not." },
      { lead: "Retrainable", body: "Pipelines are scheduled and versioned, so drift is caught by a metric rather than by a complaint." },
      { lead: "Explainable enough to trust", body: "Contributing factors ship alongside the prediction so the user can sanity-check it." },
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "pandas", "Airflow", "PostgreSQL", "Docker"],
    proof: ["arm-tech", "emedici", "ai-resume", "local-shops-analytics"],
    faq: [
      { q: "How much data do we need?", a: "It depends on the target, and we say so in the assessment rather than after a failed build." },
      { q: "Who retrains it?", a: "The pipeline does, on a schedule. Your team sees the metrics; we handle the plumbing." },
      { q: "Where does the prediction show up?", a: "Inside your existing software, on the screen where someone acts on it." },
    ],
  },
  {
    slug: "ai-workflow-automation",
    nav: "AI workflow automation",
    eyebrow: "AI workflow automation",
    lead: "Automate the steps",
    trail: "nobody should be doing by hand",
    intro:
      "The repetitive middle of a process: reading a document, deciding a route, updating three systems. We automate those steps with explicit rules first and models only where rules genuinely cannot cope.",
    plate: "Workflow: routing and exception queue",
    offerings: [
      { title: "Process mapping", body: "The current path documented step by step before a line of automation is written." },
      { title: "Document intake", body: "Email, upload, or API in; classified, extracted, and routed automatically." },
      { title: "Rules-first routing", body: "Deterministic logic wherever possible; a model only where the input is genuinely unstructured." },
      { title: "Exception queues", body: "Anything low-confidence lands in a human queue instead of proceeding silently." },
      { title: "System integration", body: "Writes back into the CRM, ERP, or ticketing system so nobody re-keys the result." },
      { title: "Throughput reporting", body: "Volume, automation rate, and exception rate visible from day one." },
    ],
    outcomes: [
      { lead: "Hours back", body: "The manual middle of the process disappears; the judgement calls stay with people." },
      { lead: "Nothing lost", body: "Low-confidence cases queue for review rather than being auto-approved." },
      { lead: "Measured", body: "You can see what proportion is actually automated, weekly." },
    ],
    stack: ["Python", "Celery", "n8n-style orchestration", "PostgreSQL", "Redis", "REST / webhooks"],
    proof: ["ghl-automation", "arm-tech", "pinnacle-hms", "blaze-ai"],
    faq: [
      { q: "What if the automation gets one wrong?", a: "Confidence thresholds route uncertain cases to a person before anything is committed." },
      { q: "Do we need to replace our current tools?", a: "No. Automation sits between them and writes back through their APIs." },
      { q: "How fast is the first result?", a: "One process end-to-end is usually live before the rest are mapped." },
    ],
  },
  {
    slug: "ui-ux-design",
    nav: "UI/UX design",
    eyebrow: "UI/UX design services",
    lead: "Interfaces designed",
    trail: "by the people who have to build them",
    intro:
      "Design and engineering are the same team here, so a screen never gets approved that the front-end cannot deliver. We design in components, not in flat pictures.",
    plate: "Design system: component sheet",
    offerings: [
      { title: "Product discovery", body: "The jobs each user role does, mapped before any screen is drawn." },
      { title: "Information architecture", body: "Navigation and data hierarchy that survive the second and third feature." },
      { title: "Design systems", body: "Tokens, components, and states delivered as code your developers use directly." },
      { title: "Interaction design", body: "Loading, empty, error, and permission states designed rather than discovered in QA." },
      { title: "Accessibility", body: "Contrast, focus order, and keyboard paths checked as part of design review." },
      { title: "Prototyping", body: "Clickable flows for the paths that matter before they are built." },
    ],
    outcomes: [
      { lead: "No handoff gap", body: "The design system is code, so what was designed is what ships." },
      { lead: "Every state covered", body: "Empty and error states are designed up front, where they are cheap." },
      { lead: "Scales with the product", body: "Component-level decisions mean feature seven does not require a redesign." },
    ],
    stack: ["Figma", "Tailwind CSS", "React", "Framer Motion", "Storybook"],
    proof: ["pinnacle-hms", "emedici", "nestflow", "six-spa", "navan"],
    faq: [
      { q: "Can you work with our existing brand?", a: "Yes. We build the system around your tokens rather than replacing your identity." },
      { q: "Do you deliver Figma or code?", a: "Both. The Figma file is the conversation; the component library is the deliverable." },
      { q: "Can you redesign without a rebuild?", a: "Often yes, if the front-end is componentised. We assess that before quoting." },
    ],
  },
  {
    slug: "web-design",
    nav: "Web design",
    eyebrow: "Web design",
    lead: "Sites that load fast",
    trail: "and say something true",
    intro:
      "Marketing sites built on the same stack as the products, server-rendered, fast on a mid-range phone, and structured so the content team can change copy without a deployment.",
    plate: "Marketing site: layout grid",
    offerings: [
      { title: "Content architecture", body: "The page set and the narrative order, decided before any layout." },
      { title: "Art direction", body: "A visual system with a point of view, not a template with your logo dropped in." },
      { title: "Motion design", body: "Movement used to explain sequence and hierarchy, and switched off under reduced-motion." },
      { title: "Performance budget", body: "A weight and interaction budget agreed at the start and measured at the end." },
      { title: "SEO foundations", body: "Semantic markup, metadata, structured data, and clean internal linking." },
      { title: "CMS integration", body: "Editable content without a developer in the loop for a copy change." },
    ],
    outcomes: [
      { lead: "Fast on real devices", body: "Tested on mid-range hardware and throttled networks, not only on a laptop." },
      { lead: "Findable", body: "Structured data and semantic markup so search engines can read what the page is about." },
      { lead: "Editable", body: "Copy changes are a content edit, not a ticket." },
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel", "Structured data"],
    proof: ["six-spa", "clear-investment-group", "rerise", "buyticket", "commonfloor", "nestflow", "ai-resume"],
    faq: [
      { q: "Do you write the copy?", a: "We structure it and draft it, then work from your corrections. We do not invent claims about your business." },
      { q: "Can we edit pages ourselves?", a: "Yes, through the CMS layer for anything that changes regularly." },
      { q: "How fast is fast?", a: "We agree a performance budget up front and report against it before launch." },
    ],
  },
  {
    slug: "web-development",
    nav: "Web development",
    eyebrow: "Web development",
    lead: "Web applications",
    trail: "built to survive their own success",
    intro:
      "Multi-tenant platforms, dashboards, and portals, with the architecture, the deployment pipeline, and the monitoring that keeps them shippable after launch.",
    plate: "Platform: request path",
    offerings: [
      { title: "Multi-tenant architecture", body: "Isolation at the data layer, so one customer's growth cannot reach another's records." },
      { title: "Role-based access", body: "Permissions modelled as data, enforced server-side, and testable." },
      { title: "API design", body: "Versioned, documented endpoints that a mobile client or a partner can build against." },
      { title: "Real-time features", body: "WebSocket channels for the parts of the product where staleness is a bug." },
      { title: "Background processing", body: "Queues and schedulers so a slow job never blocks a request." },
      { title: "Release engineering", body: "CI, migrations, and rollbacks that make deploying a Tuesday afternoon activity." },
    ],
    outcomes: [
      { lead: "Deployable on demand", body: "The pipeline is part of the build, so shipping does not need a ceremony." },
      { lead: "Isolated by design", body: "Tenant boundaries live in the schema, not in an application-level filter." },
      { lead: "Observable", body: "Logs, metrics, and error tracking from the first deploy, not after the first outage." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"],
    proof: ["verse-ai", "commonfloor", "buyticket", "nestflow", "navan", "ai-resume", "opennote", "blaze-ai", "six-spa", "clear-investment-group"],
    faq: [
      { q: "Do you work in our repository?", a: "Yes. Branches, reviews, and CI in your organisation from day one." },
      { q: "Can you take over an existing codebase?", a: "Yes, starting with a short audit so the estimate reflects what is actually there." },
      { q: "Who owns the code?", a: "You do, throughout, not on final payment." },
    ],
  },
  {
    slug: "mobile-app-development",
    nav: "Mobile app development",
    eyebrow: "Mobile app development",
    lead: "Apps people use",
    trail: "when the signal drops",
    intro:
      "Flutter and native Android, built offline-first, with the release engineering that gets them through store review and keeps them updated afterwards.",
    plate: "eMedici: question screen",
    offerings: [
      { title: "Cross-platform builds", body: "One Flutter codebase for iOS and Android where the product does not need platform-specific behaviour." },
      { title: "Offline-first sync", body: "Local storage with conflict resolution, so the app works on a train and reconciles later." },
      { title: "Store release engineering", body: "Signing, versioning, staged rollout, and the metadata review actually asks for." },
      { title: "Push and deep linking", body: "Notifications that route to the right screen with the right state." },
      { title: "Performance work", body: "Startup time, frame budget, and memory profiled on low-end devices." },
      { title: "Crash and usage analytics", body: "Instrumented from the first release so regressions are visible, not reported." },
    ],
    outcomes: [
      { lead: "Works without a network", body: "Offline-first is architecture, not a fallback screen." },
      { lead: "Ships predictably", body: "Release automation removes the manual steps that cause rejected builds." },
      { lead: "Measured after launch", body: "Crash-free rate and usage tracked so quality is a number, not an impression." },
    ],
    stack: ["Flutter", "Dart", "Kotlin", "Firebase", "SQLite / Drift", "REST", "Play Console"],
    proof: ["emedici", "pingo-ai"],
    faq: [
      { q: "Flutter or native?", a: "Flutter unless the product needs deep platform integration. We say which in the assessment." },
      { q: "Do you handle store submission?", a: "Yes, including signing, metadata, and staged rollout." },
      { q: "What about updates after launch?", a: "The same engineers stay on maintenance and roadmap: there is no hand-off team." },
    ],
  },
  {
    slug: "devops-services",
    nav: "DevOps services",
    eyebrow: "DevOps services",
    lead: "Infrastructure",
    trail: "your team can operate without us",
    intro:
      "AWS architecture, containerisation, and CI/CD set up so deploying is routine and the runbook is written down. We build it in your account, under your keys.",
    plate: "Pipeline: build, test, deploy",
    offerings: [
      { title: "Cloud architecture", body: "Networking, storage, and compute laid out for the workload you actually have." },
      { title: "Containerisation", body: "Docker images and orchestration, with parity between local and production." },
      { title: "CI/CD pipelines", body: "Build, test, migrate, deploy, roll back: automated and documented." },
      { title: "Observability", body: "Logs, metrics, traces, and alerts that page a human only when a human is needed." },
      { title: "Cost control", body: "Right-sizing, autoscaling, and a monthly cost breakdown by service." },
      { title: "Runbooks and handover", body: "Written procedures so your team can operate the system independently." },
    ],
    outcomes: [
      { lead: "No key-person risk", body: "The runbook means an outage does not depend on one person being awake." },
      { lead: "Your account, your keys", body: "Everything runs in infrastructure you own and can revoke access to." },
      { lead: "Predictable spend", body: "Cost is broken down by service and reviewed rather than discovered on the invoice." },
    ],
    stack: ["AWS", "Docker", "GitHub Actions", "Terraform", "NGINX", "CloudWatch", "PostgreSQL"],
    proof: ["verse-ai", "nestflow", "navan"],
    faq: [
      { q: "Can you work with our existing cloud setup?", a: "Yes. We start with an audit and improve incrementally rather than rebuilding by default." },
      { q: "Do you offer ongoing operations?", a: "Yes, as a retainer: but the runbook is written so you are not obliged to keep it." },
      { q: "AWS only?", a: "AWS is where most of our production work runs, which is what we say rather than claiming every cloud equally." },
    ],
  },
  {
    slug: "qa-testing",
    nav: "QA & testing",
    eyebrow: "QA and testing services",
    lead: "Testing that runs",
    trail: "on every commit, not before every launch",
    intro:
      "Automated suites in the pipeline, plus the manual exploratory work that catches what assertions never will. Quality as a continuous signal rather than a phase.",
    plate: "Test run: suite and coverage",
    offerings: [
      { title: "Test strategy", body: "What gets unit, integration, or end-to-end coverage: decided deliberately, not by habit." },
      { title: "Automated suites", body: "Fast unit and integration tests in CI, with end-to-end covering the critical paths." },
      { title: "Regression packs", body: "Every fixed bug gets a test, so it cannot come back unnoticed." },
      { title: "Exploratory testing", body: "Structured manual sessions against real devices and real data shapes." },
      { title: "Performance testing", body: "Load profiles based on your actual traffic, with the breaking point identified." },
      { title: "Accessibility audits", body: "Automated checks plus keyboard and screen-reader passes on core flows." },
    ],
    outcomes: [
      { lead: "Bugs caught early", body: "A failure in CI costs minutes; the same failure in production costs a day." },
      { lead: "Deployments stop being scary", body: "A green suite is what makes shipping on a Friday a normal decision." },
      { lead: "Known limits", body: "Load testing tells you where the system breaks before your traffic does." },
    ],
    stack: ["Playwright", "Vitest", "pytest", "k6", "GitHub Actions", "axe"],
    proof: ["emedici", "pinnacle-hms", "navan"],
    faq: [
      { q: "Can you add tests to an existing project?", a: "Yes: starting with the highest-risk paths rather than chasing a coverage number." },
      { q: "Do you do manual testing too?", a: "Yes. Automation and exploratory testing catch different classes of defect." },
      { q: "What coverage should we target?", a: "Coverage of the paths that lose money if they break, rather than a percentage." },
    ],
  },
  {
    slug: "hire-developers",
    nav: "Hire developers",
    eyebrow: "Hire developers",
    lead: "Engineers who join",
    trail: "your team, not a separate one",
    intro:
      "Dedicated engineers working in your repository, your stand-ups, and your review process. The same people who build our own production systems, not a bench.",
    plate: "Team: engagement model",
    offerings: [
      { title: "Dedicated engineers", body: "Full-time allocation to one project, in your tooling and your timezone overlap." },
      { title: "Team extension", body: "Engineers who slot into your existing process rather than running a parallel one." },
      { title: "Full project team", body: "Design, backend, frontend, and DevOps as one unit with a single point of accountability." },
      { title: "Fractional specialists", body: "ML, DevOps, or mobile expertise for the phase that needs it." },
      { title: "Code review and mentoring", body: "Senior review of your team's work, with the reasoning written down." },
      { title: "Handover-first working", body: "Documentation and pairing so knowledge does not leave when the engagement does." },
    ],
    outcomes: [
      { lead: "No agency layer", body: "You talk to the engineer doing the work, not to an account manager relaying it." },
      { lead: "Your process", body: "We adopt your repo, your board, and your review standards rather than imposing ours." },
      { lead: "Exit without damage", body: "Documentation and pairing are part of the engagement, so ending it is not a cliff." },
    ],
    stack: ["Python", "TypeScript", "React", "Next.js", "Flutter", "AWS", "PostgreSQL"],
    proof: ["verse-ai", "opennote", "emedici", "pinnacle-hms", "navan"],
    faq: [
      { q: "What is the minimum engagement?", a: "One month, though most work is scoped in quarters because that is when handover pays off." },
      { q: "Which timezone do you work in?", a: "We overlap with your working hours; the specifics are agreed before we start." },
      { q: "Can we hire the engineer directly later?", a: "That is a conversation, not a prohibition. We would rather discuss it than block it." },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════
   INDUSTRIES
   ════════════════════════════════════════════════════════════════════ */

export const industries: PageSpec[] = [
  {
    slug: "healthcare",
    nav: "Healthcare",
    eyebrow: "Healthcare software development",
    lead: "Software a hospital",
    trail: "runs its whole day on",
    intro:
      "We have built both ends of healthcare software: a hospital management system that a working hospital operates on daily, and a medical-education app Australian students study for exams with.",
    plate: "Pinnacle HMS: reception portal",
    offerings: [
      { title: "Hospital management systems", body: "Role-based portals for reception, doctors, pharmacy, lab, billing, and administration." },
      { title: "Clinical data modelling", body: "Patients, encounters, orders, and results modelled so reporting does not require a rewrite." },
      { title: "Medical education platforms", body: "Question banks, spaced repetition, and progress tracking that work offline." },
      { title: "Appointment and queue systems", body: "Scheduling that reflects how the department actually runs, not an idealised flow." },
      { title: "Billing and claims", body: "Itemised billing with the audit trail an administrator needs at month end." },
      { title: "Access control", body: "Role-based permissions enforced server-side, with an access log." },
    ],
    outcomes: [
      { lead: "Built with the staff", body: "The Pinnacle portals were shaped by the people at each desk, which is why they get used." },
      { lead: "Works under load", body: "Reception at peak is the design case, not the exception." },
      { lead: "Auditable", body: "Who saw what, and when, is recorded: because in healthcare that question gets asked." },
    ],
    stack: ["Next.js", "PostgreSQL", "Flutter", "Node.js", "Docker", "AWS"],
    proof: ["pinnacle-hms", "emedici", "rerise"],
    faq: [
      { q: "Do you handle patient data compliance?", a: "We build to the regime you operate under and design the access and audit layers around it. We do not claim certifications we do not hold." },
      { q: "Can it integrate with existing lab or imaging systems?", a: "Where those systems expose an interface, yes. We scope each integration explicitly." },
      { q: "How long does an HMS take?", a: "It depends on how many departments are in scope. Pinnacle runs six role-based portals over a modelled clinical schema." },
    ],
  },
  {
    slug: "ecommerce-ai",
    nav: "AI in ecommerce",
    eyebrow: "AI in ecommerce",
    lead: "AI that moves",
    trail: "the numbers a merchant watches",
    intro:
      "Search that understands intent, recommendations grounded in your own catalogue, and forecasting that tells a buyer what to order: the same forecasting stack we shipped into a trading ERP.",
    plate: "Catalogue: semantic search results",
    offerings: [
      { title: "Semantic product search", body: "Natural-language queries matched against your catalogue, including the attributes buyers actually type." },
      { title: "Recommendations", body: "Behaviour and catalogue signals combined, with the cold-start case handled deliberately." },
      { title: "Demand forecasting", body: "SKU-level projections with confidence bands, delivered into the purchasing screen." },
      { title: "Catalogue enrichment", body: "Generated descriptions and attributes, schema-validated and queued for review." },
      { title: "Support assistants", body: "Order status, returns, and policy questions answered from your own documentation." },
      { title: "Fraud and anomaly signals", body: "Per-account baselines so an alert means unusual, not merely large." },
    ],
    outcomes: [
      { lead: "Fewer dead searches", body: "Semantic matching finds the product when the shopper does not know your naming." },
      { lead: "Better ordering", body: "Forecasts arrive where the purchase decision is made." },
      { lead: "Support that scales", body: "Routine order questions resolve without a ticket." },
    ],
    stack: ["Python", "pgvector", "Next.js", "PostgreSQL", "Redis", "AWS"],
    proof: ["arm-tech", "verse-ai", "rerise", "blaze-ai"],
    faq: [
      { q: "Do you replace our storefront?", a: "No. These sit alongside it and integrate through its APIs." },
      { q: "How much catalogue data is needed?", a: "Enough to embed meaningfully: we check that in the assessment before quoting." },
      { q: "Will recommendations work on launch day?", a: "Cold start is handled with catalogue similarity until behavioural data accumulates." },
    ],
  },
  {
    slug: "d2c-ecommerce",
    nav: "D2C ecommerce",
    eyebrow: "D2C ecommerce",
    lead: "Direct-to-consumer",
    trail: "without the platform tax",
    intro:
      "Storefronts, subscription logic, and the operational back-end that keeps a D2C brand running, built as software you own rather than rented from a platform's roadmap.",
    plate: "Storefront: checkout flow",
    offerings: [
      { title: "Custom storefronts", body: "Server-rendered, fast on mobile, and structured for the merchandising you actually do." },
      { title: "Subscription and recurring billing", body: "Plans, pauses, upgrades, and dunning handled as first-class states." },
      { title: "Order management", body: "The operational back-end: fulfilment, exceptions, returns, and the audit trail." },
      { title: "Inventory sync", body: "Stock reconciled across channels without a spreadsheet as the source of truth." },
      { title: "Customer data platform", body: "One profile per customer across purchase, support, and marketing." },
      { title: "Analytics", body: "Cohorts, retention, and contribution margin: computed from your data, not sampled." },
    ],
    outcomes: [
      { lead: "You own the roadmap", body: "Features ship when you decide, not when a platform prioritises them." },
      { lead: "No per-transaction ceiling", body: "Infrastructure cost scales with usage, not with a percentage of revenue." },
      { lead: "One customer record", body: "Support, purchase, and marketing read the same profile." },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis", "AWS"],
    proof: ["rerise", "buyticket", "blaze-ai", "ai-resume"],
    faq: [
      { q: "Should we leave our current platform?", a: "Not automatically. We model the cost and effort both ways before recommending it." },
      { q: "Can you migrate our existing data?", a: "Yes: catalogue, customers, and order history, with a reconciliation step." },
      { q: "Who handles payments?", a: "A payment provider does. We integrate; we never store card data." },
    ],
  },
  {
    slug: "logistics",
    nav: "AI for logistics",
    eyebrow: "AI for logistics",
    lead: "Forecasts and routing",
    trail: "inside the ERP that already runs the business",
    intro:
      "We shipped five deep-learning modules into a trade and logistics ERP on one pipeline: demand, price, and risk signals delivered where the buyer is already working.",
    plate: "ARM Tech: forecast and route board",
    offerings: [
      { title: "Demand forecasting", body: "Sequence models per SKU and lane, with confidence bands the planner can read." },
      { title: "Price and cost prediction", body: "Trained on your transaction history rather than an index nobody trades on." },
      { title: "Route and load optimisation", body: "Constraint solving over your real fleet, windows, and capacities." },
      { title: "Shipment risk scoring", body: "Delay probability with the contributing factors exposed." },
      { title: "Document automation", body: "Invoices, packing lists, and customs paperwork parsed into typed records." },
      { title: "ERP integration", body: "Predictions delivered inside the existing screens, not in a separate portal." },
    ],
    outcomes: [
      { lead: "One pipeline, five modules", body: "Shared feature engineering means the sixth model costs a fraction of the first." },
      { lead: "Acted on", body: "The number appears in the purchasing screen, so it changes an order." },
      { lead: "Explainable", body: "Contributing factors ship with the prediction so a planner can override with reason." },
    ],
    stack: ["Python", "PyTorch", "pandas", "Airflow", "PostgreSQL", "Docker"],
    proof: ["arm-tech", "navan"],
    faq: [
      { q: "Does this replace our ERP?", a: "No. It integrates into it: that is the whole point of the ARM Tech build." },
      { q: "How much history do you need?", a: "Enough to cover your seasonality. We assess that against your actual data before committing." },
      { q: "What if the forecast is wrong?", a: "Confidence bands and factor attribution are shown so a planner can override it knowingly." },
    ],
  },
  {
    slug: "fintech",
    nav: "Fintech",
    eyebrow: "Fintech AI development",
    lead: "Financial software",
    trail: "where the audit trail is the feature",
    intro:
      "Ledgers, reconciliation, risk scoring, and document processing, built with the traceability that a financial system is judged on before it is judged on speed.",
    plate: "Ledger: reconciliation view",
    offerings: [
      { title: "Double-entry ledgers", body: "Immutable entries with a reconstructable balance at any point in time." },
      { title: "Reconciliation engines", body: "Automated matching with a clear exception queue for what does not match." },
      { title: "Risk and credit scoring", body: "Models with the contributing factors exposed, because a score has to be defensible." },
      { title: "KYC document processing", body: "Extraction and verification pipelines with a human review step." },
      { title: "Transaction monitoring", body: "Per-account baselines and alerting on genuine deviation." },
      { title: "Reporting", body: "Statements and regulatory extracts generated from the ledger, not assembled by hand." },
    ],
    outcomes: [
      { lead: "Reconstructable", body: "Any balance can be rebuilt from entries, which is what makes an audit survivable." },
      { lead: "Exceptions are visible", body: "Nothing auto-resolves quietly; unmatched items surface in a queue." },
      { lead: "Defensible scores", body: "Factor attribution means a decision can be explained to the person it affected." },
    ],
    stack: ["Python", "PostgreSQL", "FastAPI", "Redis", "Docker", "AWS"],
    proof: ["arm-tech", "verse-ai", "clear-investment-group", "navan"],
    faq: [
      { q: "Do you handle regulatory compliance?", a: "We build to the requirements you operate under and design the audit layer around them. We do not claim certifications we do not hold." },
      { q: "Can you integrate with our core banking system?", a: "Where it exposes an interface, yes, scoped explicitly per integration." },
      { q: "Do you store card or account credentials?", a: "No. Those stay with the regulated provider." },
    ],
  },
  {
    slug: "manufacturing",
    nav: "Manufacturing",
    eyebrow: "AI in manufacturing",
    lead: "Production data",
    trail: "turned into a decision on the floor",
    intro:
      "Quality inspection, maintenance prediction, and production planning: the applied-ML work we do in logistics, pointed at a plant instead of a warehouse.",
    plate: "Plant: line and quality board",
    offerings: [
      { title: "Visual quality inspection", body: "Defect detection on the line with a confidence-driven review queue." },
      { title: "Predictive maintenance", body: "Sensor baselines per machine, alerting on deviation rather than on a calendar." },
      { title: "Production planning", body: "Scheduling under real constraints: capacity, changeover, and material availability." },
      { title: "Yield analysis", body: "Which variables actually move yield, ranked and testable." },
      { title: "Shop-floor interfaces", body: "Screens designed for gloves, glare, and a five-second glance." },
      { title: "ERP and MES integration", body: "Signals written back into the systems the plant already runs on." },
    ],
    outcomes: [
      { lead: "Caught on the line", body: "A defect flagged at station four costs less than one found at dispatch." },
      { lead: "Maintenance when needed", body: "Condition-based scheduling instead of fixed intervals." },
      { lead: "Usable at the machine", body: "Interfaces designed for the floor, not for a manager's laptop." },
    ],
    stack: ["Python", "PyTorch", "OpenCV", "PostgreSQL", "Docker", "MQTT"],
    proof: ["epicor-kinetic", "arm-tech"],
    faq: [
      { q: "Do we need new cameras or sensors?", a: "Sometimes. The assessment says what your existing hardware can support before anything is bought." },
      { q: "Can it run without internet on the floor?", a: "Yes: inference can run on-premise with sync when connectivity returns." },
      { q: "How is it integrated with our MES?", a: "Through its API where one exists; otherwise through a documented interchange we agree up front." },
    ],
  },
  {
    slug: "saas",
    nav: "SaaS",
    eyebrow: "SaaS product development",
    lead: "Multi-tenant products",
    trail: "built to onboard the hundredth customer",
    intro:
      "Architecture, product surface, and deployment pipeline for SaaS: the shape of work behind Verse AI, a tenant-isolated AI platform running on a seven-layer AWS stack.",
    plate: "Verse AI: tenant console",
    offerings: [
      { title: "Multi-tenant architecture", body: "Isolation in the schema, so a tenant boundary is a database constraint rather than a code convention." },
      { title: "Onboarding and provisioning", body: "A new tenant is automated end to end, including seed data and first-run state." },
      { title: "Billing and plans", body: "Subscription states, usage metering, and upgrade paths as first-class logic." },
      { title: "Admin and support tooling", body: "The internal console your team needs to actually support customers." },
      { title: "Usage analytics", body: "Per-tenant activity so churn risk is visible before renewal." },
      { title: "Deployment pipeline", body: "CI, migrations, and rollbacks that make weekly releases unremarkable." },
    ],
    outcomes: [
      { lead: "Onboarding without engineers", body: "Provisioning is automated, so growth does not consume the build team." },
      { lead: "Isolation you can prove", body: "Tenant scoping at the storage layer is demonstrable, which matters in security review." },
      { lead: "Supportable", body: "Internal tooling ships with the product rather than a year after it." },
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Stripe", "AWS", "Docker"],
    proof: ["verse-ai", "opennote", "blaze-ai", "pingo-ai", "ai-resume", "nestflow"],
    faq: [
      { q: "Single-tenant or multi-tenant?", a: "Multi-tenant by default; single-tenant where a customer's compliance regime demands it. We model both costs." },
      { q: "Can you take over an existing SaaS?", a: "Yes, beginning with an audit so the estimate reflects the real codebase." },
      { q: "How do you handle enterprise security review?", a: "Isolation, access control, and audit logging are designed to be demonstrated, not described." },
    ],
  },
];

export const allPages = [...services, ...industries];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
export const industryBySlug = (slug: string) =>
  industries.find((s) => s.slug === slug);
