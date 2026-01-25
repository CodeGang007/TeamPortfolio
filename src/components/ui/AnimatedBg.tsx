"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function AnimatedBackground() {
  const { isAuthenticated } = useAuth();
  const isOnline = isAuthenticated;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-black pointer-events-none">
      {/* Grid Pattern - Static CSS is faster than dynamic tailwind classes for background */}
      <div 
        className={`absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transition-opacity duration-1000 ${!isOnline ? 'opacity-50' : 'opacity-100'}`}
        style={{ willChange: 'opacity' }}
      ></div>

      {/* Subtle Glow - Hardware accelerated */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[50vh] blur-[100px] rounded-full transition-colors duration-1000 ${isOnline ? 'bg-brand-green/5' : 'bg-red-600/10'}`}
        style={{ willChange: 'background-color', transform: 'translateZ(0)' }}
      ></div>
    </div>
  );
}