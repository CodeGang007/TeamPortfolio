"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@nextui-org/button";
import { ArrowRight, Github } from "lucide-react";

export default function FloatingHero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement (spring physics)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate position relative to center (ranges from -1 to 1)
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Tilt up/down
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Tilt left/right
  
  // Parallax effect for the background glow
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["-20%", "20%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["-20%", "20%"]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-1000"
      style={{ perspective: 1000 }} // Needed for 3D effect
    >
      {/* 3D Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 p-10 md:p-20 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
      >
        {/* Inner Content with "Pop" effect (Z-axis translation) */}
        <div style={{ transform: "translateZ(50px)" }} className="text-center">
            
          {/* Floating Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-purple-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-xs font-medium text-purple-300 tracking-wide">
              INTERACTIVE 3D
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
            Design Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Dimensions.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Move your cursor. This entire card floats in 3D space using React
            and Framer Motion physics.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-black font-bold px-8 shadow-xl shadow-white/10"
              endContent={<ArrowRight size={18} />}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-gray-600 text-white font-medium"
              startContent={<Github size={18} />}
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Dynamic Spotlight / Glow moving behind the content */}
        <motion.div
          style={{ x: glowX, y: glowY, z: -10 }} // z-10 pushes it behind text
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/0 rounded-[3rem] blur-2xl -z-10 pointer-events-none"
        />
      </motion.div>

      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      {/* Ambient background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
    </section>
  );
}