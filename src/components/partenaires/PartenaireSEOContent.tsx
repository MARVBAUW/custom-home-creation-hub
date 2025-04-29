
import React from 'react';
import SEOContentSection from '@/components/seo/SEOContentSection';

const PartenaireSEOContent = () => {
  const seoContent = {
    title: "Devenez partenaire de Progineer - Réseau professionnel BTP en PACA",
    content: {
      introduction: "Rejoindre le réseau de partenaires Progineer, c'est faire partie d'un écosystème de professionnels qualifiés du bâtiment en région PACA. Notre programme de partenariat est conçu pour créer des synergies durables entre artisans, entrepreneurs et experts du secteur de la construction.",
      sections: [
        {
          title: "Un réseau professionnel valorisant",
          content: "Notre réseau de partenaires rassemble des artisans et professionnels du BTP reconnus pour leur savoir-faire et leur sérieux. En rejoignant Progineer, vous bénéficiez d'une visibilité accrue auprès d'une clientèle exigeante et d'opportunités de collaboration sur des projets ambitieux en région PACA."
        },
        {
          title: "Une collaboration gagnant-gagnant",
          content: "Notre approche du partenariat repose sur des valeurs d'excellence et de confiance mutuelle. Nous sélectionnons rigoureusement nos partenaires pour garantir à nos clients des prestations de qualité, tout en offrant aux professionnels des opportunités d'affaires régulières et valorisantes."
        },
        {
          title: "Des projets diversifiés et stimulants",
          content: "En tant que partenaire Progineer, vous accédez à une grande variété de projets : constructions neuves, rénovations de caractère, extensions contemporaines ou aménagements d'intérieur. Cette diversité vous permet de mettre en valeur votre expertise et de développer de nouvelles compétences."
        }
      ]
    },
    faq: [
      {
        question: "Quelles sont les conditions pour rejoindre le réseau Progineer ?",
        answer: "Nous sélectionnons nos partenaires selon plusieurs critères essentiels : qualifications professionnelles, expérience démontrée dans votre domaine, assurances à jour, références vérifiables et engagement à respecter nos standards de qualité et nos délais."
      },
      {
        question: "Quels avantages concrets pour mon entreprise ?",
        answer: "Les avantages incluent : un flux régulier d'opportunités commerciales, une visibilité sur notre site web et supports marketing, l'accès à des projets de qualité avec des clients qualifiés, et la possibilité de collaborer avec d'autres professionnels reconnus."
      },
      {
        question: "Comment fonctionne la collaboration au quotidien ?",
        answer: "Notre modèle de collaboration est basé sur la transparence et l'efficacité. Vous recevez des dossiers techniques complets, participez à des réunions de coordination, et bénéficiez de notre support pour la planification et la résolution de problèmes techniques."
      },
      {
        question: "Y a-t-il des engagements contractuels ?",
        answer: "Nous établissons une convention de partenariat définissant les modalités de collaboration, les standards de qualité attendus, les conditions financières et les engagements mutuels. Cette convention est renouvelable annuellement après évaluation."
      }
    ],
    schemaType: "Organization",
    keywords: [
      "partenariat BTP PACA",
      "réseau artisans qualifiés",
      "collaboration maître d'œuvre",
      "programme partenaires construction",
      "opportunités sous-traitants bâtiment",
      "réseau professionnels construction",
      "partenariat artisans Marseille",
      "réseau entrepreneurs PACA"
    ]
  };

  return <SEOContentSection {...seoContent} />;
};

export default PartenaireSEOContent;
