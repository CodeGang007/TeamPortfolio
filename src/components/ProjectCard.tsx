"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./ProjectCard.module.css";
import glassBtnStyles from "./projectPage/buttons/GlassButton.module.css";

interface ProjectCardProps {
    id: string;
    title: string;
    tags: string[];
    priceRange: string;
    image?: string;
    author: {
        name: string;
        avatarColor?: string;
    };
}

export default function ProjectCard({ id, title, tags, priceRange, image }: ProjectCardProps) {
    return (
        <Link href={`/project-request/${id}`} className="block h-full group">
            <div className={`${styles.card} transition-all duration-300 border-2 border-transparent bg-zinc-900/50 hover:border-brand-green hover:shadow-brand-green/10`}>
                {/* Image Section */}
                <div className={styles.imageContainer}>
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className={`${styles.image} transition-transform duration-500 group-hover:scale-110`}
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            {title.charAt(0)}
                        </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`${styles.category} backdrop-blur-md bg-black/50 text-white`}>
                            {tags[0] || "Project"}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className={`${styles.title} group-hover:text-white transition-colors`}>
                    {title}
                </h3>

                <p className={styles.description}>
                    A premium template designed for high-performance and scalability.
                </p>

                {/* Price Range */}
                <div className="mt-4 mb-4 text-sm font-semibold text-brand-green">
                    {priceRange}
                </div>

                {/* Action Button */}
                <div className="mt-auto w-full">
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-lg bg-zinc-800 text-white hover:bg-brand-green hover:text-black hover:shadow-brand-green/20">
                        View Project <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
