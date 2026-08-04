"use client";

import { useEffect, useRef } from "react";

// Particles arranged on a rotating globe fly into position to spell
// CODEGANG. Canvas-only, no deps. Pauses offscreen, renders the finished
// wordmark statically under prefers-reduced-motion.
//
// Interactive: the cursor repels nearby particles, a click sends a
// shockwave through the field. Every particle springs back to its home
// position, so the wordmark always reassembles itself.
const W = 1312;
const H = 460;
const INK = "#E7EAEF";
const ACC = "#5A81F5";
const LIVE = "#3FCF8E";

const HOVER_RADIUS = 90;
const HOVER_FORCE = 1.6;
const CLICK_RADIUS = 240;
const CLICK_FORCE = 26;
const DAMPING = 0.85;
const SPRING = 0.05;

export default function GlobeWordmark({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    let visible = false;
    const pointer = { x: -9999, y: -9999 };

    type P = {
      sx: number; sy: number; sz: number;
      tx: number; ty: number;
      c: string; d: number;
      ox: number; oy: number; vx: number; vy: number;
      lx: number; ly: number; // last drawn position: used for click accuracy
    };
    let pts: P[] = [];

    // Map client coords → canvas logical coords
    const toCanvas = (clientX: number, clientY: number) => {
      const r = cv.getBoundingClientRect();
      return {
        x: ((clientX - r.left) / r.width) * W,
        y: ((clientY - r.top) / r.height) * H,
      };
    };

    const onMove = (e: PointerEvent) => {
      const p = toCanvas(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      const c = toCanvas(e.clientX, e.clientY);
      for (const q of pts) {
        const px = q.lx;
        const py = q.ly;
        const dx = px - c.x;
        const dy = py - c.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CLICK_RADIUS && dist > 0.01) {
          const f = (1 - dist / CLICK_RADIUS) * CLICK_FORCE;
          q.vx += (dx / dist) * f;
          q.vy += (dy / dist) * f;
        }
      }
    };

    // Sample the wordmark pixels once fonts are ready so the canvas font
    // matches the site's display face.
    const setup = () => {
      if (disposed) return;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.fillStyle = "#fff";
      octx.font = `700 178px var(--font-display, Archivo), Helvetica, Arial, sans-serif`;
      // Canvas can't resolve CSS vars in font shorthand — fall back cleanly.
      if (!octx.font || octx.font === "10px sans-serif") {
        octx.font = '700 178px Archivo, Helvetica, Arial, sans-serif';
      }
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText("CODEGANG", W / 2, H / 2);

      const img = octx.getImageData(0, 0, W, H).data;
      const targets: { x: number; y: number }[] = [];
      const STEP = 7;
      for (let y = 0; y < H; y += STEP) {
        for (let x = 0; x < W; x += STEP) {
          if (img[(y * W + x) * 4 + 3] > 128) {
            targets.push({
              x: x + (Math.random() - 0.5) * 3,
              y: y + (Math.random() - 0.5) * 3,
            });
          }
        }
      }

      const N = targets.length;
      if (N === 0) return;
      const R = Math.min(W, H) * 0.36;
      const golden = Math.PI * (3 - Math.sqrt(5));
      pts = targets.map((t, i) => {
        const yy = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - yy * yy));
        const th = golden * i;
        return {
          sx: Math.cos(th) * rad,
          sy: yy,
          sz: Math.sin(th) * rad,
          tx: t.x,
          ty: t.y,
          c: i % 37 === 0 ? LIVE : i % 5 === 0 ? ACC : INK,
          d: Math.random(),
          ox: 0, oy: 0, vx: 0, vy: 0,
          lx: t.x, ly: t.y,
        };
      });

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let prog = reduced ? 1 : 0;
      let rot = 0;
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const draw = () => {
        const p = Math.min(1, prog);
        // Transparent canvas — the section's glow shows through, no seam.
        ctx.clearRect(0, 0, W, H);

        const cx = W / 2;
        const cy = H / 2;
        for (let i = 0; i < pts.length; i++) {
          const q = pts[i];
          const t = ease(Math.max(0, Math.min(1, (p - q.d * 0.28) / 0.72)));

          const ca = Math.cos(rot);
          const sa = Math.sin(rot);
          const rx = q.sx * ca - q.sz * sa;
          const rz = q.sx * sa + q.sz * ca;
          const persp = 1 / (1 + rz * 0.28);
          const gx = cx + rx * R * persp;
          const gy = cy + q.sy * R * persp;
          const depth = (rz + 1) / 2;

          const hx = gx + (q.tx - gx) * t; // home position this frame
          const hy = gy + (q.ty - gy) * t;

          if (!reduced) {
            // Cursor repulsion
            const dxp = hx + q.ox - pointer.x;
            const dyp = hy + q.oy - pointer.y;
            const dp = Math.hypot(dxp, dyp);
            if (dp < HOVER_RADIUS && dp > 0.01) {
              const f = ((HOVER_RADIUS - dp) / HOVER_RADIUS) * HOVER_FORCE;
              q.vx += (dxp / dp) * f;
              q.vy += (dyp / dp) * f;
            }
            // Spring home + damping
            q.vx += -q.ox * SPRING;
            q.vy += -q.oy * SPRING;
            q.vx *= DAMPING;
            q.vy *= DAMPING;
            q.ox += q.vx;
            q.oy += q.vy;
          }

          const x = hx + q.ox;
          const y = hy + q.oy;
          q.lx = x;
          q.ly = y;

          const a = (0.22 + depth * 0.78) * (1 - t) + t;
          const r = (1.1 + depth * 1.0) * (1 - t) + 2.0 * t;

          ctx.globalAlpha = Math.max(0.08, a);
          ctx.fillStyle = q.c;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 6.2832);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };

      const frame = () => {
        if (disposed) return;
        if (visible && !reduced) {
          prog += 0.0055;
          if (prog > 2.4) prog = 0; // morph, hold on the wordmark, replay
          rot += 0.0032 * (1 - Math.min(1, prog));
        }
        draw();
        raf = requestAnimationFrame(frame);
      };

      if (reduced) {
        draw(); // static finished wordmark: information without motion
        return;
      }
      frame();
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.15 }
    );
    io.observe(cv);

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    cv.addEventListener("pointerdown", onDown);

    if (document.fonts?.ready) {
      document.fonts.ready.then(setup);
    } else {
      setup();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className={`block h-auto w-full cursor-crosshair touch-none ${className}`}
      role="img"
      aria-label="Particles arranged on a rotating globe fly into position to spell CODEGANG. Click to scatter them."
    />
  );
}
