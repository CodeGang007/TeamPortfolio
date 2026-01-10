"use client";

import AppLayout from "@/components/AppLayout";
import AskForProject from "@/components/home/AskForProject";
import FloatingHero from "@/components/home/FloatingHero";
import PerformanceStats from "@/components/home/PerformanceStats";
import ServiceWorkflow from "@/components/home/ServiceWorkflow";
import MyTopPublications from "@/components/home/MyTopPublications";

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
        <FloatingHero />

        <PerformanceStats />

        <ServiceWorkflow />
        <MyTopPublications />

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* Vision Section */}
          <AskForProject />

          {/* User Stories Sections */}
          <UserStories />

          {/* FAQ Section */}
          <FAQ />

        </div>
      </div>
    </AppLayout>
  );
}
