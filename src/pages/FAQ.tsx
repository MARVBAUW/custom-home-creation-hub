
import React from 'react';
import FAQHero from '@/components/faq/FAQHero';
import FAQContent from '@/components/faq/FAQContent';
import SEOFooter from '@/components/common/SEOFooter';
import SEO from '@/components/common/SEO';

const FAQ = () => {
  return (
    <>
      <SEO 
        title="FAQ - Questions fréquentes | Maître d'œuvre Progineer PACA"
        description="Trouvez des réponses à vos questions sur la construction, rénovation et extension de maisons en PACA. Tout savoir sur les services d'un maître d'œuvre."
        keywords="FAQ maître d'œuvre, questions fréquentes construction, coût rénovation PACA, questions extension maison, devis travaux, processus construction"
        canonicalUrl="https://progineer.fr/faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Quelle est la différence entre un maître d'œuvre, un architecte et une entreprise générale ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Un maître d'œuvre est un professionnel qui coordonne et supervise l'ensemble des travaux de construction ou de rénovation. Il fait le lien entre le client et les différents corps de métier. Un architecte est principalement chargé de la conception et du design du bâtiment, avec une approche plus artistique et technique. Une entreprise générale, quant à elle, réalise directement les travaux avec ses propres équipes ou des sous-traitants. Chez Progineer, nous combinons les compétences de maîtrise d'œuvre et d'architecture pour vous offrir un service complet."
              }
            },
            {
              "@type": "Question",
              "name": "Quel est le budget moyen pour une extension de maison ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le budget d'une extension varie considérablement selon plusieurs facteurs : la surface, le type de construction (à toit plat, à deux pans, etc.), les matériaux utilisés, la complexité technique, et la région. En moyenne, pour une extension de qualité en région PACA, il faut compter entre 1 500 et 2 500 €/m². Une extension en ossature bois peut coûter entre 1 800 et 2 200 €/m², tandis qu'une extension traditionnelle en maçonnerie peut varier de 1 500 à 2 500 €/m². Ces prix incluent le gros œuvre et les finitions standards, mais peuvent augmenter avec des matériaux haut de gamme ou des contraintes techniques particulières."
              }
            },
            {
              "@type": "Question",
              "name": "Comment estimer le coût d'un projet de construction ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "L'estimation d'un projet de construction prend en compte plusieurs éléments : la surface habitable, le type de construction, la qualité des matériaux, la complexité architecturale, les équipements, l'emplacement géographique et les contraintes du terrain. Pour une maison individuelle de qualité en PACA, le budget moyen oscille entre 1 800 et 3 000 €/m², hors terrain. Ce prix peut augmenter pour des constructions haut de gamme ou avec des particularités techniques. Progineer propose une estimation personnalisée qui tient compte de tous ces facteurs et de vos besoins spécifiques."
              }
            }
          ]
        }}
      />

      <main>
        <h1 className="sr-only">FAQ - Questions fréquentes sur la maîtrise d'œuvre et la construction en PACA</h1>
        <FAQHero />
        <FAQContent />
      </main>
      
      <SEOFooter 
        text="Trouvez des réponses à vos questions sur la maîtrise d'œuvre à Marseille et en PACA. Nos experts répondent à toutes vos interrogations concernant la construction, rénovation et extension de maisons dans la région Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "coût construction maison PACA", 
          "délais travaux rénovation", 
          "permis construire extension", 
          "honoraires maître d'œuvre", 
          "phases projet construction"
        ]}
      />
    </>
  );
};

export default FAQ;
