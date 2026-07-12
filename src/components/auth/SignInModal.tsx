"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Chrome } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await login();
            onClose();
        } catch (error) {
            console.error("Sign in failed", error);
        } finally {
            setIsLoading(false);
        }
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
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Container for Centering */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md pointer-events-auto"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex flex-col items-center p-8 text-center">
                                    {/* Locked Icon */}
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 border border-blue-100">
                                        <Lock className="h-10 w-10 text-blue-600" />
                                    </div>

                                    <h2 className="mb-2 text-2xl font-bold text-slate-900">Sign in to CodeGang</h2>
                                    <p className="mb-8 text-slate-500">
                                        Authentication required to access full system capabilities and project data.
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex w-full flex-col gap-3">
                                        <button
                                            onClick={handleGoogleSignIn}
                                            disabled={isLoading}
                                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-800 shadow-sm transition-transform hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
                                            ) : (
                                                <>
                                                    <Chrome className="h-5 w-5" />
                                                    <span>Continue with Google</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="mt-6 text-xs text-slate-400">
                                        By continuing, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </div>

                                {/* Decorative Red Line */}
                                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600/0 via-blue-600/60 to-blue-600/0" />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
