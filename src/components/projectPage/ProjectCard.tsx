"use client";

import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  tag: string;
};

export function ProjectCard({ title, description, tag }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg transition-all"
    >
      <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-zinc-400">
        {tag}
      </span>

      <h3 className="mt-2 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm text-zinc-400">
        {description}
      </p>
    </motion.div>
  );
}
