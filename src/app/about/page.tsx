import { Metadata } from 'next';
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: 'About Us | CodeGang',
  description: 'Learn about CodeGang\'s journey, our founders, and our mission to architect the digital future with detailed strategies and awards.'
};

import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs 
        items={[
          { name: 'Home', item: '/' },
          { name: 'About Us', item: '/about' }
        ]} 
      />
      <AboutPageContent />
    </>
  );
}
