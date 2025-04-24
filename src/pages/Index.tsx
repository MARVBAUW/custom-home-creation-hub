
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
import SEO from '../components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';

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

  return (
    <>
      <SEO 
        title="Maître d'œuvre Marseille | Construction & Rénovation | Progineer PACA"
        description="Maître d'œuvre à Marseille expert en construction, rénovation et extension de maisons. Coordination des corps de métier, respect des délais et expertise technique pour vos projets en PACA."
        keywords="maître d'œuvre marseille, maîtrise d'œuvre, coordination chantier, corps de métier, expertise technique, respect des délais, projet de rénovation, maître d'ouvrage, maîtres d'œuvre"
        canonicalUrl="https://progineer.fr/"
        structuredData={getBusinessStructuredData()}
      />
      
      <main className="overflow-hidden">
        <h1 className="sr-only">Maître d'œuvre à Marseille - Progineer Construction & Rénovation</h1>
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

      {/* Discreet backlink section */}
      <div className="sr-only">
        <a 
          href="https://www.maitredoeuvre.com/" 
          rel="nofollow" 
          target="_blank"
        >
          Annuaire de maitres d'oeuvre
        </a>
      </div>
    </>
  );
};

export default Index;
