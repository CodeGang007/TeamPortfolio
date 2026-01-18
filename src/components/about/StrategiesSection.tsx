"use client";

import { motion } from "framer-motion";
import { AppWindow, Smartphone, BrainCircuit, Paintbrush } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Updated with detailed "Services" content
const strategies = [
    {
        icon: AppWindow,
        title: "Web Development",
        label: "Next-Gen Web Apps",
        description: "We build blazing fast, SEO-optimized web applications using Next.js and React. From corporate portals to complex SaaS platforms, we deliver robustness.",
        color: "bg-brand-green"
    },
    {
        icon: Smartphone,
        title: "Mobile Solutions",
        label: "Cross-Platform Apps",
        description: "Native-like performance on iOS and Android. We utilize React Native and Flutter to create seamless mobile experiences that users love.",
        color: "bg-white"
    },
    {
        icon: BrainCircuit,
        title: "AI Integration",
        label: "Intelligent Systems",
        description: "Leveraging the power of LLMs and machine learning. We integrate AI agents, chatbots, and automation workflows to future-proof your business.",
        color: "bg-white"
    },
    {
        icon: Paintbrush,
        title: "UI/UX Design",
        label: "Immersive Design",
        description: "Design that speaks. We create glassmorphic, modern, and accessible interfaces that not only look premium but ensure fluid user navigation.",
        color: "bg-white"
    },
];

export function StrategiesSection() {
    const { isAuthenticated } = useAuth();
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Our <span className={`${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>Expertise</span> Ecosystem
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto mb-16 text-lg">
                    We provide a 360-degree digital solution. Whether it's code, design, or intelligence, we have the mastery to execute it perfectly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {strategies.map((strat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className={`relative p-8 rounded-[30px] flex flex-col items-center min-h-[400px] transition-all duration-300 group text-left
                        ${strat.color === 'bg-brand-green'
                                    ? (isAuthenticated ? 'bg-brand-green text-black shadow-[0_10px_40px_rgba(0,255,65,0.2)]' : 'bg-red-500 text-white shadow-[0_10px_40px_rgba(239,68,68,0.2)]')
                                    : 'bg-zinc-900 text-white border border-zinc-800'
                                }
                    `}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-3xl
                        ${strat.color === 'bg-brand-green'
                                    ? (isAuthenticated ? 'bg-black/10 text-black' : 'bg-black/20 text-white')
                                    : 'bg-zinc-950 text-white border border-zinc-800'
                                }
                     `}>
                                <strat.icon size={32} />
                            </div>

                            <div className="w-full">
                                <div className="uppercase tracking-widest text-xs font-bold mb-2 opacity-60">
                                    {strat.title}
                                </div>
                                <h3 className="text-2xl font-bold leading-tight mb-4">
                                    {strat.label}
                                </h3>
                                <p className={`text-sm leading-relaxed ${strat.color === 'bg-brand-green' ? (isAuthenticated ? 'text-black/80 font-medium' : 'text-white/90 font-medium') : 'text-zinc-400'}`}>
                                    {strat.description}
                                </p>
                            </div>

                            {/* Arrow (Visual) */}
                            <div className="mt-auto pt-8 self-end opacity-50">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
