"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TeamFilter } from "./TeamFilter";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamMember } from "./types";

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    description:
      "Passionate about building scalable and beautiful web interfaces.",
    rating: 4.8,
    imageUrl: "/team/john.jpg",
    techStack: ["React", "TypeScript", "Tailwind"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
    },
    projectUrl: "/projects",
  },
  {
    name: "Aarav Sharma",
    role: "Backend Developer",
    description:
      "Designs secure and high-performance backend systems.",
    rating: 4.6,
    imageUrl: "/team/aarav.jpg",
    techStack: ["Node.js", "Express", "MongoDB"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    projectUrl: "/projects",
  },
  {
    name: "Meera Patel",
    role: "UI/UX Designer",
    description:
      "Creates intuitive designs focused on user psychology.",
    rating: 4.9,
    imageUrl: "/team/meera.jpg",
    techStack: ["Figma", "Framer", "Adobe XD"],
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
    projectUrl: "/projects",
  },
  {
    name: "Rohit Verma",
    role: "ML / AI Engineer",
    description:
      "Builds intelligent systems using machine learning models.",
    rating: 4.7,
    imageUrl: "/team/rohit.jpg",
    techStack: ["Python", "TensorFlow", "PyTorch"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    projectUrl: "/projects",
  },
  {
    name: "Sara Khan",
    role: "Full Stack Developer",
    description:
      "Combines frontend finesse with backend logic.",
    rating: 4.8,
    imageUrl: "/team/sara.jpg",
    techStack: ["Next.js", "PostgreSQL", "Prisma"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
    },
    projectUrl: "/projects",
  },
  {
    name: "Dev Malhotra",
    role: "DevOps Engineer",
    description:
      "Automates infrastructure and deployment pipelines.",
    rating: 4.5,
    imageUrl: "/team/dev.jpg",
    techStack: ["Docker", "AWS", "CI/CD"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    projectUrl: "/projects",
  },
];

export function TeamSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMembers =
    activeCategory === "All"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((member) =>
          member.role.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <TeamFilter
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredMembers.length === 0 && (
        <div className="py-20 text-center text-slate-400">
          <p>No team members found in this category.</p>
        </div>
      )}
    </div>
  );
}
