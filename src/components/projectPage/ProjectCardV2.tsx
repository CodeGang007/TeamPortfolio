"use client";

import { motion } from "framer-motion";

export function ProjectCard({
  title,
  description,
  category,
}: {
  title: string;
  description: string;
  category: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-teal-200/40 via-transparent to-transparent" />

      {/* Category */}
      <span className="relative z-10 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
        {category}
      </span>

      {/* Title */}
      <h3 className="relative z-10 mt-4 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      {/* CTA */}
      <div className="relative z-10 mt-6 text-sm font-medium text-teal-700 opacity-0 transition group-hover:opacity-100">
        View project →
      </div>
    </motion.div>
  );
}
