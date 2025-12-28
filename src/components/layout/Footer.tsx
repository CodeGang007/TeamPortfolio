"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Footer() {
  const { isAuthenticated, triggerAuth } = useAuth();
  const isOnline = isAuthenticated;

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (!isOnline) {
      e.preventDefault();
      triggerAuth();
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-sm border border-white/20 flex items-center justify-center bg-zinc-900 shadow-[4px_4px_0px_0px_#333]">
                <span className="font-black text-xl text-white">CG</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white">
                CodeGang
              </h3>
            </div>
            <p className="leading-relaxed max-w-md font-medium text-zinc-400">
              Building <span className="text-gumroad-pink font-bold">next-generation digital solutions</span> that redefine possibilities.
              Where cutting-edge technology meets creative excellence.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Github, href: "#" },
                { Icon: Linkedin, href: "#" },
                {
                  Icon: () => (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ), href: "#"
                },
                { Icon: Mail, href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, '#')}
                  className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center bg-zinc-900 text-zinc-400 hover:text-white hover:border-gumroad-green hover:bg-zinc-800 transition-all"
                >
                  <item.Icon size={18} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-white border-b-2 border-white/20 inline-block pb-1">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/project" },
                { name: "Team", path: "/team" },
                { name: "About", path: "/about" },
                { name: "Contact Us", path: "/contactus" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="font-medium text-zinc-400 hover:text-gumroad-pink transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-white border-b-2 border-white/20 inline-block pb-1">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@codegang.dev"
                className="block font-medium text-zinc-400 hover:text-gumroad-blue transition-colors"
              >
                hello@codegang.dev
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-zinc-600">
            © {new Date().getFullYear()} CodeGang. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href={isOnline ? "/privacy" : "#"}
              onClick={(e) => handleLinkClick(e, "/privacy")}
              className="font-medium text-zinc-500 hover:text-gumroad-pink transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={isOnline ? "/terms" : "#"}
              onClick={(e) => handleLinkClick(e, "/terms")}
              className="font-medium text-zinc-500 hover:text-gumroad-pink transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
