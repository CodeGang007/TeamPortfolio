import AppLayout from "@/components/AppLayout";
import { ProjectsSection } from "@/components/projectPage/ProjectsSection";
import { ThemeFlipHeading } from "@/components/ui/ThemeFlipHeading";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | CodeGang',
  description: 'Explore our portfolio of high-performance web applications, innovative designs, and scalable digital solutions built for top clients.'
};

export default function ProjectPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-8 min-h-screen pb-32">

        <ThemeFlipHeading
          prefix="Dive into Our "
          words={["Innovations.", "Creativities.", "Projects.", "Visions."]}
        />

        <ProjectsSection />
      </div>
    </AppLayout>
  );
}