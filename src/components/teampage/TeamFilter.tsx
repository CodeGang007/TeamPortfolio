"use client";

const FILTERS = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "UI/UX",
  "ML / AI",
  "Management",
];

export function TeamFilter({
  active,
  onChange,
  isOnline = true,
}: {
  active: string;
  onChange: (v: string) => void;
  isOnline?: boolean;
}) {
  return (
    <div className="top-24 z-10 mb-10 flex gap-4 overflow-x-auto pb-4 px-2 pt-2">
      {FILTERS.map((filter) => {
        const isActive = active === filter;

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${isActive
              ? isOnline
                ? "bg-brand-green text-black border-brand-green shadow-lg shadow-brand-green/20"
                : "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20"
              : isOnline
                ? "bg-black/40 backdrop-blur-md text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
                : "bg-red-950/20 backdrop-blur-md text-red-300 border-red-900/30 hover:border-red-500/50 hover:text-red-200"
              }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
