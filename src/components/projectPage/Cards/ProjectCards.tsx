"use client";

import React from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  isOnline?: boolean;
}

export function ProjectCard({ title, description, category, isOnline = true }: ProjectCardProps) {
  return (
    <div className={`${styles.card} transition-all duration-300 ${!isOnline && 'border-red-900/40 shadow-[0_0_20px_rgba(220,38,38,0.1)]'}`}>
      <div className={`${styles.imageContainer} relative overflow-hidden`}>
        <span className={`${styles.category} ${!isOnline && '!bg-red-500/10 !text-red-400 !border-red-500/20'}`}>
          {category}
        </span>
        {/* Placeholder for image - in real app would be an img tag */}
        <div className={`w-full h-full flex items-center justify-center font-bold text-4xl transition-colors duration-300 ${isOnline
          ? 'bg-zinc-900 text-zinc-700'
          : 'bg-red-950/20 text-red-900/40 grayscale'
          }`}>
          {title.charAt(0)}

          {/* Offline Scanline/Overlay */}
          {!isOnline && (
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />
          )}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isOnline ? 'text-white' : 'text-red-100'}`}>
          {title}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>
          {description}
        </p>

        <div className={styles.footer}>
          <button className={`${styles.button} group transition-all duration-300 ${!isOnline && '!border-red-500/30 !text-red-400 hover:!bg-red-500/10 hover:!border-red-500/50'}`}>
            <span className="group-hover:translate-x-0.5 transition-transform">
              View Project
            </span>
            <span className={`${styles.arrow} ${!isOnline && 'text-red-500'}`}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;