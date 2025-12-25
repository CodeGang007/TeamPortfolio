import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import TimelineBranches from "./TimelineBranches";

export default function AskForProject() {
    const { isAuthenticated, openLoginModal } = useAuth();
    const isOnline = isAuthenticated;

    return (
        <div className="relative my-20 flex flex-col items-center justify-center px-6 py-32 text-center md:px-12">

            {/* Background Card Shell (Overflow Hidden) */}
            <div className={`absolute inset-0 overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-md transition-all duration-500 ${isOnline
                ? 'border-zinc-800/50 bg-gradient-to-br from-zinc-950 to-black'
                : 'border-red-900/50 bg-gradient-to-br from-zinc-950 to-red-950/20'
                }`}>
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none"></div>
            </div>

            {/* Content Container (Overflow Visible for Branches) */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">

                {/* Icon Badge */}
                <motion.div
                    className={`mb-8 flex items-center justify-center h-20 w-20 rounded-2xl border-2 transition-all duration-500 ${isOnline
                        ? 'bg-brand-green/10 border-brand-green/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
                        : 'bg-red-500/10 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                        }`}
                    whileHover={{ scale: isOnline ? 1.1 : 1, rotate: isOnline ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Sparkles className={`h-10 w-10 transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'
                        }`} strokeWidth={2.5} />
                </motion.div>

                {/* Heading */}
                <h2 className={`mb-6 text-5xl md:text-7xl font-black tracking-tighter leading-tight transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'
                    }`}>
                    Have a <span className={`text-transparent bg-clip-text transition-all duration-500 ${isOnline
                        ? 'bg-gradient-to-r from-brand-green to-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                        : 'bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                        }`}>vision</span><br />
                    in mind?
                </h2>

                {/* Description */}
                <p className={`mb-12 max-w-2xl text-lg md:text-xl leading-relaxed font-light transition-colors duration-500 ${isOnline ? 'text-zinc-500' : 'text-red-300/50'
                    }`}>
                    {isOnline ? (
                        <>
                            We specialize in delivering <span className="text-white font-medium">high-quality technical solutions</span>. Let's discuss how we can help you achieve your goals.
                        </>
                    ) : (
                        <>
                            Project submission system <span className="text-red-200 font-medium">currently offline</span>. Please activate the system to proceed.
                        </>
                    )}
                </p>

                {/* CTA Button Wrapper */}
                <div className="relative">
                    {/* Timeline Branches Effect - Radiating from behind the button */}
                    <TimelineBranches isOnline={isOnline} />

                    {/* CTA Button */}
                    <Link
                        href="/project-templates"
                        className={`group relative inline-flex h-16 items-center gap-3 rounded-full border-2 px-10 text-lg font-black transition-all duration-500 z-20 ${isOnline
                            ? 'border-brand-green bg-brand-green text-black shadow-[0_10px_40px_rgba(34,197,94,0.3)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(34,197,94,0.5)] active:scale-95'
                            : 'border-red-500/50 bg-red-500/20 text-red-200 shadow-[0_10px_40px_rgba(239,68,68,0.3)] hover:bg-red-500/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(239,68,68,0.4)] active:scale-95 cursor-pointer'
                            }`}
                    >
                        <span className="relative z-10">START BUILDING</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2 relative z-10" strokeWidth={3} />

                        {/* Animated glow effect */}
                        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity ${isOnline
                            ? 'bg-gradient-to-r from-brand-green to-green-400'
                            : 'bg-gradient-to-r from-red-500 to-orange-500'
                            }`}></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
