"use client";

import { useEffect, useState } from "react";
import { clockCities } from "@/content/site";

// One line of live local times — the regions we actually operate in.
// Renders placeholders on the server; real times tick in after hydration
// so there is never a hydration mismatch. Fixed height, so no layout shift.
export default function WorldClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const raf = requestAnimationFrame(tick); // first paint after hydration
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <div
      className={`flex h-6 items-center gap-x-4 overflow-x-auto whitespace-nowrap font-mono text-xs uppercase tracking-wider text-slate-400 ${className}`}
      aria-label="Local time in the regions we operate in"
    >
      {clockCities.map((c, i) => (
        <span key={c.tz} className="flex shrink-0 items-center gap-4">
          {i > 0 && <span aria-hidden>·</span>}
          <span suppressHydrationWarning>
            <span className="tabular-nums text-slate-600">
              {now
                ? new Intl.DateTimeFormat("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZone: c.tz,
                  }).format(now)
                : "--:--:--"}
            </span>{" "}
            {c.city}
          </span>
        </span>
      ))}
    </div>
  );
}
