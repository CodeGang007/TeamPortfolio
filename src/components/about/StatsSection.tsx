"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "10k+", label: "Completed Projects" },
    { value: "15k", label: "Satisfied Customers" }, // Placeholder numbers from template
    { value: "10k+", label: "Years Of Mastery" },
    { value: "45+", label: "Worldwide Honors" },
];

export function StatsSection() {
    return (
        <section className="py-20 border-y border-zinc-900 bg-zinc-950/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-zinc-500 text-sm uppercase tracking-wider font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
