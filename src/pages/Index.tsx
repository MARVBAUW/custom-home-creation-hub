
import React from 'react';
import Hero from '../components/home/Hero';
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
        title="Progineer | Architecte & Maître d'oeuvre en PACA - Marseille, Nice, Toulon"
        description="Entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA."
        keywords="architecte PACA, maître d'œuvre Marseille, construction maison sur mesure, rénovation villa, extension maison"
        canonicalUrl="https://progineer.fr/"
        structuredData={getBusinessStructuredData()}
      />
      
      <main className="pt-16"> {/* Ajouter un padding-top pour compenser le navbar fixe */}
        <h1 className="sr-only">Progineer - Architecte et Maître d'œuvre en PACA</h1>
        <Hero />
        <Services />
        <StatsSection />
        <Testimonials />
        <LocationMap />
        <CTASection />
      </main>
      
      <SEOFooter 
        text="Architecte et maître d'œuvre à Marseille, Nice, Toulon et dans toute la région PACA. Progineer vous accompagne dans tous vos projets de construction, rénovation et extension de maisons sur mesure. Expertise en architecture, optimisation d'espace et design d'intérieur pour créer votre habitat idéal en Provence-Alpes-Côte d'Azur."
      />
    </>
  );
};

export default Index;
