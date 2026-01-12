"use client";

import { motion, useAnimation } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
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

// Terminal Typing Animation Component
function TerminalTyping({ isOnline }: { isOnline: boolean }) {
    const [displayedLines, setDisplayedLines] = useState<{ text: string; type: 'command' | 'output' | 'success' | 'info' }[]>([]);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    const terminalLines = [
        { text: '$ npm run build', type: 'command' as const },
        { text: '✓ Compiled successfully in 2.3s', type: 'success' as const },
        { text: '$ vercel deploy --prod', type: 'command' as const },
        { text: '▲ Deploying to production...', type: 'info' as const },
        { text: '✓ Preview: https://your-app.vercel.app', type: 'success' as const },
        { text: '✓ Production: https://your-domain.com', type: 'success' as const },
        { text: '$ echo "🚀 Deployed successfully!"', type: 'command' as const },
        { text: '🚀 Deployed successfully!', type: 'output' as const },
    ];

    useEffect(() => {
        // Cursor blink effect
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (currentLineIndex >= terminalLines.length) {
            // Reset after delay
            const resetTimer = setTimeout(() => {
                setDisplayedLines([]);
                setCurrentLineIndex(0);
                setCurrentCharIndex(0);
            }, 3000);
            return () => clearTimeout(resetTimer);
        }

        const currentLine = terminalLines[currentLineIndex];

        if (currentCharIndex < currentLine.text.length) {
            // Typing effect
            const typingSpeed = currentLine.type === 'command' ? 50 : 15;
            const timer = setTimeout(() => {
                setCurrentCharIndex(prev => prev + 1);
            }, typingSpeed);
            return () => clearTimeout(timer);
        } else {
            // Move to next line
            const pauseTime = currentLine.type === 'command' ? 500 : 300;
            const timer = setTimeout(() => {
                setDisplayedLines(prev => [...prev, currentLine]);
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, pauseTime);
            return () => clearTimeout(timer);
        }
    }, [currentCharIndex, currentLineIndex]);

    const getLineColor = (type: string) => {
        switch (type) {
            case 'command': return 'text-zinc-300';
            case 'success': return isOnline ? 'text-brand-green' : 'text-red-400';
            case 'info': return 'text-blue-400';
            case 'output': return 'text-yellow-400';
            default: return 'text-zinc-400';
        }
    };

    const currentLine = terminalLines[currentLineIndex];
    const typingText = currentLine ? currentLine.text.slice(0, currentCharIndex) : '';

    return (
        <div className="space-y-1.5">
            {displayedLines.map((line, i) => (
                <div key={i} className={`${getLineColor(line.type)}`}>
                    {line.text}
                </div>
            ))}
            {currentLineIndex < terminalLines.length && (
                <div className={`${getLineColor(currentLine?.type || 'command')}`}>
                    {typingText}
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ${isOnline ? 'text-brand-green' : 'text-red-400'}`}>▌</span>
                </div>
            )}
        </div>
    );
}

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
            {/* Vignette Effect - Fades grid at edges */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />
            </div>

            {/* Floating Notification Badge - Professional Style */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute top-24 right-8 md:right-16 z-20 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950/90 backdrop-blur-sm hover:border-zinc-700 transition-colors cursor-default"
                >
                    {/* Status Indicator */}
                    <div className="relative">
                        <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`} />
                        <div className={`absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping ${isOnline ? 'bg-brand-green' : 'bg-red-500'} opacity-50`} />
                    </div>

                    {/* Text Content */}
                    <span className="text-[11px] text-zinc-400 font-medium">
                        <span className="text-zinc-500">v2.0</span>
                        <span className="mx-1.5 text-zinc-700">·</span>
                        <span className={`${isOnline ? 'text-zinc-300' : 'text-zinc-400'}`}>Performance update shipped</span>
                    </span>
                </motion.div>
            </motion.div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10 max-w-5xl">

                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-colors duration-300 ${isOnline
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
                    <span
                        className="text-transparent bg-clip-text animate-gradient-shift"
                        style={{
                            backgroundImage: isOnline
                                ? 'linear-gradient(135deg, #22c55e 0%, #34d399 25%, #2dd4bf 50%, #34d399 75%, #22c55e 100%)'
                                : 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #ef4444 100%)',
                            backgroundSize: '200% 200%',
                        }}
                    >
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
                            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 ${isOnline
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

                {/* Interactive Terminal with Glassmorphism & Breathing Glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative mx-auto mb-16 max-w-2xl"
                >
                    {/* Breathing Glow Effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={`absolute -inset-8 rounded-[40px] blur-3xl ${isOnline ? 'bg-brand-green/30' : 'bg-red-600/30'
                            }`}
                    />

                    {/* Terminal Window */}
                    <div className={`relative rounded-2xl border backdrop-blur-xl overflow-hidden shadow-2xl ${isOnline
                        ? 'border-brand-green/30 bg-zinc-950/90'
                        : 'border-red-600/30 bg-zinc-950/90'
                        }`}>
                        {/* Terminal Header */}
                        <div className={`flex items-center gap-2 px-4 py-3 border-b ${isOnline ? 'border-zinc-800/50 bg-zinc-900/50' : 'border-red-900/30 bg-zinc-900/50'
                            }`}>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-brand-green/80' : 'bg-zinc-600'}`} />
                            </div>
                            <div className="flex-1 text-center">
                                <span className="text-xs text-zinc-500 font-medium">terminal — deploy.sh</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`} />
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 font-mono text-sm leading-relaxed h-64 overflow-hidden">
                            <TerminalTyping isOnline={isOnline} />
                        </div>
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
                                <span className={`text-2xl font-bold tracking-tight ${isOnline ? 'text-zinc-500 group-hover:text-white' : 'text-red-400/60 group-hover:text-red-300'
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
                                <span className={`text-2xl font-bold tracking-tight ${isOnline ? 'text-zinc-500 group-hover:text-white' : 'text-red-400/60 group-hover:text-red-300'
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
