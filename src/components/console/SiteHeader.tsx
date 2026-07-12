"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { stats } from "@/content/site";
import { useAuth } from "@/contexts/AuthContext";

// Only rendered when signed in — keeps its bundle out of public first-load JS.
const UserMenu = dynamic(() => import("@/components/UserMenu"), { ssr: false });

// MathCo-style masthead with mega-menu dropdowns. Every item below is real —
// each service and industry links to the production system that backs it.
const megaMenus = [
  {
    name: "Services",
    items: [
      { title: "AI & GenAI engineering", desc: "RAG platforms, multi-LLM gateways, embeddings", href: "/work/verse-ai" },
      { title: "SaaS product development", desc: "Multi-tenant platforms, end to end", href: "/work/verse-ai" },
      { title: "Mobile app development", desc: "Flutter & Android, store-ready", href: "/work/emedici" },
      { title: "Applied machine learning", desc: "Forecasting, anomaly detection, OCR, risk", href: "/work/arm-tech" },
      { title: "Enterprise systems", desc: "ERP, hospital management, role-based platforms", href: "/work/pinnacle-hms" },
      { title: "Cloud & DevOps", desc: "AWS architecture, Docker, CI/CD", href: "/work/ai-resume" },
    ],
    footer: { label: "All case studies", href: "/work" },
  },
  {
    name: "Industries",
    items: [
      { title: "Healthcare", desc: "eMedici · Pinnacle HMS", href: "/work/pinnacle-hms" },
      { title: "Enterprise SaaS", desc: "Verse AI", href: "/work/verse-ai" },
      { title: "Trade & Logistics", desc: "ARM Tech ERP", href: "/work/arm-tech" },
      { title: "PropTech", desc: "NestFlow", href: "/work/nestflow" },
      { title: "HR & Recruiting", desc: "AI Resume Builder", href: "/work/ai-resume" },
    ],
    footer: { label: "Where our systems run", href: "/#industries" },
  },
  {
    name: "Studio",
    items: [
      { title: "How we work", desc: "Five engineers, no hand-off", href: "/studio" },
      { title: "The team", desc: "The faces of the studio", href: "/studio#team" },
      { title: "FAQ", desc: "Engagements, time zones, NDAs", href: "/#faq" },
      { title: "Start a project", desc: "Brief us with documents & requirements", href: "/project-request/custom" },
    ],
    footer: { label: "About the studio", href: "/studio" },
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false); // mobile
  const [menu, setMenu] = useState<string | null>(null); // desktop mega menu
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";
  const { isAuthenticated, openLoginModal } = useAuth();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMenu(null);
      setOpen(false);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const enter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(name);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 150);
  };

  const activeMenu = megaMenus.find((m) => m.name === menu);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menu
          ? "border-b border-white/10 bg-[#0C1017]/95 shadow-lg shadow-black/20 backdrop-blur"
          : "border-b border-transparent bg-[#0C1017]"
      }`}
      onMouseLeave={leave}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="CodeGang — home"
          >
            <Image
              src="/assets/cg-logo-nav.png"
              alt=""
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-md"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              CodeGang
            </span>
          </Link>

          {/* The one honest boast, always on screen */}
          <Link
            href="/work"
            className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20 lg:flex"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot"
            />
            {stats.live} systems live
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {megaMenus.map((m) => (
            <button
              key={m.name}
              onMouseEnter={() => enter(m.name)}
              onClick={() => setMenu(menu === m.name ? null : m.name)}
              aria-expanded={menu === m.name}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                menu === m.name ? "text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {m.name}
              <ChevronDown
                aria-hidden
                className={`h-3.5 w-3.5 transition-transform ${
                  menu === m.name ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}
          <Link
            href="/work"
            onMouseEnter={() => enter("")}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith("/work")
                ? "text-white after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-blue-500"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Work
          </Link>
          {isAuthenticated ? (
            <span className="px-2">
              <UserMenu />
            </span>
          ) : (
            <button
              onClick={openLoginModal}
              className="px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-300"
            >
              Sign in
            </button>
          )}
          <span aria-hidden className="mx-2 h-6 w-px bg-white/15" />
          <Link
            href="/contact"
            className="group rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            <span className="flex items-center gap-1.5">
              Talk to an engineer
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </Link>
        </nav>

        <button
          className="p-3 text-sm font-medium text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* ── Mega-menu panel (desktop) ─────────────────────────── */}
      {activeMenu && (
        <div
          className="hidden border-t border-white/10 bg-[#0C1017] shadow-2xl shadow-black/40 md:block"
          onMouseEnter={() => enter(activeMenu.name)}
        >
          <div className="mx-auto grid max-w-7xl gap-2 px-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {activeMenu.items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl p-4 transition-colors hover:bg-white/5"
                onClick={() => setMenu(null)}
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  {item.title}
                  <ArrowRight
                    aria-hidden
                    className="h-3.5 w-3.5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
          <div className="border-t border-white/5">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
              <Link
                href={activeMenu.footer.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                onClick={() => setMenu(null)}
              >
                {activeMenu.footer.label}
                <ArrowRight aria-hidden className="h-3 w-3" />
              </Link>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-slate-600">
                {stats.live} live · {stats.regions} regions · every link is a
                real system
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-[#0C1017] md:hidden"
        >
          <ul className="divide-y divide-white/5 px-2">
            {megaMenus.map((m) => (
              <li key={m.name} className="py-2">
                <p className="px-4 pt-2 font-mono text-[0.65rem] uppercase tracking-wider text-slate-500">
                  {m.name}
                </p>
                {m.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm font-medium text-slate-200"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </li>
            ))}
            <li>
              <Link
                href="/work"
                className="block px-4 py-4 text-sm font-medium text-slate-200"
                onClick={() => setOpen(false)}
              >
                Work — all case studies
              </Link>
            </li>
            <li className="px-4 py-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <button
                  onClick={openLoginModal}
                  className="text-sm font-medium text-slate-500"
                >
                  Sign in
                </button>
              )}
            </li>
            <li className="p-4">
              <Link
                href="/contact"
                className="block rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Talk to an engineer →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
