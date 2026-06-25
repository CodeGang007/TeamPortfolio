"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Github, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CONTACTS = [
  { icon: Mail, label: "Email", value: "support@codegang.online", href: "mailto:support@codegang.online" },
  { icon: Globe, label: "Website", value: "codegang.online", href: "https://www.codegang.online/" },
  { icon: Github, label: "GitHub", value: "Devfusion009", href: "https://github.com/Devfusion009" },
  { icon: Users, label: "Founders", value: "Gourav · Subhadip · Sushant · Sunny", href: undefined as string | undefined },
];

export default function FinalCTA() {
  const { isAuthenticated } = useAuth();
  const isOnline = isAuthenticated;
  const accent = isOnline ? "text-brand-green" : "text-red-500";
  const accentBorder = isOnline ? "hover:border-brand-green/50" : "hover:border-red-500/50";

  return (
    <section className="relative z-10 py-28">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 block ${accent}`}>
            Get in touch
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.95]">
            Let&apos;s build something <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline ? "from-brand-green to-emerald-400" : "from-red-400 to-rose-300"}`}>
              that ships.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto">
            If any of our work looks like the kind of thing you need built — get in touch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACTS.map(({ icon: Icon, label, value, href }, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`h-full rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 transition-colors ${href ? accentBorder : ""}`}
              >
                <Icon className={`w-6 h-6 mb-4 ${accent}`} />
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                  {label}
                </div>
                <div className="text-white font-medium break-words">{value}</div>
              </motion.div>
            );
            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block h-full">
                {inner}
              </a>
            ) : (
              <div key={label} className="h-full">{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
