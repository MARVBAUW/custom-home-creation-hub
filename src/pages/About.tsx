
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
      <AboutStory 
        history={{
          paragraphs: [
            "Progineer est une entreprise d'architecture et de maîtrise d'œuvre travaillant sur des projets de construction, rénovation ou de modification du bâti existant. Nous réalisons les études, le dépôt des autorisations administratives, l'appel d'offre et le suivi des travaux.",
            "Nous intervenons principalement à Marseille et ses alentours, nous sommes également présent sur toute de la côte d'azur en passant par Saint Tropez, Toulon, Nice, Cannes, Fréjus.",
            "Progineer s'engage à mettre en œuvre des réalisations qui reflètent vos aspirations et vos besoins, en alliant innovation, savoir-faire et respect des délais."
          ],
          guarantees: [
            "Une écoute attentive, afin d'offrir un suivi personnalisé respectant au mieux vos besoins et votre budget.",
            "Une communication transparente, pour assurer une coordination efficace entre vous et les entreprises partenaires de votre projet."
          ],
          conclusion: "Que vous soyez un particulier ou un professionnel, nous sommes à votre disposition pour vous accompagner dans la concrétisation de vos idées, afin d'obtenir un résultat à la hauteur de vos attentes."
        }}
      />
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
