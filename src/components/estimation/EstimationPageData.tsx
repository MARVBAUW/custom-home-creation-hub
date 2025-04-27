
export const getEstimationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Estimation coût travaux construction et rénovation en PACA",
    "description": "Calculez précisément le coût de vos travaux de construction, rénovation ou extension avec notre outil d'estimation gratuit. Prix au m² et devis détaillé en 24h.",
    "url": "https://progineer.fr/estimation",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    },
    "mainEntity": {
      "@type": "Service",
      "name": "Estimation de coût de travaux de construction et rénovation",
      "description": "Service d'estimation personnalisée et détaillée du coût de construction, rénovation ou extension proposé par Progineer en région PACA. Calcul précis du prix au m² et devis gratuit en 24h.",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Progineer",
        "logo": "https://progineer.fr/images/progineer-logo.png",
        "image": "https://progineer.fr/images/progineer-building.jpg",
        "telephone": "+33783762156",
        "email": "progineer.moe@gmail.com",
        "priceRange": "€€€",
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
      "serviceOutput": "Estimation détaillée de coût de travaux",
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
          "name": "Estimation de coût de travaux",
          "item": "https://progineer.fr/estimation"
        }
      ]
    },
    "potentialAction": {
      "@type": "Action",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://progineer.fr/estimation",
        "inLanguage": "fr-FR"
      },
      "name": "Estimer mon projet"
    },
    "author": {
      "@type": "Organization",
      "name": "Progineer - Maître d'œuvre en PACA",
      "url": "https://progineer.fr"
    },
    "datePublished": "2023-01-15",
    "dateModified": new Date().toISOString().split('T')[0],
    "keywords": "estimation travaux, estimer coût construction, prix rénovation maison, coût travaux m2, simulateur prix construction, devis construction maison, budget rénovation, prix extension maison, tarif plomberie, coût électricité, prix plâtrerie, tarif maçonnerie, coût peinture"
  };
};

// Add structured data specifically for the calculator tool
export const getCalculatorStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur de coût de travaux",
    "applicationCategory": "ConstructionApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "featureList": "Estimation prix construction, Calcul coût rénovation, Devis détaillé travaux, Prix m² construction PACA",
    "operatingSystem": "All",
    "softwareVersion": "2.0"
  };
};

// Add structured data for FAQ section
export const getFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quel est le coût moyen de construction d'une maison neuve en PACA ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le coût moyen de construction d'une maison neuve en région PACA se situe entre 1500€ et 2500€ par m². Ce prix varie selon la complexité architecturale, les matériaux sélectionnés, la topographie du terrain et les contraintes locales. Notre outil d'estimation vous permet de calculer précisément votre budget en fonction des spécificités de votre projet."
        }
      },
      {
        "@type": "Question",
        "name": "Comment estimer le coût d'une rénovation complète ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pour estimer le coût d'une rénovation complète, plusieurs facteurs sont à considérer : l'état initial du bâtiment, l'ampleur des travaux (structure, isolation, électricité, plomberie), la qualité des finitions et les éventuelles contraintes techniques. En moyenne, comptez entre 800€ et 1800€/m² pour une rénovation en PACA. Notre estimation détaillée vous fournit un chiffrage précis corps de métier par corps de métier."
        }
      },
      {
        "@type": "Question",
        "name": "Quels corps de métier sont inclus dans votre estimation de travaux ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre estimation détaillée inclut tous les corps de métier nécessaires à votre projet : maçonnerie, charpente, couverture, plomberie, électricité, menuiseries, plâtrerie, peinture, carrelage, chauffage et isolation thermique. Chaque poste est minutieusement calculé par nos experts pour vous garantir un chiffrage réaliste."
        }
      },
      {
        "@type": "Question",
        "name": "Combien coûtent les travaux de plomberie dans une construction neuve ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les travaux de plomberie dans une construction neuve représentent généralement entre 5% et 8% du budget total. Pour une maison standard, comptez environ 80€ à 120€/m² pour une installation complète incluant l'arrivée d'eau, l'évacuation, la distribution et les équipements sanitaires."
        }
      }
    ]
  };
};
