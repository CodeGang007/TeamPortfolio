"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./GlassLetter.module.css";

const GlassLetter = ({ char, index }: { char: string; index: number }) => {
  return (
    <span
      className={styles.letterWrapper}
      data-text={char}
      style={{ "--i": index } as React.CSSProperties}
    >
      <span className={styles.glassBase}>{char}</span>
      <span className={styles.rim}>{char}</span>
      <span className={styles.liquidContent} data-text={char}>{char}</span>
      <span className={styles.bubbles}>{char}</span>
      <span className={styles.shine}>{char}</span>
      <span className="opacity-0 select-none pointer-events-none">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  );
};

export default function TypingHeading({ prefix, suffixes }: { prefix: string; suffixes: string[] }) {
  const [text, setText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!suffixes?.length || isDone) return;
    const currentSuffix = suffixes[loopIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const handleTyping = () => {
      if (!isDeleting) {
        if (text.length < currentSuffix.length) {
          setText(currentSuffix.slice(0, text.length + 1));
        } else {
          if (loopIndex === suffixes.length - 1) setIsDone(true);
          else setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (text.length > 0) setText(currentSuffix.slice(0, text.length - 1));
        else {
          setIsDeleting(false);
          setLoopIndex((prev) => (prev + 1) % suffixes.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, isDone, suffixes]);

  return (
    <div className="relative py-20 flex flex-col items-center justify-center bg-transparent overflow-visible text-center">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight flex flex-col md:flex-row items-center gap-4">
        {/* Solid White Prefix */}
        <span className="text-white select-none drop-shadow-lg">
          {prefix}
        </span>

        {/* Animated Suffix with Gradient */}
        <div className="relative flex items-center min-w-[300px] justify-start">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={loopIndex}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400 whitespace-nowrap"
            >
              {suffixes[loopIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </h1>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-green/5 blur-3xl -z-10 rounded-full" />
    </div>
  );
}