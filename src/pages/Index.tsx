
import React from 'react';
import Hero from '../components/home/Hero';
import ExpertiseSection from '../components/home/ExpertiseSection';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import StatsSection from '../components/home/StatsSection';
import LocationMap from '../components/home/LocationMap';
import { getBusinessStructuredData } from '../utils/googleBusiness';
import SEO from '../components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';

const Index = () => {
  return (
    <>
      <SEO 
        title="Maître d'œuvre Marseille | Construction & Rénovation | Progineer PACA"
        description="Maître d'œuvre à Marseille expert en construction, rénovation et extension de maisons. Coordination des corps de métier, respect des délais et expertise technique pour vos projets en PACA."
        keywords="maître d'œuvre marseille, maîtrise d'œuvre, coordination chantier, corps de métier, expertise technique, respect des délais, projet de rénovation"
        canonicalUrl="https://progineer.fr/"
        structuredData={getBusinessStructuredData()}
      />
      
      <main className="pt-16">
        <h1 className="sr-only">Maître d'œuvre à Marseille - Progineer Construction & Rénovation</h1>
        <Hero />
        <ExpertiseSection />
        <Services />
        <StatsSection />
        <Testimonials />
        <LocationMap />
        <CTASection />
      </main>
      
      <SEOFooter 
        text="Votre maître d'œuvre à Marseille et en PACA. Progineer assure la coordination des corps de métier et le respect des délais pour vos projets de construction et rénovation. Notre expertise technique et notre maîtrise d'œuvre garantissent la réussite de votre projet immobilier en Provence-Alpes-Côte d'Azur."
        additionalKeywords={["maître d'œuvre marseille", "coordination corps de métier", "expertise technique construction", "respect délais chantier", "rénovation marseille"]}
      />
    </>
  );
};

export default Index;
