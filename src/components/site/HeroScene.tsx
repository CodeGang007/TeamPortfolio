"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { consoleProjects } from "@/content/projects";
import { stats, marketsShort } from "@/content/site";

/**
 * Full-bleed pixel-art hero.
 *
 * The artwork is a looping muted video with the still frame behind it as
 * both poster and fallback — if the video is blocked, slow, or the user
 * prefers reduced motion, the still carries the section on its own and
 * nothing shifts.
 *
 * Everything is upscaled with nearest-neighbour (`image-rendering:
 * pixelated`) so it stays deliberately crisp at any viewport instead of
 * going soft — the pixels are the point.
 *
 * Floating cards are real systems from content/projects.ts, never
 * decoration.
 */

const liveSystems = consoleProjects
  .filter((p) => p.status === "live")
  .slice(0, 3);

export default function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // Autoplay is allowed for muted inline video, but a tab restored from
  // bfcache, a throttled background tab, or a metadata-only preload can all
  // leave it parked on the poster. Ask once on mount and again when the
  // tab becomes visible; if it is refused we simply keep the still frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;

    const tryPlay = () => {
      const p = v.play();
      if (p) p.catch(() => {});
    };

    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [reduced]);

  // The artwork drifts down slightly slower than the page scrolls past it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#3FA9F5]"
    >
      {/* ── Artwork ─────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y: artY }}
      >
        {/* The scene is 16:9 but the hero band is much wider than that, so
            object-cover has to crop vertically. Anchor to the BOTTOM: the
            laptop, server rack and grass live down there and are the whole
            point: the sky at the top is the part we can afford to lose. */}
        <Image
          src="/site/hero-pixel.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_bottom] [image-rendering:pixelated]"
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[68%_bottom] [image-rendering:pixelated]"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/site/hero-pixel.png"
        >
          <source src="/site/hero-loop.webm" type="video/webm" />
          <source src="/site/hero-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Legibility scrim: strong where the copy sits, gone by the middle
          so the artwork is never muddied. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(8,50,79,0.85)] via-[rgba(8,50,79,0.40)] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/35 to-transparent"
      />
      {/* Grounds the artwork against the bone band below instead of ending
          on an abrupt bright edge. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-black/25 to-transparent"
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <motion.div
        className="hero-min relative mx-auto flex w-full max-w-shell flex-col justify-center px-6 pb-24 pt-[10.25rem] lg:px-10 lg:pt-[11.25rem] xl:px-16"
        style={reduced ? undefined : { y: copyY, opacity: copyFade }}
      >
        <div className="max-w-2xl">
          <p
            className="hero-stagger mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/90 ring-1 ring-white/25 backdrop-blur-sm"
            style={{ "--d": "60ms" } as React.CSSProperties}
          >
            <span
              aria-hidden
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-300"
            />
            {stats.live} systems live · {marketsShort}
          </p>

          <h1
            className="hero-stagger display-xl text-white [text-shadow:0_2px_18px_rgba(0,35,60,0.4)]"
            style={{ "--d": "140ms" } as React.CSSProperties}
          >
            We build the software
            <br />
            that runs the company
          </h1>

          <p
            className="hero-stagger mt-6 max-w-lg text-base leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgba(0,35,60,0.45)]"
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            A software engineering company shipping production AI, multi-tenant
            platforms, and mobile apps. {stats.projectsDelivered} projects
            delivered for {stats.clientsServed} clients, most under NDA.
          </p>

          <div
            className="hero-stagger mt-9 flex flex-wrap items-center gap-3"
            style={{ "--d": "340ms" } as React.CSSProperties}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-[10px] bg-[#FBFAF8] px-5 py-3 text-sm font-medium text-ink shadow-lg shadow-black/10 transition-all hover:bg-white"
            >
              Talk to an engineer
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-[10px] bg-white/15 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              See what we shipped
            </Link>
          </div>
        </div>

        {/* ── Floating live-system cards ───────────────────────── */}
        <ul
          aria-label="Systems live in production"
          className="pointer-events-none absolute right-6 top-1/2 hidden max-w-[18rem] -translate-y-1/2 flex-col items-end gap-2.5 lg:flex xl:right-8"
        >
          {liveSystems.map((p, i) => (
            <li
              key={p.slug}
              className="notif-slide w-full"
              style={{ "--d": `${700 + i * 260}ms` } as React.CSSProperties}
            >
              <div
                className="notif-pop flex items-center gap-2.5 rounded-lg bg-[rgba(20,18,15,0.82)] px-3.5 py-2.5 text-white shadow-xl shadow-black/35 ring-1 ring-white/20 backdrop-blur-sm"
                style={{ "--d": `${700 + i * 260}ms` } as React.CSSProperties}
              >
                <span
                  aria-hidden
                  className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300"
                />
                <span className="font-mono text-[0.62rem] uppercase tracking-wider text-emerald-300/90">
                  Live
                </span>
                <span className="truncate text-[0.82rem] font-medium">
                  {p.name}
                </span>
                <span className="ml-auto shrink-0 text-[0.74rem] text-white/70">
                  {p.city}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-black/10" />
    </section>
  );
}
