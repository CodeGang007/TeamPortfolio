"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

interface TimelineBranchesProps {
    isOnline: boolean;
}

export default function TimelineBranches({ isOnline }: TimelineBranchesProps) {
    const [paths, setPaths] = useState<string[]>([]);

    // Generate random paths radiating from center-bottom to edges
    useEffect(() => {
        const generatePaths = () => {
            const count = 24; // Increased density for 360 coverage
            const newPaths = [];
            const width = typeof window !== "undefined" ? window.innerWidth : 1200;
            const height = typeof window !== "undefined" ? window.innerHeight : 800;
            const maxRadius = Math.max(width, height) * 1.2; // Ensure it goes off-screen

            const startX = 0;
            const startY = 0;

            for (let i = 0; i < count; i++) {
                // Full 360 degree distribution
                const angle = (Math.PI * 2 * i) / count;

                // Add randomness to angle to avoid perfect radial spokes
                const randomAngle = angle + (Math.random() - 0.5) * 0.5;

                // Calculate end point based on angle
                const endX = Math.cos(randomAngle) * maxRadius;
                const endY = Math.sin(randomAngle) * maxRadius;

                // Control points for bezier curve chaos
                // CP1: Inner chaos
                const cp1X = (Math.random() - 0.5) * 300;
                const cp1Y = (Math.random() - 0.5) * 300;

                // CP2: Outer guiding curve with chaos
                const midRadius = maxRadius * 0.5;
                const cp2X = Math.cos(randomAngle) * midRadius + (Math.random() - 0.5) * 400;
                const cp2Y = Math.sin(randomAngle) * midRadius + (Math.random() - 0.5) * 400;

                const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
                newPaths.push(path);
            }
            setPaths(newPaths);
        };

        generatePaths();
    }, []);

    const color = isOnline ? "#22c55e" : "#ef4444"; // brand-green or red-500

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 overflow-visible w-0 h-0">
            <svg
                width="1"
                height="1"
                className="overflow-visible"
            >
                {paths.map((d, i) => (
                    <motion.path
                        key={i}
                        d={d}
                        fill="none"
                        stroke={color}
                        strokeWidth={isOnline ? 2 : 1 + Math.random() * 2}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{
                            pathLength: [0, 1],
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                        style={{
                            filter: isOnline ? "blur(2px)" : "none",
                            mixBlendMode: "screen"
                        }}
                    />
                ))}
            </svg>

            {/* Central Glow */}
            <motion.div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[60px] opacity-20 ${isOnline ? "bg-brand-green" : "bg-red-500"
                    }`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </div>
    );
}
