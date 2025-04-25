
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
        title="À propos | Maître d'œuvre expert en construction PACA - Progineer"
        description="Découvrez l'expertise et les valeurs de Progineer, votre maître d'œuvre en PACA. Une équipe passionnée qui concrétise vos projets de construction et rénovation depuis 2018."
        keywords="histoire maître d'œuvre, valeurs Progineer, expertise construction PACA, entreprise rénovation Marseille"
        ogType="website"
        canonicalUrl="https://progineer.fr/a-propos"
      />

      <main>
        <div className="text-3xl md:text-4xl font-semibold mb-8 text-center pt-32">
          <h1>À propos de Progineer - Maître d'œuvre expert en PACA</h1>
        </div>
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
