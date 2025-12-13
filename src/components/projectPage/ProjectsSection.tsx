"use client";

import { useState } from "react";
import { ProjectFilter } from "./ProjectFilter";
import { ProjectCard } from "./ProjectCardV2";

const PROJECTS = [
  {
    title: "Demand Planner Platform",
    description: "Enterprise demand forecasting and planning system.",
    category: "ML / AI",
  },
  {
    title: "Food Ordering App",
    description: "Full-stack food ordering platform with Supabase.",
    category: "App",
  },
  {
    title: "Marketing Analytics Dashboard",
    description: "MMM and ROI analytics for global brands.",
    category: "Consulting",
  },
  {
    title: "Portfolio Website",
    description: "Modern developer portfolio with animations.",
    category: "Web",
  },
  {
    title: "Game Engine Prototype",
    description: "2D game engine with physics simulation.",
    category: "Game",
  },
  {
    title: "Design System",
    description: "Reusable UI components and UX guidelines.",
    category: "UI/UX",
  },
];

export function ProjectsSection() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <section>
      <ProjectFilter active={active} onChange={setActive} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((p, i) => (
          <ProjectCard
            key={i}
            title={p.title}
            description={p.description}
            category={p.category}
          />
        ))}
      </div>
    </section>
  );
}
