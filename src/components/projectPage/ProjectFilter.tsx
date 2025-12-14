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
          <GlassButton
            key={filter}
            onClick={() => onChange(filter)}
            isActive={isActive}
            // We adjust the font size here to scale the button down 
            // to fit a filter list better than the huge default size
            style={{ fontSize: "0.85rem" }} 
          >
            {filter}
          </GlassButton>
        );
      })}
    </div>
  );
}