import Link from "next/link";

/**
 * Slim announcement strip for the homepage. Rendered inside the fixed
 * SiteHeader (above the utility strip) so it isn't buried under the
 * header, and retracts with it on scroll. One claim at a time: swap the
 * copy/link here when the news changes rather than building a rotation
 * system nobody will feed.
 *
 * Height is fixed at h-9; HeroScene's top padding accounts for it.
 */
export default function AnnouncementBar({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className={`overflow-hidden bg-signal-soft transition-all duration-300 ${
        hidden ? "max-h-0 opacity-0" : "max-h-9 opacity-100"
      }`}
    >
      <div className="mx-auto flex h-9 max-w-shell items-center justify-center gap-3 whitespace-nowrap px-6 text-center lg:px-10 xl:px-16">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-signal">
          <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
          Live
        </span>
        <p className="truncate text-[0.8125rem] text-ink">
          <span className="font-medium">NailHiring is live in the US</span>
          <span className="hidden text-ink-soft md:inline">. The AI resume builder we shipped end to end.</span>
        </p>
        <Link
          href="/work/ai-resume"
          className="shrink-0 text-[0.8125rem] font-medium text-signal hover:underline"
        >
          See the build →
        </Link>
      </div>
    </div>
  );
}
