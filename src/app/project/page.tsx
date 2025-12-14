import AppLayout from "@/components/AppLayout";
import { ProjectsSection } from "@/components/projectPage/ProjectsSection";
import TypingHeading from "@/components/projectPage/TypingHeading";

export default function ProjectPage() {
  const headingPrefix = "Dive into Our ";
  const headingSuffixes = [
    "Innovations.", 
    "Creativities.", 
    "Projects."
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-8 min-h-screen">
        
        <TypingHeading 
          prefix={headingPrefix} 
          suffixes={headingSuffixes} 
        />

        <ProjectsSection />
      </div>
    </AppLayout>
  );
}