"use client";

import FloatingHero from "@/components/FloatingHero";
import SideDrawer from "@/components/SideDrawer"; // Keeping your drawer

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden selection:bg-purple-500 selection:text-white">
      <SideDrawer />
      
      {/* The new Interactive Hero */}
      <FloatingHero />
      
      {/* Example content below to show it's a section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">More Content Below</h2>
        <p className="text-gray-500">Scroll down to leave the 3D space.</p>
      </section>
    </main>
  );
}