"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Star } from "lucide-react";
import { ref, push } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
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
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-300 bg-brand-green/20 border-brand-green/30 text-brand-green hover:bg-brand-green/30`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl border backdrop-blur-xl p-6 shadow-2xl bg-zinc-900/90 border-zinc-800/50`}
            >
              {/* Header with User Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {displayPhotoURL && (
                    <img 
                      src={displayPhotoURL} 
                      alt={user.displayName || "User"}
                      className="w-10 h-10 rounded-full border-2 border-brand-green/30"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Share Feedback
                    </h2>
                    <p className="text-sm text-zinc-400">
                      {user.displayName || user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full transition-colors hover:bg-zinc-800 text-zinc-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Review */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-300">
                    Review
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all resize-none bg-zinc-800/50 border-zinc-700 text-white focus:border-brand-green focus:outline-none"
                    placeholder="Tell us about your experience..."
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-300">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors ${
                          star <= rating ? 'text-brand-green' : 'text-zinc-600'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tag */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-300">
                    Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all bg-zinc-800/50 border-zinc-700 text-white focus:border-brand-green focus:outline-none"
                    placeholder="e.g., UI, Performance, Bug"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formData.description || rating === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-brand-green text-black hover:bg-brand-green/90 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}