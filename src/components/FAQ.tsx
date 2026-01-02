"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Sparkles, Terminal, Code2, Rocket, ShieldCheck, CreditCard, Clock, Zap } from "lucide-react";

// FAQ Data
const FAQS = [
    {
        id: 1,
        question: "Do you specialize in specific tech stacks?",
        answer: "Yes! We are experts in modern web and mobile technologies including React, Next.js, Node.js, Python/Django, and Flutter. We also have specialized teams for AI/ML integration and Blockchain development.",
        icon: Code2,
        colSpan: "md:col-span-2"
    },
    {
        id: 2,
        question: "How do you handle project timelines?",
        answer: "We value speed without compromising quality. Most MVPs are delivered within 4-6 weeks. Complex enterprise systems typically range from 3-6 months. We provide a detailed roadmap before kicking off.",
        icon: Clock,
        colSpan: "md:col-span-1"
    },
    {
        id: 3,
        question: "Is there post-launch support?",
        answer: "Absolutely. We don't just build and leave. We offer 3 months of free bug-fixing and maintenance. After that, we have flexible retainer packages to ensure your system stays updated and secure.",
        icon: ShieldCheck,
        colSpan: "md:col-span-1"
    },
    {
        id: 4,
        question: "How is pricing determined?",
        answer: "We operate on a transparent pricing model. You can choose between a fixed-price project contract for well-defined scopes or a time-and-materials model for evolving products. No hidden fees, ever.",
        icon: CreditCard,
        colSpan: "md:col-span-2"
    },
    {
        id: 5,
        question: "Can you help with UI/UX design?",
        answer: "Design is in our DNA. We have a dedicated design team that ensures your product not only functions perfectly but looks world-class. We start with wireframes and high-fidelity prototypes before writing a single line of code.",
        icon: Sparkles,
        colSpan: "md:col-span-3"
    }
];

