import Link from "next/link";
import { Shell } from "./primitives";

/**
 * Slim announcement strip for the homepage. Lives above the hero, below
 * the nav. One claim at a time — swap the copy/link here when the news
 * changes rather than building a rotation system nobody will feed.
 */
export default function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-signal-soft">
      <Shell className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-signal">
          <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
          Live
        </span>
        <p className="text-[0.8125rem] text-ink">
          <span className="font-medium">NailHiring is live in the US</span>
          <span className="text-ink-soft">. The AI resume builder we shipped end to end.</span>
        </p>
        <Link
          href="/work/ai-resume"
          className="text-[0.8125rem] font-medium text-signal hover:underline"
        >
          See the build →
        </Link>
      </Shell>
    </div>
  );
}
