"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function MarqueeSection() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    const marqueeText = "DESIGN • DEVELOPMENT • SEO • BRANCHING • STRATEGY • UI/UX • REBRANDING • CONSULTING • ";

    return (
        <section className={`py-12 border-y ${isOnline ? 'border-brand-green/20 bg-brand-green/5' : 'border-red-500/20 bg-red-500/5'} overflow-hidden relative z-10`}>
            <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div
                    className="flex"
                    animate={{ x: [0, -1035] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {/* Repeated 4 times to ensure smooth loop on large screens */}
                    {[...Array(4)].map((_, i) => (
                        <h2
                            key={i}
                            className={`text-6xl md:text-8xl font-black uppercase tracking-tighter mr-8 ${isOnline ? 'text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-900/40 via-red-800/40 to-red-900/40'}`}
                            style={{
                                WebkitTextStroke: isOnline ? '1px rgba(34, 197, 94, 0.2)' : '1px rgba(239, 68, 68, 0.2)'
                            }}
                        >
                            {marqueeText}
                        </h2>
                    ))}
                </motion.div>
            </div>

            {/* Overlay gradients for fade effect at edges */}
            <div className={`absolute top-0 left-0 h-full w-24 bg-gradient-to-r ${isOnline ? 'from-black to-transparent' : 'from-black to-transparent'}`} />
            <div className={`absolute top-0 right-0 h-full w-24 bg-gradient-to-l ${isOnline ? 'from-black to-transparent' : 'from-black to-transparent'}`} />
        </section>
    );
}
