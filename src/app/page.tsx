"use client";

import AppLayout from "@/components/AppLayout";
import AskForProject from "@/components/home/AskForProject";
import FloatingHero from "@/components/home/FloatingHero";
import MarqueeSection from "@/components/home/MarqueeSection";

import UserStories from "@/components/UserStories";
import FAQ from "@/components/FAQ";
import TrilemmaGame from "@/components/TrilemmaGame";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const isOnline = isAuthenticated;

  return (
    <AppLayout>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Abstract 3D Decorative Elements - Transition with system state */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-64 h-64 opacity-30 pointer-events-none z-0 transition-all duration-1000"
          style={{
            filter: isOnline
              ? 'hue-rotate(0deg) brightness(1)'
              : 'hue-rotate(290deg) brightness(0.8) saturate(1.5)',
            willChange: "transform"
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/3d_blob.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
        </motion.div>

        <motion.div
          className="absolute top-[60%] right-[8%] w-48 h-48 opacity-25 pointer-events-none z-0 transition-all duration-1000"
          style={{
            filter: isOnline
              ? 'hue-rotate(0deg) brightness(1)'
              : 'hue-rotate(290deg) brightness(0.8) saturate(1.5)',
          }}
          animate={{
            rotate: [0, 360],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <img src="/3d_ring.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] left-[8%] w-64 h-64 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 0.8, 0.5], // Pulsing opacity
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <img
            src="/3d_cube.png"
            alt="Tesseract Cube"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <FloatingHero />


        <MarqueeSection />

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* Vision Section */}
          <AskForProject />

          {/* User Stories Sections */}
          <UserStories />

          {/* Call to Action Section */}
          <section className="pb-24">
            <TrilemmaGame />
          </section>

          {/* FAQ Section */}
          <FAQ />

        </div>

        {/* Additional 3D Ornaments at bottom */}
        <motion.div
          className="absolute bottom-[5%] right-[3%] w-56 h-56 opacity-15 pointer-events-none z-0 transition-all duration-1000 scale-x-[-1]"
          style={{
            filter: isOnline
              ? 'hue-rotate(0deg) brightness(1)'
              : 'hue-rotate(290deg) brightness(0.8) saturate(1.5)',
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, -12, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <img src="/3d_blob.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
        </motion.div>
      </div>
    </AppLayout>
  );
}
