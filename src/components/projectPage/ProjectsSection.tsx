"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectFilter } from "./ProjectFilter"; 
import ProjectCard from "@/components/projectPage/Cards/ProjectCards"; 

const PROJECTS = [
  {
    id: 1,
    title: "Neon Dashboard",
    description: "A futuristic analytics dashboard featuring real-time data visualization and a cyberpunk aesthetic.",
    category: "Web",
  },
  {
    id: 2,
    title: "Zen Focus",
    description: "A meditation application helping users find clarity through generative ambient soundscapes.",
    category: "App",
  },
  {
    id: 3,
    title: "Neural Nexus",
    description: "An open-source machine learning pipeline that simplifies complex model training.",
    category: "ML / AI",
  },
  {
    id: 4,
    title: "Eco Tracker",
    description: "IoT based system for tracking carbon footprints in large corporate office spaces.",
    category: "UI/UX",
  },
  {
    id: 5,
    title: "Crypto Vault",
    description: "Secure, non-custodial wallet with biometric authentication and social recovery.",
    category: "Web",
  },
  {
    id: 6,
    title: "Vocalize",
    description: "AI text-to-speech engine optimized for natural conversation flow.",
    category: "ML / AI",
  },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <ProjectFilter active={activeCategory} onChange={setActiveCategory} />

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                category={project.category}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center text-white/50">
          <p>No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}