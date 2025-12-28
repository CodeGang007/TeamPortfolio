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
        title: "Monitrix",
        description: "Real-time data visualization platform with machine learning insights",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        tags: ["React", "Python", "TensorFlow"],
        link: "https://github.com/silverstar33/monitrix",
        github: "https://github.com/silverstar33/monitrix"
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

export default function CreativeProjects() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <div className="relative h-[420px] bg-white border-2 border-black rounded-sm overflow-hidden shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        {/* Image */}
                        <div className="relative h-48 border-b-2 border-black overflow-hidden bg-gray-100">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-black mb-2 text-black leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-sm text-black/70 mb-4 line-clamp-2 font-medium">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 bg-gumroad-yellow border border-black text-black font-bold shadow-[2px_2px_0px_0px_#000]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-4 mt-auto pt-4 border-t-2 border-black/10">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        className="flex items-center gap-2 text-sm font-bold text-black hover:text-gumroad-pink transition-colors"
                                    >
                                        <ExternalLink size={16} strokeWidth={3} />
                                        <span>View</span>
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        className="flex items-center gap-2 text-sm font-bold text-black hover:text-gumroad-blue transition-colors"
                                    >
                                        <Github size={16} strokeWidth={3} />
                                        <span>Code</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
