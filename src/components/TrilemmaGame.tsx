"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, AlertCircle, Zap, DollarSign, Star } from "lucide-react";

export default function TrilemmaGame() {
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
                className="relative group cursor-pointer overflow-hidden rounded-sm border-2 border-black p-8 md:p-12 mt-12 w-full mx-auto bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300"
                onClick={() => setIsOpen(true)}
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left flex-1">
                        <h3 className="text-3xl md:text-4xl font-black italic mb-3 tracking-tight text-black">
                            The Impossible Choice?
                        </h3>
                        <p className="text-lg font-medium text-black/70 max-w-xl">
                            Fast. Cheap. Good. Conventional wisdom says you can only pick two. <br className="hidden md:block" />
                            <span className="font-black inline-block mt-2 bg-gumroad-pink px-1 border border-black text-black -rotate-1 shadow-[2px_2px_0px_0px_#000]">
                                We don't believe in convention.
                            </span>
                        </p>
                    </div>

                    {/* Visual Trilemma Icon */}
                    <div className="relative flex-shrink-0">
                        <div className="flex gap-4 relative z-10">
                            {[
                                { label: 'Fast', icon: Zap, color: 'bg-gumroad-yellow' },
                                { label: 'Cheap', icon: DollarSign, color: 'bg-gumroad-blue' },
                                { label: 'Good', icon: Star, color: 'bg-gumroad-pink' }
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ y: -5 }}
                                    className={`px-4 py-3 border-2 border-black font-black text-sm shadow-[3px_3px_0px_0px_#000] ${item.color}`}
                                >
                                    {item.label}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
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
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg p-8 md:p-10 bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black rounded-sm"
                            >
                                <X size={24} strokeWidth={3} />
                            </button>

                            {/* WINNER STATE */}
                            {isWinner ? (
                                <div className="text-center py-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                        className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 bg-gumroad-yellow border-2 border-black shadow-[4px_4px_0px_0px_#000]"
                                    >
                                        <Trophy size={48} strokeWidth={3} className="text-black" />
                                    </motion.div>

                                    <h2 className="text-4xl font-black italic mb-4 text-black">
                                        You belong here.
                                    </h2>

                                    <div className="text-sm font-black tracking-[0.2em] uppercase mb-2 text-gumroad-pink">
                                        Code Gang Presents
                                    </div>
                                    <p className="text-lg font-bold mb-8 text-black/70">
                                        We specialize in breaking the rules of what's possible.
                                    </p>

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-full py-4 font-black text-lg text-black bg-gumroad-green border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none"
                                        style={{ backgroundColor: '#4ADE80' }} // Green color for success
                                    >
                                        Start Building
                                    </button>
                                </div>
                            ) : (
                                /* GAME STATE */
                                <div className="text-center">
                                    <h3 className="text-3xl font-black mb-3 text-black">
                                        Pick Your Priorities
                                    </h3>
                                    <p className="mb-10 text-lg font-medium text-black/60">
                                        Select the two that matter most.
                                    </p>

                                    <div className="space-y-4">
                                        {(['fast', 'cheap', 'good'] as const).map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => handleToggle(option)}
                                                className={`flex items-center justify-between p-4 border-2 border-black cursor-pointer transition-all ${toggles[option]
                                                        ? 'bg-black text-white shadow-[4px_4px_0px_0px_#888]'
                                                        : 'bg-white hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="text-left pl-2">
                                                    <span className="block text-xl font-bold capitalize">{option}</span>
                                                    <span className={`text-xs ${toggles[option] ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {option === 'fast' && 'Rapid delivery timeline'}
                                                        {option === 'cheap' && 'Budget-friendly cost'}
                                                        {option === 'good' && 'Premium quality results'}
                                                    </span>
                                                </div>

                                                {/* BRUTALIST TOGGLE */}
                                                <div className={`w-8 h-8 border-2 border-current flex items-center justify-center ${toggles[option] ? 'bg-gumroad-pink text-black' : 'bg-transparent'
                                                    }`}>
                                                    {toggles[option] && <div className="w-4 h-4 bg-black" />}
                                                </div>
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
                                                    className="group w-full py-3 px-4 flex items-center justify-center gap-3 text-sm font-black transition-all border-2 border-dashed border-black hover:bg-gumroad-yellow hover:border-solid hover:shadow-[3px_3px_0px_0px_#000]"
                                                >
                                                    <AlertCircle size={18} strokeWidth={3} />
                                                    <span>Wait, I actually want <span className="underline decoration-2 underline-offset-2">all three</span>?</span>
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
