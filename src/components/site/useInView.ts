"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first enters the viewport. Dioramas use this
 * so their animations start when the reader actually reaches them, not on
 * mount — otherwise every sequence has already finished by the time you
 * scroll down to it.
 *
 * Respects prefers-reduced-motion by reporting "in view" immediately, which
 * lets each diorama render its finished state with no motion at all.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "-12% 0px -12% 0px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

/**
 * Steps 0→steps at a fixed interval once `start` flips true, then holds.
 * Drives the staged reveals inside the dioramas (retrieval rows landing,
 * portals lighting up, forecast points drawing in).
 */
export function useSequence(start: boolean, steps: number, intervalMs = 420) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(steps);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= steps) clearInterval(id);
    }, intervalMs);
    return () => clearInterval(id);
  }, [start, steps, intervalMs]);

  return step;
}

/** Eases a number from 0 to `to` over `duration` once `start` is true. */
export function useCountTo(start: boolean, to: number, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // easeOutExpo — fast settle, no bounce
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);

  return value;
}
