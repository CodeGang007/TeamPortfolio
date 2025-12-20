"use client";

import GlassButton from "@/components/projectPage/buttons/GlassButton"; // same button as project filter

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
            style={{ fontSize: "0.85rem" }}
          >
            {filter}
          </GlassButton>
        );
      })}
    </div>
  );
}
