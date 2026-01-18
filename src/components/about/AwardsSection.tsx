"use client";

import { motion } from "framer-motion";
import { Award, Star, Trophy, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const awards = [
    { icon: Trophy, title: "Creative Genius Award", org: "DaDa Tech | London" },
    { icon: Star, title: "Social Media Star Award", org: "20 May 2023 | India" },
    { icon: Trophy, title: "Data Wizard Award", org: "01 Jan 2018 | Australia" },
    { icon: Target, title: "Innovation Award", org: "10 Apr 2020 | Singapore" }
];

export function AwardsSection() {
    const { isAuthenticated } = useAuth();
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-zinc-500 uppercase tracking-widest text-sm block mb-2">Awards</span>
                    <h2 className="text-3xl font-bold text-white">Prestigious <span className={`${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>Awards</span></h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    {awards.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors px-4 rounded-lg group gap-4 md:gap-0"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform ${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>
                                    <item.icon size={20} />
                                </div>
                                <span className={`text-lg md:text-xl font-bold text-white transition-colors ${isAuthenticated ? "group-hover:text-brand-green" : "group-hover:text-red-500"}`}>
                                    {item.title}
                                </span>
                            </div>
                            <div className="text-zinc-500 text-sm md:text-base uppercase tracking-wider pl-[4rem] md:pl-0">
                                {item.org}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
