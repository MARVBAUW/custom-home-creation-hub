
/**
 * Utilities for managing SEO across the site
 */

/**
 * Validates if a title is unique by checking against existing titles
 * @param title The title to check
 * @returns boolean indicating if title is unique
 */
export const validateUniqueTitle = (title: string): boolean => {
  // This would typically check against a database or config file of existing titles
  // For now, this is a placeholder
  return true;
}

/**
 * Validates if a description is unique
 * @param description The description to check
 * @returns boolean indicating if description is unique
 */
export const validateUniqueDescription = (description: string): boolean => {
  // This would typically check against a database or config file
  // For now, this is a placeholder
  return true;
}

/**
 * Get a properly formatted page title
 * @param pageTitle The main part of the title
 * @param suffix Optional suffix, defaults to "Progineer"
 * @returns Formatted title string
 */
export const formatPageTitle = (pageTitle: string, suffix = "Progineer"): string => {
  return `${pageTitle} | ${suffix}`;
}

/**
 * Ensure meta description has the right length
 * @param description The description to validate
 * @returns Truncated description if too long
 */
export const validateDescriptionLength = (description: string): string => {
  const MAX_LENGTH = 155;
  if (description.length > MAX_LENGTH) {
    return description.substring(0, MAX_LENGTH - 3) + '...';
  }
  return description;
}

/**
 * Generate a structured data object for a service page
 * @param serviceData Information about the service
 * @returns Structured data object
 */
export const generateServiceStructuredData = (
  {
    name,
    description,
    provider = "Progineer",
    region = "PACA",
    image = "https://progineer.fr/images/logo.png",
    locality = "Marseille"
  }: {
    name: string;
    description: string;
    provider?: string;
    region?: string;
    image?: string;
    locality?: string;
  }
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "ProfessionalService",
      "name": provider,
      "image": image,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locality,
        "addressRegion": region,
        "addressCountry": "FR"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Provence-Alpes-Côte d'Azur"
    }
  };
}
