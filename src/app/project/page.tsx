import AppLayout from "@/components/AppLayout";
import { ProjectsSection } from "@/components/projectPage/ProjectsSection";
import { ThemeFlipHeading } from "@/components/ui/ThemeFlipHeading";

export default function ProjectPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-8 min-h-screen">

        <ThemeFlipHeading
          prefix="Dive into Our "
          words={["Innovations.", "Creativities.", "Projects.", "Visions."]}
        />

        <ProjectsSection />
      </div>
    </AppLayout>
  );
}