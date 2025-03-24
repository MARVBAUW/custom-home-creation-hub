
export const getContactStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Progineer - Architecte & Maître d'œuvre en PACA",
    "description": "Contactez Progineer, votre architecte et maître d'œuvre pour vos projets de construction, rénovation et extension en région PACA - Marseille, Nice, Toulon.",
    "url": "https://progineer.fr/contact",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Progineer",
      "description": "Entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA.",
      "image": "https://progineer.fr/images/progineer-social-card.jpg",
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
      },
      "areaServed": ["Marseille", "Nice", "Toulon", "Cannes", "Fréjus", "PACA"]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33783762156",
      "contactType": "customer service",
      "availableLanguage": ["French"]
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
          "name": "Contact",
          "item": "https://progineer.fr/contact"
        }
      ]
    }
  };
};
