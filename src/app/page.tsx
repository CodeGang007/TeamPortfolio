"use client";

import AppLayout from "@/components/AppLayout";
import AskForProject from "@/components/home/AskForProject";
import FloatingHero from "@/components/home/FloatingHero";
import MarqueeTags from "@/components/home/MarqueeTags";
import ProcessSteps from "@/components/home/ProcessSteps";
import CreativeProjects from "@/components/home/CreativeProjects";
import TrilemmaGame from "@/components/TrilemmaGame";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="relative min-h-screen bg-gumroad-cream overflow-hidden">

        <FloatingHero />

        <ProcessSteps />

        <MarqueeTags />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Projects Section */}
          <section className="py-24">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                  <span className="w-3 h-3 bg-gumroad-green border border-black rounded-full animate-pulse"></span>
                  <span className="text-sm font-black tracking-widest uppercase text-black">
                    Featured Work
                  </span>
                </div>
              </div>

              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic text-black">
                Latest <span className="text-gumroad-pink" style={{ textShadow: "4px 4px 0px #000" }}>Projects</span>
              </h2>
              <p className="text-xl max-w-2xl mx-auto font-bold text-black/80">
                Explore our most recent work showcasing <span className="bg-gumroad-yellow px-1 border border-black shadow-[2px_2px_0px_0px_#000]">innovation</span>, design excellence, and technical mastery.
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
      </div>
    </AppLayout>
  );
}
