"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
    github?: string;
}

const FEATURED_PROJECTS: Project[] = [
    {
        id: 1,
        title: "AI-Powered Analytics Dashboard",
        description: "Real-time data visualization platform with machine learning insights",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        tags: ["React", "Python", "TensorFlow"],
        link: "#",
        github: "#"
    },
    {
        id: 2,
        title: "E-Commerce Platform",
        description: "Modern shopping experience with seamless checkout and inventory management",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        link: "#"
    },
    {
        id: 3,
        title: "Blockchain Wallet",
        description: "Secure cryptocurrency wallet with multi-chain support",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
        tags: ["Web3", "Solidity", "React"],
        github: "#"
    },
    {
        id: 4,
        title: "Smart Home IoT System",
        description: "Connected home automation with voice control and AI scheduling",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
        tags: ["IoT", "Node.js", "AWS"],
        link: "#"
    },
];

interface CreativeProjectsProps {
    isOnline: boolean;
}

export default function CreativeProjects({ isOnline }: CreativeProjectsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PROJECTS.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                >
                    {/* Card Container */}
                    <div className={`relative h-[400px] rounded-2xl overflow-hidden border transition-all duration-500 ${isOnline
                            ? 'bg-zinc-900/50 border-zinc-800 hover:border-brand-green/50'
                            : 'bg-zinc-900/30 border-red-900/50 hover:border-red-500/50'
                        }`}>
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isOnline ? '' : 'grayscale sepia hue-rotate-[-20deg] saturate-150'
                                    }`}
                            />
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isOnline
                                    ? 'bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent'
                                    : 'bg-gradient-to-t from-zinc-950 via-red-950/30 to-transparent'
                                }`} />
                        </div>

                        {/* Content */}
                        <div className="p-6 relative z-10">
                            <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'
                                }`}>
                                {project.title}
                            </h3>
                            <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'
                                }`}>
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-500 ${isOnline
                                                ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-3 mt-auto">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${isOnline
                                                ? 'text-brand-green hover:text-green-400'
                                                : 'text-red-400 hover:text-red-300'
                                            }`}
                                    >
                                        <ExternalLink size={16} />
                                        <span>View</span>
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${isOnline
                                                ? 'text-zinc-400 hover:text-white'
                                                : 'text-red-300/50 hover:text-red-200'
                                            }`}
                                    >
                                        <Github size={16} />
                                        <span>Code</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Scan Line Effect */}
                        <motion.div
                            className={`absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 pointer-events-none ${isOnline ? 'text-brand-green' : 'text-red-500'
                                }`}
                            animate={{
                                top: ["-10%", "110%"],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
