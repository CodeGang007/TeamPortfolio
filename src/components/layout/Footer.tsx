"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Footer() {
  const { isAuthenticated, triggerAuth } = useAuth();
  const router = useRouter();
  const isOnline = isAuthenticated;

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (!isOnline) {
      e.preventDefault();
      triggerAuth();
    }
  };

  return (
    <footer className={`relative border-t overflow-hidden transition-colors duration-500 ${isOnline
      ? 'border-zinc-800/50 bg-black'
      : 'border-red-900/30 bg-black' // Keep bg black but change border
      }`}>
      {/* Subtle glow accent */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500 ${isOnline
        ? 'via-brand-green/30'
        : 'via-red-500/30'
        }`}></div>

      <div className="container mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-500 ${isOnline
                ? 'bg-brand-green/10 border-brand-green/30'
                : 'bg-red-500/10 border-red-500/30'
                }`}>
                <span className={`font-black text-xl transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>CG</span>
              </div>
              <h3 className={`text-2xl font-black tracking-tight transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'}`}>
                CodeGang
              </h3>
            </div>
            <p className={`leading-relaxed max-w-md font-light transition-colors duration-500 ${isOnline ? 'text-zinc-500' : 'text-red-300/50'}`}>
              Building <span className={`font-medium transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-200'}`}>next-generation digital solutions</span> that redefine possibilities.
              Where cutting-edge technology meets creative excellence.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => handleLinkClick(e, '#')}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${isOnline
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-brand-green hover:border-brand-green/30'
                    : 'bg-red-900/10 border-red-900/30 text-red-400 hover:text-red-200 hover:border-red-500/50 hover:bg-red-900/20'
                    }`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>
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
                    className={`transition-colors font-light ${isOnline
                      ? 'text-zinc-500 hover:text-white'
                      : 'text-red-300/50 hover:text-red-200'
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@codegang.dev"
                className={`block transition-colors font-light ${isOnline
                  ? 'text-zinc-500 hover:text-brand-green'
                  : 'text-red-300/50 hover:text-red-300'
                  }`}
              >
                hello@codegang.dev
              </a>
              <p className={`text-sm font-light ${isOnline ? 'text-zinc-600' : 'text-red-900/50'}`}>
                Available for projects
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-500 ${isOnline
          ? 'border-zinc-800/50'
          : 'border-red-900/30'
          }`}>
          <p className={`text-sm font-light ${isOnline ? 'text-zinc-600' : 'text-red-900/50'}`}>
            © {new Date().getFullYear()} CodeGang. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href={isOnline ? "/privacy" : "#"}
              onClick={(e) => handleLinkClick(e, "/privacy")}
              className={`transition-colors font-light ${isOnline
                ? 'text-zinc-600 hover:text-brand-green'
                : 'text-red-300/50 hover:text-red-200'
                }`}
            >
              Privacy Policy
            </Link>
            <Link
              href={isOnline ? "/terms" : "#"}
              onClick={(e) => handleLinkClick(e, "/terms")}
              className={`transition-colors font-light ${isOnline
                ? 'text-zinc-600 hover:text-brand-green'
                : 'text-red-300/50 hover:text-red-200'
                }`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none transition-opacity duration-500 ${isOnline ? 'opacity-[0.02]' : 'opacity-[0.05]'}`}></div>
    </footer>
  );
}
