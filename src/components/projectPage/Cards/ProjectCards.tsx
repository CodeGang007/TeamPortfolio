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
      {/* Top Section */}
      <div>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Bottom Section */}
      <div>
        <hr className={styles.divider} />
        <button className={styles.button}>
          <span>View Project</span>
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;