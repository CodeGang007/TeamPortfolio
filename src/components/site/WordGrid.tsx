"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

/**
 * Word-search grid. Every row hides one real capability inside a field of
 * filler letters; as you reach the section the words resolve out of the
 * noise, one row at a time.
 *
 * The filler is generated from a fixed seed at module scope so the server
 * and client render byte-identical markup — a Math.random() grid would
 * hydration-mismatch on every load.
 */

const WORDS = [
  "HEALTHCARE",
  "RAGPLATFORM",
  "MULTITENANT",
  "FLUTTERAPPS",
  "FORECASTING",
  "HOSPITALOS",
  "PROPTECH",
  "DEVOPSCICD",
  "ERPSUITES",
  "RECRUITING",
] as const;

const COLS = 26;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Mulberry32 — tiny deterministic PRNG so the filler never changes. */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Cell = { char: string; hit: boolean };

const GRID: { cells: Cell[]; word: string; start: number }[] = (() => {
  const rng = makeRng(20260729);
  return WORDS.map((word) => {
    // Keep the word clear of both edges so it never looks clipped.
    const maxStart = COLS - word.length - 2;
    const start = 1 + Math.floor(rng() * Math.max(maxStart, 1));
    const cells: Cell[] = [];
    for (let c = 0; c < COLS; c++) {
      const inWord = c >= start && c < start + word.length;
      cells.push({
        char: inWord
          ? word[c - start]
          : ALPHABET[Math.floor(rng() * ALPHABET.length)],
        hit: inWord,
      });
    }
    return { cells, word, start };
  });
})();

export default function WordGrid() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeRows, setActiveRows] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setActiveRows(GRID.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setActiveRows(i);
      if (i >= GRID.length) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="mask-fade-x overflow-hidden">
      <div
        className="mx-auto w-max select-none font-mono leading-none"
        aria-hidden
      >
        {GRID.map((row, r) => (
          <div key={row.word} className="flex">
            {row.cells.map((cell, c) => {
              const on = cell.hit && r < activeRows;
              return (
                <span
                  key={c}
                  className={`inline-flex h-[clamp(20px,2.4vw,34px)] w-[clamp(16px,1.9vw,27px)] items-center justify-center text-[clamp(9px,1.05vw,15px)] transition-all duration-500 ${
                    on
                      ? "font-semibold text-ink"
                      : cell.hit
                        ? "text-line-strong"
                        : "text-line-strong/70"
                  }`}
                  style={
                    on
                      ? { transitionDelay: `${(c - row.start) * 42}ms` }
                      : undefined
                  }
                >
                  {cell.char}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* The grid is decorative; this is what assistive tech actually reads. */}
      <p className="sr-only">
        Capabilities: {WORDS.join(", ").toLowerCase()}.
      </p>
    </div>
  );
}
