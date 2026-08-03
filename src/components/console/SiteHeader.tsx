"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  Bot,
  BrainCircuit,
  Building2,
  Cloud,
  Cpu,
  Factory,
  Github,
  Handshake,
  Heart,
  Instagram,
  Landmark,
  Layers,
  LineChart,
  Linkedin,
  MessageSquare,
  Monitor,
  PenTool,
  Quote,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import { site, stats } from "@/content/site";
import { useAuth } from "@/contexts/AuthContext";

const UserMenu = dynamic(() => import("@/components/UserMenu"), { ssr: false });

/**
 * Masthead, modelled on the WebOsmotic navbar.
 *
 * Three parts:
 *  1. a slim ink utility strip (email, NDA note, live count, socials) that
 *     retracts once you start reading,
 *  2. an 80px main bar — grid trigger, ringed logo mark, serif wordmark, a
 *     featured pill, uppercase 14px/700 nav items with inline carets, and the
 *     two-button CTA cluster,
 *  3. a full-width multi-column mega panel, plus a left contact drawer behind
 *     the 2×2 grid glyph.
 *
 * On the homepage the bar starts transparent over the pixel-art hero and
 * swaps to solid bone once you scroll past it.
 *
 * Every menu entry points at a page that exists and, on the services and
 * industries menus, at a page whose claims are backed by a shipped system.
 */

type MenuItem = {
  title: string;
  desc: string;
  href: string;
  Icon: typeof BrainCircuit;
};

type MegaMenu = {
  name: string;
  /** Panel width in rem — services needs three columns, company needs two. */
  cols: 2 | 3;
  columns: { heading: string; items: MenuItem[] }[];
  footer: { label: string; href: string };
  /** Right-hand feature card inside the panel. */
  feature: { eyebrow: string; title: string; body: string; href: string; cta: string };
};

const megaMenus: MegaMenu[] = [
  {
    name: "Our services",
    cols: 3,
    columns: [
      {
        heading: "AI & data",
        items: [
          { title: "AI development", desc: "RAG platforms, model gateways", href: "/services/ai-development", Icon: BrainCircuit },
          { title: "AI chatbots", desc: "Grounded in your documents", href: "/services/ai-chatbot-development", Icon: MessageSquare },
          { title: "AI agents", desc: "Tool-calling, with audit trails", href: "/services/ai-agent-development", Icon: Bot },
          { title: "AI consulting", desc: "A two-week viability read", href: "/services/ai-consulting", Icon: Sparkles },
          { title: "Generative AI", desc: "Schema-constrained output", href: "/services/generative-ai-development", Icon: Cpu },
          { title: "Machine learning", desc: "Forecasting, OCR, scoring", href: "/services/machine-learning-development", Icon: LineChart },
        ],
      },
      {
        heading: "Product & platform",
        items: [
          { title: "Workflow automation", desc: "Rules first, models second", href: "/services/ai-workflow-automation", Icon: Workflow },
          { title: "Web development", desc: "Multi-tenant platforms", href: "/services/web-development", Icon: Layers },
          { title: "Mobile apps", desc: "Flutter & Android, offline-first", href: "/services/mobile-app-development", Icon: Smartphone },
          { title: "UI/UX design", desc: "Design systems as code", href: "/services/ui-ux-design", Icon: PenTool },
          { title: "Web design", desc: "Fast, editable marketing sites", href: "/services/web-design", Icon: Monitor },
        ],
      },
      {
        heading: "Run & scale",
        items: [
          { title: "DevOps", desc: "Your account, your keys", href: "/services/devops-services", Icon: Cloud },
          { title: "QA & testing", desc: "Green suite on every commit", href: "/services/qa-testing", Icon: ShieldCheck },
          { title: "Hire developers", desc: "Engineers inside your team", href: "/services/hire-developers", Icon: Users },
        ],
      },
    ],
    footer: { label: "All services", href: "/services" },
    feature: {
      eyebrow: "Start here",
      title: "Not sure which one?",
      body: "A two-to-three week assessment tells you what your data can support — and which ideas we would not build.",
      href: "/services/ai-consulting",
      cta: "See the assessment",
    },
  },
  {
    name: "Industries",
    cols: 2,
    columns: [
      {
        heading: "Where we ship",
        items: [
          { title: "Healthcare", desc: "Pinnacle HMS · eMedici", href: "/industries/healthcare", Icon: Heart },
          { title: "SaaS", desc: "Verse AI · tenant-isolated", href: "/industries/saas", Icon: Layers },
          { title: "Logistics", desc: "ARM Tech · 5 ML modules", href: "/industries/logistics", Icon: Truck },
          { title: "Fintech", desc: "Ledgers and reconciliation", href: "/industries/fintech", Icon: Landmark },
        ],
      },
      {
        heading: "Commerce & industry",
        items: [
          { title: "AI in ecommerce", desc: "Search, recs, forecasting", href: "/industries/ecommerce-ai", Icon: ShoppingBag },
          { title: "D2C ecommerce", desc: "Storefront and back-office", href: "/industries/d2c-ecommerce", Icon: Store },
          { title: "Manufacturing", desc: "Inspection and maintenance", href: "/industries/manufacturing", Icon: Factory },
        ],
      },
    ],
    footer: { label: "All industries", href: "/industries" },
    feature: {
      eyebrow: "Proof",
      title: `${stats.live} systems live`,
      body: `Across ${stats.regions} regions, with ${stats.building} more in build. Each one has a case study and, where public, a working URL.`,
      href: "/portfolio",
      cta: "Open the portfolio",
    },
  },
  {
    name: "Company",
    cols: 2,
    columns: [
      {
        heading: "The studio",
        items: [
          { title: "About us", desc: "The road so far", href: "/about", Icon: Building2 },
          { title: "Our values", desc: "Five rules, each with a cost", href: "/our-values", Icon: Scale },
          { title: "How we work", desc: "Five engineers, no hand-off", href: "/studio", Icon: Workflow },
          { title: "Careers", desc: "Open applications welcome", href: "/careers", Icon: Users },
        ],
      },
      {
        heading: "Evidence",
        items: [
          { title: "Partners", desc: "White-label and referral", href: "/partners", Icon: Handshake },
          { title: "Testimonials", desc: "Only with written consent", href: "/testimonials", Icon: Quote },
          { title: "Portfolio", desc: "Every system, filterable", href: "/portfolio", Icon: Layers },
        ],
      },
    ],
    footer: { label: "About the studio", href: "/about" },
    feature: {
      eyebrow: "Our rule",
      title: "Some numbers are blank",
      body: "Ratings render an em dash until a verified score exists. That is what makes the rest worth reading.",
      href: "/our-values",
      cta: "Read the rules",
    },
  },
];

