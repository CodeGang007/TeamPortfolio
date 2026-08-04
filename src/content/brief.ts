// Everything the project-brief form asks, in one place.
//
// The form component renders these — it never hardcodes an option. Adding a
// service we actually offer means adding it here, and it appears in the form,
// in the Telegram message the founders receive, and in the page's structured
// data at the same time.

export interface Choice {
  id: string;
  label: string;
  /** One line under the label. Written to help someone self-select fast. */
  hint: string;
}

/** Step 1 — what kind of system. Mirrors what we actually ship. */
export const buildTypes: Choice[] = [
  {
    id: "ai",
    label: "AI you can put in production",
    hint: "Retrieval over your own data, agents, model gateways, evaluation.",
  },
  {
    id: "platform",
    label: "A multi-tenant SaaS platform",
    hint: "Accounts, roles, billing, and the data model underneath them.",
  },
  {
    id: "mobile",
    label: "A mobile app",
    hint: "Flutter or native, offline-first sync, store release engineering.",
  },
  {
    id: "erp",
    label: "Internal / ERP systems",
    hint: "The software the company actually runs on: purchasing to finance.",
  },
  {
    id: "commerce",
    label: "Commerce or a marketplace",
    hint: "Catalogue, checkout, payments, and the operations behind them.",
  },
  {
    id: "unsure",
    label: "I know the problem, not the shape",
    hint: "Describe it in your words. Scoping it is part of what we do.",
  },
];

/** Step 2 — where the work starts from. Changes the estimate more than anything else. */
export const startingPoints: Choice[] = [
  { id: "greenfield", label: "Nothing exists yet", hint: "Starting from the problem." },
  { id: "prototype", label: "There is a prototype", hint: "It works; it will not survive real load." },
  { id: "extend", label: "Extending a live system", hint: "Something is in production already." },
  { id: "rescue", label: "Taking over someone else's code", hint: "Inherited, stalled, or being handed over." },
];

/** Step 3 — scope. Bands, not exact figures: nobody knows the number on day one. */
export const budgets: Choice[] = [
  { id: "under-10k", label: "Under $10k", hint: "A scoped piece of work." },
  { id: "10-30k", label: "$10k – $30k", hint: "A first production release." },
  { id: "30-75k", label: "$30k – $75k", hint: "A full system, built and shipped." },
  { id: "75k-plus", label: "$75k+", hint: "Multi-phase, or a team engaged over time." },
  { id: "unknown", label: "I need help sizing it", hint: "We will scope it and give you a number." },
];

export const timelines: Choice[] = [
  { id: "urgent", label: "There is a deadline", hint: "Something external is fixed." },
  { id: "quarter", label: "Next few months", hint: "Planned, not panicked." },
  { id: "open", label: "When it is right", hint: "Quality over calendar." },
  { id: "exploring", label: "Still exploring", hint: "Working out whether to build at all." },
];

export const engagements: Choice[] = [
  { id: "fixed", label: "Fixed scope, fixed price", hint: "Agreed in writing before build starts." },
  { id: "team", label: "A team, month to month", hint: "Ongoing roadmap and maintenance." },
  { id: "unsure", label: "Recommend one", hint: "We will tell you which fits the work." },
];

/**
 * Public-facing answers to what buyers actually ask before writing to us.
 * Rendered on the page AND emitted as FAQPage structured data — one source,
 * so the visible text and what an answer engine reads can never drift apart.
 */
export const briefFaqs = [
  {
    q: "How long does it take to hear back?",
    a: "Usually within one business day. Your brief goes straight to the founders: there is no sales team triaging it first, and the engineer who replies is the one who would build the system.",
  },
  {
    q: "Do I need to sign in to send a brief?",
    a: "No. Fill it in and send it. Signing in is only useful if you want to save a draft and come back to it.",
  },
  {
    q: "Do I need an NDA before I describe the project?",
    a: "No. Confidentiality is our default position, which is why most of the work we deliver is never named publicly. Send an NDA if you want one on file, but do not wait on it to describe the problem.",
  },
  {
    q: "What if I do not know my budget yet?",
    a: "Say so. We will scope the work and come back with a number you can hold us to, along with what we would cut if it needs to be smaller.",
  },
  {
    q: "Who owns the code?",
    a: "You do, from the first commit. We work inside your repository and deploy into your cloud account under your keys, not into a hosted black box you rent back from us.",
  },
  {
    q: "What happens if the project is not a fit?",
    a: "We tell you, with reasons, rather than learning on your budget. The scope and architecture from a first conversation are yours either way.",
  },
] as const;