// Spotlight Card Wrapper
function SpotlightCard({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }: { children: React.ReactNode, className?: string, spotlightColor?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-transparent overflow-hidden rounded-[2rem] ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}


export default function FAQ() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Animated Background Gradients & Orbs */}
            <div className={`absolute inset-0 pointer-events-none opacity-40 ${isOnline ? 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/40 via-transparent to-transparent' : 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/30 via-transparent to-transparent'}`} />

            {/* Drifting Orbs */}
            <motion.div
                animate={{ y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-[100px] -z-10 ${isOnline ? 'bg-brand-green/10' : 'bg-red-500/10'}`}
            />
            <motion.div
                animate={{ x: [0, 50, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 ${isOnline ? 'bg-blue-500/10' : 'bg-orange-500/10'}`}
            />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 ${isOnline
                                ? 'bg-zinc-900/80 border-zinc-700 text-zinc-300 shadow-lg shadow-brand-green/5'
                                : 'bg-red-950/40 border-red-900/60 text-red-300 shadow-lg shadow-red-900/10'
                            }`}>
                            <Terminal size={12} />
                            <span>Knowledge Hub</span>
                        </div>
                        <h2 className={`text-6xl md:text-7xl font-black tracking-tighter leading-[0.85] ${isOnline ? 'text-white' : 'text-red-50'}`}>
                            Crucial <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline
                                    ? 'from-zinc-500 via-white to-zinc-500 animate-text-shimmer bg-[length:200%_auto]'
                                    : 'from-red-500 via-red-200 to-orange-500'
                                }`}>Insights.</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`max-w-md text-lg md:text-xl font-light leading-relaxed ${isOnline ? 'text-zinc-400' : 'text-red-200/60'}`}
                    >
                        Transparency is our currency. Explore our protocols, standards, and operational DNA.
                    </motion.p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {FAQS.map((faq, index) => {
                        const isOpen = openId === faq.id;
                        // Spotlight color based on theme
                        const spotColor = isOnline ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)";

                        return (
                            <motion.div
                                key={faq.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: "backOut" }}
                                className={`${faq.colSpan}`}
                                onClick={() => toggleFAQ(faq.id)}
                            >
                                <SpotlightCard
                                    spotlightColor={spotColor}
                                    className={`cursor-pointer transition-all duration-500 h-full ${isOnline
                                            ? `bg-zinc-900/40 hover:bg-zinc-900/60 backdrop-blur-md ${isOpen ? 'border-brand-green/50 shadow-[0_0_60px_-15px_rgba(74,222,128,0.25)] ring-1 ring-brand-green/30' : 'border-white/5 hover:border-white/10'}`
                                            : `bg-red-950/10 hover:bg-red-950/20 backdrop-blur-md ${isOpen ? 'border-red-500/50 shadow-[0_0_60px_-15px_rgba(239,68,68,0.25)] ring-1 ring-red-500/30' : 'border-red-900/20 hover:border-red-500/20'}`
                                        }`}
                                >
                                    <div className="p-8 h-full flex flex-col">
                                        {/* Dynamic Background Gradient for Active State - Intensified */}
                                        <div className={`absolute inset-0 opacity-0 transition-opacity duration-1000 pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'
                                            } ${isOnline
                                                ? 'bg-gradient-to-br from-brand-green/10 via-brand-green/5 to-transparent'
                                                : 'bg-gradient-to-br from-red-500/20 via-red-500/5 to-transparent'
                                            }`} />

                                        <div className="relative z-10 flex justify-between items-start gap-4">
                                            <div className={`p-4 rounded-2xl transition-all duration-500 ${isOnline
                                                    ? `bg-zinc-950 border border-zinc-800 ${isOpen ? 'text-brand-green border-brand-green/30 scale-110 shadow-lg shadow-brand-green/20' : 'text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-700'}`
                                                    : `bg-red-950/40 border border-red-900/30 ${isOpen ? 'text-red-400 border-red-500/30 scale-110 shadow-lg shadow-red-500/20' : 'text-red-300/50 group-hover:text-red-300'}`
                                                }`}>
                                                <faq.icon size={28} strokeWidth={1.5} />
                                            </div>
                                            <motion.div
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                className={`p-3 rounded-full border transition-all duration-300 ${isOnline
                                                        ? `border-zinc-800 ${isOpen ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-600 group-hover:border-zinc-600 group-hover:text-zinc-400'}`
                                                        : `border-red-900/30 ${isOpen ? 'bg-red-500 text-white border-red-500' : 'bg-transparent text-red-500/40 group-hover:border-red-500/40 group-hover:text-red-400'}`
                                                    }`}
                                            >
                                                <ChevronDown size={18} strokeWidth={2.5} />
                                            </motion.div>
                                        </div>

                                        <div className="relative z-10 mt-8">
                                            <h3 className={`text-xl md:text-2xl font-bold leading-tight tracking-tight transition-all duration-300 ${isOnline
                                                    ? `text-white ${isOpen ? 'translate-x-1' : ''}`
                                                    : `text-red-100 ${isOpen ? 'translate-x-1' : ''}`
                                                }`}>
                                                {faq.question}
                                            </h3>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0, filter: 'blur(10px)' }}
                                                        animate={{ height: "auto", opacity: 1, marginTop: 24, filter: 'blur(0px)' }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0, filter: 'blur(10px)' }}
                                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} // Premium Spring
                                                        className="overflow-hidden"
                                                    >
                                                        <p className={`text-base md:text-lg leading-relaxed font-light ${isOnline ? 'text-zinc-300' : 'text-red-200/80'}`}>
                                                            {faq.answer}
                                                        </p>

                                                        {/* Action Link Example */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                            className={`mt-8 pt-6 border-t border-dashed w-full flex items-center justify-between ${isOnline ? 'border-zinc-800' : 'border-red-900/30'}`}
                                                        >
                                                            <div className={`flex items-center gap-2 text-xs font-black tracking-widest uppercase ${isOnline ? 'text-brand-green' : 'text-red-400'}`}>
                                                                <Zap size={12} className="fill-current" />
                                                                <span>Deep Dive</span>
                                                            </div>
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
