
import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import StatsSection from '../components/home/StatsSection';
import LocationMap from '../components/home/LocationMap';
import { getBusinessStructuredData } from '../utils/googleBusiness';
import SEO from '../components/common/SEO';

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
        <Hero />
        <Services />
        <StatsSection />
        <Testimonials />
        <LocationMap />
        <CTASection />
      </main>
    </>
  );
};

export default Index;
