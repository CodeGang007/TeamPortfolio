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
        <Link href={`/project-request/${id}`} className="block h-full">
            <div className={styles.card}>
                {/* Image Section */}
                <div className={styles.imageContainer}>
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className={styles.image}
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            {title.charAt(0)}
                        </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={styles.category}>
                            {tags[0] || "Project"}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className={styles.title}>
                    {title}
                </h3>

                <p className={styles.description}>
                    A premium template designed for high-performance and scalability.
                </p>

                {/* Action Button */}
                <div className="mt-auto w-full">
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-white font-bold text-sm transition-all hover:bg-brand-green hover:text-black">
                        View Project <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
