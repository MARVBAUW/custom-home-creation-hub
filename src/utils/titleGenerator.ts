
type LocationType = 'marseille' | 'aix-en-provence' | 'toulon' | 'nice' | 'cannes' | 'frejus' | undefined;

/**
 * Generates unique SEO-optimized titles for different page types
 */
export const generatePageTitle = (
  pageName: string,
  pageType?: string,
  location?: LocationType
): string => {
  const baseSuffix = "Progineer";
  const locationSuffix = location ? ` à ${location.charAt(0).toUpperCase() + location.slice(1)}` : " en PACA";
  
  // Define specific title formats based on page type
  switch (pageType) {
    case 'service':
      return `${pageName}${locationSuffix} | ${baseSuffix} MOE`;
      
    case 'prestations':
      return `${pageName} | Services Maître d'œuvre${locationSuffix}`;
      
    case 'legal':
      return `${pageName} | Maître d'œuvre ${baseSuffix}`;
      
    case 'resource':
      return `${pageName} | Documentation ${baseSuffix}`;
      
    case 'article':
      return `${pageName} | Blog ${baseSuffix}`;
      
    default:
      // For home page
      if (pageName === "Accueil") {
        return `Maître d'œuvre${locationSuffix} | Construction & Rénovation | ${baseSuffix}`;
      }
      
      // For other pages
      return `${pageName} | Maître d'œuvre${locationSuffix} - ${baseSuffix}`;
  }
};
