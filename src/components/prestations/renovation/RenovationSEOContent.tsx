
import React from 'react';
import SEOContentSection from '@/components/seo/SEOContentSection';

const RenovationSEOContent = () => {
  const seoContent = {
    title: "Rénovation de maison et d'appartement en PACA : l'expertise d'un maître d'œuvre",
    content: {
      introduction: "La rénovation d'une maison ou d'un appartement est un projet complexe qui nécessite l'expertise d'un professionnel. En tant que maître d'œuvre spécialisé en rénovation à Marseille et en région PACA, nous vous accompagnons dans la transformation de votre habitat, qu'il s'agisse d'une rénovation énergétique, d'une rénovation partielle ou d'une réhabilitation complète.",
      sections: [
        {
          title: "Une approche globale de la rénovation",
          content: "Notre expertise en rénovation de maison ancienne nous permet d'aborder chaque projet avec une vision d'ensemble. De l'audit initial à la livraison finale, nous prenons en compte tous les aspects techniques, esthétiques et énergétiques pour garantir une rénovation réussie et durable."
        },
        {
          title: "Rénovation énergétique : investir pour l'avenir",
          content: "La rénovation énergétique est aujourd'hui un enjeu majeur pour réduire vos factures et améliorer votre confort. Notre équipe maîtrise les dernières technologies et normes en vigueur pour optimiser la performance énergétique de votre habitat tout en préservant son charme d'origine."
        },
        {
          title: "Des travaux de rénovation sur mesure",
          content: "Chaque projet de rénovation est unique. Qu'il s'agisse d'une rénovation intérieure, d'une mise aux normes ou d'une transformation complète, nous adaptons nos solutions à vos besoins spécifiques et à votre budget. Notre expertise en PACA nous permet de respecter l'architecture locale tout en apportant modernité et confort."
        }
      ]
    },
    faq: [
      {
        question: "Quel est le coût moyen d'une rénovation complète ?",
        answer: "Le coût d'une rénovation varie selon l'ampleur des travaux, la surface et l'état initial du bien. En moyenne, comptez entre 1000€ et 2000€/m² pour une rénovation complète. Un devis détaillé sera établi après visite."
      },
      {
        question: "Combien de temps dure un projet de rénovation ?",
        answer: "La durée des travaux dépend de leur nature. Une rénovation partielle peut prendre 2 à 3 mois, tandis qu'une rénovation complète nécessite généralement 4 à 8 mois, incluant les phases d'études et d'autorisations."
      },
      {
        question: "Quelles aides financières pour la rénovation énergétique ?",
        answer: "Plusieurs dispositifs existent : MaPrimeRénov', CEE, Éco-PTZ, aides locales. Notre équipe vous accompagne dans l'identification et le montage des dossiers d'aides adaptées à votre projet."
      },
      {
        question: "Faut-il un permis pour rénover ?",
        answer: "Les autorisations nécessaires dépendent de la nature des travaux. Une déclaration préalable suffit souvent, mais un permis peut être requis pour des modifications importantes. Nous gérons toutes les démarches administratives."
      }
    ],
    schemaType: "Service",
    keywords: [
      "rénovation maison ancienne",
      "rénovation énergétique",
      "rénovation globale",
      "rénovation intérieure",
      "entreprise rénovation PACA",
      "travaux rénovation",
      "rénovation appartement",
      "maître d'œuvre rénovation"
    ]
  };

  return <SEOContentSection {...seoContent} />;
};

export default RenovationSEOContent;
