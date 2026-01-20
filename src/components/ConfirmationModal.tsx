"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2, AlertCircle, Info } from "lucide-react";
import { useState } from "react";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
    onConfirm: () => Promise<void> | void;
    onCancel: () => void;
}

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "warning",
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
        } finally {
            setIsLoading(false);
        }
    };

    const variantStyles = {
        danger: {
            iconBg: "bg-gradient-to-br from-red-500/20 to-red-600/10",
            iconBorder: "border-red-500/30",
            iconColor: "text-red-400",
            iconGlow: "shadow-red-500/20",
            button: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25",
            Icon: AlertCircle,
        },
        warning: {
            iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-600/10",
            iconBorder: "border-amber-500/30",
            iconColor: "text-amber-400",
            iconGlow: "shadow-amber-500/20",
            button: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black shadow-lg shadow-amber-500/25",
            Icon: AlertTriangle,
        },
        info: {
            iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
            iconBorder: "border-blue-500/30",
            iconColor: "text-blue-400",
            iconGlow: "shadow-blue-500/20",
            button: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25",
            Icon: Info,
        },
    };

    const styles = variantStyles[variant];
    const IconComponent = styles.Icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with subtle radial gradient */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)'
                        }}
                        onClick={onCancel}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[420px] px-4"
                    >
                        <div className="relative bg-gradient-to-b from-[#1f1f23] to-[#18181b] border border-[#2a2a2e] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                            {/* Subtle top highlight */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* Content Area */}
                            <div className="p-6">
                                {/* Icon and Close Row */}
                                <div className="flex items-start justify-between mb-5">
                                    {/* Icon with glow effect */}
                                    <div className={`relative p-3.5 rounded-2xl border ${styles.iconBg} ${styles.iconBorder} shadow-lg ${styles.iconGlow}`}>
                                        {/* Subtle inner glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
                                        <IconComponent className={`relative h-6 w-6 ${styles.iconColor}`} />
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={onCancel}
                                        className="p-2 rounded-xl text-[#52525b] hover:text-white hover:bg-white/5 transition-all duration-200 group"
                                    >
                                        <X className="h-5 w-5 transition-transform group-hover:rotate-90 duration-200" />
                                    </button>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
                                    {title}
                                </h3>

                                {/* Message */}
                                <p className="text-sm text-[#9ca3af] leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            {/* Actions Footer */}
                            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#141416] border-t border-[#27272a]">
                                <button
                                    onClick={onCancel}
                                    disabled={isLoading}
                                    className="px-5 py-2.5 text-sm font-medium text-[#a1a1aa] hover:text-white bg-transparent hover:bg-white/5 border border-[#3f3f46] hover:border-[#52525b] rounded-xl transition-all duration-200 disabled:opacity-50"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={isLoading}
                                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center gap-2 ${styles.button}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        confirmText
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
