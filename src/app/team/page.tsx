import { Suspense } from "react";
import AppLayout from "@/components/AppLayout";
import TypingHeading from "@/components/projectPage/TypingHeading";
import { TeamSection } from "@/components/teampage/TeamSection";

export default function TeamPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-8 min-h-screen">
        <TypingHeading
          prefix="Meet Our "
          suffixes={["Team.", "Creators.", "Innovators."]}
        />

        <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading team...</div>}>
          <TeamSection />
        </Suspense>
      </div>
    </AppLayout>
  );
}
