"use client";

import { motion } from "framer-motion";

const milestones = [
    { year: "2020", title: "Establishment & Foundation", description: "The core team assembled with a shared vision to revolutionize the digital landscape." },
    { year: "2021", title: "Gateway To Online Excellence", description: "Launched our first major enterprise solution, setting a new standard for performance." },
    { year: "2023", title: "Dream Big In Pixels", description: "Expanded to international markets, serving 100+ clients across 12 countries." },
    { year: "2024", title: "Future Innovation", description: "Pioneering AI-driven web experiences and next-gen immersive interfaces." },
];

export function TimelineSection() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px]" />
            </div>

            {/* Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-[2px] w-12 bg-brand-green"></div>
                            <span className="text-brand-green uppercase tracking-[0.2em] text-sm font-semibold">Our Journey</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold text-white leading-tight"
                        >
                            Your Gateway To <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">Online Excellence.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 max-w-sm text-lg leading-relaxed mb-2"
                    >
                        From humble beginnings to global impact, exploring the milestones that define our path forward.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Continuous Timeline Line */}
                    <div className="absolute top-[8px] left-0 w-full h-[1px] bg-gradient-to-r from-brand-green/0 via-brand-green/30 to-brand-green/0 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                        {milestones.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative"
                            >
                                {/* Timeline Dot & Vertical Line (Mobile) */}
                                <div className="hidden md:block absolute top-0 left-0 -translate-y-1/2 w-4 h-4 bg-zinc-950 border-2 border-brand-green rounded-full z-10 group-hover:scale-125 group-hover:bg-brand-green transition-all duration-300 shadow-[0_0_15px_rgba(0,255,148,0.3)]"></div>
                                <div className="md:hidden absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-green/50 to-transparent"></div>
                                <div className="md:hidden absolute top-0 left-[-4px] w-2 h-2 bg-brand-green rounded-full shadow-[0_0_10px_rgba(0,255,148,0.5)]"></div>

                                <div className="pl-6 md:pl-0 md:pt-12 relative">
                                    <div className="text-5xl font-bold text-white/10 mb-4 font-mono group-hover:text-brand-green/20 transition-colors duration-300 select-none">
                                        {item.year}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-green transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 md:border-l-0 pl-4 md:pl-0 group-hover:border-brand-green/50 transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
