"use client";

import React, { useEffect, useRef, useState } from "react";

type DottedGlowBackgroundProps = {
    className?: string;
    /** distance between dot centers in pixels */
    gap?: number;
    /** base radius of each dot in CSS px */
    radius?: number;
    /** dot color (will pulse by alpha) */
    color?: string;
    /** optional dot color for dark mode */
    darkColor?: string;
    /** shadow/glow color for bright dots */
    glowColor?: string;
    /** optional glow color for dark mode */
    darkGlowColor?: string;
    /** optional CSS variable name for light dot color (e.g. --color-zinc-900) */
    colorLightVar?: string;
    /** optional CSS variable name for dark dot color (e.g. --color-zinc-100) */
    colorDarkVar?: string;
    /** optional CSS variable name for light glow color */
    glowColorLightVar?: string;
    /** optional CSS variable name for dark glow color */
    glowColorDarkVar?: string;
    /** global opacity for the whole layer */
    opacity?: number;
    /** background radial fade opacity (0 = transparent background) */
    backgroundOpacity?: number;
    /** minimum per-dot speed in rad/s */
    speedMin?: number;
    /** maximum per-dot speed in rad/s */
    speedMax?: number;
    /** global speed multiplier for all dots */
    speedScale?: number;
};

/**
 * Canvas-based dotted background that randomly glows and dims.
 * - Uses a stable grid of dots.
 * - Each dot gets its own phase + speed producing organic shimmering.
 * - Handles high-DPI and resizes via ResizeObserver.
 */
