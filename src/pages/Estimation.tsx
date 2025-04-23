
import React from 'react';
import SEO from '@/components/common/SEO';
import { getEstimationStructuredData } from '@/components/estimation/EstimationPageData';
import EstimationHero from '@/components/estimation/EstimationHero';
import EstimationBenefits from '@/components/estimation/EstimationBenefits';
import EstimationTrustMetrics from '@/components/estimation/EstimationTrustMetrics';
import EstimationFAQ from '@/components/estimation/EstimationFAQ';
import EstimationLocationCities from '@/components/estimation/EstimationLocationCities';
import EstimationWizard from '@/components/estimation/calculator/EstimationWizard';
import { motion } from 'framer-motion';
import SEOFooter from '@/components/common/SEOFooter';

const Estimation = () => {
  const structuredData = getEstimationStructuredData();

  return (
    <>
      <SEO 
        title="Estimation Gratuite de Projet | Maître d'œuvre Progineer PACA"
        description="Estimez gratuitement votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre expert en PACA. Devis personnalisé sous 24h."
        keywords="estimation projet construction, simulation coût travaux, devis maître d'œuvre PACA, prix rénovation Marseille, budget extension maison"
        canonicalUrl="https://progineer.fr/estimation"
        structuredData={structuredData}
        ogType="website"
        ogImage="https://progineer.fr/images/progineer-estimation.jpg"
      >
        {/* Additional meta tags for better indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="geo.region" content="FR-PAC" />
        <meta name="geo.placename" content="Provence-Alpes-Côte d'Azur" />
        <link rel="alternate" hrefLang="fr-fr" href="https://progineer.fr/estimation" />
      </SEO>

      <main>
        <h1 className="sr-only">Estimation gratuite de projet de construction et rénovation en PACA</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EstimationHero />
          
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">Estimez votre projet en quelques étapes</h2>
              <div className="p-2 md:p-5 lg:p-8 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm relative z-10 max-w-5xl mx-auto">
                {/* Remplacement de l'ancien calculateur par le nouveau système */}
                <EstimationWizard />
              </div>
            </div>
          </section>
          
          <EstimationBenefits />
          <EstimationTrustMetrics />
          <EstimationFAQ />
          <EstimationLocationCities />
        </motion.div>
      </main>

      <SEOFooter 
        text="Estimation gratuite et personnalisée pour tous vos projets de construction et rénovation en PACA. Notre maître d'œuvre vous propose un chiffrage précis de votre projet à Marseille, Nice, Toulon et partout en Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "simulateur prix construction", 
          "calcul budget rénovation", 
          "estimation coût extension", 
          "devis travaux Marseille", 
          "tarifs maître d'œuvre PACA"
        ]}
      />
    </>
  );
};

export default Estimation;
