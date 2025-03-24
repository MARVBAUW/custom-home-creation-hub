
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
  ogImage = 'https://progineer.fr/og-image.jpg',
  structuredData,
  children,
}) => {
  // Make sure title is not too long (Google typically displays the first 50-60 characters)
  const formattedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;
  
  // Make sure description is not too long (Google typically displays ~155-160 characters)
  const formattedDescription = description.length > 160 ? description.substring(0, 160) + '...' : description;

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

      {/* Structured Data (JSON-LD) for Rich Results */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Additional meta tags can be passed as children */}
      {children}
    </Helmet>
  );
};

export default SEO;
