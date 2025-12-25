"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none md:hidden" />

            {/* Scroll Buttons */}
            <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-4 h-8 w-8 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-white transition-all hover:bg-brand-green hover:text-black opacity-0 group-hover:opacity-100 disabled:opacity-0"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-4 h-8 w-8 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-white transition-all hover:bg-brand-green hover:text-black opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="h-4 w-4" />
            </button>

            {/* Filter List */}
            <div
                ref={scrollContainerRef}
                className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-3 px-1 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelect(category)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 border whitespace-nowrap ${selectedCategory === category
                                ? "bg-brand-green text-black border-brand-green shadow-lg shadow-brand-green/20"
                                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
