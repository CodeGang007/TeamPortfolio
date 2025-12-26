"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function FloatingHero() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <section
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
        >
            {/* Single Clean 3D Object - Right Edge Only - Transitions color with state */}
            <motion.div
                className="absolute top-[20%] right-[-18%] w-[600px] h-[600px] opacity-40 pointer-events-none z-0 transition-all duration-1000"
                style={{
                    filter: isOnline
                        ? 'hue-rotate(0deg) brightness(1)'
                        : 'hue-rotate(290deg) brightness(0.8) saturate(1.5)',
                    willChange: "transform"
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
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
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
                        className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'
                            }`}
                    >
                        {isOnline ? 'System Online' : 'System Offline'}
                    </span>
                </motion.div>

                {/* Brand Introduction */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                >
                    <p className="text-sm md:text-base text-zinc-600 tracking-[0.3em] uppercase font-bold">
                        CodeGang Presents You
                    </p>
                </motion.div>

                {/* Main Heading - Animated on state change */}
                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.3 }}
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
                        animate={{ opacity: [0, 0.8, 0, 0.6, 0] }}
                        transition={{ delay: 2.5, duration: 1.5 }}
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.6 }}
                >
                    Building <span className={`font-medium transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-200'
                        }`}>next-generation digital experiences</span> that merge cutting-edge technology with breathtaking design.
                </motion.p>

                {/* CTA Button - Color changes with state */}
                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <a
                        href="#projects"
                        className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 overflow-hidden ${isOnline
                            ? 'bg-gradient-to-r from-brand-green to-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)]'
                            : 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)]'
                            }`}
                    >
                        <span className="relative z-10">Explore Our Work</span>
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>

                    <Link
                        href="/project-request/custom-vision-card"
                        className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 overflow-hidden border-2 ${isOnline
                            ? 'border-brand-green/50 text-brand-green hover:bg-brand-green/10 shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:shadow-[0_0_50px_rgba(34,197,94,0.2)]'
                            : 'border-red-500/50 text-red-500 hover:bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_50px_rgba(239,68,68,0.2)]'
                            }`}
                    >
                        <span className="relative z-10">Start Project</span>
                        <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform relative z-10" />
                    </Link>
                </motion.div>
            </div>

            {/* Bottom accent glow */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 blur-3xl transition-colors duration-1000 ${isOnline
                ? 'bg-brand-green/10'
                : 'bg-red-500/10'
                }`} />
        </section>
    );
}
