
import React from 'react';
import SEO from '@/components/common/SEO';
import { validateUniqueTitle, validateUniqueDescription, formatPageTitle } from '@/utils/seoUtils';
import { useLocation } from 'react-router-dom';

interface SEOHeaderProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  structuredData?: object;
  includeLocationSuffix?: boolean;
}

const SEOHeader: React.FC<SEOHeaderProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  structuredData,
  includeLocationSuffix = true
}) => {
  const location = useLocation();
  
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
    ? formatPageTitle(title, 'en PACA | Progineer')
    : formatPageTitle(title);

  return (
    <SEO
      title={fullTitle}
      description={description}
      keywords={keywords}
      canonicalUrl={canonicalUrl || `https://progineer.fr${location.pathname}`}
      structuredData={structuredData}
    />
  );
};

export default SEOHeader;
