"use client";

const FILTERS = [
  "All",
  "Web",
  "App",
  "Game",
  "UI/UX",
  "Consulting",
  "ML / AI",
];

export function ProjectFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="top-24 z-10 mb-10 flex gap-2 overflow-x-auto pb-2">
      {FILTERS.map((filter) => {
        const isActive = active === filter;

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white/60 text-slate-700 hover:bg-white hover:text-slate-900"
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
