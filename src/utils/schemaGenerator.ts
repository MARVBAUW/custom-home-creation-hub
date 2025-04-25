
/**
 * Utilitaires pour générer facilement des données structurées Schema.org
 */

interface OrganizationSchema {
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    postalCode?: string;
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: string;
    longitude: string;
  };
  sameAs?: string[];
}

interface ServiceSchema {
  name: string;
  description: string;
  provider?: OrganizationSchema;
  areaServed?: string | string[] | object;
  serviceType?: string;
  offers?: object;
}

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Génère des données structurées pour une organisation
 * @param org Informations sur l'organisation
 * @returns Données structurées au format Schema.org
 */
export const generateOrganizationSchema = (org: OrganizationSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "description": org.description,
    "url": org.url || "https://progineer.fr",
    "logo": org.logo || "https://progineer.fr/images/progineer-logo.png",
    "image": org.image || "https://progineer.fr/images/progineer-social-card.jpg",
    "telephone": org.telephone,
    "email": org.email,
    "address": org.address ? {
      "@type": "PostalAddress",
      "streetAddress": org.address.streetAddress,
      "postalCode": org.address.postalCode,
      "addressLocality": org.address.addressLocality || "Marseille",
      "addressRegion": org.address.addressRegion || "PACA",
      "addressCountry": org.address.addressCountry || "FR"
    } : undefined,
    "geo": org.geo ? {
      "@type": "GeoCoordinates",
      "latitude": org.geo.latitude,
      "longitude": org.geo.longitude
    } : undefined,
    "sameAs": org.sameAs || [
      "https://facebook.com/progineer",
      "https://instagram.com/progineer",
      "https://linkedin.com/company/progineer"
    ]
  };
};

/**
 * Génère des données structurées pour une entreprise locale
 * @param org Informations sur l'entreprise
 * @returns Données structurées au format Schema.org
 */
export const generateLocalBusinessSchema = (org: OrganizationSchema) => {
  const baseOrg = generateOrganizationSchema(org);
  return {
    ...baseOrg,
    "@type": "LocalBusiness",
    "priceRange": "€€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };
};

/**
 * Génère des données structurées pour un service
 * @param service Informations sur le service
 * @returns Données structurées au format Schema.org
 */
export const generateServiceSchema = (service: ServiceSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": service.provider ? {
      "@type": "ProfessionalService",
      "name": service.provider.name,
      "image": service.provider.logo || "https://progineer.fr/images/progineer-logo.png",
      "address": service.provider.address ? {
        "@type": "PostalAddress",
        "addressLocality": service.provider.address.addressLocality || "Marseille",
        "addressRegion": service.provider.address.addressRegion || "PACA",
        "addressCountry": service.provider.address.addressCountry || "FR"
      } : undefined
    } : undefined,
    "areaServed": service.areaServed || {
      "@type": "State",
      "name": "Provence-Alpes-Côte d'Azur"
    },
    "serviceType": service.serviceType,
    "offers": service.offers
  };
};

/**
 * Génère des données structurées pour une FAQ
 * @param faqItems Questions et réponses
 * @returns Données structurées au format Schema.org
 */
export const generateFAQSchema = (faqItems: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

/**
 * Génère des données structurées pour une page web
 * @param page Informations sur la page
 * @returns Données structurées au format Schema.org
 */
export const generateWebPageSchema = (page: {
  title: string;
  description: string;
  url: string;
  lastUpdated?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": page.url,
    "dateModified": page.lastUpdated || new Date().toISOString().split('T')[0]
  };
};
