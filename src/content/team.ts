// ═══════════════════════════════════════════════════════════════════
//  THE TEAM — the one file you edit to change who appears on /about.
//
//  Everything about a person lives here: photo, role, what they own,
//  and their links. Add a person by appending to `team`; remove one by
//  deleting their entry. Nothing else in the codebase needs touching.
//
//  TRUTH RULE: every entry is a real person who actually works here.
//  This list is never padded to look bigger — see /our-values. A client
//  who catches one invented colleague is right to discount the rest of
//  the site, and the studio's whole argument is that its claims check out.
// ═══════════════════════════════════════════════════════════════════

/** Cloudinary cloud holding the team portraits. */
const CLOUD = "dumxpxosd";

/**
 * Each portrait is stored once at full size and cropped on delivery:
 * background removed onto the page's bone, then squared on the detected
 * face. `zoom` is per-person because the sources range from a tight
 * studio portrait to a full-body shot where the face is ~100px wide.
 */
/**
 * Asset version per person, from the Cloudinary upload response.
 *
 * Pinning the version in the delivery URL is what makes a replaced photo
 * actually appear. Without it the URL never changes, so Cloudinary's CDN,
 * Next's image optimizer and the browser all keep serving the old file —
 * and `invalidate: true` does not reliably purge every format variant.
 * Bump the number here after re-uploading and every cache layer misses.
 */
const VERSION: Record<string, number> = {
  "gourav-chakraborty": 1785794005,
  "subhadip-sasmal": 1785790382,
  "sushant-choudhary": 1785790384,
  sourajit: 1785790395,
  sunny: 1785790399,
  "nishika-jha": 1785791732,
  "sara-jones-duke": 1785794180,
  abhrajit: 1785790401,
  "sahib-dokal": 1786480151,
};

/**
 * Square studio headshot. No `f_auto`: next/image already negotiates
 * format and re-encodes, and letting Cloudinary do it too creates one
 * derived asset per format, each expiring independently.
 */
function portrait(id: string, size = 800) {
  return (
    `https://res.cloudinary.com/${CLOUD}/image/upload/` +
    `c_fill,g_face,w_${size},h_${size}/v${VERSION[id]}/codegang/team/${id}-hs.jpg`
  );
}

/** Transparent cutout for the /studio poster panels. */
function cutout(id: string, size = 800) {
  return (
    `https://res.cloudinary.com/${CLOUD}/image/upload/` +
    `e_background_removal/c_fill,g_face,w_${size},h_${size}/v${VERSION[id]}/codegang/team/${id}-hs.png`
  );
}

export interface TeamMember {
  /** Transparent-background variant for the /studio poster panels. */
  cutout: string;
  /** Stable key. Also the Cloudinary public id under `codegang/team/`. */
  id: string;
  name: string;
  /** Job title as it should read on the card. */
  role: string;
  /** True for the founding team — drives the "Co-founder" tag. */
  cofounder: boolean;
  /** One line on what this person actually owns. Keep it concrete. */
  owns: string;
  /** Where they are based. Omit for the Kolkata studio. */
  location?: string;
  /** Their own words. Optional — an empty string renders nothing. */
  quote?: string;
  /** Delivery URL for the portrait. */
  photo: string;
  /**
   * Links. Every field is optional: a missing or empty value simply
   * renders no icon, so there is never a dead link on a profile.
   */
  links?: {
    linkedin?: string;
    instagram?: string;
    portfolio?: string;
    github?: string;
    email?: string;
  };
}

