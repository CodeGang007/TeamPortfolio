"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthToast() {
    const { showAuthToast, dismissAuthToast, openLoginModal, isAuthenticated } = useAuth();

    // Show toast every 7.5 seconds when not authenticated


    useEffect(() => {
        if (showAuthToast) {
            // Auto-dismiss after 8 seconds
            const timer = setTimeout(() => {
                dismissAuthToast();
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [showAuthToast, dismissAuthToast]);

    const handleSignInClick = () => {
        dismissAuthToast();
        openLoginModal();
    };

    return (
        <AnimatePresence>
            {showAuthToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-[200] max-w-md"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-red-900/50 bg-gradient-to-br from-red-950/90 to-zinc-950/90 backdrop-blur-xl shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse" />

                        <div className="relative p-5">
                            {/* Close button */}
                            <button
                                onClick={dismissAuthToast}
                                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 hover:text-red-300"
                            >
                                <X size={18} />
                            </button>

                            {/* Content */}
                            <div className="flex items-start gap-4 pr-6">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <Lock className="text-red-400" size={20} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-red-100 mb-1">
                                        System Offline
                                    </h3>
                                    <p className="text-sm text-red-300/70 mb-4">
                                        You're browsing in limited mode. Sign in to unlock full features and vibrant visuals.
                                    </p>

                                    <button
                                        onClick={handleSignInClick}
                                        className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                    >
                                        Sign In Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="h-1 bg-gradient-to-r from-red-500 to-orange-500 origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
