"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Chrome, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
    const { signIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            signIn({
                name: "Demo User",
                email: "demo@codegang.com",
                photoURL: "https://github.com/shadcn.png"
            });
            setIsLoading(false);
            onClose();
        }, 1500);
    };

    const handleDemoAccess = () => {
        setIsLoading(true);
        setTimeout(() => {
            signIn({
                name: "Visitor",
                email: "visitor@codegang.com"
            });
            setIsLoading(false);
            onClose();
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Container for Centering */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md pointer-events-auto"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-red-900/50 bg-zinc-950 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex flex-col items-center p-8 text-center">
                                    {/* Locked Icon */}
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                                        <Lock className="h-10 w-10 text-red-500" />
                                    </div>

                                    <h2 className="mb-2 text-2xl font-bold text-white">System Locked</h2>
                                    <p className="mb-8 text-zinc-400">
                                        Authentication required to access full system capabilities and project data.
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex w-full flex-col gap-3">
                                        <button
                                            onClick={handleGoogleSignIn}
                                            disabled={isLoading}
                                            className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-black" />
                                            ) : (
                                                <>
                                                    <Chrome className="h-5 w-5" />
                                                    <span>Continue with Google</span>
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={handleDemoAccess}
                                            disabled={isLoading}
                                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <User className="h-5 w-5" />
                                            <span>Demo Access</span>
                                        </button>
                                    </div>

                                    <p className="mt-6 text-xs text-zinc-600">
                                        By continuing, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </div>

                                {/* Decorative Red Line */}
                                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600/0 via-red-600/50 to-red-600/0" />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
