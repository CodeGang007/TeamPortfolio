import AppLayout from "@/components/AppLayout";
import { ProjectsSection } from "@/components/projectPage/ProjectsSection";
import { ThemeFlipHeading } from "@/components/ui/ThemeFlipHeading";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | CodeGang',
  description: 'Explore our portfolio of high-performance web applications, innovative designs, and scalable digital solutions built for top clients.'
};

import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function ProjectPage() {
  return (
    <AppLayout>
      <Breadcrumbs 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Projects', item: '/project' }
        ]} 
      />
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