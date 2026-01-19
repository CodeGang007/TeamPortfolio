import Script from 'next/script';

export default function SchemaMarkup() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CodeGang',
    url: 'https://www.codegang.online',
    logo: 'https://www.codegang.online/assets/cg-logo-online.png',
    sameAs: [
      'https://twitter.com/codegang',
      'https://linkedin.com/company/codegang',
      'https://github.com/codegang'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      areaServed: 'Worldwide',
      availableLanguage: 'English'
    },
    description: 'CodeGang is a premium digital agency architecting the future. We build high-performance web applications, scalable infrastructure, and stunning digital experiences.'
  };

  return (
    <Script
      id="schema-org-markup"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
