
import React from 'react';
import { Helmet } from 'react-helmet';
import FAQHero from '@/components/faq/FAQHero';
import FAQContent from '@/components/faq/FAQContent';
import SEOFooter from '@/components/common/SEOFooter';

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Questions fréquentes sur la construction, rénovation et extension de maisons. Trouvez des réponses à vos interrogations sur la maîtrise d'œuvre en région PACA." />
        <meta name="keywords" content="FAQ architecture, questions maître d'œuvre, construction maison PACA, rénovation questions fréquentes" />
      </Helmet>

      <FAQHero />
      <FAQContent />
      
      <SEOFooter 
        text="Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Nos architectes et ingénieurs répondent à toutes vos questions sur vos projets immobiliers dans la région Provence-Alpes-Côte d'Azur."
      />
    </>
  );
};

export default FAQ;
