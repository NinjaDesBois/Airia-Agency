/* Composant SEO — react-helmet-async + JSON-LD — Airia */
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext'

const SITE_URL = 'https://airia.be'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export default function SEO() {
  const { language, t } = useLanguage()

  const title = t('seo.title')
  const description = t('seo.description')
  const ogTitle = t('seo.ogTitle')
  const ogDescription = t('seo.ogDescription')

  /* Données structurées JSON-LD — SoftwareApplication */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Airia',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Plateforme d\'automatisation IA pour agences immobilières belges. Voice IA, Lead Generation, Pub Meta IA.',
    url: SITE_URL,
    inLanguage: ['fr-BE', 'nl-BE', 'en'],
    offers: {
      '@type': 'Offer',
      price: '500',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'RecurringChargeSpecification',
        billingPeriod: 'P1M',
      },
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: 'Airia',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BE',
        addressLocality: 'Bruxelles',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@airia.be',
        contactType: 'customer service',
      },
    },
    featureList: [
      'Réceptionniste vocale IA 24/7',
      'Lead Generation automatisée',
      'Campagnes Meta Facebook/Instagram',
      'Dashboard temps réel',
      'Support multilingue FR/NL/EN/DE',
      'Déploiement en 48h',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '12',
      bestRating: '5',
    },
  }

  /* Organisation JSON-LD */
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Airia',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [
      'https://linkedin.com/company/airia-be',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BE',
      addressLocality: 'Bruxelles',
    },
  }

  return (
    <Helmet>
      {/* Langue */}
      <html lang={language === 'fr' ? 'fr-BE' : language === 'nl' ? 'nl-BE' : language === 'de' ? 'de' : 'en'} />

      {/* Titre & description */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_BE' : language === 'nl' ? 'nl_BE' : language === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:locale:alternate" content="fr_BE" />
      <meta property="og:locale:alternate" content="nl_BE" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="Airia" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="fr-be" href={SITE_URL} />
      <link rel="alternate" hrefLang="nl-be" href={SITE_URL} />
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

      {/* Mots-clés */}
      <meta name="keywords" content="réceptionniste IA, agence immobilière belgique, automatisation IA, lead generation, voice AI, pub meta IA, agence IA belge, Airia" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Données structurées JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(orgJsonLd)}
      </script>
    </Helmet>
  )
}
