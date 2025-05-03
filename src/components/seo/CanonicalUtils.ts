// Utility functions for handling canonical URLs and breadcrumb schema

/**
 * Generate a proper canonical URL
 * @param pathname Current pathname
 * @param customCanonical Optional custom canonical URL
 * @returns Complete canonical URL
 */
export const generateCanonicalUrl = (pathname: string, customCanonical?: string): string => {
  // If a custom canonical URL is provided, use it
  if (customCanonical) {
    // Make sure it's an absolute URL
    if (customCanonical.startsWith('http')) {
      return customCanonical;
    } else {
      // If it's a relative URL, convert it to absolute
      return `https://progineer.fr${customCanonical.startsWith('/') ? customCanonical : `/${customCanonical}`}`;
    }
  }
  
  // Otherwise, generate a canonical URL from the current pathname
  return `https://progineer.fr${pathname}`;
};

/**
 * Generate a BreadcrumbList schema for structured data
 * @param breadcrumbs Array of breadcrumb items with name and URL
 * @returns BreadcrumbList structured data object
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{name: string, url: string}>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `https://progineer.fr${item.url}`
    }))
  };
};
