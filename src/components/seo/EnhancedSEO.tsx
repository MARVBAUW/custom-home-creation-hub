
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateCanonicalUrl, generateBreadcrumbSchema } from './CanonicalUtils';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  children?: React.ReactNode;
  breadcrumbs?: Array<{name: string, url: string}>;
  noIndex?: boolean;
}

const EnhancedSEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://progineer.fr/images/progineer-social-card.jpg',
  structuredData,
  children,
  breadcrumbs,
  noIndex = false
}) => {
  const location = useLocation();
  
  // Generate proper canonical URL
  const finalCanonicalUrl = generateCanonicalUrl(location.pathname, canonicalUrl);

  // Generate breadcrumb schema if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical tag - essential for SEO with similar content */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Indexing directives */}
      {noIndex ? 
        <meta name="robots" content="noindex, follow" /> :
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }
      
      {/* Language */}
      <html lang="fr" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Open Graph / Social Media */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Progineer | Maître d'œuvre en PACA" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumb schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* Local Business schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Progineer",
          "image": "https://progineer.fr/images/progineer-logo.png",
          "url": "https://progineer.fr",
          "telephone": "0783762156",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "",
            "addressLocality": "Marseille",
            "postalCode": "13000",
            "addressRegion": "PACA",
            "addressCountry": "FR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.296482,
            "longitude": 5.36978
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ]
        })}
      </script>
      
      {/* Additional meta tags can be passed as children */}
      {children}
    </Helmet>
  );
};

export default EnhancedSEO;
