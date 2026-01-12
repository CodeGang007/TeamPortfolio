"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, Shield, Gauge, Users } from "lucide-react";

const stats = [
    {
        icon: Zap,
        value: "Sub-300ms",
        label: "Response Time",
        description: "Lightning-fast performance guaranteed"
    },
    {
        icon: Shield,
        value: "99.9%",
        label: "Uptime",
        description: "Enterprise-grade reliability"
    },
    {
        icon: Gauge,
        value: "Infinite",
        label: "Scalability",
        description: "Grow without limits"
    },
    {
        icon: Users,
        value: "50+",
        label: "Happy Clients",
        description: "Trusted by industry leaders"
    },
];

export default function PerformanceStats() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <section className="relative py-20 overflow-hidden bg-transparent border-y border-white/5">
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
                        Scale without{" "}
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline ? 'from-brand-green to-white' : 'from-red-500 to-white'
                            }`}>
                            thinking
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Infrastructure that grows with you. Performance that never slows down.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group text-center"
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOnline
                                    ? 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green/20 group-hover:scale-110'
                                    : 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20 group-hover:scale-110'
                                    }`}>
                                    <Icon className="w-8 h-8" />
                                </div>

                                {/* Value */}
                                <h3 className={`text-4xl md:text-5xl font-black mb-2 transition-colors duration-300 ${isOnline
                                    ? 'text-brand-green'
                                    : 'text-red-500'
                                    }`}>
                                    {stat.value}
                                </h3>

                                {/* Label */}
                                <p className="text-white font-bold text-lg mb-2">
                                    {stat.label}
                                </p>

                                {/* Description */}
                                <p className="text-zinc-500 text-sm">
                                    {stat.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href="/project"
                        className={`inline-flex items-center gap-2 text-sm font-bold transition-colors duration-300 ${isOnline
                            ? 'text-brand-green hover:text-white'
                            : 'text-red-500 hover:text-white'
                            }`}
                    >
                        <span>See how we compare</span>
                        <span>→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
