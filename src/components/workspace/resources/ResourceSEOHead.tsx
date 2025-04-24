
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
  fileSize?: number;
  pageCount?: number;
  language?: string;
}

/**
 * Enhanced component for adding SEO metadata for downloadable resources
 */
const ResourceSEOHead: React.FC<ResourceSEOHeadProps> = ({
  title,
  description,
  fileType,
  fileUrl,
  keywords = "",
  datePublished = new Date().toISOString(),
  author = "Progineer",
  category = "Ressource",
  fileSize,
  pageCount,
  language = "fr"
}) => {
  // Define the type for our structured data to allow for additional properties
  type StructuredDataType = {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    encodingFormat: string;
    url: string;
    datePublished: string;
    inLanguage: string;
    author: {
      "@type": string;
      name: string;
    };
    publisher: {
      "@type": string;
      name: string;
      logo: {
        "@type": string;
        url: string;
      };
    };
    about: {
      "@type": string;
      name: string;
    };
    potentialAction: {
      "@type": string;
      target: string;
    };
    [key: string]: any; // This allows for additional properties
  };

  // Generate structured data for the downloadable resource
  const structuredData: StructuredDataType = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": title,
    "description": description,
    "encodingFormat": fileType,
    "url": fileUrl,
    "datePublished": datePublished,
    "inLanguage": language,
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

  // Add optional properties if provided
  if (fileSize) {
    structuredData.contentSize = `${fileSize} KB`;
  }

  if (pageCount) {
    structuredData.numberOfPages = pageCount;
  }

  // Add file-specific schema for PDF documents
  const fileSpecificSchema = fileType.toLowerCase() === 'pdf' ? {
    "@context": "https://schema.org",
    "@type": "PresentationDigitalDocument",
    "url": fileUrl,
    "name": title,
    "description": description,
    "datePublished": datePublished,
    "publisher": {
      "@type": "Organization",
      "name": "Progineer"
    }
  } : null;

  return (
    <>
      <SEO
        title={`${title} | Ressource téléchargeable | Progineer`}
        description={`Téléchargez ${title} - ${description}`}
        keywords={`téléchargement, ressource, ${keywords}`}
        canonicalUrl={fileUrl}
        structuredData={structuredData}
      />
      
      {/* Additional schema for PDF files */}
      {fileSpecificSchema && (
        <script type="application/ld+json">
          {JSON.stringify(fileSpecificSchema)}
        </script>
      )}
      
      {/* Allow search engines to index PDF content */}
      <meta name="googlebot" content="index, follow" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph tags specific to downloadable files */}
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={datePublished} />
      <meta property="article:section" content={category} />
      <meta property="article:tag" content={keywords} />
    </>
  );
};

export default ResourceSEOHead;
