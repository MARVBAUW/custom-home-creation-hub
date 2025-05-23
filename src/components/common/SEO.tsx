
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generatePageTitle } from '@/utils/titleGenerator';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  children?: React.ReactNode;
  pageType?: string;
  location?: 'marseille' | 'aix-en-provence' | 'toulon' | 'nice' | 'cannes' | 'frejus';
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl = 'https://progineer.fr',
  ogType = 'website',
  ogImage = 'https://progineer.fr/images/progineer-social-card.jpg',
  structuredData,
  children,
  pageType,
  location,
}) => {
  // Generate optimized title
  const formattedTitle = generatePageTitle(title, pageType, location);
  
  // Make sure description is not too long (Google typically displays ~155-160 characters)
  const formattedDescription = description.length > 160 ? description.substring(0, 160) + '...' : description;

  // Default structured data if none is provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Progineer - Maître d'œuvre en PACA",
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
      "postalCode": "13000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.296482",
      "longitude": "5.369780"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Marseille"
      },
      {
        "@type": "City",
        "name": "Nice"
      },
      {
        "@type": "City",
        "name": "Toulon"
      },
      {
        "@type": "City",
        "name": "Cannes"
      },
      {
        "@type": "City",
        "name": "Fréjus"
      },
      {
        "@type": "AdministrativeArea",
        "name": "PACA"
      }
    ],
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
    ],
    "keywords": keywords || "maître d'œuvre marseille, coordination corps de métier, expertise technique, respect des délais",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "43.296482",
        "longitude": "5.369780"
      },
      "geoRadius": "100000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de maîtrise d'œuvre",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Construction neuve",
            "url": "https://progineer.fr/prestations-maitre-oeuvre/construction-neuve"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rénovation",
            "url": "https://progineer.fr/prestations-maitre-oeuvre/renovation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Extension",
            "url": "https://progineer.fr/prestations-maitre-oeuvre/extension"
          }
        }
      ]
    }
  };

  // Serialize structured data safely
  const structuredDataString = JSON.stringify(structuredData || defaultStructuredData);
  const breadcrumbDataString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://progineer.fr"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": canonicalUrl
      }
    ]
  });

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
      <meta httpEquiv="Content-Language" content="fr" />

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

      {/* Favicon */}
      <link rel="icon" href="/progineer-favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/progineer-apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/progineer-icon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/progineer-icon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#787346" />

      {/* Structured Data (JSON-LD) for Rich Results */}
      <script type="application/ld+json">{structuredDataString}</script>

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Additional meta tags for social sharing */}
      <meta property="article:publisher" content="https://www.facebook.com/progineer" />
      
      {/* Additional structured data for breadcrumbs */}
      <script type="application/ld+json">{breadcrumbDataString}</script>

      {/* Add link to sitemap */}
      <link rel="sitemap" type="application/xml" href="https://progineer.fr/sitemap.xml" />

      {/* Additional meta tags can be passed as children */}
      {children}
    </Helmet>
  );
};

export default SEO;
