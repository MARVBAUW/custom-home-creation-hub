
import React from 'react';
import SEO from '@/components/common/SEO';
import { validateUniqueTitle, validateUniqueDescription, formatPageTitle } from '@/utils/seoUtils';

interface SEOHeaderProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  structuredData?: object;
  includeLocationSuffix?: boolean;
}

/**
 * Enhanced SEO component that validates uniqueness of title and description
 */
const SEOHeader: React.FC<SEOHeaderProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  structuredData,
  includeLocationSuffix = true
}) => {
  // In a production app, we'd use this to validate, but for now it's a placeholder
  const isUniqueTitle = validateUniqueTitle(title);
  const isUniqueDescription = validateUniqueDescription(description);
  
  // Warning for duplicate titles/descriptions during development
  if (process.env.NODE_ENV === 'development') {
    if (!isUniqueTitle) {
      console.warn(`Warning: Potentially duplicate title detected: "${title}"`);
    }
    
    if (!isUniqueDescription) {
      console.warn(`Warning: Potentially duplicate description detected: "${description}"`);
    }
  }

  // Format the title with location suffix if needed
  const fullTitle = includeLocationSuffix 
    ? `${title} en PACA | Progineer` 
    : formatPageTitle(title);

  return (
    <SEO
      title={fullTitle}
      description={description}
      keywords={keywords}
      canonicalUrl={canonicalUrl}
      structuredData={structuredData}
    />
  );
};

export default SEOHeader;
