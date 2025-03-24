
export const getEstimationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Estimation gratuite de projet de construction ou rénovation en PACA",
    "description": "Obtenez une estimation gratuite et détaillée pour votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre expert en région PACA - Marseille, Nice, Toulon.",
    "url": "https://progineer.fr/estimation",
    "mainEntity": {
      "@type": "Service",
      "name": "Estimation de projet de construction et rénovation",
      "description": "Service d'estimation personnalisée de projet de construction, rénovation ou extension proposé par Progineer en région PACA. Devis détaillé gratuit en 24h.",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Progineer",
        "logo": "https://progineer.fr/images/progineer-logo.png",
        "image": "https://progineer.fr/images/progineer-building.jpg",
        "telephone": "+33783762156",
        "email": "progineer.moe@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Marseille",
          "addressRegion": "PACA",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "43.296482",
          "longitude": "5.369780"
        }
      },
      "areaServed": ["Marseille", "Nice", "Toulon", "Cannes", "Fréjus", "Aix-en-Provence", "PACA"],
      "serviceType": "Estimation de projet immobilier",
      "audience": {
        "@type": "Audience",
        "audienceType": "Particuliers et professionnels"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Estimation gratuite sans engagement"
      }
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://progineer.fr/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Estimation de projet",
          "item": "https://progineer.fr/estimation"
        }
      ]
    }
  };
};
