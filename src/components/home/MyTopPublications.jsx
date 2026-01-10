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
        description: "Full-stack web applications with modern frameworks like Next.js, React, and Node.js.",
        link: "/project",
    },
    {
        icon: Smartphone,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android using React Native.",
        link: "/project",
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "User-centered design solutions that create engaging and intuitive digital experiences.",
        link: "/project",
    },
    {
        icon: ShoppingCart,
        title: "E-commerce",
        description: "Scalable online stores with payment integration and inventory management systems.",
        link: "/project",
    },
    {
        icon: Cloud,
        title: "Cloud Solutions",
        description: "AWS and Azure cloud infrastructure for scalable and secure application deployment.",
        link: "/project",
    },
    {
        icon: TrendingUp,
        title: "SEO & Analytics",
        description: "Search engine optimization and data analytics to boost your online presence.",
        link: "/project",
    },
];

export default function MyTopPublications() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <section className="relative py-24 overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        What you can build with{" "}
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                            isOnline ? 'from-brand-green to-white' : 'from-red-500 to-white'
                        }`}>
                            optimizations
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Lightning-fast websites, mobile apps, and digital solutions engineered for peak performance
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={service.link}>
                                    <div className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                                        isOnline 
                                            ? 'bg-zinc-900/50 border-zinc-800 hover:border-brand-green/50 hover:bg-zinc-900/70' 
                                            : 'bg-red-950/20 border-red-900/30 hover:border-red-500/50 hover:bg-red-950/30'
                                    }`}>
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                                            isOnline 
                                                ? 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green/20' 
                                                : 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20'
                                        }`}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                            {service.description}
                                        </p>

                                        {/* Arrow Icon */}
                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                                            isOnline 
                                                ? 'bg-brand-green/0 group-hover:bg-brand-green/10' 
                                                : 'bg-red-500/0 group-hover:bg-red-500/10'
                                        }`}>
                                            <ArrowUpRight className={`w-4 h-4 transition-all duration-300 ${
                                                isOnline 
                                                    ? 'text-zinc-600 group-hover:text-brand-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
                                                    : 'text-red-400/50 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                                            }`} />
                                        </div>

                                        {/* Glow effect on hover */}
                                        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                                            isOnline 
                                                ? 'bg-gradient-to-br from-brand-green/5 to-transparent' 
                                                : 'bg-gradient-to-br from-red-500/5 to-transparent'
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
