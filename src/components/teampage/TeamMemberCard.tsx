"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TeamMember } from "../types";
import { StarRating } from "./StarRating";
import { TechBadge } from "./TechBadge";
import { SocialLinks } from "./SocialLinks";
import styles from "./TeamMemberCard.module.css";

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <motion.div
      className={styles.card} // <-- glassy card class
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* Header: Image & Rating */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-white shadow-md">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-full bg-white px-2 py-0.5 shadow-sm text-[10px] font-bold text-teal-600 border border-teal-100">
            {member.role.split(" ")[0]}
          </div>
        </div>
        <StarRating rating={member.rating} />
      </div>

      {/* Info */}
      <div className="relative z-10 mb-4">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-2 mt-1">
          {member.role}
        </p>
        <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
          {member.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="relative z-10 mb-6 flex flex-wrap gap-2">
        {member.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      {/* Footer: Socials & Action */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <SocialLinks links={member.socials} />

        <motion.a
          href={member.projectUrl}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-teal-600 hover:text-white group-hover:shadow-md"
        >
          <span>Projects</span>
          <ArrowUpRight size={16} />
        </motion.a>
      </div>
    </motion.div>
  );
};
