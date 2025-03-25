
import React from 'react';
import SEO from '@/components/common/SEO';
import { getEstimationStructuredData } from '@/components/estimation/EstimationPageData';
import EstimationHero from '@/components/estimation/EstimationHero';
import EstimationBenefits from '@/components/estimation/EstimationBenefits';
import EstimationTrustMetrics from '@/components/estimation/EstimationTrustMetrics';
import EstimationFAQ from '@/components/estimation/EstimationFAQ';
import EstimationLocationCities from '@/components/estimation/EstimationLocationCities';
import EstimationCalculator from '@/components/estimation/EstimationCalculator';
import { motion } from 'framer-motion';

const Estimation = () => {
  const structuredData = getEstimationStructuredData();

  return (
    <>
      <SEO 
        title="Estimation Gratuite de Projet de Construction & Rénovation | Progineer PACA"
        description="Estimez gratuitement et sans engagement votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre expert en région PACA. Devis personnalisé en 24h. Marseille, Nice, Toulon."
        keywords="estimation projet construction PACA, devis travaux Marseille, prix maison sur mesure, estimation rénovation Nice, coût extension maison Toulon, budget construction appartement, estimation travaux gratuite, devis architecte PACA"
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
              <EstimationCalculator />
            </div>
          </div>
        </section>
        
        <EstimationBenefits />
        <EstimationTrustMetrics />
        <EstimationFAQ />
        <EstimationLocationCities />
      </motion.div>
    </>
  );
};

export default Estimation;
