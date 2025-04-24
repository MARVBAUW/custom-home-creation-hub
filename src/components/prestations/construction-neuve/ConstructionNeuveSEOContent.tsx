
import React from 'react';
import SEOContentSection from '@/components/seo/SEOContentSection';

const ConstructionNeuveSEOContent = () => {
  const seoContent = {
    title: "Construction de maison neuve en PACA : l'expertise d'un maître d'œuvre",
    content: {
      introduction: "La construction d'une maison individuelle est un projet de vie qui nécessite l'accompagnement d'un professionnel expérimenté. En tant que maître d'œuvre spécialisé dans la construction neuve à Marseille et en région PACA, nous vous guidons à chaque étape pour réaliser la maison de vos rêves, alliant qualité de construction, respect des normes et optimisation du budget.",
      sections: [
        {
          title: "Pourquoi choisir un maître d'œuvre pour votre construction ?",
          content: "Faire construire sa maison avec un maître d'œuvre, c'est s'assurer d'un suivi professionnel complet. Notre expertise en construction maison neuve nous permet de coordonner l'ensemble des intervenants, de la conception des plans à la livraison finale. Nous sélectionnons les meilleurs artisans et entreprises de construction pour garantir une réalisation dans les règles de l'art."
        },
        {
          title: "Une construction sur mesure adaptée à vos besoins",
          content: "Chaque projet de maison individuelle est unique. Notre approche personnalisée prend en compte vos envies, votre mode de vie et votre budget pour concevoir une maison qui vous ressemble. De la maison contemporaine à l'habitat traditionnel, nous vous proposons des solutions architecturales innovantes et durables."
        },
        {
          title: "Garanties et suivi de chantier rigoureux",
          content: "En tant qu'entreprise de construction expérimentée, nous assurons un contrôle qualité constant et un suivi de chantier minutieux. Notre maîtrise d'œuvre s'engage sur les délais, les coûts et la qualité des prestations, avec toutes les garanties nécessaires pour votre sérénité."
        }
      ]
    },
    faq: [
      {
        question: "Quel est le coût d'une construction neuve avec maître d'œuvre ?",
        answer: "Le coût d'une construction neuve varie selon plusieurs facteurs : surface, terrain, matériaux choisis, prestations. En moyenne, comptez entre 1800€ et 2500€/m² pour une construction de qualité. Notre rôle est d'optimiser votre budget tout en garantissant la qualité."
      },
      {
        question: "Combien de temps dure la construction d'une maison ?",
        answer: "Le délai moyen pour une construction neuve est de 8 à 12 mois, entre l'obtention du permis de construire et la livraison. Ce délai inclut la préparation du terrain, les fondations, le gros œuvre, et les finitions. Nous établissons un planning détaillé dès le début du projet."
      },
      {
        question: "Quelles garanties pour ma construction neuve ?",
        answer: "Votre construction bénéficie de nombreuses garanties : la garantie décennale, la garantie de parfait achèvement (1 an), la garantie biennale pour les équipements. Notre maîtrise d'œuvre assure également un suivi post-livraison pour votre tranquillité."
      },
      {
        question: "Quelles sont les étapes d'une construction neuve ?",
        answer: "La construction suit plusieurs phases : études préliminaires, conception des plans, dépôt du permis de construire, consultation des entreprises, réalisation du gros œuvre, puis des différents corps d'état (charpente, couverture, menuiseries, etc), et enfin les finitions intérieures et extérieures."
      }
    ],
    schemaType: "Service",
    keywords: [
      "construction maison neuve",
      "construction sur mesure",
      "maître d'œuvre construction",
      "faire construire sa maison",
      "construction PACA",
      "maison individuelle",
      "entreprise de construction",
      "construction Marseille"
    ]
  };

  return <SEOContentSection {...seoContent} />;
};

export default ConstructionNeuveSEOContent;
