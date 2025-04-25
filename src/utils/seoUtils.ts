// Set of existing titles to track uniqueness
const existingTitles = new Set<string>();
const existingDescriptions = new Set<string>();

/**
 * Validates if a title is unique by checking against existing titles
 * @param title The title to check
 * @returns boolean indicating if title is unique
 */
export const validateUniqueTitle = (title: string): boolean => {
  const normalizedTitle = title.toLowerCase().trim();
  if (existingTitles.has(normalizedTitle)) {
    return false;
  }
  existingTitles.add(normalizedTitle);
  return true;
}

/**
 * Validates if a description is unique
 * @param description The description to check
 * @returns boolean indicating if description is unique
 */
export const validateUniqueDescription = (description: string): boolean => {
  const normalizedDesc = description.toLowerCase().trim();
  if (existingDescriptions.has(normalizedDesc)) {
    return false;
  }
  existingDescriptions.add(normalizedDesc);
  return true;
}

/**
 * Get a properly formatted page title
 * @param pageTitle The main part of the title 
 * @param suffix Optional suffix, defaults to "Progineer"
 * @returns Formatted title string
 */
export const formatPageTitle = (pageTitle: string, suffix = "Progineer"): string => {
  // Remove any existing suffix pattern if present
  let cleanTitle = pageTitle.replace(/\s*\|\s*Progineer.*$/, '').trim();
  return `${cleanTitle} | ${suffix}`;
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