export const team: TeamMember[] = [
  {
    id: "gourav-chakraborty",
    name: "Gourav Chakraborty",
    role: "Chief Executive Officer",
    cofounder: true,
    owns: "Architecture and the code that has to survive production.",
    quote: "If it can't survive production, it isn't finished.",
    photo: portrait("gourav-chakraborty"),
    cutout: cutout("gourav-chakraborty"),
    links: {
      // linkedin: "",
      // instagram: "",
      // portfolio: "",
    },
  },
  {
    id: "subhadip-sasmal",
    name: "Subhadip Sasmal",
    role: "Chief Technology Officer",
    cofounder: true,
    owns: "Interfaces that respect the person using them.",
    quote: "Good design is the shortest path between a user and their goal.",
    photo: portrait("subhadip-sasmal"),
    cutout: cutout("subhadip-sasmal"),
    links: {},
  },
  {
    id: "sushant-choudhary",
    name: "Sushant Choudhary",
    role: "Chief Operating Officer",
    cofounder: true,
    owns: "Runs the engagements and keeps the roadmap honest.",
    quote: "Scope honestly, then ship exactly that.",
    photo: portrait("sushant-choudhary"),
    cutout: cutout("sushant-choudhary"),
    links: {},
  },
  {
    id: "sourajit",
    name: "Sourajit Mitra",
    role: "Chief People Officer",
    cofounder: true,
    owns: "Hiring, and keeping this a place senior engineers stay.",
    quote: "A team only works when everyone in it is genuinely trusted.",
    photo: portrait("sourajit"),
    cutout: cutout("sourajit"),
    links: {},
  },
  {
    id: "sunny",
    name: "Sunny Srivastava",
    role: "Chief Information Officer",
    cofounder: true,
    owns: "Cloud, security and the pipelines every system ships through.",
    quote: "Boring infrastructure is the goal, not a compromise.",
    photo: portrait("sunny"),
    cutout: cutout("sunny"),
    links: {},
  },
  {
    id: "nishika-jha",
    name: "Nishika Jha",
    role: "Head of Design",
    cofounder: false,
    owns: "How every system looks and how it feels to actually use.",
    quote: "If a user needs the manual, the interface lost.",
    photo: portrait("nishika-jha"),
    cutout: cutout("nishika-jha"),
    links: {},
  },
  {
    id: "sara-jones-duke",
    name: "Sara Jones Duke",
    role: "Head of Custom Solutioning",
    cofounder: false,
    location: "Onsite \u00b7 USA",
    owns: "Shapes bespoke builds with clients before a line is written.",
    quote: "The right scope beats the clever solution, every time.",
    photo: portrait("sara-jones-duke"),
    cutout: cutout("sara-jones-duke"),
    links: { email: "sara@codegang.online" },
  },
  {
    id: "abhrajit",
    name: "Abhrajit Ray",
    role: "Founding Engineer",
    cofounder: false,
    owns: "Builds and hardens the systems behind the case studies.",
    quote: "Simple systems survive. Clever ones page you at 3 a.m.",
    photo: portrait("abhrajit"),
    cutout: cutout("abhrajit"),
    links: {},
  },
  {
    id: "sahib-dokal",
    name: "Sahib Dokal",
    role: "Chief of Marketing/Sales",
    cofounder: false,
    owns: "Building brand. Driving growth. Creating impact.",
    quote:
      "Good marketing doesn't just sell a product, it builds a movement people believe in.",
    photo: portrait("sahib-dokal"),
    cutout: cutout("sahib-dokal"),
    links: {},
  },
];

/** Computed from the list above — never typed by hand, so the copy on
 *  /about cannot drift out of step with who is actually on the page. */
export const teamSize = team.length;
export const cofounderCount = team.filter((m) => m.cofounder).length;

/**
 * Rotating line above the team.
 *
 * Picked by day-of-year rather than at random: a `Math.random()` here
 * would render one string on the server and a different one on the
 * client, and React would throw a hydration mismatch. This changes
 * daily and is identical on both sides of the render.
 */
const LINES = [
  "Build the thing that still works on day five hundred.",
  "Small team. Short path from the question to the person who answers it.",
  "Ship it, then stay for the part nobody puts in the pitch deck.",
  "The best architecture is the one the next engineer can read.",
  "Ambition is easy. Maintenance is the proof.",
  "Write it so future you is grateful, not confused.",
  "Good work compounds quietly, long after the launch post.",
] as const;

export function lineOfTheDay(now: Date = new Date()): string {
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start) / 86_400_000);
  return LINES[day % LINES.length];
}
