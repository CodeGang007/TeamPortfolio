"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

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

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function CreativeProjects() {
    const { isAuthenticated, triggerAuth } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PROJECTS.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-[40rem]"
                >
                    <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                        <CardBody className={`relative group/card w-full h-full rounded-xl p-6 border transition-all duration-500 flex flex-col ${isOnline
                            ? 'bg-zinc-900/50 border-zinc-800 hover:border-brand-green/50 hover:shadow-2xl hover:shadow-brand-green/10'
                            : 'bg-zinc-900/30 border-red-900/50 hover:border-red-500/50'
                            }`}>

                            {/* Image - Highest Depth - POPUP EFFECT */}
                            <CardItem
                                translateZ="100"
                                className="w-full shrink-0"
                            >
                                <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-md group-hover/card:shadow-xl transition-all duration-300">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`h-full w-full object-cover transition-all duration-700 ${isOnline ? '' : 'grayscale sepia hue-rotate-[-20deg] saturate-150'
                                            }`}
                                    />
                                    <div className={`absolute inset-0 transition-opacity duration-500 ${isOnline
                                        ? 'bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent'
                                        : 'bg-gradient-to-t from-zinc-950 via-red-950/30 to-transparent'
                                        }`} />
                                </div>
                            </CardItem>

                            {/* Title - Depth 50 */}
                            <CardItem
                                translateZ="50"
                                as="h3"
                                className={`text-xl font-bold mt-6 mb-2 transition-colors duration-500 line-clamp-1 ${isOnline ? 'text-white' : 'text-red-100'
                                    }`}
                            >
                                {project.title}
                            </CardItem>

                            {/* Description - Depth 60 */}
                            <CardItem
                                translateZ="60"
                                as="p"
                                className={`text-sm mb-4 line-clamp-2 transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'
                                    }`}
                            >
                                {project.description}
                            </CardItem>

                            {/* Tags - Depth 40 */}
                            <CardItem
                                translateZ="40"
                                className="flex flex-wrap gap-2 mt-2"
                            >
                                {project.tags.slice(0, 3).map((tag) => (
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
                            </CardItem>

                            {/* Links - Button Depth 20 - Wrapped in div for layout, items FLOAT */}
                            <div className="flex gap-3 mt-auto pt-4">
                                {project.link && (
                                    <CardItem
                                        translateZ="20"
                                        as="a"
                                        href={isOnline ? project.link : "#"}
                                        onClick={(e: React.MouseEvent) => {
                                            if (!isOnline) {
                                                e.preventDefault();
                                                triggerAuth();
                                            }
                                        }}
                                        className={`w-auto flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${isOnline
                                            ? 'text-brand-green hover:text-green-400'
                                            : 'text-red-400 hover:text-red-300'
                                            }`}
                                    >
                                        <ExternalLink size={16} />
                                        <span>View</span>
                                    </CardItem>
                                )}
                                {project.github && (
                                    <CardItem
                                        translateZ="20"
                                        as="a"
                                        href={isOnline ? project.github : "#"}
                                        onClick={(e: React.MouseEvent) => {
                                            if (!isOnline) {
                                                e.preventDefault();
                                                triggerAuth();
                                            }
                                        }}
                                        className={`w-auto flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${isOnline
                                            ? 'text-zinc-400 hover:text-white'
                                            : 'text-red-300/50 hover:text-red-200'
                                            }`}
                                    >
                                        <Github size={16} />
                                        <span>Code</span>
                                    </CardItem>
                                )}
                            </div>
                        </CardBody>
                    </CardContainer>
                </motion.div>
            ))}
        </div>
    );
}
