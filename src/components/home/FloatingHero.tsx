"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import { HeroParallax } from "@/components/ui/hero-parallax";

export default function FloatingHero() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    const products = [
        {
            title: "AI-Powered Analytics Dashboard",
            description: "Real-time data visualization platform with machine learning insights",
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            tags: ["React", "Python", "TensorFlow"],
            link: "#",
            github: "#"
        },
        {
            title: "E-Commerce Platform",
            description: "Modern shopping experience with seamless checkout and inventory management",
            thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
            tags: ["Next.js", "Stripe", "PostgreSQL"],
            link: "#"
        },
        {
            title: "Blockchain Wallet",
            description: "Secure cryptocurrency wallet with multi-chain support",
            thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
            tags: ["Web3", "Solidity", "React"],
            github: "#"
        },
        {
            title: "Smart Home IoT System",
            description: "Connected home automation with voice control and AI scheduling",
            thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
            tags: ["IoT", "Node.js", "AWS"],
            link: "#"
        },
        {
            title: "AI-Powered Analytics Dashboard",
            description: "Real-time data visualization platform with machine learning insights",
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            tags: ["React", "Python", "TensorFlow"],
            link: "#",
            github: "#"
        },
        {
            title: "E-Commerce Platform",
            description: "Modern shopping experience with seamless checkout and inventory management",
            thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
            tags: ["Next.js", "Stripe", "PostgreSQL"],
            link: "#"
        },
        {
            title: "Blockchain Wallet",
            description: "Secure cryptocurrency wallet with multi-chain support",
            thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
            tags: ["Web3", "Solidity", "React"],
            github: "#"
        },
        {
            title: "Smart Home IoT System",
            description: "Connected home automation with voice control and AI scheduling",
            thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
            tags: ["IoT", "Node.js", "AWS"],
            link: "#"
        },
        {
            title: "AI-Powered Analytics Dashboard",
            description: "Real-time data visualization platform with machine learning insights",
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            tags: ["React", "Python", "TensorFlow"],
            link: "#",
            github: "#"
        },
        {
            title: "E-Commerce Platform",
            description: "Modern shopping experience with seamless checkout and inventory management",
            thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
            tags: ["Next.js", "Stripe", "PostgreSQL"],
            link: "#"
        },
        {
            title: "Blockchain Wallet",
            description: "Secure cryptocurrency wallet with multi-chain support",
            thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
            tags: ["Web3", "Solidity", "React"],
            github: "#"
        },
        {
            title: "Smart Home IoT System",
            description: "Connected home automation with voice control and AI scheduling",
            thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
            tags: ["IoT", "Node.js", "AWS"],
            link: "#"
        },
    ];

    return (
        <HeroParallax
            products={products}
            projectHeader={
                <div className="text-center mt-20 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border transition-all duration-500 ${isOnline
                            ? 'bg-zinc-900 border-brand-green/30'
                            : 'bg-zinc-950 border-red-500/30'
                            }`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${isOnline ? 'bg-brand-green' : 'bg-red-500'
                                }`}></span>
                            <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'
                                }`}>
                                {isOnline ? 'Innovation Gallery' : 'System Locked'}
                            </span>
                        </div>
                    </motion.div>

                    <h2 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 italic transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'
                        }`}>
                        Curated <span className={`text-transparent bg-clip-text transition-all duration-500 ${isOnline
                            ? 'bg-gradient-to-r from-brand-green to-green-400'
                            : 'bg-gradient-to-r from-red-500 to-orange-500'
                            }`}>Showcase</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto font-light transition-colors duration-500 ${isOnline ? 'text-zinc-500' : 'text-red-300/50'
                        }`}>
                        {isOnline
                            ? 'A visual testament to our engineering capabilities. We turn complex problems into elegant digital solutions.'
                            : 'Access restricted. Authentication required to view portfolio data.'}
                    </p>
                </div>
            }
            header={
                <div className="relative w-full h-[80vh] flex items-center justify-center -mt-20">
                    {/* Single Clean 3D Object - Right Edge Only - Transitions color with state */}
                    <motion.div
                        className="absolute top-[20%] right-[-18%] w-[600px] h-[600px] opacity-40 pointer-events-none z-0 transition-all duration-1000"
                        style={{
                            filter: isOnline
                                ? 'hue-rotate(0deg) brightness(1)'
                                : 'hue-rotate(290deg) brightness(0.8) saturate(1.5)',
                            willChange: "transform"
                        }}
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, -10, 0],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    >
                        <img src="/3d_blob.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
                    </motion.div>

                    {/* Hero Content with Interactive State - Wrapped in 3D Container */}
                    <CardContainer className="relative z-10 w-full max-w-7xl px-6" containerClassName="py-0">
                        <CardBody className="relative w-full flex flex-col items-center justify-center text-center">

                            {/* Status Badge - Depth 50 */}
                            <CardItem translateZ="50" className="w-full flex justify-center">
                                <motion.div
                                    className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full backdrop-blur-sm transition-all duration-300 ${isOnline
                                        ? 'bg-zinc-950/90 border border-brand-green/30 shadow-[0_0_20px_rgba(34,197,94,0.08)]'
                                        : 'bg-zinc-950/90 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.08)]'
                                        }`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-brand-green' : 'bg-red-500'
                                                }`}
                                        />
                                        <span
                                            className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-brand-green' : 'bg-red-500'
                                                }`}
                                        />
                                    </span>
                                    <span
                                        className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'
                                            }`}
                                    >
                                        {isOnline ? 'System Online' : 'System Offline'}
                                    </span>
                                </motion.div>
                            </CardItem>

                            {/* Brand Introduction - Depth 40 */}
                            <CardItem translateZ="40" className="w-full flex justify-center">
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2 }}
                                >
                                    <p className="text-sm md:text-base text-zinc-600 tracking-[0.3em] uppercase font-bold">
                                        CodeGang Presents You
                                    </p>
                                </motion.div>
                            </CardItem>

                            {/* Main Heading - Depth 100 (Highest) */}
                            <CardItem translateZ="100" className="w-full flex justify-center">
                                <motion.h1
                                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight relative"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.3 }}
                                >
                                    <span className={`relative z-10 block mb-2 transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'
                                        }`}>
                                        THE FUTURE OF
                                    </span>
                                    <span className={`relative z-10 block italic text-transparent bg-clip-text transition-all duration-500 ${isOnline
                                        ? 'bg-gradient-to-r from-brand-green via-green-400 to-emerald-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]'
                                        : 'bg-gradient-to-r from-red-500 via-red-400 to-orange-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                                        }`}>
                                        DIGITAL INNOVATION
                                    </span>

                                    {/* Glitch overlay bars */}
                                    <motion.div
                                        className="absolute inset-0 overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.8, 0, 0.6, 0] }}
                                        transition={{ delay: 2.5, duration: 1.5 }}
                                    >
                                        <div className={`absolute top-[20%] left-0 right-0 h-0.5 ${isOnline ? 'bg-brand-green/60' : 'bg-red-500/60'
                                            }`} />
                                        <div className={`absolute top-[40%] left-0 right-0 h-px ${isOnline ? 'bg-brand-green/40' : 'bg-red-500/40'
                                            }`} />
                                        <div className={`absolute top-[60%] left-0 right-0 h-0.5 ${isOnline ? 'bg-brand-green/60' : 'bg-red-500/60'
                                            }`} />
                                        <div className={`absolute top-[80%] left-0 right-0 h-px ${isOnline ? 'bg-brand-green/40' : 'bg-red-500/40'
                                            }`} />
                                    </motion.div>
                                </motion.h1>
                            </CardItem>

                            {/* Description - Depth 60 */}
                            <CardItem translateZ="60" className="w-full flex justify-center">
                                <motion.p
                                    className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light transition-colors duration-500 ${isOnline ? 'text-zinc-500' : 'text-zinc-600'
                                        }`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.6 }}
                                >
                                    Building <span className={`font-medium transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-200'
                                        }`}>next-generation digital experiences</span> that merge cutting-edge technology with breathtaking design.
                                </motion.p>
                            </CardItem>


                        </CardBody>
                    </CardContainer>

                    {/* Bottom accent glow */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 blur-3xl transition-colors duration-1000 ${isOnline
                        ? 'bg-brand-green/10'
                        : 'bg-red-500/10'
                        }`} />
                </div>
            }
        />
    );
}
