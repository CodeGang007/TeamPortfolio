"use client";

import { motion } from "framer-motion";

export function ProjectFilter({
  active,
  onChange,
  isOnline = true,
  categories = [],
}: {
  active: string;
  onChange: (v: string) => void;
  isOnline?: boolean;
  categories?: string[];
}) {
  // Always show "All" first, then dynamic categories
  const filters = ["All", ...categories];

  return (
    <div className="relative z-10 mb-16 w-full px-4">
      <div className="mx-auto max-w-5xl">
        {/* Control Panel Container */}
        <div className={`relative flex flex-wrap justify-center gap-3 p-6 rounded-3xl backdrop-blur-2xl border transition-all duration-500 ${isOnline
            ? "bg-zinc-900/40 border-brand-green/10 shadow-[0_0_40px_-10px_rgba(0,255,65,0.05)]"
            : "bg-red-950/40 border-red-500/10 shadow-[0_0_40px_-10px_rgba(220,38,38,0.05)]"
          }`}>

          {filters.map((filter) => {
            const isActive = active === filter;

            return (
              <motion.button
                key={filter}
                onClick={() => onChange(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2 ${isActive
                    ? isOnline
                      ? "bg-brand-green/20 border-brand-green/50 text-white shadow-[0_0_20px_rgba(0,255,65,0.25)]"
                      : "bg-red-500/20 border-red-500/50 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                    : "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/20"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectDot"
                    className={`block h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${isOnline ? "bg-brand-green" : "bg-red-500"
                      }`}
                  />
                )}

                {/* Text is z-20 to sit above glow */}
                <span className="relative z-20 tracking-wide drop-shadow-sm">{filter}</span>

                {/* Background Glow - Reduced opacity and slow fade-in */}
                {isActive && (
                  <motion.div
                    layoutId="activeProjectGlow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 rounded-xl blur-md z-10 ${isOnline ? "bg-brand-green" : "bg-red-500"
                      }`}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}