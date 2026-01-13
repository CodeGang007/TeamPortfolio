"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Star, Zap } from "lucide-react";
import { ref, push } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState({
    description: "",
    tag: ""
  });
  const { isAuthenticated, user, displayPhotoURL } = useAuth();

  // Don't render if user is not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || rating === 0) return;

    setIsSubmitting(true);
    try {
      await push(ref(database, "feedback"), {
        ...formData,
        rating,
        date: new Date().toISOString(),
        timestamp: Date.now(),
        userName: user.displayName || "Anonymous",
        userEmail: user.email,
        userPhoto: displayPhotoURL,
        userId: user.uid
      });

      setFormData({ description: "", tag: "" });
      setRating(0);
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Glowing Orb Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "fixed bottom-8 right-8 z-[60] group",
          "w-14 h-14 rounded-full flex items-center justify-center",
          "bg-black/40 backdrop-blur-md border border-white/10",
          "shadow-[0_0_20px_rgba(34,197,94,0.2)]",
          "hover:shadow-[0_0_35px_rgba(34,197,94,0.4)] hover:border-brand-green/50",
          "transition-all duration-500"
        )}
      >
        {/* Inner Glow Pulse */}
        <div className="absolute inset-0 rounded-full bg-brand-green/10 animate-pulse" />

        {/* Animated Icon */}
        <MessageSquare className="w-6 h-6 text-brand-green relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />

        {/* Tooltip Label */}
        <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-xs font-medium text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm">
          Feedback
        </span>
      </motion.button>

      {/* Cinematic Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full max-w-lg overflow-hidden",
                "rounded-3xl border border-white/10",
                "bg-zinc-900/40 backdrop-blur-2xl",
                "shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              )}
            >
              {/* Decorative Top Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green/50 to-transparent opacity-50" />

              {/* Ambient Green background Glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {displayPhotoURL ? (
                        <img
                          src={displayPhotoURL}
                          alt="User"
                          className="w-12 h-12 rounded-full border-2 border-brand-green/20"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full border-2 border-brand-green/20 bg-brand-green/5 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-brand-green" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border border-white/10">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Your Thoughts Matter</h2>
                      <p className="text-xs text-zinc-400 font-medium">Help us perfect this experience</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Rating with Hover Effects */}
                  <div className="flex flex-col items-center justify-center py-2 space-y-3">
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
                              "w-8 h-8 transition-all duration-300",
                              star <= (hoveredStar || rating)
                                ? "fill-brand-green text-brand-green drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                                : "fill-transparent text-zinc-700"
                            )}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-brand-green/80 min-h-[1.25rem] transition-all">
                      {hoveredStar > 0 ? ["Poor", "Fair", "Good", "Great", "Excellent"][hoveredStar - 1] : ""}
                    </span>
                  </div>

                  {/* Feedback Textarea */}
                  <div className="relative group">
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-brand-green/30 focus:bg-black/40 transition-all resize-none"
                      placeholder="What's on your mind? We'd love to hear it..."
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-green/50 transition-all duration-500 group-focus-within:w-full" />
                  </div>

                  {/* Tag Input */}
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">Tag</span>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-14 pr-4 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-brand-green/30 focus:bg-black/40 transition-all"
                      placeholder="Suggestion, Bug, Praise..."
                    />
                  </div>

                  {/* Submit Action */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.description || rating === 0}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 relative overflow-hidden",
                      (!formData.description || rating === 0)
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-brand-green text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green to-emerald-500"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Feedback</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}