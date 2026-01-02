"use client";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const generateRandomString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export default function AskForProject() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    // Mouse tracking for Evervault effect
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const [randomString, setRandomString] = useState("");

    useEffect(() => {
        setRandomString(generateRandomString(10000));
    }, []);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        const str = generateRandomString(10000);
        setRandomString(str);
    }

    return (
        <div className="relative my-24 w-full max-w-5xl mx-auto px-4">
            <Link href="/project-request/custom-vision-card" className="block w-full">
                <div
                    className={cn(
                        "relative group w-full rounded-[2.5rem] border overflow-hidden transition-all duration-700 ease-out",
                        isOnline
                            ? "border-brand-green/20 bg-zinc-900/60 hover:border-brand-green/60 hover:shadow-[0_0_80px_rgba(34,197,94,0.15)]"
                            : "border-red-500/20 bg-red-950/20 hover:border-red-500/60 hover:shadow-[0_0_80px_rgba(239,68,68,0.15)]"
                    )}
                    onMouseMove={onMouseMove}
                >
                    {/* Evervault Background Effect */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <CardPattern
                            mouseX={mouseX}
                            mouseY={mouseY}
                            randomString={randomString}
                            isOnline={isOnline}
                        />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 px-8 py-12 md:px-20 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

                        {/* Left Side: Text */}
                        <div className="flex-1 text-center md:text-left pointer-events-none select-none">
                            {/* System Status Badge - Glowing */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={cn(
                                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase border backdrop-blur-xl transition-all duration-500",
                                    isOnline
                                        ? "bg-brand-green/5 border-brand-green/30 text-brand-green shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                                        : "bg-red-500/5 border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                )}>
                                <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isOnline ? "bg-brand-green shadow-[0_0_10px_#22c55e]" : "bg-red-500 shadow-[0_0_10px_#ef4444]")} />
                                {isOnline ? 'System Ready' : 'System Offline'}
                            </motion.div>

                            <h2 className={cn(
                                "text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-5 transition-colors duration-500",
                                isOnline ? "text-white" : "text-red-100"
                            )}>
                                INSPIRED? <br />
                                <span className={cn(
                                    "text-transparent bg-clip-text bg-[size:200%_auto] animate-gradient-text transition-all duration-700",
                                    isOnline
                                        ? "bg-gradient-to-r from-brand-green via-emerald-200 to-brand-green"
                                        : "bg-gradient-to-r from-red-500 via-orange-300 to-red-500"
                                )}>
                                    BUILD YOUR OWN.
                                </span>
                            </h2>

                            <p className={cn(
                                "text-lg md:text-xl font-light leading-relaxed max-w-md transition-colors duration-500",
                                isOnline ? "text-zinc-400" : "text-red-300/60"
                            )}>
                                Don't just browse the gallery. <span className={cn("font-medium relative inline-block group-hover:text-white transition-colors duration-300", isOnline ? "text-brand-green" : "text-red-400")}>
                                    Add to it
                                    <span className={cn("absolute bottom-0 left-0 w-full h-[1px] transform origin-left scale-x-100 transition-transform duration-500", isOnline ? "bg-brand-green" : "bg-red-400")} />
                                </span>.
                                Initialize your project workspace.
                            </p>
                        </div>

                        {/* Right Side: Button - Ultralust */}
                        <div className="relative shrink-0 perspective-1000 group/btn">
                            <motion.div
                                className={cn(
                                    "relative h-20 px-10 rounded-2xl flex items-center gap-5 transition-all duration-500 transform-gpu preserve-3d cursor-pointer overflow-hidden",
                                    isOnline
                                        ? "bg-gradient-to-tr from-brand-green via-green-500 to-emerald-400 text-zinc-950 border-t border-white/40"
                                        : "bg-red-950/90 border border-red-500/50 text-red-400"
                                )}
                                style={{
                                    boxShadow: isOnline
                                        ? "0 10px 40px -10px rgba(34,197,94,0.6), inset 0 0 20px rgba(255,255,255,0.2)"
                                        : "0 10px 40px -10px rgba(239,68,68,0.4)"
                                }}
                                animate={{
                                    y: [0, -3, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{
                                    y: 2,
                                    scale: 1.02,
                                    transition: { duration: 0.3, ease: "easeOut" },
                                    boxShadow: isOnline
                                        ? "0 25px 60px -12px rgba(34,197,94,0.7), inset 0 0 30px rgba(255,255,255,0.4)"
                                        : "0 25px 60px -12px rgba(239,68,68,0.6)"
                                }}
                                whileTap={{
                                    y: 4,
                                    scale: 0.98
                                }}
                            >
                                {/* Glossy Shine Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none mix-blend-overlay" />

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover/btn:animate-shimmer pointer-events-none" />

                                <Terminal className={cn("w-6 h-6 md:w-7 md:h-7 relative z-10 drop-shadow-sm", isOnline ? "text-zinc-900" : "text-red-500")} strokeWidth={2.5} />

                                <div className="text-left relative z-10 flex flex-col justify-center">
                                    <div className={cn("text-[9px] md:text-[10px] font-black opacity-80 uppercase tracking-[0.2em] leading-none mb-1.5", isOnline ? "text-zinc-900" : "text-red-300")}>
                                        System Command
                                    </div>
                                    <div className={cn("text-xl font-black tracking-tighter uppercase leading-none drop-shadow-sm", isOnline ? "text-white" : "text-red-100")}>
                                        Initialize
                                    </div>
                                </div>

                                <div className="relative z-10 ml-2">
                                    <ArrowRight className={cn("w-6 h-6 md:w-7 md:h-7 transition-all duration-300 group-hover/btn:translate-x-1", isOnline ? "text-zinc-900" : "text-red-500")} strokeWidth={3} />
                                </div>
                            </motion.div>

                            {/* Floor Reflection */}
                            <div className={cn(
                                "absolute -bottom-8 left-8 right-8 h-4 blur-2xl rounded-[100%] transition-all duration-500 group-hover/btn:blur-3xl group-hover/btn:opacity-100 opacity-70",
                                isOnline ? "bg-brand-green/60" : "bg-red-500/20"
                            )} />
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    );
}

function CardPattern({ mouseX, mouseY, randomString, isOnline }: { mouseX: any, mouseY: any, randomString: string, isOnline: boolean }) {
    let maskImage = useMotionTemplate`radial-gradient(350px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="pointer-events-none w-full h-full absolute inset-0">
            {/* Base Grip Pattern (Subtle) */}
            <div className={cn(
                "absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700",
                isOnline
                    ? "bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:32px_32px]"
                    : "bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:32px_32px]"
            )} />

            {/* Revealed Gradient (Stronger) */}
            <motion.div
                className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition duration-500",
                    isOnline
                        ? "from-brand-green/20 via-emerald-500/10 to-transparent"
                        : "from-red-500/20 via-orange-500/10 to-transparent"
                )}
                style={style}
            />

            {/* Revealed Text (Clean Matrix) */}
            <motion.div
                className="absolute inset-0 opacity-0 mix-blend-screen group-hover:opacity-100"
                style={style}
            >
                <p className={cn(
                    "absolute inset-0 h-full w-full break-words whitespace-pre-wrap font-mono font-bold transition duration-500 select-none overflow-hidden text-sm leading-none tracking-widest",
                    isOnline ? "text-brand-green/40" : "text-red-500/40"
                )}>
                    {randomString}
                </p>
            </motion.div>
        </div>
    );
}
