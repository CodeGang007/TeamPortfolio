"use client";

import { motion, useAnimation } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Cpu, Zap, Cloud, Box, Code, Layers, Globe, Terminal, Monitor, Database } from "lucide-react";

const companies = [
    { name: 'TechCorp', icon: Cpu },
    { name: 'InnovateLabs', icon: Zap },
    { name: 'CloudNine', icon: Cloud },
    { name: 'DigitalForge', icon: Box },
    { name: 'ByteWorks', icon: Code },
    { name: 'NextGen Systems', icon: Database },
    { name: 'FutureStack', icon: Layers },
    { name: 'QuantumDev', icon: Globe },
    { name: 'CodeCraft', icon: Terminal },
    { name: 'DevStudio', icon: Monitor },
];

export default function FloatingHero() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    // Developer/Company names for marquee
    const trustedNames = [
        "Alex Martinez", "TechCorp Inc", "Sarah Chen", "DevStudio Pro",
        "Michael Johnson", "CloudNine Labs", "Emma Williams", "CodeCraft Solutions",
        "Jason Lee", "InnovateTech", "Lisa Wang", "DigitalForge Co",
        "David Park", "NextGen Systems", "Rachel Kim", "ByteWorks Studio",
        "Chris Anderson", "FutureStack Inc", "Maya Patel", "QuantumDev Labs"
    ];

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent py-20">
            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-colors duration-300 ${
                        isOnline 
                            ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' 
                            : 'bg-red-600/10 border-red-600/30 text-red-500'
                    }`}>
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`}></span>
                        </span>
                        <span className="text-xs font-bold tracking-widest uppercase">
                            {isOnline ? 'Available for new projects' : 'System Locked'}
                        </span>
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-center mb-6 leading-tight"
                >
                    <span className="text-white">WE BUILD</span>{" "}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                        isOnline 
                            ? 'from-brand-green via-white to-brand-green' 
                            : 'from-red-500 via-white to-red-500'
                    }`}>
                        SCALABLE
                    </span>{" "}
                    <span className="text-white">SOLUTIONS</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    High-performance websites and applications with cutting-edge optimizations.
                    Sub-300ms guaranteed latency, infinite scale, and no infrastructure headaches.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <Link href="/project-request/custom">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 ${
                                isOnline 
                                    ? 'bg-brand-green text-black hover:bg-brand-green/90 shadow-lg shadow-brand-green/20' 
                                    : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20'
                            }`}
                        >
                            <span>Start a Project</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </Link>

                    <Link href="/project">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-white border border-white/10 hover:bg-white/5 transition-all duration-300 backdrop-blur-md"
                        >
                            <span>View Projects</span>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Central Visual Element */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative mx-auto mb-16 max-w-2xl"
                >
                    <div className={`relative aspect-[16/9] rounded-3xl border overflow-hidden ${
                        isOnline 
                            ? 'border-brand-green/20 bg-brand-green/5' 
                            : 'border-red-600/20 bg-red-600/5'
                    }`}>
                        {/* Animated Blob */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className={`w-64 h-64 rounded-full blur-3xl opacity-40 ${
                                    isOnline ? 'bg-brand-green' : 'bg-red-600'
                                }`}
                            />
                        </div>

                        {/* Interactive Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-white text-black shadow-xl`}
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Explore Demo</span>
                            </motion.button>
                        </div>

                        {/* Corner accent */}
                        <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                            isOnline ? 'bg-brand-green' : 'bg-red-600'
                        } animate-pulse`} />
                    </div>
                </motion.div>

                {/* Trusted By Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mb-8"
                >
                    <p className="text-zinc-500 text-sm mb-6">
                        Trusted by <span className={`font-bold ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>50+</span> clients worldwide
                    </p>
                </motion.div>
            </div>

            {/* Scrolling Company Ribbon */}
            <div className="relative w-full overflow-hidden py-10">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
                
                <div className="flex gap-20 animate-marquee-slow whitespace-nowrap items-center">
                    {/* First set */}
                    {companies.map((company, i) => {
                        const Icon = company.icon;
                        return (
                            <div key={`first-${i}`} className="inline-flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default group">
                                <Icon className={`w-8 h-8 ${isOnline ? 'text-zinc-400 group-hover:text-white' : 'text-red-400/70 group-hover:text-red-300'} transition-colors duration-300`} />
                                <span className={`text-2xl font-bold tracking-tight ${
                                    isOnline ? 'text-zinc-500 group-hover:text-white' : 'text-red-400/60 group-hover:text-red-300'
                                } transition-colors duration-300`}>{company.name}</span>
                            </div>
                        );
                    })}
                    {/* Duplicate for seamless loop */}
                    {companies.map((company, i) => {
                        const Icon = company.icon;
                        return (
                            <div key={`second-${i}`} className="inline-flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default group">
                                <Icon className={`w-8 h-8 ${isOnline ? 'text-zinc-400 group-hover:text-white' : 'text-red-400/70 group-hover:text-red-300'} transition-colors duration-300`} />
                                <span className={`text-2xl font-bold tracking-tight ${
                                    isOnline ? 'text-zinc-500 group-hover:text-white' : 'text-red-400/60 group-hover:text-red-300'
                                } transition-colors duration-300`}>{company.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-slow {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee-slow {
                    animation: marquee-slow 60s linear infinite;
                }
            `}</style>
        </section>
    );
}
