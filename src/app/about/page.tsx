import { Metadata } from 'next';
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: 'About Us | CodeGang',
  description: 'Learn about CodeGang\'s journey, our founders, and our mission to architect the digital future with detailed strategies and awards.'
};

export default function AboutPage() {
  return <AboutPageContent />;
}
