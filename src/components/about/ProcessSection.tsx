"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Discover",
        description: "We sit with the team, walk the workflows, and write a one-page brief everyone agrees on before any code is written."
    },
    {
        icon: PenTool,
        step: "02",
        title: "Architect",
        description: "We diagram the system end-to-end — every box, queue, and database — and pick a stack the client can actually maintain."
    },
    {
        icon: Code2,
        step: "03",
        title: "Ship in Slices",
        description: "Two-week increments to staging. Real users touch the product early; surprises stop being expensive."
    },
    {
        icon: Rocket,
        step: "04",
        title: "Operate",
        description: "Observability, alerts, and a clear hand-off doc. We stay on retainer for as long as the product is moving fast."
    }
];

export function ProcessSection() {
    const { isAuthenticated } = useAuth();
    return (
        <section className="py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className={`${isAuthenticated ? "text-brand-green" : "text-red-500"} uppercase tracking-widest text-sm font-bold block mb-4`}>How We Run a Project</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        From Brief to <span className={`${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>Production.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Four steps, no surprises. We write a one-pager before any code is written, ship in two-week slices, and stay on retainer for as long as your product is moving fast.
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
                            className={`relative group p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 transition-all hover:-translate-y-2 ${isAuthenticated ? "hover:border-brand-green/30" : "hover:border-red-500/30"}`}
                        >
                            <div className={`absolute -top-6 left-6 text-6xl font-bold text-zinc-800/50 transition-colors ${isAuthenticated ? "group-hover:text-brand-green/10" : "group-hover:text-red-500/10"}`}>
                                {item.step}
                            </div>

                            <div className={`relative z-10 mb-6 bg-zinc-950 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-800 shadow-lg ${isAuthenticated ? "group-hover:border-brand-green/50 text-white group-hover:text-brand-green" : "group-hover:border-red-500/50 text-white group-hover:text-red-500"}`}>
                                <item.icon size={24} />
                            </div>

                            <h3 className={`relative z-10 text-xl font-bold text-white mb-3 transition-colors ${isAuthenticated ? "group-hover:text-brand-green" : "group-hover:text-red-500"}`}>
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
