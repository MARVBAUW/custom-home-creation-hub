import React from 'react';
import SEOHeader from '@/components/common/SEOHeader';
import { getEstimationStructuredData } from '@/components/estimation/EstimationPageData';
import EstimationBenefits from '@/components/estimation/EstimationBenefits';
import EstimationTrustMetrics from '@/components/estimation/EstimationTrustMetrics';
import EstimationFAQ from '@/components/estimation/EstimationFAQ';
import EstimationLocationCities from '@/components/estimation/EstimationLocationCities';
import { motion } from 'framer-motion';
import SEOFooter from '@/components/common/SEOFooter';
import EstimationHero from '@/components/estimation/EstimationHero';
import SEOContentSection from '@/components/seo/SEOContentSection';
import SEO from '@/components/common/SEO';

const Estimation = () => {
  const structuredData = getEstimationStructuredData();
  
  // SEO content for the estimation page
  const estimationContent = {
    introduction: "Estimer le coût de vos travaux de construction, de rénovation ou d'extension est crucial pour préparer votre projet. Notre outil gratuit d'estimation de travaux vous permet de connaître précisément le budget nécessaire pour réaliser votre maison ou appartement idéal en PACA. Que vous soyez à Marseille, Nice, Toulon ou ailleurs en région Provence-Alpes-Côte d'Azur, nos experts analysent votre projet pour vous fournir une estimation personnalisée et détaillée.",
    sections: [
      {
        title: "Comment calculer le coût de vos travaux de construction ?",
        content: "Le calcul du coût de construction d'une maison ou de rénovation prend en compte plusieurs facteurs : la surface en m², la complexité du projet, les matériaux utilisés et la localisation. Notre simulateur de prix intègre tous ces paramètres pour vous donner une estimation précise. Pour une construction neuve, comptez entre 1500€ et 2500€/m² selon les finitions choisies. Les travaux de rénovation varient généralement entre 800€ et 1800€/m² selon l'ampleur des modifications."
      },
      {
        title: "Pourquoi réaliser une estimation avant de commencer vos travaux ?",
        content: "Une estimation préalable de vos travaux permet d'anticiper votre budget global, d'éviter les mauvaises surprises financières et de prioriser vos dépenses. Cette démarche est aussi indispensable pour obtenir un financement adapté auprès des banques. Notre estimation gratuite et sans engagement vous aide à planifier sereinement votre projet de construction ou rénovation en région PACA, qu'il s'agisse d'une maison individuelle, d'un appartement ou d'un petit immeuble collectif."
      },
      {
        title: "Les corps de métier inclus dans notre estimation de travaux",
        content: "Notre estimation détaillée inclut tous les corps de métier nécessaires à votre projet : maçonnerie, charpente, couverture, plomberie, électricité, menuiseries, plâtrerie, peinture, carrelage, chauffage et isolation thermique. Chaque poste est minutieusement calculé par nos experts pour vous garantir un chiffrage réaliste des coûts de main d'œuvre et des matériaux. Cela vous permet de prévoir avec précision le budget total de votre projet immobilier en PACA."
      }
    ]
  };
  
  // FAQ content with targeted keywords
  const faqItems = [
    {
      question: "Quel est le coût moyen de construction d'une maison neuve en PACA ?",
      answer: "Le coût moyen de construction d'une maison neuve en région PACA se situe entre 1500€ et 2500€ par m². Ce prix varie selon la complexité architecturale, les matériaux sélectionnés, la topographie du terrain et les contraintes locales. Notre outil d'estimation vous permet de calculer précisément votre budget en fonction des spécificités de votre projet."
    },
    {
      question: "Comment estimer le coût d'une rénovation complète ?",
      answer: "Pour estimer le coût d'une rénovation complète, plusieurs facteurs sont à considérer : l'état initial du bâtiment, l'ampleur des travaux (structure, isolation, électricité, plomberie), la qualité des finitions et les éventuelles contraintes techniques. En moyenne, comptez entre 800€ et 1800€/m² pour une rénovation en PACA. Notre estimation détaillée vous fournit un chiffrage précis corps de métier par corps de métier."
    },
    {
      question: "Quels sont les facteurs qui influencent le prix des travaux de construction ?",
      answer: "Les principaux facteurs qui influencent le prix des travaux de construction sont : la surface à construire, la qualité des matériaux, la complexité architecturale, la topographie du terrain, l'accessibilité du chantier, les contraintes réglementaires locales et les choix techniques (fondations, isolation, équipements). Notre outil d'estimation prend en compte tous ces éléments pour vous fournir un budget prévisionnel précis."
    },
    {
      question: "Combien coûtent les travaux de plomberie dans une construction neuve ?",
      answer: "Les travaux de plomberie dans une construction neuve représentent généralement entre 5% et 8% du budget total. Pour une maison standard, comptez environ 80€ à 120€/m² pour une installation complète incluant l'arrivée d'eau, l'évacuation, la distribution et les équipements sanitaires. Notre estimation détaillée vous permet de connaître précisément ce poste de dépense pour votre projet spécifique."
    }
  ];

  return (
    <>
      <SEO 
        title="Estimation de Coût de Construction et Rénovation"
        description="Calculez gratuitement le coût de vos travaux de construction ou rénovation en PACA. Obtenez une estimation précise du prix au m² et un devis détaillé en 24h."
        keywords="estimation travaux, estimer coût construction, prix rénovation maison PACA, coût travaux au m², simulateur prix construction, devis travaux Marseille"
        canonicalUrl="https://progineer.fr/estimation"
        structuredData={structuredData}
        ogType="website"
        ogImage="https://progineer.fr/images/progineer-estimation.jpg"
        pageType="service"
      />

      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EstimationHero />
          <SEOContentSection
            title="Estimer le coût de vos travaux de construction et rénovation"
            content={estimationContent}
            faq={faqItems}
            schemaType="Guide"
            keywords={["estimation travaux", "coût construction", "prix rénovation", "devis travaux", "budget construction maison"]}
          />
          <EstimationBenefits />
          <EstimationTrustMetrics />
          <EstimationFAQ />
          <EstimationLocationCities />
        </motion.div>
      </main>

      <SEOFooter 
        text="Estimation précise et personnalisée pour tous vos projets de construction et rénovation en PACA. Notre outil calcule le coût exact de votre projet au m² à Marseille, Nice, Toulon et partout en Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "prix construction maison", 
          "coût travaux rénovation", 
          "budget extension maison", 
          "tarif plomberie construction", 
          "prix plâtrerie au m²",
          "coût électricité maison neuve",
          "devis peinture rénovation PACA"
        ]}
      />
    </>
  );
};

export default Estimation;
