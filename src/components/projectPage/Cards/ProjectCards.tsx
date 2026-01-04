"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  isOnline?: boolean;
}

export function ProjectCard({ title, description, category, isOnline = true }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.02 }}
      className={`${styles.cardWrapper} ${!isOnline ? styles.offline : ''}`}
    >
      <div className={styles.card}>
        {/* Image/Logo Area */}
        <div className={styles.imageContainer}>
          {/* Category Badge */}
          <span className={styles.category}>
            {category}
          </span>

          {/* Status Indicator */}
          <div className={styles.statusDot} />

          {/* Project Logo/Initial */}
          <div className={styles.projectLogo}>
            <span className={styles.logoLetter}>
              {title.charAt(0)}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          <h3 className={styles.title}>
            {title}
          </h3>
          <p className={styles.description}>
            {description}
          </p>

          {/* Footer with CTA */}
          <div className={styles.footer}>
            <button className={styles.button}>
              <span>View Project</span>
              <span className={styles.arrow}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;