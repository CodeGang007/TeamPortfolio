"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingHeadingProps {
  prefix: string;
  suffixes: string[];
}

export default function TypingHeading({ prefix, suffixes }: TypingHeadingProps) {
  const [text, setText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!suffixes || suffixes.length === 0) return;
    if (isDone) return;

    const currentSuffix = suffixes[loopIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      if (!isDeleting) {
        if (text.length < currentSuffix.length) {
          setText(currentSuffix.slice(0, text.length + 1));
        } else {
          if (loopIndex === suffixes.length - 1) {
            setIsDone(true);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        }
      } else {
        if (text.length > 0) {
          setText(currentSuffix.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, isDone, suffixes]);

  return (
    <div className="py-12 relative flex justify-center md:justify-start">
      <style jsx>{`
        @keyframes liquidFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .liquid-text {
          /* 
             Darker "Obsidian" Liquid Gradient 
             Starts Dark Slate -> Deep Teal -> White Reflection -> Deep Teal -> Dark Slate
             This ensures it matches the "Dive into" color at the edges but glows inside.
          */
          background: linear-gradient(
            90deg, 
            #1e293b 0%,   /* Slate 800 (Matches body text) */
            #0f766e 25%,  /* Teal 700 (Rich, Deep Teal) */
            #0000 45%,  /* Slate 200 (Soft Silver Shine) */
            #0000 50%,  /* Pure White (Sharp Highlight) */
            #0000 55%,  /* Slate 200 */
            #0f766e 75%,  /* Teal 700 */
            #1e293b 100%  /* Slate 800 */
          );
          
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          
          animation: liquidFlow 4s linear infinite; /* Slowed down slightly for elegance */
          
          /* Subtle dark glow to lift it off the light background */
          filter: drop-shadow(0 2px 4px rgba(15, 118, 110, 0.2));
        }
      `}</style>

      {/* Spotlight for readability */}
      <div className="absolute inset-0 -inset-x-4 md:-inset-x-10 bg-white/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 leading-tight">
        {/* Static Prefix - Dark Slate */}
        <span 
          className="text-slate-800"
          style={{ textShadow: "0 1px 1px #0000" }}
        >
          {prefix}
        </span>
        
        {/* Dynamic Suffix - Dark Liquid */}
        <span className="relative ml-3 inline-block">
          <span className="liquid-text font-extrabold pb-2 inline-block">
            {text}
          </span>
          
          {/* Cursor - Matching Dark Teal */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -right-3 md:-right-5 top-2 bottom-2 inline-block w-[4px] bg-teal-700 rounded-full"
            style={{ boxShadow: "0 0 8px rgba(15, 118, 110, 0.6)" }}
          />
        </span>
      </h1>
    </div>
  );
}