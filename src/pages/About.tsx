
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
        title="À propos | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Découvrez Progineer, entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA."
        keywords="à propos architecte, histoire maître d'œuvre, entreprise construction PACA, valeurs architecte Marseille"
        ogType="website"
        canonicalUrl="https://progineer.fr/a-propos"
      />

      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutApproach />
      <CTACTA />
      
      <SEOFooter 
        text="Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Découvrez l'histoire et les valeurs de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région Provence-Alpes-Côte d'Azur."
      />
    </>
  );
};

export default About;
