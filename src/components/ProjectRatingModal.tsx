"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectRatingModalProps {
    isOpen: boolean;
    projectTitle: string;
    onSubmit: (rating: number, feedback: string) => Promise<void>;
}

export default function ProjectRatingModal({
    isOpen,
    projectTitle,
    onSubmit
}: ProjectRatingModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || !feedback.trim()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(rating, feedback);
        } catch (error) {
            console.error("Failed to submit rating", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/90 backdrop-blur-xl">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-lg rounded-3xl border border-blue-600/20 bg-white shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden"
            >
                {/* Decorative Top Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center mb-4 border border-blue-600/20 animate-pulse">
                            <Rocket className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Completed!</h2>
                        <p className="text-slate-600">
                            <span className="text-slate-900 font-medium">{projectTitle}</span> is successfully delivered.
                            <br />
                            Please rate your experience to access the project.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Star Rating */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        onClick={() => setRating(star)}
                                        className="relative p-1 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                                    >
                                        <Star
                                            className={cn(
                                                "w-10 h-10 transition-all duration-300",
                                                star <= (hoveredStar || rating)
                                                    ? "fill-blue-600 text-blue-600 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                                                    : "fill-transparent text-slate-300 hover:text-slate-500"
                                            )}
                                            strokeWidth={1.5}
                                        />
                                    </button>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-blue-600 h-5">
                                {hoveredStar > 0 ? ["Poor", "Fair", "Good", "Great", "Excellent"][hoveredStar - 1] : (rating > 0 ? ["Poor", "Fair", "Good", "Great", "Excellent"][rating - 1] : "")}
                            </span>
                        </div>

                        {/* Feedback Input */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-slate-500 font-bold ml-1">Feedback</label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                                className="w-full bg-white/40 border border-white/5 rounded-xl p-4 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-blue-600/30 focus:bg-slate-900/40 transition-all resize-none"
                                placeholder="How was your experience working with us?"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={rating === 0 || !feedback.trim() || isSubmitting}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2",
                                (rating === 0 || !feedback.trim() || isSubmitting)
                                    ? "bg-slate-100 text-slate-500 cursor-not-allowed"
                                    : "bg-blue-600 text-slate-900 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-[1.02]"
                            )}
                        >
                            {isSubmitting ? "Submitting..." : (
                                <>
                                    Complete & Close
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
