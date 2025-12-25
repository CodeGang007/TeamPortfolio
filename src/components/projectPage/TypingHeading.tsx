"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useAuth } from "@/contexts/AuthContext";

export default function TypingHeading({ prefix, suffixes }: { prefix: string; suffixes: string[] }) {
  const { isAuthenticated } = useAuth();
  const isOnline = isAuthenticated;

  const [text, setText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);

  useEffect(() => {
    if (!suffixes?.length || hasCompletedCycle) return;

    const currentSuffix = suffixes[loopIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseEnd = 2000; // Pause at end of word

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (text.length < currentSuffix.length) {
          setText(currentSuffix.slice(0, text.length + 1));
        } else {
          // Finished typing current word
          // Check if this is the last word
          if (loopIndex === suffixes.length - 1) {
            setHasCompletedCycle(true);
          } else {
            setTimeout(() => setIsDeleting(true), pauseEnd);
          }
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, suffixes, hasCompletedCycle]);

  return (
    <div className="relative py-20 flex flex-col items-center justify-center bg-transparent overflow-visible text-center">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        {/* Solid White Prefix */}
        <span className={`select-none drop-shadow-lg transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'}`}>
          {prefix}
        </span>

        {/* Animated Suffix with Gradient - Typing Effect */}
        <div className="relative flex items-center justify-center md:justify-start min-w-[300px] md:min-w-[400px]">
          <motion.span
            className={`text-transparent bg-clip-text whitespace-nowrap transition-colors duration-500 ${isOnline
              ? 'bg-gradient-to-r from-brand-green to-emerald-400'
              : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
          >
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </motion.span>
        </div>
      </h1>

      {/* Decorative Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-3xl -z-10 rounded-full transition-colors duration-500 ${isOnline
        ? 'bg-brand-green/5'
        : 'bg-red-500/5'}`} />
    </div>
  );
}