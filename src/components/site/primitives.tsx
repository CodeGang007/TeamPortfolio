import Link from "next/link";
import type { ReactNode } from "react";
import { LiftIn, MaskLines } from "./motion";

/* ═══════════════════════════════════════════════════════════════════
   MARKETING PRIMITIVES — warm-bone surface
   Every public page composes from these. If a page hand-rolls its own
   heading sizes or button colours, the system has been broken.
   ═══════════════════════════════════════════════════════════════════ */

/** The one content width used sitewide. */
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell px-6 lg:px-10 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Vertical rhythm. `tone` picks the band colour — alternating bone and
 * bone-alt is what gives the page its sectioned, editorial cadence.
 */
export function Section({
  children,
  id,
  tone = "bone",
  bleed = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "bone" | "alt" | "ink";
  bleed?: boolean;
  className?: string;
}) {
  const tones = {
    bone: "bg-bone text-ink",
    alt: "bg-bone-alt text-ink",
    ink: "bg-ink text-bone",
  } as const;

  return (
    <section
      id={id}
      className={`relative isolate ${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}
    >
      {bleed ? children : <Shell>{children}</Shell>}
    </section>
  );
}

/** Mono micro-label. The register that makes a page feel engineered. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`mono-label ${className}`}>{children}</p>;
}

/**
 * Two-tone display heading — the signature move. `lead` renders in ink,
 * `trail` drops to mute on its own line. Reads as art-directed rather
 * than as a CMS field.
 */
export function Display({
  lead,
  trail,
  size = "lg",
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  lead: ReactNode;
  trail?: ReactNode;
  size?: "xl" | "lg" | "md";
  align?: "left" | "center";
  /** A page's hero headline must be `h1` — every other use stays `h2`. */
  as?: "h1" | "h2";
  className?: string;
}) {
  const sizes = { xl: "display-xl", lg: "display-lg", md: "display-md" };

  // Each tone gets its own masked line so the heading uncovers itself from
  // the baseline up, one line after the other.
  const lines = [
    <span key="lead" className="text-ink">
      {lead}
    </span>,
  ];
  if (trail) {
    lines.push(
      <span key="trail" className="text-mute">
        {trail}
      </span>,
    );
  }

  return (
    <Tag
      className={`${sizes[size]} text-balance ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      <MaskLines lines={lines} />
    </Tag>
  );
}

/** Standard body paragraph. Never smaller than this on a marketing page. */
export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[0.9375rem] leading-relaxed text-ink-soft ${className}`}>
      {children}
    </p>
  );
}

type PillProps = {
  children: ReactNode;
  href: string;
  variant?: "dark" | "light" | "ghost";
  className?: string;
  external?: boolean;
};

/** Dark pill CTA — squat, tight radius, one-pixel lift. */
export function Pill({
  children,
  href,
  variant = "dark",
  className = "",
  external = false,
}: PillProps) {
  const variants = {
    dark: "bg-ink text-bone hover:bg-ink-soft shadow-pill",
    light:
      "bg-paper text-ink border border-line hover:border-line-strong hover:bg-white",
    ghost: "text-ink hover:bg-ink/[0.04] border border-transparent",
  } as const;

  const cls = `group inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-medium transition-all duration-200 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** The little arrow that nudges on hover. Pairs with Pill and text links. */
export function Nudge() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
    >
      →
    </span>
  );
}

/**
 * Three-column body copy with bold lead-ins. Replaces icon cards — the
 * same information at a fraction of the visual noise.
 */
export function LeadIns({
  items,
  className = "",
}: {
  items: readonly { lead: string; body: string }[];
  className?: string;
}) {
  return (
    <div
      className={`grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {items.map((it) => (
        <p
          key={it.lead}
          className="text-[0.9375rem] leading-relaxed text-ink-soft"
        >
          <span className="font-semibold text-ink">{it.lead} — </span>
          {it.body}
        </p>
      ))}
    </div>
  );
}

/**
 * Diorama shell. Every system mock-up sits in one of these so they read
 * as one family of artefacts rather than six unrelated widgets.
 */
export function Frame({
  children,
  label,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <LiftIn>
      <figure className={className}>
        <div
          className={`diorama overflow-hidden ${
            size === "lg" ? "shadow-frame-lg" : "shadow-frame"
          }`}
        >
          {children}
        </div>
        {label ? (
          <figcaption className="mono-label mt-3">{label}</figcaption>
        ) : null}
      </figure>
    </LiftIn>
  );
}

/** Hairline rule with optional inset — used to separate stacked rows. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-line ${className}`} />;
}

/** Small status chip: a live dot plus a label. */
export function LiveChip({
  children,
  tone = "live",
}: {
  children: ReactNode;
  tone?: "live" | "building";
}) {
  const dot = tone === "live" ? "bg-signal" : "bg-mute";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-mute">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${dot} ${
          tone === "live" ? "pulse-dot" : ""
        }`}
      />
      {children}
    </span>
  );
}

/**
 * Section intro block — eyebrow, two-tone display, optional body + CTA.
 * Used at the top of nearly every band so spacing stays identical.
 */
export function SectionIntro({
  eyebrow,
  lead,
  trail,
  body,
  align = "left",
  size = "lg",
  children,
}: {
  eyebrow?: string;
  lead: ReactNode;
  trail?: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  size?: "xl" | "lg" | "md";
  children?: ReactNode;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <Display lead={lead} trail={trail} size={size} align={align} />
      {body ? (
        <div
          className={`mt-5 text-[0.9375rem] leading-relaxed text-ink-soft ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {body}
        </div>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}
