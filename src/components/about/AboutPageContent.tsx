"use client";

import React from "react";
import AppLayout from "@/components/AppLayout";
import { AboutHero } from "@/components/about/AboutHero";
import { StorySection } from "@/components/about/StorySection";
import { StatsSection } from "@/components/about/StatsSection";
import { TimelineSection } from "@/components/about/TimelineSection";
import { StrategiesSection } from "@/components/about/StrategiesSection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { ProcessSection } from "@/components/about/ProcessSection";
import Link from "next/link";

export default function AboutPageContent() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        <AboutHero />
        <StorySection />
        <StatsSection />
        <TimelineSection />
        <StrategiesSection />
        <ProcessSection />
        <FoundersSection />

        {/* CTA Section */}
        <section className="py-24 text-center border-t border-white/[0.06]">
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white mb-8">
            Seeking Help? <span className="text-brand-green">Let&apos;s Talk</span>
          </h2>
          <Link href="/contactus" className="inline-block font-medium py-4 px-10 rounded-full transition-colors bg-brand-green hover:bg-brand-green-bright text-zinc-950">
            Get In Touch
          </Link>
        </section>
      </div>
    </AppLayout>
  );
}
