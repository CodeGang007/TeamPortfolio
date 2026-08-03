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
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                        <div className="relative p-5">
                            {/* Close button */}
                            <button
                                onClick={dismissAuthToast}
                                className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X size={18} />
                            </button>

                            {/* Content */}
                            <div className="flex items-start gap-4 pr-6">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                                    <Lock className="text-blue-600" size={20} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="mb-1 text-base font-semibold text-slate-900">
                                        Sign in
                                    </h3>
                                    <p className="mb-4 text-sm leading-relaxed text-slate-600">
                                        You're browsing as a guest. Sign in to track your project
                                        requests and see the full dashboard.
                                    </p>

                                    <button
                                        onClick={handleSignInClick}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                                    >
                                        Sign in now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="h-1 origin-left bg-blue-600"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
