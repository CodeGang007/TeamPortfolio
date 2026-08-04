"use client";

import { useInView, useSequence } from "../useInView";

/**
 * ARM Tech ERP — five deep-learning modules feeding one pipeline.
 * The chart draws demand actuals, then extends them into an LSTM forecast
 * with a confidence band. The shape is illustrative of the module, not a
 * claim about a client's volumes — the axis is deliberately unlabelled.
 */

const MODULES = [
  { name: "Demand forecast", kind: "LSTM" },
  { name: "Anomaly detection", kind: "IsolationForest" },
  { name: "Invoice OCR", kind: "CRNN" },
  { name: "Credit risk", kind: "GBM" },
  { name: "Route cost", kind: "Regression" },
];

// 12 actual points then 6 forecast points, as percentages of the plot box.
const ACTUAL = [58, 52, 61, 49, 66, 57, 71, 63, 78, 69, 84, 76];
const FORECAST = [82, 74, 89, 80, 95, 86];

const W = 320;
const H = 120;
const STEP = W / (ACTUAL.length + FORECAST.length - 1);
const y = (v: number) => H - (v / 100) * H;

const actualPath = ACTUAL.map(
  (v, i) => `${i === 0 ? "M" : "L"}${(i * STEP).toFixed(1)},${y(v).toFixed(1)}`,
).join(" ");

const forecastStart = (ACTUAL.length - 1) * STEP;
const forecastPath = [ACTUAL[ACTUAL.length - 1], ...FORECAST]
  .map(
    (v, i) =>
      `${i === 0 ? "M" : "L"}${(forecastStart + i * STEP).toFixed(1)},${y(v).toFixed(1)}`,
  )
  .join(" ");

// Confidence band widens with distance — the honest shape for a forecast.
const bandTop = [ACTUAL[ACTUAL.length - 1], ...FORECAST].map(
  (v, i) => `${(forecastStart + i * STEP).toFixed(1)},${y(v + i * 2.4).toFixed(1)}`,
);
const bandBottom = [ACTUAL[ACTUAL.length - 1], ...FORECAST]
  .map(
    (v, i) =>
      `${(forecastStart + i * STEP).toFixed(1)},${y(v - i * 2.4).toFixed(1)}`,
  )
  .reverse();
const bandPath = `M${bandTop.join(" L")} L${bandBottom.join(" L")} Z`;

export default function Forecast() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const step = useSequence(inView, MODULES.length + 1, 340);

  return (
    <div ref={ref} className="bg-paper p-4 sm:p-5">
      <header className="mb-3 flex items-center justify-between">
        <p className="text-[0.8rem] font-medium text-ink">
          Demand forecast · next 6 periods
        </p>
        <span className="rounded-full border border-line bg-bone px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-wider text-mute">
          LSTM
        </span>
      </header>

      {/* ── Chart ────────────────────────────────────────────────── */}
      <div className="rounded-lg border border-line bg-bone/60 p-3">
        <svg
          viewBox={`0 0 ${W} ${H + 8}`}
          className="h-[130px] w-full"
          role="img"
          aria-label="Demand actuals extended by an LSTM forecast with a widening confidence band."
        >
          {/* baseline grid */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={W}
              y1={H * f}
              y2={H * f}
              stroke="#E2DFD8"
              strokeWidth="1"
            />
          ))}

          {/* confidence band */}
          <path
            d={bandPath}
            fill="#347D26"
            opacity={inView ? 0.1 : 0}
            className="transition-opacity duration-1000"
          />

          {/* actuals */}
          <path
            d={actualPath}
            fill="none"
            stroke="#1C1B19"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* forecast */}
          <path
            d={forecastPath}
            fill="none"
            stroke="#347D26"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            strokeLinecap="round"
            pathLength={1}
            style={{
              strokeDashoffset: inView ? 0 : 1,
              opacity: inView ? 1 : 0,
              transition:
                "opacity 0.6s ease 1.2s, stroke-dashoffset 1.2s ease 1.2s",
            }}
          />

          {/* the split marker */}
          <line
            x1={forecastStart}
            x2={forecastStart}
            y1="0"
            y2={H}
            stroke="#D6D2C9"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <circle
            cx={forecastStart}
            cy={y(ACTUAL[ACTUAL.length - 1])}
            r="3"
            fill="#FBFAF8"
            stroke="#1C1B19"
            strokeWidth="1.75"
          />
        </svg>

        <div className="mt-1 flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[0.55rem] text-mute">
            <span aria-hidden className="h-0.5 w-4 rounded bg-ink" /> actual
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[0.55rem] text-mute">
            <span
              aria-hidden
              className="h-0.5 w-4 rounded bg-signal"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,#347D26 0 3px,transparent 3px 6px)",
              }}
            />
            forecast
          </span>
        </div>
      </div>

      {/* ── Module rail ──────────────────────────────────────────── */}
      <ul className="mt-3 space-y-1">
        {MODULES.map((m, i) => (
          <li
            key={m.name}
            className={`flex items-center gap-2 rounded-md border border-line bg-bone/70 px-2.5 py-1.5 transition-all duration-400 ${
              step >= i + 1
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-0"
            }`}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
            />
            <span className="text-[0.72rem] text-ink">{m.name}</span>
            <span className="ml-auto font-mono text-[0.58rem] text-mute">
              {m.kind}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
