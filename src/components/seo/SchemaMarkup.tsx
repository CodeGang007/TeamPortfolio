import { site } from "@/content/site";

export default function SchemaMarkup() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.domain,
    logo: `${site.domain}/assets/cg-logo-online.png`,
    sameAs: [site.x, site.linkedin, site.github],
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    description: site.description,
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
  };

  return (
    <>
      <script
        id="schema-org-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        id="schema-org-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
