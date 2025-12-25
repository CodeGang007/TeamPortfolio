"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./ProjectCard.module.css";
import glassBtnStyles from "./projectPage/buttons/GlassButton.module.css";
import { useAuth } from "@/contexts/AuthContext";

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
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <Link href={`/project-request/${id}`} className="block h-full group">
            <div className={`${styles.card} transition-all duration-300 border-2 ${isOnline ? 'border-transparent bg-zinc-900/50 hover:border-brand-green hover:shadow-brand-green/10' : 'border-red-900/30 bg-red-950/10 hover:border-red-500 hover:shadow-red-500/10'}`}>
                {/* Image Section */}
                <div className={styles.imageContainer}>
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className={`${styles.image} transition-transform duration-500 group-hover:scale-110 ${!isOnline && 'grayscale sepia hue-rotate-[-50deg]'}`}
                        />
                    ) : (
                        <div className={`${styles.imagePlaceholder} ${!isOnline && 'bg-red-900/20 text-red-500'}`}>
                            {title.charAt(0)}
                        </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`${styles.category} backdrop-blur-md ${isOnline ? 'bg-black/50 text-white' : 'bg-red-950/80 text-red-200 border border-red-500/30'}`}>
                            {tags[0] || "Project"}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className={`${styles.title} group-hover:text-white transition-colors ${!isOnline && 'text-red-100 group-hover:text-red-50'}`}>
                    {title}
                </h3>

                <p className={`${styles.description} ${!isOnline && 'text-red-300/60'}`}>
                    A premium template designed for high-performance and scalability.
                </p>

                {/* Price Range */}
                <div className={`mt-4 mb-4 text-sm font-semibold ${isOnline ? 'text-brand-green' : 'text-red-400'}`}>
                    {priceRange}
                </div>

                {/* Action Button */}
                <div className="mt-auto w-full">
                    <button className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${isOnline ? 'bg-zinc-800 text-white hover:bg-brand-green hover:text-black hover:shadow-brand-green/20' : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white hover:shadow-red-500/20'}`}>
                        View Project <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
