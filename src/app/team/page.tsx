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

        <TeamSection />
      </div>
    </AppLayout>
  );
}