/** Top-level items with no dropdown. */
const flatLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Resources", href: "/resources" },
];

/** 2×2 grid glyph — the drawer trigger. */
function GridGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="grid grid-cols-2 gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`block h-[7px] w-[7px] rounded-[2px] border-[1.5px] border-current transition-all duration-300 ${
            open ? "scale-90 opacity-70" : ""
          }`}
          style={{ transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </span>
  );
}

/**
 * Inline caret.
 *
 * Drawn as a stroked chevron sitting on the text's optical centre. The
 * earlier version was a solid triangle superscripted into the corner, which
 * read as debris at 14px — a chevron next to the label is what actually
 * looks like a menu affordance.
 */
function Caret({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
        open ? "-rotate-180 text-signal" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false); // mobile nav
  const [drawer, setDrawer] = useState(false); // left contact drawer
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";
  const { isAuthenticated, openLoginModal } = useAuth();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const overArt = pathname === "/";
  const solid = !overArt || scrolled || !!menu || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMenu(null);
      setOpen(false);
      setDrawer(false);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Escape closes whichever overlay is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDrawer(false);
      setMenu(null);
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(name || null);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  const activeMenu = megaMenus.find((m) => m.name === menu);

  // Over the pixel-art hero the labels sit on bright sky in places, where
  // white-on-white loses the wordmark entirely. A tight shadow buys the
  // contrast back without dimming the artwork behind it.
  const linkTone = solid
    ? "text-ink-soft"
    : "text-white [text-shadow:0_1px_8px_rgba(0,30,55,0.55)]";

  /** Shared class string for a top-level nav item. */
  const navItem = (active: boolean) =>
    `relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-[13.5px] font-bold uppercase leading-none tracking-[0.01em] transition-all duration-200 xl:px-5 ${
      active
        ? solid
          ? "bg-paper text-ink shadow-pill"
          : "bg-white/20 text-white"
        : `${linkTone} ${solid ? "hover:bg-ink/[0.05] hover:text-ink" : "hover:bg-white/10 hover:text-white"}`
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? "border-b border-line bg-[rgba(245,243,239,0.94)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        onMouseLeave={leave}
      >
        {/* ── Utility strip — retracts once you start reading ────── */}
        <div
          className={`overflow-hidden border-b border-transparent bg-ink transition-all duration-300 ${
            scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
          }`}
        >
          <div className="mx-auto flex h-10 max-w-shell items-center justify-between px-6 lg:px-10 xl:px-16">
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-[0.68rem] text-bone/70 transition-colors hover:text-bone"
              >
                {site.email}
              </a>
              <span className="hidden font-mono text-[0.68rem] text-bone/45 sm:inline">
                NDA by default · {stats.regions} regions
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/portfolio"
                className="hidden items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-bone/70 transition-colors hover:text-bone sm:flex"
              >
                <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {stats.live} live
              </Link>
              <span aria-hidden className="hidden h-3.5 w-px bg-bone/20 sm:block" />
              {[
                { name: "GitHub", href: site.github, Icon: Github },
                { name: "LinkedIn", href: site.linkedin, Icon: Linkedin },
                { name: "X", href: site.x, Icon: null },
                { name: "Instagram", href: site.instagram, Icon: Instagram },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-6 w-6 place-items-center rounded text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
                >
                  {s.Icon ? (
                    <s.Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : (
                    <span aria-hidden className="text-[0.7rem] font-semibold leading-none">
                      𝕏
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main bar ────────────────────────────────────────────── */}
        <div className="mx-auto flex h-[80px] max-w-shell items-center gap-3 px-6 lg:px-10 xl:px-16">
          <button
            onClick={() => setDrawer(true)}
            aria-label="Open contact panel"
            aria-expanded={drawer}
            className={`hidden shrink-0 rounded-lg p-2 transition-colors xl:block ${
              solid
                ? "text-ink-soft hover:bg-ink/[0.05] hover:text-ink"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }`}
          >
            <GridGlyph open={drawer} />
          </button>

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="CodeGang — home"
          >
            <Image
              src="/assets/cg-logo-nav.png"
              alt=""
              width={34}
              height={34}
              priority
              className="h-[34px] w-[34px] shrink-0 object-contain"
            />
            <span
              className={`font-serif text-[1.6rem] leading-none tracking-tight transition-colors ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              CodeGang
            </span>
          </Link>

          {/* Centre nav */}
          <nav className="mx-auto hidden items-center lg:flex" aria-label="Main">
            {/* Featured pill — the permanently highlighted first item, the
                way WebOsmotic leads with "LET'S TALK AI". */}
            <Link
              href="/services/ai-consulting"
              className={`mr-1.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-[13.5px] font-bold uppercase leading-none tracking-[0.01em] transition-colors xl:px-5 ${
                solid
                  ? "bg-signal-soft text-signal ring-1 ring-signal/25 hover:bg-signal hover:text-white"
                  : "bg-white/20 text-white ring-1 ring-white/30 hover:bg-white/30"
              }`}
            >
              <Sparkles aria-hidden className="h-3.5 w-3.5" strokeWidth={2.2} />
              Let&apos;s talk AI
            </Link>

            {megaMenus.map((m) => {
              const isOpen = menu === m.name;
              return (
                <button
                  key={m.name}
                  onMouseEnter={() => enter(m.name)}
                  onClick={() => setMenu(isOpen ? null : m.name)}
                  aria-expanded={isOpen}
                  className={navItem(isOpen)}
                >
                  {m.name}
                  <Caret open={isOpen} />
                </button>
              );
            })}

            {flatLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onMouseEnter={() => enter("")}
                className={navItem(pathname.startsWith(l.href))}
              >
                {l.name}
              </Link>
            ))}

            <Link
              href="/careers"
              onMouseEnter={() => enter("")}
              className={`${navItem(pathname.startsWith("/careers"))} hidden 2xl:inline-flex`}
            >
              Careers
            </Link>
          </nav>

          {/* Right cluster */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5">
            {isAuthenticated ? (
              <span className="hidden md:block">
                <UserMenu />
              </span>
            ) : (
              <button
                onClick={openLoginModal}
                className={`hidden px-2 text-[0.85rem] font-medium transition-colors 2xl:block ${
                  solid ? "text-mute hover:text-ink" : "text-white/60 hover:text-white"
                }`}
              >
                Sign in
              </button>
            )}

            <Link
              href="/project-request/custom"
              className={`hidden rounded-full border px-5 py-3 text-[0.85rem] font-medium transition-all 2xl:inline-flex ${
                solid
                  ? "border-signal/45 text-ink shadow-[0_0_0_3px_rgba(46,125,240,0.10)] hover:border-signal hover:shadow-[0_0_0_4px_rgba(46,125,240,0.16)]"
                  : "border-white/45 text-white shadow-[0_0_0_3px_rgba(255,255,255,0.10)] hover:border-white hover:shadow-[0_0_0_4px_rgba(255,255,255,0.18)]"
              }`}
            >
              Start a project
            </Link>

            <Link
              href="/contact"
              className={`group hidden items-center gap-1.5 rounded-full px-6 py-3 text-[0.88rem] font-medium transition-all md:inline-flex ${
                solid
                  ? "bg-ink text-bone shadow-pill hover:bg-ink-soft"
                  : "bg-white text-ink hover:bg-bone"
              }`}
            >
              Contact us
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>

            <button
              className={`p-2 text-sm font-medium lg:hidden ${
                solid ? "text-ink" : "text-white"
              }`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* ── Mega panel ──────────────────────────────────────────── */}
        {activeMenu && (
          <div
            className="pointer-events-none absolute inset-x-0 top-full hidden justify-center lg:flex"
            onMouseEnter={() => enter(activeMenu.name)}
          >
            {/* Both gradient stops must be fully opaque — a translucent stop
                lets the hero artwork read straight through the menu. */}
            <div
              className={`notif-pop pointer-events-auto mt-2 grid w-[calc(100vw-3rem)] overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-paper to-[#EDF2FC] shadow-frame-lg ${
                activeMenu.cols === 3
                  ? "max-w-[72rem] lg:grid-cols-[1fr_1fr_1fr_0.9fr]"
                  : "max-w-[58rem] lg:grid-cols-[1fr_1fr_0.9fr]"
              }`}
            >
              {activeMenu.columns.map((col) => (
                <div key={col.heading} className="border-r border-line/70 p-5">
                  <p className="mono-label mb-3 px-2">{col.heading}</p>
                  <ul>
                    {col.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          onClick={() => setMenu(null)}
                          className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/80"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-paper text-signal transition-colors group-hover:border-signal/45 group-hover:bg-signal-soft">
                            <item.Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.7} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[0.875rem] font-medium leading-snug text-ink">
                              {item.title}
                            </span>
                            <span className="block truncate text-[0.72rem] text-mute">
                              {item.desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Feature card — the panel's right rail */}
              <div className="flex flex-col justify-between bg-[#E8F0FE]/70 p-6">
                <div>
                  <p className="mono-label !text-signal">{activeMenu.feature.eyebrow}</p>
                  <p className="mt-3 font-serif text-[1.35rem] leading-tight text-ink">
                    {activeMenu.feature.title}
                  </p>
                  <p className="mt-2.5 text-[0.8rem] leading-relaxed text-ink-soft">
                    {activeMenu.feature.body}
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  <Link
                    href={activeMenu.feature.href}
                    onClick={() => setMenu(null)}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[0.8rem] font-medium text-bone transition-colors hover:bg-ink-soft"
                  >
                    {activeMenu.feature.cta}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={activeMenu.footer.href}
                    onClick={() => setMenu(null)}
                    className="block text-[0.78rem] font-medium text-signal hover:underline"
                  >
                    {activeMenu.footer.label} →
                  </Link>
                  <p className="font-mono text-[0.58rem] uppercase tracking-wider text-mute">
                    every link is a real page
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Mobile menu ─────────────────────────────────────────── */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="max-h-[76vh] overflow-y-auto border-t border-line bg-bone lg:hidden"
          >
            <ul className="divide-y divide-line">
              {megaMenus.map((m) => {
                const isOpen = mobileGroup === m.name;
                return (
                  <li key={m.name}>
                    <button
                      onClick={() => setMobileGroup(isOpen ? null : m.name)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between px-6 py-4 text-[13.5px] font-bold uppercase tracking-[0.01em] text-ink"
                    >
                      {m.name}
                      <Caret open={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="pb-3">
                        {m.columns.map((col) => (
                          <div key={col.heading} className="px-4 pb-2">
                            <p className="mono-label px-2 pb-1.5 pt-2">{col.heading}</p>
                            {col.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-2 py-2.5"
                              >
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-paper text-signal">
                                  <item.Icon aria-hidden className="h-4 w-4" strokeWidth={1.7} />
                                </span>
                                <span className="text-[0.9rem] font-medium text-ink-soft">
                                  {item.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}

              {[...flatLinks, { name: "Careers", href: "/careers" }, { name: "Work", href: "/work" }].map(
                (l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-6 py-4 text-[13.5px] font-bold uppercase tracking-[0.01em] text-ink"
                    >
                      {l.name}
                    </Link>
                  </li>
                ),
              )}

              <li className="px-6 py-4">
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="text-[0.9rem] font-medium text-mute"
                  >
                    Sign in
                  </button>
                )}
              </li>
              <li className="p-6">
                <Link
                  href="/contact"
                  className="block rounded-full bg-ink px-5 py-3 text-center text-[0.9rem] font-medium text-bone"
                  onClick={() => setOpen(false)}
                >
                  Contact us →
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* ── Left contact drawer ───────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          drawer ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!drawer}
      >
        <button
          tabIndex={drawer ? 0 : -1}
          aria-label="Close contact panel"
          onClick={() => setDrawer(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
        />

        <aside
          className={`absolute inset-y-0 left-0 flex w-[min(24rem,88vw)] flex-col overflow-y-auto rounded-r-[20px] bg-[#0E1A2B] p-8 text-bone shadow-2xl transition-transform duration-300 ${
            drawer ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Brand wash — signal blue bleeding in from the top so the panel
              is CodeGang's colour rather than a neutral dark slab. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(120% 60% at 0% 0%, rgba(46,125,240,0.42), transparent 62%), radial-gradient(90% 50% at 100% 100%, rgba(46,125,240,0.20), transparent 70%)",
            }}
          />
          <svg
            aria-hidden
            viewBox="0 0 220 220"
            className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-56 w-56 opacity-70"
          >
            <defs>
              <linearGradient id="cg-arc" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E7DF0" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2E7DF0" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[60, 88, 116, 144, 172].map((r) => (
              <circle
                key={r}
                cx="30"
                cy="190"
                r={r}
                fill="none"
                stroke="url(#cg-arc)"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          <div className="flex items-start justify-between">
            <span className="font-serif text-[2rem] leading-none">CodeGang</span>
            <button
              onClick={() => setDrawer(false)}
              className="rounded-lg p-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-bone/50 transition-colors hover:bg-bone/10 hover:text-bone"
            >
              ✕ Close
            </button>
          </div>

          <p className="mt-4 text-[0.85rem] leading-relaxed text-bone/60">
            A five-engineer studio. {stats.projectsDelivered} projects delivered
            for {stats.clientsServed} clients — most under NDA.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <p className="mono-label !text-signal">Where we work</p>
              <p className="mt-2 text-[0.95rem] text-bone">
                Brazil · Australia · India · USA · Europe
              </p>
              <p className="mt-1 font-mono text-[0.68rem] text-bone/45">
                {stats.live} systems live · {stats.regions} regions
              </p>
            </div>

            <div>
              <p className="mono-label !text-signal">New projects</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-[0.95rem] text-bone hover:text-signal"
              >
                {site.email}
              </a>
              <p className="mt-1 font-mono text-[0.68rem] text-bone/45">
                Straight to the founders — no sales layer
              </p>
            </div>

            <div>
              <p className="mono-label !text-signal">Jump to</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {[
                  { name: "Services", href: "/services" },
                  { name: "Industries", href: "/industries" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "Our values", href: "/our-values" },
                  { name: "Partners", href: "/partners" },
                  { name: "Resources", href: "/resources" },
                  { name: "Careers", href: "/careers" },
                  { name: "Testimonials", href: "/testimonials" },
                ].map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      onClick={() => setDrawer(false)}
                      className="text-[0.875rem] text-bone/70 transition-colors hover:text-bone"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono-label !text-signal">Elsewhere</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {[
                  { name: "GitHub", href: site.github },
                  { name: "LinkedIn", href: site.linkedin },
                  { name: "X", href: site.x },
                  { name: "Instagram", href: site.instagram },
                  { name: site.email, href: `mailto:${site.email}` },
                ].map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="text-[0.9rem] text-bone/70 transition-colors hover:text-bone"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto pt-10">
            <Link
              href="/contact"
              onClick={() => setDrawer(false)}
              className="group flex items-center justify-center gap-2 rounded-full bg-bone px-5 py-3 text-[0.9rem] font-medium text-ink transition-colors hover:bg-white"
            >
              Contact us
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
