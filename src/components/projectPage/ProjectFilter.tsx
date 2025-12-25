"use client";

import GlassButton from "./buttons/GlassButton"; // Adjust path as needed

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
    <div className="top-24 z-10 mb-10 flex gap-4 overflow-x-auto pb-4 px-2 pt-2">
      {FILTERS.map((filter) => {
        const isActive = active === filter;

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 border whitespace-nowrap ${isActive
                ? "bg-brand-green text-black border-brand-green shadow-lg shadow-brand-green/20"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
              }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}