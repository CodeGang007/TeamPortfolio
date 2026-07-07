import Link from "next/link";
import { ArrowRight, Mail, Github } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="card-shine noise rounded-3xl border border-white/[0.07] bg-zinc-900/40 px-8 py-16 md:px-16 md:py-20 text-center relative overflow-hidden">
            {/* ambient glow + faint grid inside the card */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(16,185,129,0.10), transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#17171b_1px,transparent_1px),linear-gradient(to_bottom,#17171b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)]"
            />
            <div className="relative">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-brand-green/25 bg-brand-green/[0.07] px-4 py-1.5 text-xs font-medium text-brand-green mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
                </span>
                Available for new projects
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white mb-5">
                Let&apos;s build something <span className="text-gradient-emerald">that ships.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto mb-10">
                If any of our work looks like the kind of thing you need built —
                tell us about your project.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <Link
                  href="/contactus"
                  className="group inline-flex items-center gap-2 bg-brand-green text-zinc-950 hover:bg-brand-green-bright rounded-full px-8 py-4 font-semibold transition-colors shadow-[0_0_32px_rgba(16,185,129,0.25)]"
                >
                  Start a project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-400">
                <a
                  href="mailto:support@codegang.online"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-green" />
                  support@codegang.online
                </a>
                <a
                  href="https://github.com/Devfusion009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-brand-green" />
                  Devfusion009
                </a>
                <span className="text-zinc-500">
                  Founders — Gourav · Subhadip · Sushant · Sunny
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
