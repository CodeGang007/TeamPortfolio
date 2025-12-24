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
    <div className="relative py-12 flex flex-col md:flex-row items-center justify-start bg-transparent overflow-visible">
      
      {/* ULTRA-GLOSS MASTER FILTER */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="ultra-gloss-aquarium" x="-25%" y="-25%" width="150%" height="150%">
            {/* 1. Bit Wavy Container: Noise-based displacement */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="1" result="noise">
              <animate attributeName="seed" from="1" to="100" dur="15s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" result="wavySource" />

            {/* 2. Volume & Lighting pass */}
            <feGaussianBlur in="wavySource" stdDeviation="2.5" result="blur" />
            
            {/* PASS 1: Broad Surface Glow */}
            <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="35" lightingColor="#ffffff" result="spec1">
              <fePointLight x="-50" y="-100" z="250" />
            </feSpecularLighting>
            
            {/* PASS 2: Sharp Edge Sparkle */}
            <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.5" specularExponent="55" lightingColor="#ffffff" result="spec2">
              <fePointLight x="200" y="-100" z="200" />
            </feSpecularLighting>
            
            <feComposite in="spec1" in2="wavySource" operator="in" result="light1" />
            <feComposite in="spec2" in2="wavySource" operator="in" result="light2" />
            <feBlend in="light1" in2="light2" mode="screen" result="studio-light" />
            
            {/* 3. Gooey Edge rounding */}
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11" result="goo" />
            
            {/* 4. Final Composition */}
            <feMerge>
              <feMergeNode in="goo" />
              <feMergeNode in="studio-light" />
            </feMerge>

            {/* Strict containment - liquid stays inside the wavy glass */}
            <feComposite in2="wavySource" operator="atop" />
          </filter>
        </defs>
      </svg>

      <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-tight flex flex-wrap items-center">
        {/* Dark Prefix */}
        <span className="text-[#0f172a] mr-10 select-none">
          {prefix}
        </span>

        {/* The Animated Aquarium Letters */}
        <div className="flex flex-wrap items-center gap-2">
          <AnimatePresence mode="popLayout">
            {text.split("").map((char, index) => (
              <motion.div
                key={`${loopIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                transition={{ type: "spring", damping: 18, stiffness: 240 }}
              >
                <GlassLetter char={char} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>

          {!isDone && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2.5 h-[0.8em] bg-[#0f172a]/20 backdrop-blur-md rounded-full ml-4"
            />
          )}
        </div>
      </h1>
    </div>
  );
}