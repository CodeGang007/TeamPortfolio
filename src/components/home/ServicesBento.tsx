"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Monitor, Code, Search, PenTool, BarChart, Globe } from "lucide-react";

export default function ServicesBento() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    const services = [
        {
            title: "Web Design",
            description: "Crafting immersive visual experiences that captivate and convert.",
            icon: Monitor,
            className: "md:col-span-2",
        },
        {
            title: "Development",
            description: "Robust, scalable code.",
            icon: Code,
            className: "md:col-span-1",
        },
        {
            title: "SEO Optimization",
            description: "Ranking you higher where it matters.",
            icon: Search,
            className: "md:col-span-1",
        },
        {
            title: "Branding",
            description: "Defining your unique digital identity.",
            icon: PenTool,
            className: "md:col-span-2",
        },
        {
            title: "Strategy",
            description: "Data-driven roadmaps.",
            icon: BarChart,
            className: "md:col-span-1",
        },
        {
            title: "Global Reach",
            description: "Localization & international markets.",
            icon: Globe,
            className: "md:col-span-2",
        },
    ];

    return (
        <section className="py-24 px-6 md:px-12 relative z-10">
            <div className="container mx-auto">
                <div className="mb-16">
                    <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 ${isOnline ? 'text-white' : 'text-red-100'}`}>
                        Our <span className={isOnline ? 'text-brand-green' : 'text-red-500'}>Expertise</span>
                    </h2>
                    <div className={`h-1 w-24 ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`group relative p-8 border ${isOnline ? 'border-zinc-800 bg-zinc-900/50 hover:border-brand-green/50' : 'border-red-900/30 bg-red-950/10 hover:border-red-500/50'} transition-all duration-300 flex flex-col justify-between overflow-hidden ${service.className}`}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`} />

                            <div className="relative z-10">
                                <service.icon className={`w-10 h-10 mb-6 ${isOnline ? 'text-zinc-400 group-hover:text-brand-green' : 'text-red-400/60 group-hover:text-red-500'} transition-colors duration-300`} />
                                <h3 className={`text-2xl font-bold uppercase mb-2 ${isOnline ? 'text-white' : 'text-red-100'}`}>{service.title}</h3>
                                <p className={`text-sm ${isOnline ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-red-300/60 group-hover:text-red-200'} transition-colors duration-300`}>{service.description}</p>
                            </div>

                            {/* Decorative corner accent */}
                            <div className={`absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 ${isOnline ? 'border-zinc-800 group-hover:border-brand-green' : 'border-red-900/30 group-hover:border-red-500'} transition-colors duration-300`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
