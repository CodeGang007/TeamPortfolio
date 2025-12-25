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

                    {/* Floating Pill on Image */}
                    <div className={styles.category} style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        marginBottom: 0,
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        {tags[0] || "Project"}
                    </div>
                </div>

                {/* Title */}
                <h3 className={styles.title}>
                    {title}
                </h3>

                {/* Description - Using price as a subtitle since we don't have a long description prop, 
                    or generic text to match the screenshot "A futuristic analytics..." */}
                <p className={styles.description}>
                    A premium template designed for high-performance and scalability.
                    Includes advanced features and modern UI patterns.
                </p>

                {/* Action Button */}
                <div className={glassBtnStyles.container} style={{ width: '100%', marginTop: 'auto', '--global--size': '1rem' } as React.CSSProperties}>
                    <button className={glassBtnStyles.button} style={{ width: '100%', justifyContent: 'center' }}>
                        <span className={glassBtnStyles.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}>
                            View Project <ArrowUpRight size={16} />
                        </span>
                    </button>
                    <div className={glassBtnStyles.shadow}></div>
                </div>
            </div>
        </Link>
    );
}
