"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, Check, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const XIcon = ({ size, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function Footer() {
  const { isAuthenticated, triggerAuth } = useAuth();
  const router = useRouter();
  const isOnline = isAuthenticated;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (!isOnline) {
      e.preventDefault();
      triggerAuth();
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const footerLinks = {
    product: [
      { name: "Showcase", href: "/project" },
      { name: "Custom Solutions", href: "/project-request/custom" },
      { name: "Team Expertise", href: "/team" },
      { name: "Technology", href: "/about#tech" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about#story" },
      { name: "Careers", href: "/team" }, // Linking to team for now
      { name: "Contact", href: "/contactus" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "License", href: "/license" },
    ]
  };

  return (
    <footer className="relative w-full border-t border-white/5 bg-black overflow-hidden z-50">

      {/* Decorative Top Gradient Line */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent",
        isOnline ? "via-brand-green/20" : "via-red-500/20"
      )} />

      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">

        {/* Top Section: CTA & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 border-b border-white/5 pb-16 mb-16">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to <span className={isOnline ? "text-brand-green" : "text-red-500"}>scale</span> your vision?
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Join our newsletter for exclusive insights on high-performance development and design systems.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full bg-zinc-900/50 border rounded-xl py-4 pl-6 pr-14 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-all duration-300",
                  isOnline
                    ? "border-white/10 focus:border-brand-green/50 focus:ring-brand-green/20"
                    : "border-red-900/20 focus:border-red-500/50 focus:ring-red-500/20"
                )}
              />
              <button
                type="submit"
                disabled={subscribed}
                className={cn(
                  "absolute right-2 top-2 bottom-2 aspect-square rounded-lg flex items-center justify-center transition-all duration-300",
                  subscribed
                    ? (isOnline ? "bg-brand-green text-black" : "bg-red-500 text-white")
                    : (isOnline ? "bg-white/5 text-white hover:bg-brand-green hover:text-black" : "bg-red-950/30 text-red-500 hover:bg-red-500 hover:text-white")
                )}
              >
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="checked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={18} strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
            <p className="text-zinc-600 text-xs mt-3 pl-2">
              We respect your inbox. No spam, ever.
            </p>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500",
                isOnline
                  ? "border-brand-green/20 bg-brand-green/5 group-hover:border-brand-green/50 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                  : "border-red-500/20 bg-red-500/5 group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
              )}>
                <span className={cn(
                  "font-bold text-lg",
                  isOnline ? "text-brand-green" : "text-red-500"
                )}>CG</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">CodeGang</span>
            </Link>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Architecting the digital future. We combine aesthetic precision with engineering resilience to build products that last and brands that lead.
            </p>

            <div className="flex gap-3 mt-4">
              {[Github, Linkedin, XIcon, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={cn(
                    "p-2.5 rounded-xl border border-transparent transition-all duration-300",
                    isOnline
                      ? "bg-white/5 text-zinc-400 hover:bg-brand-green/10 hover:text-brand-green hover:border-brand-green/20"
                      : "bg-red-950/10 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"
                  )}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10 lg:pl-12">

            {/* Product Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-wide text-sm uppercase">Product</h4>
              <ul className="flex flex-col gap-4">
                {footerLinks.product.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className={cn(
                        "w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200",
                        isOnline ? "bg-brand-green" : "bg-red-500"
                      )} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-wide text-sm uppercase">Company</h4>
              <ul className="flex flex-col gap-4">
                {footerLinks.company.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className={cn(
                        "w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200",
                        isOnline ? "bg-brand-green" : "bg-red-500"
                      )} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold tracking-wide text-sm uppercase">Legal</h4>
              <ul className="flex flex-col gap-4">
                {footerLinks.legal.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-zinc-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className={cn(
                        "w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200",
                        isOnline ? "bg-brand-green" : "bg-red-500"
                      )} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-medium">
            &copy; {new Date().getFullYear()} CodeGang Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full border bg-black transition-all duration-300",
              isOnline ? "border-brand-green/20" : "border-red-500/20"
            )}>
              <div className={cn(
                "w-1.5 h-1.5 rounded-full animate-pulse",
                isOnline ? "bg-brand-green" : "bg-red-500"
              )} />
              <span className={cn(
                "text-[10px] font-bold tracking-wider uppercase",
                isOnline ? "text-brand-green" : "text-red-500"
              )}>
                {isOnline ? 'All Systems Operational' : 'System Offline'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
