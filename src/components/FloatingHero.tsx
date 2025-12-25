"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { ArrowRight, Github } from "lucide-react";

export default function FloatingHero({ onSystemStateChange }: { onSystemStateChange?: (isOnline: boolean) => void }) {
    const [isOnline, setIsOnline] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [activationPoint, setActivationPoint] = useState({ x: 50, y: 50 });
    const [showActivation, setShowActivation] = useState(false);

    const handleInteraction = (e: React.MouseEvent) => {
        if (!hasInteracted) {
            setHasInteracted(true);

            // Get mouse position relative to viewport
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setActivationPoint({ x, y });
            setShowActivation(true);

            // Flicker then go online
            setTimeout(() => {
                setIsOnline(true);
                onSystemStateChange?.(true);
            }, 800);

            // Hide activation ripple
            setTimeout(() => {
                setShowActivation(false);
            }, 2000);
        }
    };

    return (
        <section
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
            onClick={handleInteraction}
            onMouseMove={handleInteraction}
        >
            {/* Activation Ripple Effect - Spreads from cursor */}
            {showActivation && (
                <motion.div
                    className="absolute pointer-events-none z-30"
                    style={{
                        left: `${activationPoint.x}%`,
                        top: `${activationPoint.y}%`,
                    }}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 15, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div className="w-40 h-40 rounded-full bg-brand-green/30 blur-3xl"></div>
                </motion.div>
            )}
            {/* Single Clean 3D Object - Right Edge Only - Transitions color with state */}
            <motion.div
                className="absolute top-[20%] right-[-18%] w-[600px] h-[600px] opacity-40 pointer-events-none z-0 transition-all duration-1000"
                style={{
                    filter: isOnline
                        ? 'hue-rotate(0deg) brightness(1)'
                        : 'hue-rotate(290deg) brightness(0.8) saturate(1.5)',
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, -10, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
                <img src="/3d_blob.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
            </motion.div>

            {/* Hero Content with Interactive State */}
            <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center">
                {/* Status Badge - Changes from OFFLINE (red) to ONLINE (green) */}
                <motion.div
                    className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full backdrop-blur-sm transition-all duration-300 ${isOnline
                        ? 'bg-zinc-950/90 border border-brand-green/30 shadow-[0_0_20px_rgba(34,197,94,0.08)]'
                        : 'bg-zinc-950/90 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.08)]'
                        }`}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: hasInteracted ? [1, 0.3, 0, 1] : 1,
                    }}
                    transition={{
                        opacity: { duration: 0.8 },
                        delay: hasInteracted ? 0 : 1.5
                    }}
                >
                    <span className="relative flex h-2 w-2">
                        <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-brand-green' : 'bg-red-500'
                                }`}
                        />
                        <span
                            className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-brand-green' : 'bg-red-500'
                                }`}
                        />
                    </span>
                    <span
                        className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isOnline ? 'text-brand-green' : 'text-red-500'
                            }`}
                    >
                        {isOnline ? 'System Online' : 'System Offline'}
                    </span>
                </motion.div>

                {/* Brand Introduction - Flickers on state change */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: hasInteracted
                            ? [1, 0.2, 1, 0.4, 1]
                            : [0, 1, 0.3, 1, 0.5, 1, 1],
                        x: hasInteracted
                            ? [0, -6, 6, -3, 0]
                            : [0, -4, 4, -2, 2, 0, 0]
                    }}
                    transition={{
                        duration: hasInteracted ? 0.8 : 1.2,
                        times: hasInteracted
                            ? [0, 0.2, 0.4, 0.7, 1]
                            : [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
                        delay: hasInteracted ? 0 : 0.2
                    }}
                >
                    <p className="text-sm md:text-base text-zinc-600 tracking-[0.3em] uppercase font-bold">
                        CodeGang Presents You
                    </p>
                </motion.div>

                {/* Main Heading - Changes color based on state */}
                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 relative"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: hasInteracted
                            ? [1, 0.3, 0, 1, 0.5, 1]
                            : [0, 1, 0.4, 1, 0.6, 1, 1, 1],
                        x: hasInteracted
                            ? [0, -10, 10, -5, 5, 0]
                            : [0, -8, 8, -4, 4, -2, 0, 0],
                        filter: hasInteracted
                            ? [
                                "blur(0px)",
                                "blur(5px)",
                                "blur(8px)",
                                "blur(3px)",
                                "blur(0px)",
                                "blur(0px)"
                            ]
                            : [
                                "blur(0px)",
                                "blur(4px)",
                                "blur(0px)",
                                "blur(3px)",
                                "blur(0px)",
                                "blur(2px)",
                                "blur(0px)",
                                "blur(0px)"
                            ]
                    }}
                    transition={{
                        duration: hasInteracted ? 0.9 : 1.5,
                        times: hasInteracted
                            ? [0, 0.15, 0.3, 0.5, 0.7, 1]
                            : [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
                        delay: hasInteracted ? 0 : 0.4
                    }}
                >
                    <span className={`relative z-10 block mb-2 transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'
                        }`}>
                        THE FUTURE OF
                    </span>
                    <span className={`relative z-10 block italic text-transparent bg-clip-text transition-all duration-500 ${isOnline
                        ? 'bg-gradient-to-r from-brand-green via-green-400 to-emerald-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]'
                        : 'bg-gradient-to-r from-red-500 via-red-400 to-orange-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                        }`}>
                        DIGITAL INNOVATION
                    </span>

                    {/* Glitch overlay bars - color changes with state */}
                    <motion.div
                        className="absolute inset-0 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: hasInteracted
                                ? [0, 0.9, 0, 0.7, 0]
                                : [0, 0.8, 0, 0.6, 0, 0.4, 0]
                        }}
                        transition={{
                            duration: hasInteracted ? 0.9 : 1.5,
                            times: hasInteracted
                                ? [0, 0.2, 0.4, 0.7, 1]
                                : [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
                            delay: hasInteracted ? 0 : 0.4
                        }}
                    >
                        <div className={`absolute top-[20%] left-0 right-0 h-0.5 ${isOnline ? 'bg-brand-green/60' : 'bg-red-500/60'
                            }`} />
                        <div className={`absolute top-[40%] left-0 right-0 h-px ${isOnline ? 'bg-brand-green/40' : 'bg-red-500/40'
                            }`} />
                        <div className={`absolute top-[60%] left-0 right-0 h-0.5 ${isOnline ? 'bg-brand-green/60' : 'bg-red-500/60'
                            }`} />
                        <div className={`absolute top-[80%] left-0 right-0 h-px ${isOnline ? 'bg-brand-green/40' : 'bg-red-500/40'
                            }`} />
                    </motion.div>
                </motion.h1>

                {/* Description - Subtle color change */}
                <motion.p
                    className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light transition-colors duration-500 ${isOnline ? 'text-zinc-500' : 'text-zinc-600'
                        }`}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: hasInteracted
                            ? [1, 0.5, 1]
                            : [0, 1, 0.7, 1, 1],
                        x: hasInteracted
                            ? [0, -4, 4, 0]
                            : [0, -3, 3, 0, 0]
                    }}
                    transition={{
                        duration: hasInteracted ? 0.7 : 1,
                        times: hasInteracted
                            ? [0, 0.3, 1]
                            : [0, 0.2, 0.5, 0.8, 1],
                        delay: hasInteracted ? 0.3 : 1
                    }}
                >
                    Building <span className={`font-medium transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-200'
                        }`}>next-generation solutions</span> that redefine possibilities.
                    Where <span className={`font-semibold transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-400'
                        }`}>cutting-edge technology</span> meets creative excellence.
                </motion.p>

                {/* Action Buttons - Appear after going online */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: isOnline ? 1 : 0.3,
                        y: isOnline ? 0 : 10,
                    }}
                    transition={{ delay: isOnline ? 1.4 : 1.8, duration: 0.6 }}
                >
                    <Button
                        size="lg"
                        disabled={!isOnline}
                        className={`h-16 px-12 font-black text-xl rounded-full transition-all duration-500 border-2 ${isOnline
                            ? 'bg-brand-green text-black border-green-400 shadow-[0_10px_40px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_60px_rgba(34,197,94,0.5)] hover:-translate-y-1'
                            : 'bg-red-500/20 text-red-300 border-red-500/30 shadow-[0_10px_40px_rgba(239,68,68,0.2)] cursor-not-allowed'
                            }`}
                        endContent={<ArrowRight size={24} strokeWidth={3} />}
                    >
                        EXPLORE PROJECTS
                    </Button>
                    <Button
                        size="lg"
                        variant="bordered"
                        disabled={!isOnline}
                        className={`h-16 px-12 border-2 font-bold text-lg rounded-full transition-all duration-500 ${isOnline
                            ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 hover:text-white hover:border-zinc-700'
                            : 'border-red-900 text-red-300/50 cursor-not-allowed'
                            }`}
                        startContent={<Github size={22} />}
                    >
                        VIEW SOURCE
                    </Button>
                </motion.div>
            </div>

            {/* Subtle Grid Pattern Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.015] pointer-events-none z-0"></div>
        </section>
    );
}
