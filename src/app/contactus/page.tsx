import { Metadata } from 'next';
import ContactUsPageContent from "@/components/contact/ContactUsPageContent";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: 'Contact Us | CodeGang',
  description: 'Get in touch with CodeGang to discuss your next digital project. We are ready to bring your vision to life.'
};

export default function ContactUsPage() {
  return (
    <>
      <Breadcrumbs 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Contact Us', item: '/contactus' }
        ]} 
      />
      <ContactUsPageContent />
    </>
  );
}

