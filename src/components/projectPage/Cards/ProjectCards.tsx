"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import styles from "./ProjectCard.module.css";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  link?: string;
  isOnline?: boolean;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ 
  id,
  title, 
  description, 
  category, 
  image, 
  link, 
  isOnline = true,
  isAdmin = false,
  onDelete 
}: ProjectCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!id || !onDelete) return;
    
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      onDelete(id);
    }
  };

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.02 }}
      className={`${styles.cardWrapper} ${!isOnline ? styles.offline : ''} relative group`}
    >
      {/* Admin Delete Button - Shows on Hover */}
      {isAdmin && id && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 z-50 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white shadow-lg backdrop-blur-sm"
          title="Delete project"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      <div className={styles.card}>
        {/* Image/Logo Area */}
        <div className={styles.imageContainer}>
          {/* Category Badge */}
          <span className={styles.category}>
            {category}
          </span>

          {/* Status Indicator */}
          <div className={styles.statusDot} />

          {/* Project Image or Logo/Initial */}
          {image ? (
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={image} 
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ zIndex: 1 }}
              />
            </div>
          ) : (
            <div className={styles.projectLogo}>
              <span className={styles.logoLetter}>
                {title.charAt(0)}
              </span>
            </div>
          )}
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
            <div className={styles.button}>
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
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Wrap in Link to internal detail page if ID exists
  if (id) {
    return (
      <Link 
        href={`/project/${id}`}
        className="block cursor-pointer"
        style={{ textDecoration: 'none' }}
      >
        {cardContent}
      </Link>
    );
  }

  // Fallback: If no ID but has external link (legacy support)
  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block cursor-pointer"
        style={{ textDecoration: 'none' }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default ProjectCard;