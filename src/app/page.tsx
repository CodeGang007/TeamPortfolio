"use client";

import AppLayout from "@/components/AppLayout";
import AskForProject from "@/components/home/AskForProject";
import FloatingHero from "@/components/home/FloatingHero";
import CreativeProjects from "@/components/home/CreativeProjects";
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
          className="absolute bottom-[15%] left-[10%] w-40 h-40 opacity-20 pointer-events-none z-0 transition-all duration-1000"
          style={{
            filter: isOnline
              ? 'hue-rotate(0deg) brightness(1)'
              : 'hue-rotate(290deg) brightness(0.8) saturate(1.5)',
            willChange: "transform"
          }}
          animate={{
            rotate: [0, 15, 0],
            x: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <img src="/3d_cube.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
        </motion.div>

        <FloatingHero />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Projects Section with State-Responsive Header */}
          <section className="py-24">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border transition-all duration-500 ${isOnline
                  ? 'bg-zinc-900 border-brand-green/30'
                  : 'bg-zinc-950 border-red-500/30'
                  }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${isOnline ? 'bg-brand-green' : 'bg-red-500'
                    }`}></span>
                  <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${isOnline ? 'text-brand-green' : 'text-red-500'
                    }`}>
                    {isOnline ? 'Featured Work' : 'System Archive'}
                  </span>
                </div>
              </motion.div>

              <h2 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 italic transition-colors duration-500 ${isOnline ? 'text-white' : 'text-red-100'
                }`}>
                Latest <span className={`text-transparent bg-clip-text transition-all duration-500 ${isOnline
                  ? 'bg-gradient-to-r from-brand-green to-green-400'
                  : 'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}>Projects</span>
              </h2>
              <p className={`text-lg max-w-2xl mx-auto font-light transition-colors duration-500 ${isOnline ? 'text-zinc-500' : 'text-red-300/50'
                }`}>
                {isOnline
                  ? 'Explore our most recent work showcasing innovation, design excellence, and technical mastery.'
                  : 'Archived project data - awaiting system activation...'}
              </p>
            </div>

            <CreativeProjects />
          </section>

          {/* Call to Action Section */}
          <section className="pb-24">
            <TrilemmaGame />
            <AskForProject />
          </section>
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
