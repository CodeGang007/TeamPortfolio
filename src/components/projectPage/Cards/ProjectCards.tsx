"use client";

import React from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
}

export function ProjectCard({ title, description, category }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <span className={styles.category}>{category}</span>
        {/* Placeholder for image - in real app would be an img tag */}
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold text-4xl">
          {title.charAt(0)}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <button className={styles.button}>
            <span>View Project</span>
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;