
import React from 'react';
import SEOContentSection from '@/components/seo/SEOContentSection';

const ExtensionSEOContent = () => {
  const seoContent = {
    title: "Extension de maison en PACA : l'expertise d'un maître d'œuvre",
    content: {
      introduction: "L'extension de maison représente une solution idéale pour gagner de l'espace habitable sans déménager. En tant que maître d'œuvre spécialisé dans l'extension à Marseille et en région PACA, nous vous accompagnons dans la réalisation de votre projet d'agrandissement, qu'il s'agisse d'une extension traditionnelle, d'une surélévation ou d'un ajout d'étage.",
      sections: [
        {
          title: "Types d'extensions adaptées à votre projet",
          content: "Nous proposons différentes solutions d'agrandissement pour répondre à vos besoins spécifiques. L'extension horizontale traditionnelle permet d'étendre votre surface au sol, idéale pour créer une nouvelle pièce de vie. La surélévation offre la possibilité d'ajouter un étage complet à votre maison, optimisant ainsi votre terrain. L'extension à ossature bois combine rapidité d'exécution et performances énergétiques."
        },
        {
          title: "Un accompagnement expert pour votre extension",
          content: "En tant que maître d'œuvre spécialisé dans l'extension de maison, nous gérons l'intégralité de votre projet d'agrandissement. De l'étude de faisabilité à la livraison finale, nous coordonnons les différents corps de métier et assurons le suivi du chantier. Notre expertise garantit une parfaite intégration architecturale de votre extension avec le bâti existant."
        },
        {
          title: "Aspects réglementaires et techniques",
          content: "Toute extension nécessite des autorisations d'urbanisme spécifiques. Notre équipe se charge des démarches administratives, du dépôt du permis de construire ou de la déclaration préalable de travaux. Nous veillons au respect des normes de construction, notamment en matière d'isolation thermique et de performance énergétique."
        }
      ]
    },
    faq: [
      {
        question: "Quel est le délai moyen pour une extension de maison ?",
        answer: "Le délai varie selon l'ampleur du projet. Pour une extension classique, comptez environ 4 à 6 mois entre l'obtention du permis et la fin des travaux. Une surélévation peut nécessiter 6 à 8 mois. Ces délais incluent les démarches administratives et la réalisation des travaux."
      },
      {
        question: "Quel budget prévoir pour une extension ?",
        answer: "Le coût d'une extension dépend de plusieurs facteurs : surface, type de construction, finitions choisies. En moyenne, comptez entre 1500€ et 2500€/m² pour une extension traditionnelle. Une surélévation peut coûter entre 2000€ et 3000€/m². Nous établissons un devis détaillé après étude de votre projet."
      },
      {
        question: "Faut-il un permis de construire pour une extension ?",
        answer: "Une extension de plus de 40m² nécessite un permis de construire. Pour une surface entre 5 et 40m², une déclaration préalable de travaux suffit généralement. En zone urbaine, le seuil est de 20m². Notre équipe vous accompagne dans ces démarches administratives."
      },
      {
        question: "Quels types d'extensions proposez-vous ?",
        answer: "Nous réalisons tous types d'extensions : horizontales traditionnelles, surélévations, vérandas, extensions à ossature bois. Chaque solution est adaptée à vos besoins, votre terrain et vos contraintes budgétaires. Nous privilégions les matériaux durables et les techniques constructives innovantes."
      }
    ],
    schemaType: "Article",
    keywords: [
      "extension maison",
      "agrandissement habitation",
      "surélévation",
      "ajout d'étage",
      "extension bois",
      "maître d'œuvre extension",
      "extension PACA",
      "agrandissement Marseille"
    ]
  };

  return <SEOContentSection {...seoContent} />;
};

export default ExtensionSEOContent;
