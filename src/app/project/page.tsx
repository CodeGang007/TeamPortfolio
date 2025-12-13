import AppLayout from "@/components/AppLayout";
import { ProjectsSection } from "@/components/projectPage/ProjectsSection";
import TypingHeading from "@/components/projectPage/TypingHeading";


export default function ProjectPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-8">
        <TypingHeading text="Projects" />

        <p className="mb-10 max-w-xl text-slate-600">
          A curated selection of platforms and systems we’ve built across
          domains.
        </p>

        <ProjectsSection />
      </div>
    </AppLayout>
  );
}
