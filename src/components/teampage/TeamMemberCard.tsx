"use client";



import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TeamMember } from "./types";
import { StarRating } from "./StarRating";
import { TechBadge } from "./TechBadge";
import { SocialLinks } from "./SocialLinks";
import GlassButton from "./GlassButton"; // Import your component
import styles from "./TeamMemberCard.module.css";

interface TeamMemberCardProps {
  member: TeamMember;
  isOnline?: boolean;
  onClick?: () => void;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, isOnline = true, onClick }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`${styles.card} ${!isOnline ? styles.offline : ''} cursor-pointer group ${!isOnline && 'grayscale-[0.3]'}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Header: Image & Role Badge */}
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <img
            src={member.imageUrl}
            alt={member.name}
            className={`h-full w-full object-cover transition-all duration-500 ${!isOnline && 'grayscale contrast-125 saturate-50'}`}
          />
          {!isOnline && (
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
          )}
        </div>
        <div className={styles.roleBadge}>
          {member.role}
        </div>
      </div>

      {/* Body Info */}
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.roleTitle}>{member.role}</p>
      <p className={styles.description}>{member.description}</p>

      {/* Tech Stack */}
      <div className={styles.techStack}>
        {member.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
        <SocialLinks links={member.socials} />

        <button
          onClick={onClick}
          className={styles.projectBtn}
        >
          <span>Projects</span>
          <ArrowUpRight size={16} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};