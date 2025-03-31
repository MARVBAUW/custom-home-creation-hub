
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl = 'https://progineer.fr',
  ogType = 'website',
  ogImage = 'https://progineer.fr/images/progineer-social-card.jpg', // Image par défaut mise à jour
  structuredData,
  children,
}) => {
  // Make sure title is not too long (Google typically displays the first 50-60 characters)
  const formattedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;
  
  // Make sure description is not too long (Google typically displays ~155-160 characters)
  const formattedDescription = description.length > 160 ? description.substring(0, 160) + '...' : description;

  // Si aucun structured data n'est fourni, utiliser les données par défaut de l'entreprise
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Progineer",
    "description": "Entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA.",
    "url": "https://progineer.fr",
    "logo": "https://progineer.fr/images/progineer-logo.png",
    "image": "https://progineer.fr/images/progineer-social-card.jpg",
    "telephone": "+33783762156",
    "email": "progineer.moe@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marseille",
      "addressRegion": "PACA",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.296482",
      "longitude": "5.369780"
    },
    "areaServed": ["Marseille", "Nice", "Toulon", "Cannes", "Fréjus", "PACA"],
    "sameAs": [
      "https://facebook.com/progineer",
      "https://instagram.com/progineer",
      "https://linkedin.com/company/progineer"
    ],
    "priceRange": "€€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={formattedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language */}
      <html lang="fr" />
      <meta property="og:locale" content="fr_FR" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Progineer" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={formattedDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon - nouvelles versions correspondant à la charte graphique */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/progineer-apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/progineer-icon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/progineer-icon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#787346" />

      {/* Structured Data (JSON-LD) for Rich Results */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Additional meta tags can be passed as children */}
      {children}
    </Helmet>
  );
};

export default SEO;
