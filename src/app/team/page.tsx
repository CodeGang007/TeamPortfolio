import { Suspense } from "react";
import AppLayout from "@/components/AppLayout";
import { ThemeFlipHeading } from "@/components/ui/ThemeFlipHeading";
import { TeamSection } from "@/components/teampage/TeamSection";

export default function TeamPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-8 min-h-screen pb-32">
        <ThemeFlipHeading
          prefix="Meet Our "
          words={["Team.", "Creators.", "Innovators.", "Wizards."]}
        />

        <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading team...</div>}>
          <TeamSection />
        </Suspense>
      </div>
    </AppLayout>
  );
}
