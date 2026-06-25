"use client";

import AppLayout from "@/components/AppLayout";
import AskForProject from "@/components/home/AskForProject";
import FloatingHero from "@/components/home/FloatingHero";
import PerformanceStats from "@/components/home/PerformanceStats";
import ServiceWorkflow from "@/components/home/ServiceWorkflow";
import MyTopPublications from "@/components/home/MyTopPublications";
import CreativeProjects from "@/components/home/CreativeProjects";
import TrustStrip from "@/components/home/TrustStrip";
import FinalCTA from "@/components/home/FinalCTA";

import UserStories from "@/components/UserStories";
import FAQ from "@/components/FAQ";
import CheckeredBackground from "@/components/CheckeredBackground";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const isOnline = isAuthenticated;

  return (
    <AppLayout>
      <CheckeredBackground />
      <div className="relative min-h-screen bg-transparent overflow-hidden">
        {/* 1. Hero */}
        <FloatingHero />

        {/* 2. Trust strip — geographies + capabilities */}
        <TrustStrip />

        {/* 3. What we build */}
        <MyTopPublications />

        {/* 4. Selected Work — full-width stacked rows */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-16"
            >
              <span className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 block ${isOnline ? 'text-brand-green' : 'text-red-500'}`}>
                Selected Work
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Six projects. <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isOnline ? 'from-brand-green to-emerald-400' : 'from-red-400 to-rose-300'}`}>
                  Five geographies.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg mt-4 max-w-2xl">
                Production AI, multi-tenant platforms, mobile apps, ERP suites, property tech, and a live hospital system — shipped for clients across Brazil, Australia, India, the USA, and Europe.
              </p>
            </motion.div>
            <CreativeProjects />
          </div>
        </section>

        {/* 5. How we run a project */}
        <ServiceWorkflow />

        {/* 6. Why work with us + at a glance */}
        <PerformanceStats />

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* 7. Testimonials */}
          <UserStories />

          {/* 8. FAQ */}
          <FAQ />

          {/* 9. Inspired? Build your own */}
          <AskForProject />
        </div>

        {/* 10. Final contact CTA */}
        <FinalCTA />
      </div>


    </AppLayout>
  );
}
