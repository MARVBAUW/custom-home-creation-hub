import React from 'react';
import SEO from '@/components/common/SEO';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutApproach from '@/components/about/AboutApproach';
import CTACTA from '@/components/common/CTACTA';
import SEOFooter from '@/components/common/SEOFooter';

const About = () => {
  return (
    <>
      <SEO 
        title="À propos | Maître d'œuvre Progineer à Marseille et en PACA"
        description="Découvrez Progineer, entreprise de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA depuis 2018."
        keywords="histoire maître d'œuvre, valeurs Progineer, expertise construction PACA, entreprise rénovation Marseille, vision entreprise bâtiment"
        ogType="website"
        canonicalUrl="https://progineer.fr/a-propos"
      />

      <main>
        <h1 className="sr-only">À propos de Progineer - Maître d'œuvre expert en PACA</h1>
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutApproach />
        <CTACTA />
      </main>
      
      <SEOFooter 
        text="Maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Découvrez l'histoire et les valeurs de Progineer, entreprise de maîtrise d'œuvre fondée par des ingénieurs passionnés en région Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "histoire entreprise construction", 
          "fondateurs maître d'œuvre", 
          "valeurs Progineer PACA", 
          "expertise technique bâtiment", 
          "approche construction durable"
        ]}
      />
    </>
  );
};

export default About;
