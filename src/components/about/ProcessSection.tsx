"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Understand & Discover",
        description: "We dive deep into your brand's core. We analyze your market, audience, and goals to build a strategy that isn't just effective—it's transformative."
    },
    {
        icon: PenTool,
        step: "02",
        title: "Architect & Design",
        description: "Our designers craft intuitive, stunning interfaces. We blueprint the user journey to ensure every click leads to conversion and every pixel serves a purpose."
    },
    {
        icon: Code2,
        step: "03",
        title: "Develop & engineer",
        description: "This is where magic happens. Our developers write clean, scalable, and high-performance code, integrating cutting-edge technologies like three.js and AI."
    },
    {
        icon: Rocket,
        step: "04",
        title: "Deploy & Scale",
        description: "Launch is just the beginning. We ensure a flawless deployment and provide the tools and insights needed to scale your digital presence globally."
    }
];

export function ProcessSection() {
    return (
        <section className="py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-brand-green uppercase tracking-widest text-sm font-bold block mb-4">Our Methodology</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Precision in Every <span className="text-brand-green">Step.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        We don't leave success to chance. Our proven 4-step process ensures transparency, efficiency, and excellence from day one.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative group p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-brand-green/30 transition-all hover:-translate-y-2"
                        >
                            <div className="absolute -top-6 left-6 text-6xl font-bold text-zinc-800/50 group-hover:text-brand-green/10 transition-colors">
                                {item.step}
                            </div>

                            <div className="relative z-10 mb-6 bg-zinc-950 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-brand-green/50 text-white group-hover:text-brand-green shadow-lg">
                                <item.icon size={24} />
                            </div>

                            <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors">
                                {item.title}
                            </h3>

                            <p className="relative z-10 text-zinc-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
