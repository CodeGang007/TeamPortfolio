import { services } from "@/content/pages";
import { site, stats, marketsLong } from "@/content/site";

/**
 * Sitewide structured data.
 *
 * Two audiences read this: search crawlers, and the answer engines people
 * increasingly ask instead of searching. The second kind quotes whatever it
 * can attribute confidently, so the job here is to state plainly what the
 * company does, where it works, and what it can be hired for — every field
 * derived from the same content files the visible pages render, never
 * re-typed. A claim that cannot be sourced does not appear (there is no
 * aggregateRating here for exactly that reason).
 */
export default function SchemaMarkup() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.domain}#organization`,
    name: site.name,
    url: site.domain,
    logo: `${site.domain}/assets/cg-logo-online.png`,
    image: `${site.domain}/assets/cg-logo-online.png`,
    description: site.description,
    email: site.email,
    telephone: `+${site.whatsapp}`,
    sameAs: [site.linkedin, site.x, site.instagram],
    areaServed: [
      { "@type": "Country", name: "Brazil" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "Europe" },
    ],
    // The topics we can actually be asked about. This is the field an answer
    // engine leans on when deciding whether we are a relevant answer at all.
    knowsAbout: [
      "Production AI systems",
      "Retrieval-augmented generation",
      "AI agents and tool calling",
      "Multi-tenant SaaS platforms",
      "ERP and internal business systems",
      "Mobile application development",
      "Cloud architecture on AWS",
      "Software engineering consultancy",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: site.email,
        telephone: `+${site.whatsapp}`,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software engineering services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.eyebrow,
          description: s.intro,
          url: `${site.domain}/services/${s.slug}`,
        },
      })),
    },
    slogan: "The engineer in the meeting writes the code.",
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.domain}#website`,
    name: site.name,
    url: site.domain,
    publisher: { "@id": `${site.domain}#organization` },
    description: `${site.description} ${stats.live} systems live across ${marketsLong}.`,
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
