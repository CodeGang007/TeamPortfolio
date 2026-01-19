"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Star, Quote, Brain, Code, Palette, Smartphone } from "lucide-react";

// Helper for classNames
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
    isOnline,
}: {
    items: any[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
    isOnline?: boolean;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);

    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={classNames(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={classNames(
                    "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((testimonial) => {
                    // Override colors if offline to match the red theme
                    const categoryColor = isOnline
                        ? testimonial.categoryColor
                        : "text-red-400 border-red-500/30 bg-red-500/10";

                    const chartColor = isOnline
                        ? testimonial.chartColor
                        : "from-red-500/20 to-red-500/5";

                    return (
                        <li
                            key={testimonial.id}
                            className={classNames(
                                "w-[350px] md:w-[450px] max-w-full relative rounded-[1.5rem] flex-shrink-0 px-8 py-8 md:w-[450px] group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]",
                                isOnline ? "hover:shadow-brand-green/10" : "hover:shadow-red-500/10"
                            )}
                        >
                            {/* Glassmorphic Card Background & Border */}
                            <div className={classNames(
                                "absolute inset-0 rounded-[1.5rem] transition-all duration-500",
                                "border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 via-zinc-900/90 to-zinc-950/90 backdrop-blur-xl",
                                isOnline
                                    ? "group-hover:border-brand-green/30 group-hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] group-hover:shadow-brand-green/20"
                                    : "group-hover:border-red-500/30 group-hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] group-hover:shadow-red-500/20"
                            )} />

                            {/* Gradient Glow - Enhanced opacity on hover */}
                            <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-5 blur-[100px] transition-opacity duration-700 group-hover:opacity-25 bg-gradient-to-br ${chartColor}`} />

                            {/* Inner Content */}
                            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                                {/* Category Badge */}
                                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase border w-max transition-transform duration-300 group-hover:scale-105 ${categoryColor}`}>
                                    <testimonial.categoryIcon size={14} />
                                    {testimonial.category}
                                </div>

                                {/* Quote */}
                                <div className="relative">
                                    <Quote className="absolute -top-6 -left-4 h-12 w-12 opacity-[0.05] text-white rotate-180 transition-transform duration-500 group-hover:rotate-12 group-hover:opacity-[0.1]" />
                                    <p className="relative z-10 text-lg sm:text-xl font-medium leading-relaxed tracking-wide text-zinc-100/90 drop-shadow-sm group-hover:text-white transition-colors duration-300">
                                        "{testimonial.story}"
                                    </p>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            fill="currentColor"
                                            className={`transition-colors duration-300 ${i < testimonial.rating
                                                ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.3)]'
                                                : 'text-zinc-800'}`}
                                        />
                                    ))}
                                </div>

                                {/* Client Info */}
                                <div className="flex items-center gap-4 pt-6 mt-auto">
                                    <div className={classNames(
                                        "h-14 w-14 shrink-0 rounded-full overflow-hidden flex items-center justify-center text-xl font-bold shadow-lg ring-2 ring-zinc-800/50 transition-all duration-300",
                                        isOnline
                                            ? "bg-brand-green/10 text-brand-green group-hover:ring-brand-green/30"
                                            : "bg-red-500/10 text-red-500 group-hover:ring-red-500/30"
                                    )}>
                                        <img
                                            src={testimonial.clientImage}
                                            alt={testimonial.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className={classNames(
                                            "text-base font-bold leading-tight text-white transition-colors duration-300",
                                            isOnline ? "group-hover:text-brand-green" : "group-hover:text-red-500"
                                        )}>{testimonial.name}</h4>
                                        <p className="text-xs font-semibold uppercase tracking-wider opacity-60 mt-1 text-zinc-400">{testimonial.designation}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
