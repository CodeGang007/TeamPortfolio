"use client";

import React from "react";
import AppLayout from "@/components/AppLayout";
import { AboutHero } from "@/components/about/AboutHero";
import { StorySection } from "@/components/about/StorySection";
import { StatsSection } from "@/components/about/StatsSection";
import { TimelineSection } from "@/components/about/TimelineSection";
import { StrategiesSection } from "@/components/about/StrategiesSection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { AwardsSection } from "@/components/about/AwardsSection";
import { ProcessSection } from "@/components/about/ProcessSection";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AboutPageContent() {
  const { isAuthenticated } = useAuth();
  return (
    <AppLayout>
      <div className="bg-black min-h-screen">
        <AboutHero />
        <StorySection />
        <StatsSection />
        <TimelineSection />
        <StrategiesSection />
        <ProcessSection />
        <FoundersSection />
        <AwardsSection />

        {/* CTA Section (Seeking Help?) */}
        <section className="py-24 bg-zinc-950/50 text-center border-t border-zinc-900">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Seeking Help? <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isAuthenticated ? "from-brand-green to-emerald-400" : "from-red-500 to-orange-400"}`}>Let's Talk</span>
          </h2>
          <Link href="/contactus" className={`inline-block font-bold py-4 px-10 rounded-full transition-all hover:scale-105 ${isAuthenticated ? "bg-brand-green hover:bg-emerald-500 text-black shadow-[0_0_30px_rgba(0,255,65,0.4)]" : "bg-red-500 hover:bg-orange-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]"}`}>
            Get In Touch
          </Link>
        </section>
      </div>
    </AppLayout>
  );
}
