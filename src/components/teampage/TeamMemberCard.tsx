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
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, isOnline = true }) => {
  return (
    <motion.div
      className={`${styles.card} transition-all duration-300 ${!isOnline && 'border-red-900/40 shadow-[0_0_20px_rgba(220,38,38,0.1)] !bg-black/80'}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* Header: Image & Role Badge */}
      <div className={styles.header}>
        <div className={`${styles.imageWrapper} relative overflow-hidden`}>
          <img
            src={member.imageUrl}
            alt={member.name}
            className={`h-full w-full object-cover transition-all duration-300 ${!isOnline && 'grayscale sepia contrast-125'}`}
          />
          {!isOnline && (
            <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay" />
          )}
        </div>
        <div className={`${styles.roleBadge} transition-colors duration-300 ${!isOnline && '!bg-red-500/10 !text-red-400 !border-red-500/20'}`}>
          {member.role.split(" ")[0]}
        </div>
      </div>

      {/* Body Info */}
      <h3 className={`${styles.name} transition-colors duration-300 ${!isOnline && '!text-red-50'}`}>{member.name}</h3>
      <p className={`${styles.roleTitle} transition-colors duration-300 ${!isOnline && '!text-red-300/70'}`}>{member.role}</p>
      <p className={`${styles.description} transition-colors duration-300 ${!isOnline && '!text-red-300/50'}`}>{member.description}</p>

      {/* Tech Stack */}
      <div className={styles.techStack}>
        {member.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <SocialLinks links={member.socials} />

        <a
          href={member.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.projectBtn} group transition-all duration-300 ${!isOnline && '!bg-red-500/10 !border-red-500/30 !text-red-400 hover:!bg-red-500/20 hover:!border-red-500'}`}
        >
          <span>Projects</span>
          <ArrowUpRight size={14} strokeWidth={2.5} className={`transition-colors ${!isOnline && 'text-red-500'}`} />
        </a>
      </div>
    </motion.div>
  );
};