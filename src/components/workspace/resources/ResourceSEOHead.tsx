
import React from 'react';
import SEO from '@/components/common/SEO';

interface ResourceSEOHeadProps {
  title: string;
  description: string;
  fileType: string;
  fileUrl: string;
  keywords?: string;
  datePublished?: string;
  author?: string;
  category?: string;
}

/**
 * Component for adding SEO metadata for downloadable resources
 */
const ResourceSEOHead: React.FC<ResourceSEOHeadProps> = ({
  title,
  description,
  fileType,
  fileUrl,
  keywords = "",
  datePublished = new Date().toISOString(),
  author = "Progineer",
  category = "Ressource"
}) => {
  // Generate structured data for the downloadable resource
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": title,
    "description": description,
    "encodingFormat": fileType,
    "url": fileUrl,
    "datePublished": datePublished,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/images/logo.png"
      }
    },
    "about": {
      "@type": "Thing",
      "name": category
    },
    "potentialAction": {
      "@type": "DownloadAction",
      "target": fileUrl
    }
  };

  return (
    <SEO
      title={`${title} | Ressource téléchargeable | Progineer`}
      description={`Téléchargez ${title} - ${description}`}
      keywords={`téléchargement, ressource, ${keywords}`}
      canonicalUrl={fileUrl}
      structuredData={structuredData}
    />
  );
};

export default ResourceSEOHead;
