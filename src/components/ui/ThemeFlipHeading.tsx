"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export const ThemeFlipHeading = ({
    prefix,
    words,
    duration = 3000,
}: {
    prefix: string;
    words: string[];
    duration?: number;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [words.length, duration]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-24 text-center">
            {/* Static Prefix - Refined Typography */}
            <motion.span
                layoutId="headingPrefix"
                className={`text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl transition-colors duration-500 ${isOnline ? "text-white" : "text-red-50"
                    }`}
            >
                {prefix}
            </motion.span>

            {/* Flipping Container - Premium Glass */}
            <div
                className={`relative flex items-center justify-center overflow-hidden rounded-2xl border px-8 py-2 md:py-3 shadow-2xl backdrop-blur-2xl transition-all duration-500
        ${isOnline
                        ? "bg-zinc-900/30 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                        : "bg-red-950/30 border-red-500/20 shadow-[0_8px_32px_rgba(50,0,0,0.3)]"
                    }`}
            >
                {/* Refined Ambient Glow */}
                <div
                    className={`absolute inset-0 opacity-10 blur-2xl transition-colors duration-500 ${isOnline ? "bg-brand-green" : "bg-red-600"
                        }`}
                />

                {/* Subtle inner highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={currentIndex}
                        initial={{ y: 50, filter: "blur(8px)", opacity: 0 }}
                        animate={{
                            y: 0,
                            filter: "blur(0px)",
                            opacity: 1,
                        }}
                        exit={{ y: -50, filter: "blur(8px)", opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 180, // Softer spring
                            damping: 25,    // More elegance
                            mass: 0.8
                        }}
                        className={`relative z-10 inline-block whitespace-nowrap text-4xl md:text-6xl font-bold tracking-tight ${isOnline
                                ? "text-transparent bg-clip-text bg-gradient-to-b from-brand-green to-emerald-300 drop-shadow-[0_0_10px_rgba(0,255,65,0.2)]"
                                : "text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-orange-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                            }`}
                    >
                        {words[currentIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};
