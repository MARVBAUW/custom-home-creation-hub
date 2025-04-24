
import React from 'react';
import SEOContentSection from '@/components/seo/SEOContentSection';

const DesignInterieurSEOContent = () => {
  const seoContent = {
    title: "Design d'intérieur : créez des espaces qui vous ressemblent en PACA",
    content: {
      introduction: "Le design d'intérieur va bien au-delà de la simple décoration : c'est l'art de créer des espaces qui allient esthétique et fonctionnalité. Notre expertise en tant qu'architecte d'intérieur nous permet de transformer vos espaces en lieux de vie uniques, parfaitement adaptés à votre style de vie et à vos aspirations.",
      sections: [
        {
          title: "Une approche créative et personnalisée",
          content: "Notre processus de design d'espace commence par une écoute attentive de vos besoins et de vos envies. Nous analysons votre mode de vie, vos préférences esthétiques et les contraintes techniques pour créer un projet unique qui vous ressemble."
        },
        {
          title: "Harmonie des matériaux et des styles",
          content: "En tant que spécialistes du design d'intérieur, nous savons combiner les matériaux, les textures et les couleurs pour créer des ambiances harmonieuses. Du style moderne au contemporain, nous maîtrisons différentes approches pour réaliser un intérieur qui vous correspond."
        },
        {
          title: "Du concept à la réalisation",
          content: "Notre expertise en réaménagement intérieur nous permet de gérer votre projet de A à Z. De la conception des plans à la sélection des matériaux, en passant par la coordination des artisans, nous assurons un suivi complet pour un résultat à la hauteur de vos attentes."
        }
      ]
    },
    faq: [
      {
        question: "Quel est le coût d'un projet de design d'intérieur ?",
        answer: "Le coût varie selon l'ampleur du projet et les prestations choisies. Comptez entre 80€ et 150€/m² pour la conception, hors travaux et mobilier. Un devis détaillé est établi après notre première rencontre."
      },
      {
        question: "Combien de temps dure un projet de design d'intérieur ?",
        answer: "La durée moyenne est de 3 à 6 mois, incluant la phase de conception (1-2 mois) et la réalisation (2-4 mois). Ce délai permet un travail soigné et une mise en œuvre précise."
      },
      {
        question: "Comment se déroule un projet de décoration intérieure ?",
        answer: "Le projet commence par une rencontre pour définir vos besoins, suivie de la création de planches d'ambiance et de plans 3D. Après validation, nous coordonnons la réalisation des travaux et l'aménagement final."
      },
      {
        question: "Quelles sont les tendances actuelles en design d'intérieur ?",
        answer: "Les tendances actuelles incluent les intérieurs biophiliques, les matériaux naturels, le minimalisme fonctionnel et les espaces modulables. Nous adaptons ces tendances à vos goûts personnels."
      }
    ],
    schemaType: "Service",
    keywords: [
      "architecte d'intérieur",
      "design d'espace",
      "décoration intérieure",
      "réaménagement intérieur",
      "style moderne",
      "harmonie des matériaux",
      "design contemporain",
      "aménagement sur mesure"
    ]
  };

  return <SEOContentSection {...seoContent} />;
};

export default DesignInterieurSEOContent;
