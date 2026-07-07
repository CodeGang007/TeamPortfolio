import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { CodeGangLogo } from "../ui/CodeGangLogo";

// Custom X (formerly Twitter) icon
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
    { name: "Careers", href: "/team" },
    { name: "Contact", href: "/contactus" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "License", href: "/license" },
  ],
};

// Server component — static footer, zero client JS.
export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-brand-bg overflow-hidden z-50">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 relative z-10">
        {/* Top Section: CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 border-b border-white/5 pb-16 mb-16">
          <div className="max-w-xl">
            <h3 className="font-display text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
              Ready to <span className="text-brand-green">ship</span> your next product?
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Tell us what you&apos;re building — we&apos;ll tell you exactly how
              we&apos;d build it.
            </p>
          </div>

          <Link
            href="/contactus"
            className="inline-flex items-center gap-2 bg-brand-green text-zinc-950 hover:bg-brand-green-bright rounded-full px-7 py-3.5 font-medium transition-colors shrink-0"
          >
            Start a project
          </Link>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-brand-green/20 bg-brand-green/5 transition-all duration-300 group-hover:border-brand-green/50">
                <CodeGangLogo className="p-1" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">CodeGang</span>
            </Link>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              A software engineering studio shipping production AI, platforms,
              and mobile apps for clients across five geographies.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Github, href: "https://github.com/CodeGang007", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/code-gang", label: "LinkedIn" },
                { Icon: XIcon, href: "https://x.com/CodeGang20", label: "X" },
                { Icon: Mail, href: "mailto:support@codegang.online", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-transparent bg-white/5 text-zinc-400 hover:bg-brand-green/10 hover:text-brand-green hover:border-brand-green/20 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16 lg:pl-16">
            {Object.entries({ Product: footerLinks.product, Company: footerLinks.company, Legal: footerLinks.legal }).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-5">
                <h4 className="text-white font-semibold tracking-wide text-sm uppercase">{heading}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-zinc-500 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-medium">
            &copy; {new Date().getFullYear()} CodeGang. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs">
            support@codegang.online
          </p>
        </div>
      </div>
    </footer>
  );
}
