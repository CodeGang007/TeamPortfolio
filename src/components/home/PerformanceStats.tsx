"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, Shield, Gauge, Users, Server, Cpu, Lock, Code2, Globe } from "lucide-react";
import { MaskContainer } from "@/components/ui/MaskContainer";
import Link from "next/link";

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

const technicalSpecs = [
    {
        icon: Globe,
        value: "150+ PoPs",
        label: "Global Edge Network",
        description: "Low-latency delivery worldwide"
    },
    {
        icon: Cpu,
        value: "Auto-Scaling",
        label: "Compute Power",
        description: "Resources that adapt to demand"
    },
    {
        icon: Lock,
        value: "E2E Encrypted",
        label: "Zero Trust Security",
        description: "Military-grade data protection"
    },
    {
        icon: Code2,
        value: "IaC Managed",
        label: "Infrastructure",
        description: "Code-defined reliable deployments"
    },
];

const StatsContent = ({ isOnline }: { isOnline: boolean }) => (
    <div className="w-full min-h-screen md:h-full flex flex-col items-center justify-start md:justify-center relative py-20 md:py-0">
        {/* Subtle Background for Base Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-20 space-y-4 px-4">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white">
                    Scale without{" "}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline ? 'from-brand-green to-emerald-200' : 'from-red-500 to-rose-200'
                        }`}>
                        thinking
                    </span>
                </h2>
                <p className="text-zinc-400 text-xl font-medium max-w-2xl mx-auto tracking-tight">
                    Infrastructure that grows with you. <span className="text-zinc-200">Performance that never slows down.</span>
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-white/10"
                        >
                            <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOnline
                                ? 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-black group-hover:scale-110 group-hover:rotate-3'
                                : 'bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110'
                                }`}>
                                <Icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-4xl font-bold mb-3 text-white tracking-tight">
                                {stat.value}
                            </h3>
                            <p className="text-zinc-400 font-semibold text-sm uppercase tracking-wider mb-2">
                                {stat.label}
                            </p>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {stat.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-10 md:mt-20 pb-10 md:pb-0">
                <Link href="/project" className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors duration-300 uppercase tracking-widest border-b border-transparent hover:border-brand-green p-1">
                    <span>See the comparison</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    </div>
);

const TechnicalSpecs = ({ isOnline }: { isOnline: boolean }) => (
    <div className="w-full min-h-screen md:h-full flex flex-col items-center justify-start md:justify-center relative bg-black py-20 md:py-0">
        {/* Technical Grid Background */}
        <div className={`absolute inset-0 bg-[size:40px_40px] pointer-events-none opacity-50 ${isOnline ? "bg-[linear-gradient(to_right,#00ff4115_1px,transparent_1px),linear-gradient(to_bottom,#00ff4115_1px,transparent_1px)]" : "bg-[linear-gradient(to_right,#ef444415_1px,transparent_1px),linear-gradient(to_bottom,#ef444415_1px,transparent_1px)]"}`} />
        <div className={`absolute inset-0 pointer-events-none ${isOnline ? "bg-[radial-gradient(circle_800px_at_50%_50%,#00ff4110,transparent)]" : "bg-[radial-gradient(circle_800px_at_50%_50%,#ef444410,transparent)]"}`} />

        <div className="relative z-10 w-full flex flex-col items-center">
            {/* Reveal Header */}
            <div className="text-center mb-10 md:mb-20 space-y-4 px-4">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white uppercase" style={{ textShadow: isOnline ? "0 0 40px rgba(0,255,65,0.3)" : "0 0 40px rgba(239,68,68,0.3)" }}>
                    Built for{" "}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline ? 'from-brand-green to-emerald-400' : 'from-red-500 to-rose-400'
                        }`}>
                        DOMINANCE
                    </span>
                </h2>
                <p className={`${isOnline ? "text-brand-green" : "text-red-500"} font-mono text-lg max-w-2xl mx-auto tracking-wide`}>
                    {`> SYSTEM_STATUS: ${isOnline ? "OPERATIONAL" : "OFFLINE_MODE"}`}
                    <span className="block text-zinc-500 text-sm mt-2 font-sans">{`// The hidden engineering that powers your unstoppable growth.`}</span>
                </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
                {technicalSpecs.map((spec, index) => {
                    const Icon = spec.icon;
                    return (
                        <div
                            key={spec.label}
                            className={`group relative p-8 rounded-xl border bg-black/40 backdrop-blur-xl transition-all duration-300 ${isOnline
                                ? "border-brand-green/20 hover:border-brand-green/50"
                                : "border-red-500/20 hover:border-red-500/50"
                                }`}
                        >
                            {/* Corner Accents */}
                            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isOnline ? "border-brand-green/50" : "border-red-500/50"}`} />
                            <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isOnline ? "border-brand-green/50" : "border-red-500/50"}`} />
                            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${isOnline ? "border-brand-green/50" : "border-red-500/50"}`} />
                            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isOnline ? "border-brand-green/50" : "border-red-500/50"}`} />

                            <div className={`w-12 h-12 mx-auto mb-6 rounded-lg flex items-center justify-center transition-all duration-300 ${isOnline
                                ? "bg-brand-green/10 text-brand-green ring-1 ring-brand-green/30 group-hover:bg-brand-green group-hover:text-black shadow-[0_0_15px_rgba(0,255,65,0.1)]"
                                : "bg-red-500/10 text-red-500 ring-1 ring-red-500/30 group-hover:bg-red-500 group-hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                }`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-mono font-bold mb-3 text-white tracking-tight">
                                {spec.value}
                            </h3>
                            <div className={`h-px w-12 mx-auto mb-3 ${isOnline ? "bg-brand-green/30" : "bg-red-500/30"}`} />
                            <p className={`${isOnline ? "text-brand-green/80" : "text-red-500/80"} font-bold text-xs uppercase tracking-widest mb-2`}>
                                {spec.label}
                            </p>
                            <p className="text-zinc-500 text-xs font-mono">
                                {spec.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Bottom CTA Placeholder */}
            <div className="text-center mt-10 md:mt-20 pb-10 md:pb-0">
                <Link href="/project" className={`inline-flex items-center gap-2 text-sm font-bold transition-colors duration-300 uppercase tracking-widest border-b p-1 ${isOnline
                    ? "text-brand-green hover:text-emerald-400 border-brand-green/30 hover:border-brand-green"
                    : "text-red-500 hover:text-orange-400 border-red-500/30 hover:border-red-500"
                    }`}>
                    <span>See the comparison</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    </div>
);

export default function PerformanceStats() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <section className="relative min-h-screen w-full bg-transparent border-y border-white/5 overflow-hidden">
            <MaskContainer
                revealText={
                    <div className="w-full h-full flex items-center justify-center bg-transparent">
                        <StatsContent isOnline={isOnline} />
                    </div>
                }
                className="h-full w-full"
                revealSize={600}
            >
                <div className="w-full h-full flex items-center justify-center bg-black">
                    <TechnicalSpecs isOnline={isOnline} />
                </div>
            </MaskContainer>
        </section>
    );
}
