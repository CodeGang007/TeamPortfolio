"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function TrilemmaGame() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    const [isOpen, setIsOpen] = useState(false);
    const [toggles, setToggles] = useState({
        fast: false,
        cheap: false,
        good: false
    });
    const [attempts, setAttempts] = useState(0);
    const [showCheatOption, setShowCheatOption] = useState(false);
    const [isWinner, setIsWinner] = useState(false);

    // Reset game state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setToggles({ fast: false, cheap: false, good: false });
            setAttempts(0);
            setShowCheatOption(false);
            setIsWinner(false);
        }
    }, [isOpen]);

    const handleToggle = (key: 'fast' | 'cheap' | 'good') => {
        const newState = { ...toggles, [key]: !toggles[key] };

        // Count active toggles
        const activeCount = Object.values(newState).filter(Boolean).length;

        if (activeCount === 3) {
            // TRILEMMA LOGIC: Only 2 allowed
            // Automatically turn off one of the OTHER two
            const otherKeys = Object.keys(toggles).filter(k => k !== key) as ('fast' | 'cheap' | 'good')[];
            const randomKeyToDisable = otherKeys[Math.floor(Math.random() * otherKeys.length)];

            newState[randomKeyToDisable] = false;

            // Increment attempts only when trying to activate the 3rd one
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            // Show cheat option after 2 failed attempts at getting all 3
            if (newAttempts >= 2) {
                setShowCheatOption(true);
            }
        }

        setToggles(newState);
    };

    const enableGodMode = () => {
        setToggles({ fast: true, cheap: true, good: true });
        setIsWinner(true);
    };

    return (
        <>
            {/* Trigger Card - Placed on Home Screen */}
            <motion.div
                className={`relative group cursor-pointer overflow-hidden rounded-3xl border p-8 md:p-12 mt-12 w-full mx-auto transition-all duration-500 ${isOnline
                    ? 'bg-zinc-900/50 border-zinc-800 hover:border-brand-green/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]'
                    : 'bg-red-950/10 border-red-900/30 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]'
                    }`}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
            >
                {/* Background Grid - Creative Touch */}
                <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none transition-opacity duration-500 ${isOnline ? 'opacity-20' : 'opacity-10'}`}></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left flex-1">
                        <h3 className={`text-3xl md:text-4xl font-black italic mb-3 tracking-tight transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'}`}>
                            The Impossible Choice?
                        </h3>
                        <p className={`text-lg font-light max-w-xl transition-colors duration-500 ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>
                            Fast. Cheap. Good. Conventional wisdom says you can only pick two. <br className="hidden md:block" />
                            <span className={`font-bold inline-block mt-2 border-b-2 border-dashed pb-0.5 ${isOnline ? 'text-brand-green border-brand-green/50' : 'text-red-400 border-red-500/50'}`}>
                                We don't believe in convention.
                            </span>
                        </p>
                    </div>

                    {/* Visual Trilemma Icon - More Creative */}
                    <div className="relative flex-shrink-0">
                        {/* Connecting Lines */}
                        <svg className={`absolute inset-0 w-full h-full transform scale-150 opacity-20 transition-colors duration-500 ${isOnline ? 'stroke-brand-green' : 'stroke-red-500'}`} viewBox="0 0 100 100">
                            <path d="M50 20 L20 80 L80 80 Z" fill="none" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                        </svg>

                        <div className="flex gap-3 relative z-10">
                            {['Fast', 'Cheap', 'Good'].map((item, i) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ y: -5 }}
                                    className={`px-5 py-3 rounded-xl text-sm font-bold border-2 backdrop-blur-md transition-all duration-500 ${isOnline
                                        ? 'bg-zinc-950/80 border-zinc-800 text-zinc-400 group-hover:border-brand-green/30 group-hover:text-brand-green'
                                        : 'bg-red-950/20 border-red-900/30 text-red-400/70 group-hover:border-red-500/30 group-hover:text-red-400'
                                        }`}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subtle Background Gradient */}
                <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[120px] transition-colors duration-500 ${isOnline
                    ? 'bg-brand-green/10 group-hover:bg-brand-green/20'
                    : 'bg-red-500/10 group-hover:bg-red-500/20'
                    }`} />
            </motion.div>

            {/* Game Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className={`relative w-full max-w-lg p-8 md:p-10 rounded-3xl border shadow-2xl overflow-hidden transition-colors duration-500 ${isOnline
                                ? 'bg-zinc-900 border-zinc-700 shadow-brand-green/10'
                                : 'bg-zinc-950 border-red-900/50 shadow-red-500/10'
                                }`}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isOnline
                                    ? 'hover:bg-zinc-800 text-zinc-500 hover:text-white'
                                    : 'hover:bg-red-900/20 text-red-500 hover:text-red-300'
                                    }`}
                            >
                                <X size={20} />
                            </button>

                            {/* WINNER STATE */}
                            {isWinner ? (
                                <div className="text-center py-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                        className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 ${isOnline
                                            ? 'bg-brand-green/20 text-brand-green ring-4 ring-brand-green/10'
                                            : 'bg-red-500/20 text-red-500 ring-4 ring-red-500/10'
                                            }`}
                                    >
                                        <Trophy size={48} strokeWidth={2} />
                                    </motion.div>

                                    <h2 className={`text-4xl font-black italic mb-4 ${isOnline ? 'text-white' : 'text-red-100'}`}>
                                        You belong here.
                                    </h2>

                                    <div className={`text-sm font-bold tracking-[0.2em] uppercase mb-2 ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>
                                        Code Gang Presents
                                    </div>
                                    <p className={`text-lg font-light mb-8 ${isOnline ? 'text-zinc-400' : 'text-red-300/70'}`}>
                                        We specialize in breaking the rules of what's possible.
                                    </p>

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className={`w-full py-4 rounded-xl font-bold text-lg text-black transition-all transform hover:scale-[1.02] active:scale-95 ${isOnline
                                            ? 'bg-brand-green hover:bg-green-400 shadow-lg shadow-brand-green/20'
                                            : 'bg-red-500 hover:bg-red-400 shadow-lg shadow-red-500/20 text-white'
                                            }`}
                                    >
                                        Start Building
                                    </button>
                                </div>
                            ) : (
                                /* GAME STATE */
                                <div className="text-center">
                                    <h3 className={`text-3xl font-black mb-3 ${isOnline ? 'text-white' : 'text-red-100'}`}>
                                        Pick Your Priorities
                                    </h3>
                                    <p className={`mb-10 text-lg font-light ${isOnline ? 'text-zinc-400' : 'text-red-300/60'}`}>
                                        Select the two that matter most.
                                    </p>

                                    <div className="space-y-6">
                                        {(['fast', 'cheap', 'good'] as const).map((option) => (
                                            <div
                                                key={option}
                                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${toggles[option]
                                                        ? (isOnline
                                                            ? 'border-brand-green/30 bg-brand-green/5'
                                                            : 'border-red-500/30 bg-red-500/5')
                                                        : (isOnline
                                                            ? 'border-zinc-800 bg-zinc-900'
                                                            : 'border-red-900/20 bg-red-950/10')
                                                    }`}
                                            >
                                                <div className="text-left pl-2">
                                                    <span className={`block text-xl font-bold capitalize ${toggles[option]
                                                            ? (isOnline ? 'text-white' : 'text-red-100')
                                                            : (isOnline ? 'text-zinc-500' : 'text-red-400/50')
                                                        }`}>{option}</span>
                                                    <span className={`text-xs ${isOnline ? 'text-zinc-600' : 'text-red-900/40'}`}>
                                                        {option === 'fast' && 'Rapid delivery timeline'}
                                                        {option === 'cheap' && 'Budget-friendly cost'}
                                                        {option === 'good' && 'Premium quality results'}
                                                    </span>
                                                </div>

                                                {/* CREATIVE TOGGLE SWITCH */}
                                                <button
                                                    onClick={() => handleToggle(option)}
                                                    className={`relative w-16 h-9 rounded-full transition-colors duration-300 focus:outline-none ${toggles[option]
                                                            ? (isOnline ? 'bg-brand-green' : 'bg-red-500')
                                                            : (isOnline ? 'bg-zinc-800' : 'bg-red-950/30 border border-red-900/30')
                                                        }`}
                                                >
                                                    <motion.div
                                                        className="absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md"
                                                        animate={{ x: toggles[option] ? 28 : 0 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <AnimatePresence>
                                        {showCheatOption && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            >
                                                <button
                                                    onClick={enableGodMode}
                                                    className={`group w-full py-3 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all border border-dashed ${isOnline
                                                            ? 'border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:text-brand-green hover:border-brand-green/50 hover:bg-brand-green/5'
                                                            : 'border-red-900/40 bg-red-950/20 text-red-400/70 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/10'
                                                        }`}
                                                >
                                                    <AlertCircle size={18} />
                                                    <span>Wait, I actually want <span className="underline">all three</span>?</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
