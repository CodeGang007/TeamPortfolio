"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════
   MOTION LAYER
   One easing curve, one distance, one duration: used everywhere. The
   page should feel like a single hand animated it, not like six
   different components each brought their own spring.
   ═══════════════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1] as const;
const DIST = 22;

/** Fade + rise. The default entrance for any block of content. */
export function FadeUp({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduced = useReducedMotion();
  const M = motion[as];

  return (
    <M
      className={className}
      initial={reduced ? false : { opacity: 0, y: DIST }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -4% 0px", amount: 0.01 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/**
 * Cascading container. Children wrapped in <Item> arrive one after
 * another rather than as one slab — the single change that makes a grid
 * feel authored instead of dumped.
 */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: DIST },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Stagger({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const reduced = useReducedMotion();
  const M = motion[as];

  return (
    <M
      className={className}
      variants={containerVariants}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -4% 0px", amount: 0.01 }}
    >
      {children}
    </M>
  );
}

export function Item({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const M = motion[as];
  return (
    <M className={className} variants={itemVariants}>
      {children}
    </M>
  );
}

/**
 * Headline reveal. Each line sits in an overflow-hidden box and slides up
 * from under its own baseline, so the type appears to be uncovered rather
 * than faded in. This is the move that reads as "expensive".
 *
 * Pass the headline already split into lines — splitting on words at
 * runtime fights the browser's own line breaking and reflows badly.
 */
export function MaskLines({
  lines,
  className = "",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  // Deliberately NOT framer-motion's whileInView. That drives the animation
  // from an invisible initial state, so a single missed observer callback
  // leaves the headline permanently hidden — which is exactly what happened.
  // Here the resting CSS state is visible and this observer only ever *adds*
  // the class that plays the slide, so the worst failure is "no animation".
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`maskline ${shown ? "is-shown" : ""}`}
          style={{ "--d": `${delay * 1000 + i * 90}ms` } as CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}

/**
 * Scroll-linked parallax. `speed` is how far the element drifts across the
 * whole time it is on screen, in pixels. Kept small — parallax that you
 * consciously notice is parallax that is overdone.
 */
export function Parallax({
  children,
  speed = 60,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Diorama entrance — rises and settles from slightly small, so the frame
 * reads as an object being placed rather than a div appearing.
 */
export function LiftIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -4% 0px", amount: 0.01 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A thin rule that draws itself from left to right as it enters. */
export function DrawRule({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`h-px origin-left bg-line ${className}`}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
