"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TemplateFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelect: (category: string) => void;
}

import styles from "./projectPage/buttons/GlassButton.module.css";

interface TemplateFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelect: (category: string) => void;
}

export default function TemplateFilter({ categories, selectedCategory, onSelect }: TemplateFilterProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative group max-w-full">
            {/* Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none md:hidden" />

            {/* Scroll Buttons */}
            <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-4 h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 text-slate-600 transition-all hover:scale-110 hover:bg-white opacity-0 group-hover:opacity-100 disabled:opacity-0"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-4 h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 text-slate-600 transition-all hover:scale-110 hover:bg-white opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="h-4 w-4" />
            </button>

            {/* Filter List */}
            <div
                ref={scrollContainerRef}
                className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-3 px-1 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category) => (
                    <div
                        key={category}
                        className={styles.container}
                        style={{ fontSize: '0.875rem' } as React.CSSProperties}
                    >
                        <button
                            onClick={() => onSelect(category)}
                            className={`${styles.button} ${selectedCategory === category ? styles.active : ''}`}
                        >
                            <span className={styles.text}>{category}</span>
                        </button>
                        <div className={styles.shadow}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