export const DottedGlowBackground = ({
    className,
    gap = 24,
    radius = 1.5,
    color = "rgba(161, 161, 170, 0.4)", // Zinc-400 equivalent for light
    darkColor = "rgba(34, 197, 94, 0.2)", // Brand Green low opacity for dark
    glowColor = "rgba(34, 197, 94, 0.5)", // Brand Green glow
    darkGlowColor = "rgba(34, 197, 94, 0.6)", // Brand Green glow stronger
    colorLightVar,
    colorDarkVar,
    glowColorLightVar,
    glowColorDarkVar,
    opacity = 1,
    backgroundOpacity = 0,
    speedMin = 0.5,
    speedMax = 1.5,
    speedScale = 0.8,
}: DottedGlowBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [resolvedColor, setResolvedColor] = useState<string>(color);
    const [resolvedGlowColor, setResolvedGlowColor] = useState<string>(glowColor);

    // Resolve CSS variable value from the container or root
    const resolveCssVariable = (
        el: Element,
        variableName?: string,
    ): string | null => {
        if (!variableName) return null;
        const normalized = variableName.startsWith("--")
            ? variableName
            : `--${variableName}`;
        const fromEl = getComputedStyle(el as Element)
            .getPropertyValue(normalized)
            .trim();
        if (fromEl) return fromEl;
        const root = document.documentElement;
        const fromRoot = getComputedStyle(root).getPropertyValue(normalized).trim();
        return fromRoot || null;
    };

    const detectDarkMode = (): boolean => {
        // Check purely based on class or system pref
        if (typeof window === "undefined") return true;
        const root = document.documentElement;
        if (root.classList.contains("dark")) return true;
        if (root.classList.contains("light")) return false;
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    };

    useEffect(() => {
        const container = containerRef.current ?? document.documentElement;

        const compute = () => {
            // Force dark mode logic primarily if used in dark theme context, 
            // but respecting the detection logic.
            const isDark = detectDarkMode();

            let nextColor: string = color;
            let nextGlow: string = glowColor;

            if (isDark) {
                const varDot = resolveCssVariable(container, colorDarkVar);
                const varGlow = resolveCssVariable(container, glowColorDarkVar);
                nextColor = varDot || darkColor || nextColor;
                nextGlow = varGlow || darkGlowColor || nextGlow;
            } else {
                const varDot = resolveCssVariable(container, colorLightVar);
                const varGlow = resolveCssVariable(container, glowColorLightVar);
                nextColor = varDot || nextColor;
                nextGlow = varGlow || nextGlow;
            }

            setResolvedColor(nextColor);
            setResolvedGlowColor(nextGlow);
        };

        compute();

        const mql = window.matchMedia
            ? window.matchMedia("(prefers-color-scheme: dark)")
            : null;
        const handleMql = () => compute();
        mql?.addEventListener?.("change", handleMql);

        const mo = new MutationObserver(() => compute());
        mo.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "style"],
        });

        return () => {
            mql?.removeEventListener?.("change", handleMql);
            mo.disconnect();
        };
    }, [
        color,
        darkColor,
        glowColor,
        darkGlowColor,
        colorLightVar,
        colorDarkVar,
        glowColorLightVar,
        glowColorDarkVar,
    ]);

    useEffect(() => {
        const el = canvasRef.current;
        const container = containerRef.current;
        if (!el || !container) return;

        const ctx = el.getContext("2d");
        if (!ctx) return;

        let raf = 0;
        let stopped = false;

        const dpr = Math.max(1, window.devicePixelRatio || 1);

        const resize = () => {
            const { width, height } = container.getBoundingClientRect();
            el.width = Math.max(1, Math.floor(width * dpr));
            el.height = Math.max(1, Math.floor(height * dpr));
            el.style.width = `${Math.floor(width)}px`;
            el.style.height = `${Math.floor(height)}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const ro = new ResizeObserver(resize);
        ro.observe(container);
        resize();

        // Precompute dot metadata
        let dots: { x: number; y: number; phase: number; speed: number }[] = [];

        const regenDots = () => {
            dots = [];
            const { width, height } = container.getBoundingClientRect();
            // Increase buffer to avoid edge popping
            const cols = Math.ceil(width / gap) + 4;
            const rows = Math.ceil(height / gap) + 4;
            const min = Math.min(speedMin, speedMax);
            const max = Math.max(speedMin, speedMax);

            const offsetX = -2 * gap; // Start off-screen
            const offsetY = -2 * gap;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = offsetX + i * gap + (j % 2 === 0 ? 0 : gap * 0.5);
                    const y = offsetY + j * gap;
                    const phase = Math.random() * Math.PI * 2;
                    const span = Math.max(max - min, 0);
                    const speed = min + Math.random() * span;
                    dots.push({ x, y, phase, speed });
                }
            }
        };

        const regenThrottled = () => {
            regenDots();
        };

        regenDots();

        let last = performance.now();

        const draw = (now: number) => {
            if (stopped) return;
            const dt = (now - last) / 1000;
            last = now;
            const { width, height } = container.getBoundingClientRect();

            ctx.clearRect(0, 0, el.width, el.height);
            ctx.globalAlpha = opacity;

            if (backgroundOpacity > 0) {
                const grad = ctx.createRadialGradient(
                    width * 0.5,
                    height * 0.4,
                    Math.min(width, height) * 0.1,
                    width * 0.5,
                    height * 0.5,
                    Math.max(width, height) * 0.7,
                );
                grad.addColorStop(0, "rgba(0,0,0,0)");
                grad.addColorStop(
                    1,
                    `rgba(0,0,0,${Math.min(Math.max(backgroundOpacity, 0), 1)})`,
                );
                ctx.fillStyle = grad as unknown as CanvasGradient;
                ctx.fillRect(0, 0, width, height);
            }

            ctx.save();
            ctx.fillStyle = resolvedColor;

            const time = (now / 1000) * Math.max(speedScale, 0);
            for (let i = 0; i < dots.length; i++) {
                const d = dots[i];
                const mod = (time * d.speed + d.phase) % 2;
                const lin = mod < 1 ? mod : 2 - mod;
                const a = 0.2 + 0.6 * lin; // Base alpha 0.2, max 0.8

                if (a > 0.65) {
                    const glow = (a - 0.65) / 0.35;
                    ctx.shadowColor = resolvedGlowColor;
                    ctx.shadowBlur = 4 * glow; // Subtle glow
                } else {
                    ctx.shadowColor = "transparent";
                    ctx.shadowBlur = 0;
                }

                ctx.globalAlpha = a * opacity;
                ctx.beginPath();
                ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            raf = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            resize();
            regenThrottled();
        };

        window.addEventListener("resize", handleResize);
        raf = requestAnimationFrame(draw);

        return () => {
            stopped = true;
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
            ro.disconnect();
        };
    }, [
        gap,
        radius,
        resolvedColor,
        resolvedGlowColor,
        opacity,
        backgroundOpacity,
        speedMin,
        speedMax,
        speedScale,
    ]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
            <canvas
                ref={canvasRef}
                style={{ display: "block", width: "100%", height: "100%" }}
            />
        </div>
    );
};
