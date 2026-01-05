"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Star, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { HoverEffect } from "../ui/card-hover-effect";


export default function FloatingHero() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    //     {
    //         title: "Web Design",
    //         description: "Award-winning UI/UX interfaces.",
    //         image: "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?w=800&q=80",
    //         tags: ["UI/UX", "Figma"],
    //     },
    //     {
    //         title: "App Development",
    //         description: "Native & Cross-platform solutions.",
    //         image: "https://images.unsplash.com/photo-1551650975-87bd5c8e2282?w=800&q=80",
    //         tags: ["iOS", "Android"],
    //     },
    //     {
    //         title: "SEO Boost",
    //         description: "Rank #1 on Google Search.",
    //         image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    //         tags: ["Growth", "Analytics"],
    //     },
    //     {
    //         title: "Branding",
    //         description: "Identity that tells your story.",
    //         image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80",
    //         tags: ["Logo", "Strategy"],
    //     },
    //     {
    //         title: "Cloud Solutions",
    //         description: "Scalable infrastructure.",
    //         image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    //         tags: ["AWS", "Azure"],
    //     },
    //     {
    //         title: "Maintenance",
    //         description: "24/7 Support & Updates.",
    //         image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    //         tags: ["Security", "Uptime"],
    //     },
    // ];

    return (
        <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden flex flex-col justify-center">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* 3D Bloom Effect */}
            <div className={`absolute top-[-20%] right-[-10%] w-[800px] h-[800px] blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-20 transition-colors duration-700 ${isOnline ? 'bg-brand-green' : 'bg-red-600'
                }`} />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Hero Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">

                    {/* Left Column (7 cols) */}
                    <div className="lg:col-span-7">
                        {/* Status Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border mb-8 transition-colors duration-300 ${isOnline
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                                : 'bg-red-950/20 border-red-900/30 text-red-300'
                                }`}
                        >
                            <span className={`flex h-2 w-2 rounded-full ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`}>
                                <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75 ${isOnline ? 'bg-brand-green' : 'bg-red-500'}`} />
                            </span>
                            <span className="text-xs font-bold tracking-widest uppercase">
                                {isOnline ? 'Available for new projects' : 'System Locked'}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8 ${isOnline ? 'text-white' : 'text-red-50'}`}
                        >
                            WE BUILD <br />
                            <span className="outline-text text-transparent" style={{ WebkitTextStroke: isOnline ? '1px rgba(255,255,255,0.3)' : '1px rgba(255,100,100,0.3)' }}>
                                DIGITAL
                            </span> <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline ? 'from-brand-green via-white to-brand-green' : 'from-red-500 via-white to-red-500'}`}>
                                LEGACIES
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-xl md:text-2xl max-w-xl leading-relaxed mb-10 ${isOnline ? 'text-zinc-400' : 'text-red-200/60'}`}
                        >
                            Helping ambitious brands scale their vision with world-class design & engineering.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6"
                        >
                            <Link href="/project-request/custom">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${isOnline
                                        ? 'bg-brand-green text-black hover:bg-brand-green/90'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                        }`}
                                >
                                    <span>Start a Project</span>
                                    <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                                        <ArrowRight size={16} />
                                    </div>
                                </motion.button>
                            </Link>

                            <div className="flex -space-x-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-black bg-zinc-800 overflow-hidden`}>
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className={`text-sm font-medium ${isOnline ? 'text-zinc-400' : 'text-red-300/50'}`}>Trusted by 50+ clients</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column (5 cols) - Professional Visual */}
                    <div className="lg:col-span-5 relative hidden lg:block h-[500px]">
                        {/* Layer 1: Code Snippet (Behind) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: 6 }}
                            animate={{ opacity: 1, x: 0, rotate: 6 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className={`absolute top-10 right-10 w-[350px] p-6 rounded-2xl border backdrop-blur-md z-10 ${isOnline
                                ? 'bg-zinc-900/90 border-zinc-800 shadow-2xl'
                                : 'bg-red-950/90 border-red-900/50'
                                }`}
                        >
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="font-mono text-xs space-y-1">
                                <p className="text-pink-400">const <span className="text-blue-300">future</span> = <span className="text-yellow-300">await</span> build({'{'}</p>
                                <p className="pl-4 text-zinc-400">vision: <span className="text-green-300">"Limitless"</span>,</p>
                                <p className="pl-4 text-zinc-400">stack: [<span className="text-orange-300">"Next.js"</span>, <span className="text-blue-400">"React"</span>],</p>
                                <p className="pl-4 text-zinc-400">performance: <span className="text-purple-400">100</span></p>
                                <p className="text-zinc-500">{'}'});</p>
                            </div>
                        </motion.div>

                        {/* Layer 2: UI Preview (Front) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className={`absolute top-28 left-0 w-[400px] aspect-[4/3] rounded-2xl overflow-hidden border shadow-2xl z-20 ${isOnline
                                ? 'bg-black border-zinc-800 shadow-brand-green/10'
                                : 'bg-black border-red-900/50 shadow-red-500/10'
                                }`}
                        >
                            {/* Browser Header */}
                            <div className={`h-8 w-full border-b flex items-center px-4 gap-2 ${isOnline ? 'bg-zinc-900 border-zinc-800' : 'bg-red-950/30 border-red-900/30'}`}>
                                <div className="flex-1 flex justify-center">
                                    <div className={`w-32 h-4 rounded-full ${isOnline ? 'bg-zinc-800' : 'bg-red-900/30'}`} />
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="relative w-full h-full">
                                <img
                                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                                    className="w-full h-full object-cover opacity-80"
                                    alt="Dashboard Preview"
                                />

                                {/* Overlay Stats */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border backdrop-blur-md bg-black/50 border-white/10 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">Conversion</p>
                                        <p className={`text-xl font-bold ${isOnline ? 'text-white' : 'text-red-100'}`}>+84.5%</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isOnline ? 'bg-brand-green/20 border-brand-green/50 text-brand-green' : 'bg-red-500/20 border-red-500/50 text-red-500'}`}>
                                        <CheckCircle2 size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

               
            </div>
        </section>
    );
}
