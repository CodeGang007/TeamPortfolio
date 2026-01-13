"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { 
    Code2, 
    Smartphone, 
    Palette, 
    ShoppingCart, 
    Cloud, 
    TrendingUp,
    ArrowUpRight 
} from "lucide-react";

const services = [
    {
        icon: Code2,
        title: "Web Development",
        description: "Custom websites and web apps that work perfectly on all devices and help your business grow online.",
        link: "/project",
        stats: "50+ Projects",
        tech: ["React", "Next.js", "Node.js"]
    },
    {
        icon: Smartphone,
        title: "Mobile Apps",
        description: "Easy-to-use mobile apps for iPhone and Android that connect your customers to your business.",
        link: "/project",
        stats: "25+ Apps",
        tech: ["React Native", "Flutter", "Swift"]
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "Beautiful, user-friendly designs that make your customers love using your digital products.",
        link: "/project",
        stats: "100+ Designs",
        tech: ["Figma", "Adobe XD", "Sketch"]
    },
    {
        icon: ShoppingCart,
        title: "E-commerce",
        description: "Complete online stores that make it easy for customers to buy from you and manage your inventory.",
        link: "/project",
        stats: "30+ Stores",
        tech: ["Shopify", "WooCommerce", "Stripe"]
    },
    {
        icon: Cloud,
        title: "Cloud Solutions",
        description: "Reliable, secure hosting that keeps your website fast and running 24/7 without any downtime.",
        link: "/project",
        stats: "40+ Deployments",
        tech: ["AWS", "Azure", "Docker"]
    },
    {
        icon: TrendingUp,
        title: "SEO & Analytics",
        description: "Get more customers by making your business easier to find on Google and track your success.",
        link: "/project",
        stats: "200% Avg Growth",
        tech: ["Google Analytics", "SEMrush", "Ahrefs"]
    },
];

export default function MyTopPublications() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <section className="relative py-24 overflow-hidden bg-transparent">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-500 ${
                    isOnline ? 'bg-brand-green' : 'bg-red-500'
                }`} />
                <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-5 transition-colors duration-500 ${
                    isOnline ? 'bg-blue-500' : 'bg-red-600'
                }`} />
            </div>
            
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Enhanced Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-colors duration-500 ${
                            isOnline 
                                ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                    >
                        Our Expertise
                    </motion.div>
                    <h2 className={`text-5xl md:text-7xl font-black mb-6 transition-colors duration-500 ${
                        isOnline ? 'text-white' : 'text-red-50'
                    }`}>
                        What We <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${
                            isOnline ? 'from-brand-green to-blue-400' : 'from-red-400 to-red-200'
                        }`}>
                            Build
                        </span>
                    </h2>
                    <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-500 ${
                        isOnline ? 'text-zinc-400' : 'text-red-300/70'
                    }`}>
                        Cutting-edge digital solutions engineered for performance, scalability, and user experience
                    </p>
                </motion.div>

                {/* Enhanced Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Link href={service.link}>
                                    <div className={`relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 hover:shadow-2xl ${
                                        isOnline 
                                            ? 'bg-zinc-900/60 border-zinc-800/50 hover:border-brand-green/50 hover:bg-zinc-900/80 hover:shadow-brand-green/10' 
                                            : 'bg-red-950/30 border-red-900/40 hover:border-red-500/50 hover:bg-red-950/50 hover:shadow-red-500/10'
                                    }`}>
                                        {/* Stats Badge */}
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
                                            isOnline 
                                                ? 'bg-brand-green/10 text-brand-green/80' 
                                                : 'bg-red-500/10 text-red-400/80'
                                        }`}>
                                            {service.stats}
                                        </div>

                                        {/* Icon with enhanced styling */}
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${
                                            isOnline 
                                                ? 'bg-gradient-to-br from-brand-green/20 to-brand-green/5 text-brand-green group-hover:from-brand-green/30 group-hover:to-brand-green/10' 
                                                : 'bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-400 group-hover:from-red-500/30 group-hover:to-red-500/10'
                                        }`}>
                                            <Icon className="w-8 h-8" />
                                        </div>

                                        {/* Title with better typography */}
                                        <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                                            isOnline 
                                                ? 'text-white group-hover:text-brand-green' 
                                                : 'text-red-50 group-hover:text-red-300'
                                        }`}>
                                            {service.title}
                                        </h3>

                                        {/* Enhanced description */}
                                        <p className={`text-base leading-relaxed mb-6 transition-colors duration-300 ${
                                            isOnline ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-red-300/70 group-hover:text-red-200/80'
                                        }`}>
                                            {service.description}
                                        </p>

                                        {/* Tech stack tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {service.tech.map((tech, techIndex) => (
                                                <span 
                                                    key={techIndex}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                                                        isOnline 
                                                            ? 'bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-700/50 group-hover:text-zinc-300'
                                                            : 'bg-red-900/30 text-red-400/70 group-hover:bg-red-800/40 group-hover:text-red-300/80'
                                                    }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Enhanced CTA */}
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-semibold transition-colors duration-300 ${
                                                isOnline 
                                                    ? 'text-brand-green/80 group-hover:text-brand-green' 
                                                    : 'text-red-400/80 group-hover:text-red-400'
                                            }`}>
                                                View Projects
                                            </span>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                                                isOnline 
                                                    ? 'bg-brand-green/10 group-hover:bg-brand-green/20' 
                                                    : 'bg-red-500/10 group-hover:bg-red-500/20'
                                            }`}>
                                                <ArrowUpRight className={`w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                                                    isOnline 
                                                        ? 'text-brand-green' 
                                                        : 'text-red-400'
                                                }`} />
                                            </div>
                                        </div>

                                        {/* Enhanced glow effect */}
                                        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
                                            isOnline 
                                                ? 'bg-gradient-to-br from-brand-green/10 via-transparent to-blue-500/5' 
                                                : 'bg-gradient-to-br from-red-500/10 via-transparent to-red-600/5'
                                        }`} />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
