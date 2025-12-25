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
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* Header: Image & Role Badge */}
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <img
            src={member.imageUrl}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className={styles.roleBadge}>
          {member.role.split(" ")[0]}
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
      <div className={styles.footer}>
        <SocialLinks links={member.socials} />

        <a
          href={member.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectBtn}
        >
          <span>Projects</span>
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  );
};