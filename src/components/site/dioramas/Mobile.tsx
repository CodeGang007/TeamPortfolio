"use client";

import { useInView, useSequence } from "../useInView";
import { stats } from "@/content/site";

/**
 * eMedici — medical-education Android app.
 * A single MCQ card resolving to its answer, inside a phone frame.
 *
 * Truth rule: install count and rating are eMedici's Play Store figures and
 * are labelled as such. They are never presented as a CodeGang-wide stat.
 */

const OPTIONS = [
  { text: "Acute pericarditis", correct: true },
  { text: "STEMI, anterior", correct: false },
  { text: "Benign early repolarisation", correct: false },
  { text: "Pulmonary embolism", correct: false },
];

export default function Mobile() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const step = useSequence(inView, 6, 460);

  return (
    <div ref={ref} className="flex items-center justify-center bg-bone-alt/50 p-5">
      {/* ── Phone ────────────────────────────────────────────────── */}
      <div className="w-full max-w-[248px] overflow-hidden rounded-[22px] border-[6px] border-ink bg-paper shadow-frame">
        {/* status bar */}
        <div className="flex items-center justify-between bg-ink px-3.5 pb-1.5 pt-1 text-[0.5rem] text-bone/70">
          <span className="font-mono">9:41</span>
          <span className="flex gap-1">
            <span aria-hidden>▮▮▮</span>
            <span aria-hidden>􀛨</span>
          </span>
        </div>

        <div className="px-3.5 py-3">
          <div className="flex items-center justify-between">
            <span className="mono-label text-[0.5rem]">Cardiology · Q7</span>
            <span className="font-mono text-[0.55rem] text-mute">7 / 20</span>
          </div>

          {/* progress */}
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-signal transition-all duration-1000"
              style={{ width: inView ? "35%" : "0%" }}
            />
          </div>

          <p className="mt-3 text-[0.72rem] font-medium leading-snug text-ink">
            A 34-year-old presents with sharp pleuritic chest pain relieved by
            leaning forward. ECG shows diffuse ST elevation with PR depression.
          </p>

          <ul className="mt-3 space-y-1.5">
            {OPTIONS.map((o, i) => {
              const revealed = step >= 5;
              const shown = step >= i + 1;
              return (
                <li
                  key={o.text}
                  className={`rounded-md border px-2.5 py-1.5 text-[0.66rem] leading-snug transition-all duration-400 ${
                    revealed && o.correct
                      ? "border-signal bg-signal-soft font-medium text-ink"
                      : "border-line bg-bone text-ink-soft"
                  } ${shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                >
                  <span className="mr-1.5 font-mono text-mute">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {o.text}
                  {revealed && o.correct ? (
                    <span aria-hidden className="ml-1.5 text-signal">
                      ✓
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <p
            className={`mt-2.5 border-t border-line pt-2 text-[0.62rem] leading-snug text-mute transition-opacity duration-500 ${
              step >= 6 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="font-medium text-ink">Why:</span> PR depression
            with diffuse ST elevation distinguishes pericarditis from a
            territorial infarct.
          </p>
        </div>

        {/* Play Store strip — explicitly attributed */}
        <div className="flex items-center justify-between border-t border-line bg-bone-alt/70 px-3.5 py-2">
          <span className="font-mono text-[0.55rem] text-mute">
            eMedici · Play Store
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.58rem] text-ink">
            <span>{stats.emediciInstalls} installs</span>
            <span aria-hidden className="text-line-strong">
              ·
            </span>
            <span>{stats.emediciRating}★</span>
          </span>
        </div>
      </div>
    </div>
  );
}
