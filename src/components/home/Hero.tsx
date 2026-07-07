import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Globe2, Users } from "lucide-react";

/* Minimal browser chrome around a screenshot */
function BrowserFrame({
  children,
  url,
  className = "",
}: {
  children: React.ReactNode;
  url: string;
  className?: string;
}) {
  return (
    <div
      className={`card-shine overflow-hidden rounded-xl border border-white/10 bg-zinc-900/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/[0.06] bg-zinc-950/80">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-brand-green/60" />
        <span className="ml-3 hidden sm:block text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-white/[0.06] rounded-md px-2.5 py-0.5">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

// Server component — static HTML, pure-CSS motion, screenshots are the pitch.
export default function Hero() {
  return (
    <section className="relative z-10">
      {/* Kinetic aurora backdrop — bleeds up behind the navbar, clipped only horizontally */}
      <div className="absolute -top-40 -bottom-10 left-0 right-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob aurora-a -top-[15%] -left-[12%]" />
        <div className="aurora-blob aurora-b top-[15%] right-[-18%]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
          {/* ── Copy ── */}
          <div>
            <p className="hero-fade-up inline-flex items-center gap-2.5 rounded-full border border-brand-green/25 bg-brand-green/[0.07] px-4 py-1.5 text-xs font-medium text-brand-green mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
              </span>
              Available for new projects
            </p>

            {/* LCP element — paints immediately, no opacity animation */}
            <h1
              className="font-display font-medium tracking-tight text-white leading-[1.06] mb-6"
              style={{ fontSize: "clamp(2.4rem, 4.3vw, 3.8rem)" }}
            >
              We build software that{" "}
              <span className="text-gradient-emerald">solves business problems.</span>
            </h1>

            <p
              className="hero-fade-up text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-9"
              style={{ animationDelay: "120ms" }}
            >
              Production AI systems, multi-tenant platforms, and mobile apps —
              a small senior team shipping for clients across five countries.
            </p>

            <div
              className="hero-fade-up flex flex-wrap items-center gap-4 mb-12"
              style={{ animationDelay: "200ms" }}
            >
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2 bg-brand-green text-zinc-950 hover:bg-brand-green-bright rounded-full px-7 py-3.5 font-semibold transition-colors shadow-[0_0_32px_rgba(16,185,129,0.25)]"
              >
                Start a project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center rounded-full border border-white/15 text-white hover:border-white/35 hover:bg-white/[0.03] px-7 py-3.5 font-medium transition-colors"
              >
                See the work
              </Link>
            </div>

            {/* Inline proof row */}
            <div
              className="hero-fade-up flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.07] pt-6 text-sm"
              style={{ animationDelay: "280ms" }}
            >
              <span className="flex items-center gap-2 text-zinc-400">
                <span className="font-display text-xl font-medium text-white">6</span>
                products live
              </span>
              <span className="flex items-center gap-2 text-zinc-400">
                <Globe2 className="w-4 h-4 text-brand-green" />
                <span className="font-display text-xl font-medium text-white">5</span>
                countries
              </span>
              <span className="flex items-center gap-2 text-zinc-400">
                <Users className="w-4 h-4 text-brand-green" />
                <span className="font-display text-xl font-medium text-white">10K+</span>
                end users
              </span>
              <span className="flex items-center gap-2 text-zinc-400">
                <Star className="w-4 h-4 text-brand-green fill-brand-green" />
                <span className="font-display text-xl font-medium text-white">4.9</span>
                Play Store
              </span>
            </div>
          </div>

          {/* ── Product showcase — real shipped software ── */}
          <div className="hero-fade-up relative" style={{ animationDelay: "180ms" }}>
            {/* glow behind the stack */}
            <div
              className="absolute -inset-8 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 55% 45%, rgba(16,185,129,0.13), transparent 70%)",
              }}
            />

            {/* main shot — ERP dashboard */}
            <BrowserFrame url="cement-app.vercel.app" className="relative">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/projects/armtech-dashboard.webp"
                  alt="ARM Tech ERP — live CementBook dashboard"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
            </BrowserFrame>

            {/* floating shot — hospital system */}
            <div className="float-soft absolute -bottom-10 -left-6 sm:-left-12 w-[52%] hidden sm:block">
              <BrowserFrame url="pinnacle-hms" >
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/projects/pinnacle-admin.webp"
                    alt="Pinnacle HMS — hospital admin dashboard"
                    fill
                    sizes="25vw"
                    className="object-cover object-top"
                  />
                </div>
              </BrowserFrame>
            </div>

            {/* floating shot — AI product */}
            <div className="float-soft-delayed absolute -top-9 -right-4 sm:-right-8 w-[44%] hidden sm:block">
              <BrowserFrame url="moovehubia.com.br">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/projects/verse-ai-login.webp"
                    alt="Verse AI — enterprise tenant portal"
                    fill
                    sizes="22vw"
                    className="object-cover object-top"
                  />
                </div>
              </BrowserFrame>
            </div>

            {/* caption chip */}
            <div className="absolute -bottom-4 right-2 sm:right-6 card-shine rounded-full border border-white/10 bg-zinc-950/90 px-4 py-2 text-[11px] font-medium text-zinc-300">
              Real products, <span className="text-brand-green">live in production</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
