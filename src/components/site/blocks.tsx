"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Item, Stagger } from "./motion";

/* ═══════════════════════════════════════════════════════════════════
   PAGE BLOCKS
   The denser, component-heavy furniture the inner pages needed: a
   trust row, sticky section nav, galleries, outcome cards, and a
   placeholder that looks deliberate wherever real artwork is missing.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Stand-in for artwork we do not have yet. Styled as a drafting plate so
 * it reads as "reserved space", never as a broken image. Swap the whole
 * component out by passing a real `src`.
 */
export function Plate({
  label,
  ratio = "4/3",
  src,
  alt = "",
  fit = "cover",
  className = "",
}: {
  label: string;
  ratio?: string;
  src?: string;
  alt?: string;
  /**
   * How the image sits in the plate.
   * `cover`   — fill and centre-crop. Right for photography.
   * `top`     — fill and crop from the top. Right for landscape UI captures,
   *             where the app header and first rows carry the recognition.
   * `contain` — letterbox the whole frame. The only honest option for a
   *             portrait phone capture, which `cover` would zoom ~3.5× into
   *             an unreadable fragment.
   */
  fit?: "cover" | "top" | "contain";
  className?: string;
}) {
  if (src) {
    const imageClass =
      fit === "contain"
        ? "object-contain p-3"
        : fit === "top"
          ? "object-cover object-top"
          : "object-cover";
    return (
      <div
        className={`relative overflow-hidden rounded-xl border border-line ${
          fit === "contain" ? "bg-bone-alt" : "bg-bone"
        } ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <Image src={src} alt={alt} fill className={imageClass} sizes="(max-width:768px) 90vw, 40vw" />
      </div>
    );
  }
  return (
    <div
      className={`blueprint-fine relative grid place-items-center overflow-hidden rounded-xl border border-dashed border-line-strong bg-bone-alt/60 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="px-5 text-center">
        <span aria-hidden className="mx-auto mb-2 block h-7 w-7 rounded-md border border-line-strong" />
        <span className="mono-label block leading-relaxed">{label}</span>
        <span className="mt-1 block font-mono text-[0.55rem] text-mute/70">
          image pending
        </span>
      </div>
    </div>
  );
}

/**
 * Trust row under a page hero.
 *
 * TRUTH RULE: entries marked `pending` render as an explicit blank slot
 * rather than a number. An em dash we can defend beats a figure we cannot —
 * one fabricated number makes every other figure on the site suspect.
 */
export function TrustRow({
  items,
}: {
  items: readonly {
    value: string;
    label: string;
    sub?: string;
    pending?: boolean;
  }[];
}) {
  return (
    <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 lg:grid-cols-4">
      {items.map((it) => (
        <Item key={it.label}>
          {it.pending ? (
            <p className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-none tracking-tight text-line-strong">
              —
            </p>
          ) : (
            <p className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-none tracking-tight text-ink">
              {it.value.replace("+", "")}
              {it.value.includes("+") ? <span className="text-signal">+</span> : null}
            </p>
          )}
          <p className="mt-2.5 text-[0.85rem] font-medium text-ink">{it.label}</p>
          <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-mute">
            {it.pending ? (it.sub ?? "none to publish yet") : it.sub}
          </p>
        </Item>
      ))}
    </Stagger>
  );
}

/**
 * Sticky in-page section nav for long pages. Highlights whichever section
 * is currently on screen.
 */
export function SectionNav({
  sections,
}: {
  sections: readonly { id: string; label: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      // No negative margin here. This renders at page level, outside Shell, so
      // it is already full-bleed — a -mx-6 would offset the inner rail by 24px
      // and leave every label misaligned against the section headings below.
      className="sticky top-[80px] z-30 hidden border-y border-line bg-[rgba(245,243,239,0.92)] backdrop-blur-md lg:block"
    >
      <ul className="mx-auto flex max-w-shell items-center gap-1 px-6 lg:px-10 xl:px-16">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`inline-block border-b-2 px-3.5 py-3 text-[0.8rem] font-medium transition-colors ${
                active === s.id
                  ? "border-signal text-ink"
                  : "border-transparent text-mute hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Photo strip / screens wall. Falls back to plates where `src` is absent, and
 * wraps the tile in a link when `href` is given so a screenshot can lead back
 * to the case study it came from.
 */
export function Gallery({
  items,
  className = "",
}: {
  items: readonly {
    label: string;
    src?: string;
    ratio?: string;
    href?: string;
    /** Screenshots need "contain"; photography wants the default crop. */
    fit?: "cover" | "top" | "contain";
  }[];
  className?: string;
}) {
  return (
    <Stagger className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map((it) => {
        const plate = (
          <Plate
            label={it.label}
            src={it.src}
            alt={it.src ? it.label : ""}
            fit={it.fit}
            ratio={it.ratio ?? "4/3"}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        );

        return (
          <Item key={it.label}>
            {it.href ? (
              <Link href={it.href} className="group block">
                {plate}
                <p className="mt-2.5 text-[0.78rem] leading-snug text-mute transition-colors group-hover:text-ink">
                  {it.label}
                </p>
              </Link>
            ) : (
              <div className="group">{plate}</div>
            )}
          </Item>
        );
      })}
    </Stagger>
  );
}

/**
 * Case-study card led by the OUTCOME, not by a description. Every outcome
 * string must be sourceable from the case study it links to.
 */
export function OutcomeCard({
  sector,
  client,
  outcome,
  metric,
  href,
  src,
  // Product screenshots, never photography: `contain` is the only fit that
  // works for both a 0.56 phone capture and a 1.98 desktop one.
  fit = "contain",
  status = "live",
}: {
  sector: string;
  client: string;
  outcome: string;
  metric?: string;
  href: string;
  src?: string;
  fit?: "cover" | "top" | "contain";
  status?: "live" | "building";
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-frame"
    >
      <Plate
        label={`${client} — screen`}
        src={src}
        alt={src ? `${client} interface` : ""}
        fit={fit}
        ratio="16/10"
        className="!rounded-none !border-0 !border-b !border-line"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.58rem] uppercase tracking-wider text-mute">
            {sector}
          </span>
          <span
            aria-hidden
            className={`ml-auto h-1.5 w-1.5 rounded-full ${
              status === "live" ? "pulse-dot bg-signal" : "bg-line-strong"
            }`}
          />
        </div>
        <p className="mt-1 text-[0.8rem] font-medium text-mute">{client}</p>
        <h3 className="mt-2 text-[1.05rem] font-medium leading-snug tracking-tight text-ink">
          {outcome}
        </h3>
        {metric ? (
          <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-wider text-signal">
            {metric}
          </p>
        ) : null}
        <span className="mt-auto pt-4 text-[0.82rem] font-medium text-signal">
          Read the case study
          <span
            aria-hidden
            className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Section header that leads with a visual band rather than bare type. */
export function VisualLead({
  eyebrow,
  children,
  plate,
  reverse = false,
}: {
  eyebrow?: string;
  children: ReactNode;
  plate: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        {eyebrow ? <p className="mono-label mb-5">{eyebrow}</p> : null}
        {children}
      </div>
      {plate}
    </div>
  );
}
