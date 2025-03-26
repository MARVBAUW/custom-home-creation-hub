
import React from 'react';
import { Helmet } from 'react-helmet';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutApproach from '@/components/about/AboutApproach';
import CTACTA from '@/components/common/CTACTA';
import SEOFooter from '@/components/common/SEOFooter';

const About = () => {
  return (
    <>
      <Helmet>
        <title>À propos | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Découvrez Progineer, entreprise d'architecture et de maîtrise d'œuvre spécialisée dans la construction, rénovation et extension de maisons sur mesure en région PACA." />
        <meta name="keywords" content="à propos architecte, histoire maître d'œuvre, entreprise construction PACA, valeurs architecte Marseille" />
      </Helmet>

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
