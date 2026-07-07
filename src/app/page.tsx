import AppLayout from "@/components/AppLayout";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Services from "@/components/home/Services";
import CreativeProjects from "@/components/home/CreativeProjects";
import Process from "@/components/home/Process";
import ProofSection from "@/components/home/ProofSection";
import FinalCTA from "@/components/home/FinalCTA";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/ui/Reveal";

// Server component — ships as static HTML; interactivity lives in leaf islands.
export default function HomePage() {
  return (
    <AppLayout>
      <div className="relative min-h-screen">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Proof band — real numbers, geographies, capabilities */}
        <TrustStrip />

        {/* 3. What we build */}
        <Services />

        {/* 4. Selected Work */}
        <section id="work" className="relative z-10 py-24 md:py-32 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="mb-16">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-green mb-4">
                Selected Work
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
                Six projects. Five geographies.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                Production AI, multi-tenant platforms, mobile apps, ERP suites,
                property tech, and a live hospital system — shipped for clients
                across Brazil, Australia, India, the USA, and Europe.
              </p>
            </Reveal>
            <CreativeProjects />
          </div>
        </section>

        {/* 5. How we run a project */}
        <Process />

        {/* 6. Why work with us — real numbers */}
        <ProofSection />

        {/* 7. FAQ */}
        <section className="relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <FAQ />
          </div>
        </section>

        {/* 8. Final contact CTA */}
        <FinalCTA />
      </div>
    </AppLayout>
  );
}
