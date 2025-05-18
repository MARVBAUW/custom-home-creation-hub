
import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ExpertiseSection from '../components/home/ExpertiseSection';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import StatsSection from '../components/home/StatsSection';
import LocationMap from '../components/home/LocationMap';
import InnovationHub from '../components/home/InnovationHub';
import { getBusinessStructuredData } from '../utils/googleBusiness';
import EnhancedSEO from '../components/seo/EnhancedSEO';
import SEOFooter from '@/components/common/SEOFooter';
import { Helmet } from 'react-helmet-async';

// Importation des feuilles de style pour les animations
import '../components/home/animations.css';

const Index = () => {
  // Ajouter du CSS dynamique pour améliorer les performances globales de la page
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      .perspective-700 {
        perspective: 700px;
      }
      
      .transform-style-3d {
        transform-style: preserve-3d;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Données structurées LocalBusiness améliorées pour Google
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Progineer - Maître d'œuvre en PACA",
    "alternateName": "Progineer Construction & Rénovation",
    "description": "Expert en maîtrise d'œuvre à Marseille spécialisé dans la construction, rénovation et extension de maisons en PACA.",
    "url": "https://progineer.fr/",
    "logo": "https://progineer.fr/images/progineer-logo.png",
    "image": "https://progineer.fr/images/progineer-social-card.jpg",
    "telephone": "+33783762156",
    "email": "progineer.moe@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "27 Boulevard Charles Moretti",
      "addressLocality": "Marseille",
      "addressRegion": "PACA",
      "postalCode": "13014",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.3356733",
      "longitude": "5.3884308"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Marseille"
      },
      {
        "@type": "City",
        "name": "Aix-en-Provence"
      },
      {
        "@type": "City",
        "name": "Toulon"
      },
      {
        "@type": "AdministrativeArea",
        "name": "PACA"
      }
    ],
    "priceRange": "€€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/progineer",
      "https://www.instagram.com/progineer.moe/",
      "https://www.linkedin.com/company/progineer"
    ]
  };

  return (
    <>
      <EnhancedSEO 
        title="Maître d'œuvre à Marseille | Construction & Rénovation | Progineer PACA"
        description="Expert en maîtrise d'œuvre à Marseille spécialisé dans la construction, rénovation et extension de maisons. Un accompagnement sur mesure pour vos projets en PACA."
        keywords="maître d'œuvre marseille, construction maison PACA, rénovation Marseille, extension maison, coordination travaux"
        canonicalUrl="https://progineer.fr/"
        structuredData={localBusinessSchema}
      >
        {/* Balises meta supplémentaires spécifiques à la page d'accueil */}
        <meta property="og:site_name" content="Progineer - Maître d'œuvre PACA" />
        <meta name="geo.region" content="FR-PAC" />
        <meta name="geo.placename" content="Marseille" />
        <meta name="geo.position" content="43.3356733;5.3884308" />
        <meta name="ICBM" content="43.3356733, 5.3884308" />
      </EnhancedSEO>
      
      <main className="overflow-hidden">
        <div className="sr-only" role="heading" aria-level="1">Maître d'œuvre à Marseille - Progineer Construction & Rénovation</div>
        <div className="text-4xl md:text-5xl lg:text-6xl font-rare tracking-wide mb-6 text-center pt-32">
          <h1>Maître d'œuvre à Marseille - Progineer Construction & Rénovation</h1>
        </div>
        <Hero />
        <ExpertiseSection />
        <Services />
        <StatsSection />
        <Testimonials />
        <LocationMap />
        <CTASection />
        <InnovationHub />
      </main>
      
      <SEOFooter 
        text="Votre maître d'œuvre à Marseille et en PACA. Progineer assure la coordination des corps de métier et le respect des délais pour vos projets de construction et rénovation. Notre expertise technique et notre maîtrise d'œuvre garantissent la réussite de votre projet immobilier en Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "maître d'œuvre marseille", 
          "coordination corps de métier", 
          "expertise technique construction", 
          "respect délais chantier", 
          "rénovation marseille", 
          "maître d'ouvrage", 
          "projet de rénovation", 
          "maîtrise d'œuvre"
        ]}
      />
    </>
  );
};

export default Index;
