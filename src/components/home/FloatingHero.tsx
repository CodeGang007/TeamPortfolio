"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Floating 3D Tech Icons with Neo-Brutalist Style
const CodeBracketsIcon = () => (
    <svg viewBox="0 0 80 80" className="w-full h-full">
        <rect x="5" y="5" width="70" height="70" rx="8" fill="#ffc900" stroke="#000" strokeWidth="3" />
        <text x="40" y="52" textAnchor="middle" fontSize="32" fontWeight="900" fill="#000">&lt;/&gt;</text>
    </svg>
);

const DatabaseIcon = () => (
    <svg viewBox="0 0 80 90" className="w-full h-full">
        {/* Cylinder top */}
        <ellipse cx="40" cy="20" rx="30" ry="12" fill="#ff90e8" stroke="#000" strokeWidth="3" />
        {/* Cylinder body */}
        <rect x="10" y="20" width="60" height="50" fill="#ff90e8" stroke="none" />
        <line x1="10" y1="20" x2="10" y2="70" stroke="#000" strokeWidth="3" />
        <line x1="70" y1="20" x2="70" y2="70" stroke="#000" strokeWidth="3" />
        {/* Cylinder bottom */}
        <ellipse cx="40" cy="70" rx="30" ry="12" fill="#ff90e8" stroke="#000" strokeWidth="3" />
        {/* Middle line detail */}
        <ellipse cx="40" cy="45" rx="30" ry="12" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,5" />
    </svg>
);

const MobilePhoneIcon = () => (
    <svg viewBox="0 0 60 100" className="w-full h-full">
        {/* Phone body */}
        <rect x="5" y="5" width="50" height="90" rx="8" fill="#ffc900" stroke="#000" strokeWidth="3" />
        {/* Screen */}
        <rect x="10" y="15" width="40" height="65" rx="3" fill="#fff" stroke="#000" strokeWidth="2" />
        {/* UI lines */}
        <rect x="15" y="22" width="20" height="4" fill="#000" />
        <rect x="15" y="32" width="30" height="3" fill="#ddd" />
        <rect x="15" y="40" width="25" height="3" fill="#ddd" />
        <rect x="15" y="48" width="28" height="3" fill="#ddd" />
        {/* Button placeholder */}
        <rect x="20" y="60" width="20" height="8" rx="2" fill="#ff90e8" stroke="#000" strokeWidth="1.5" />
        {/* Home indicator */}
        <rect x="22" y="88" width="16" height="3" rx="1.5" fill="#000" />
    </svg>
);

const AIChipIcon = () => (
    <svg viewBox="0 0 90 90" className="w-full h-full">
        {/* Chip body */}
        <rect x="20" y="20" width="50" height="50" fill="#1a1a1a" stroke="#000" strokeWidth="3" />
        {/* Brain/AI pattern */}
        <circle cx="45" cy="45" r="15" fill="none" stroke="#ff90e8" strokeWidth="2" />
        <circle cx="45" cy="45" r="8" fill="#ff90e8" />
        {/* Pins */}
        <rect x="10" y="30" width="10" height="5" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="10" y="42" width="10" height="5" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="10" y="54" width="10" height="5" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="70" y="30" width="10" height="5" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="70" y="42" width="10" height="5" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="70" y="54" width="10" height="5" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="30" y="10" width="5" height="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="42" y="10" width="5" height="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="54" y="10" width="5" height="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="30" y="70" width="5" height="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="42" y="70" width="5" height="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
        <rect x="54" y="70" width="5" height="10" fill="#ffc900" stroke="#000" strokeWidth="1.5" />
    </svg>
);

export default function FloatingHero() {
    const [projectIdea, setProjectIdea] = useState("");

    return (
        <section
            className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-24 bg-[#FDFBF7] font-sans"
        >
            {/* Floating Tech Icon - Code Brackets (Top Left) */}
            <motion.div
                className="absolute top-[15%] left-[5%] md:left-[10%] w-20 h-20 md:w-28 md:h-28 z-0"
                animate={{
                    y: [0, -15, 0],
                    rotate: [-5, 5, -5]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <CodeBracketsIcon />
            </motion.div>

            {/* Floating Tech Icon - Database (Top Right) */}
            <motion.div
                className="absolute top-[10%] right-[8%] md:right-[12%] w-16 h-20 md:w-24 md:h-28 z-0"
                animate={{
                    y: [0, 12, 0],
                    rotate: [3, -3, 3]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <DatabaseIcon />
            </motion.div>

            {/* Floating Tech Icon - Mobile Phone (Bottom Left) */}
            <motion.div
                className="absolute bottom-[15%] left-[8%] md:left-[15%] w-14 h-24 md:w-20 md:h-32 z-0"
                animate={{
                    y: [0, -10, 0],
                    x: [0, 5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <MobilePhoneIcon />
            </motion.div>

            {/* Floating Tech Icon - AI Chip (Bottom Right) */}
            <motion.div
                className="absolute bottom-[18%] right-[5%] md:right-[10%] w-20 h-20 md:w-28 md:h-28 z-0"
                animate={{
                    y: [0, 10, 0],
                    rotate: [0, 8, 0]
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
                <AIChipIcon />
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">

                {/* Brand Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest text-black">
                        CodeGang Presents
                    </span>
                </motion.div>

                {/* Main Heading - Title Case, Solid Text */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-black leading-[1.1]">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="block"
                    >
                        Post a Project.
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="block text-black"
                    >
                        Get it <span className="bg-gumroad-yellow px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#000] inline-block -rotate-1">Built.</span>
                    </motion.span>
                </h1>

                {/* Sub-header */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium text-black/70"
                >
                    Post your requirements for <span className="font-bold text-black">AI</span>, <span className="font-bold text-black">App Dev</span>, or <span className="font-bold text-black">Databases</span> and get matched with developers instantly.
                </motion.p>

                {/* Action Area - Input Field + Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="w-full max-w-xl"
                >
                    <div className="flex flex-col sm:flex-row items-stretch gap-0 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <input
                            type="text"
                            value={projectIdea}
                            onChange={(e) => setProjectIdea(e.target.value)}
                            placeholder="What do you need? (e.g., AI Chatbot, React Website...)"
                            className="flex-1 px-5 py-4 bg-[#1a1a1a] text-white placeholder-gray-400 font-medium text-base focus:outline-none focus:ring-0 border-none"
                        />
                        <Link
                            href={`/project-request/custom-vision-card${projectIdea ? `?idea=${encodeURIComponent(projectIdea)}` : ''}`}
                            className="px-8 py-4 bg-gumroad-yellow text-black font-black text-base hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 border-t-2 sm:border-t-0 sm:border-l-2 border-black whitespace-nowrap"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Helper text */}
                    <p className="mt-4 text-sm text-black/50 font-medium">
                        Free to post • Get quotes in 24 hours • No commitment
                    </p>
                </motion.div>

                {/* Quick category links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
                >
                    <span className="text-sm text-black/50 font-medium">Popular:</span>
                    {["AI Chatbot", "Mobile App", "Web Dashboard", "API Integration"].map((category) => (
                        <Link
                            key={category}
                            href={`/project-request/custom-vision-card?idea=${encodeURIComponent(category)}`}
                            className="px-3 py-1.5 bg-white border border-black text-sm font-bold text-black hover:bg-gumroad-pink hover:shadow-[2px_2px_0px_0px_#000] transition-all"
                        >
                            {category}
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
