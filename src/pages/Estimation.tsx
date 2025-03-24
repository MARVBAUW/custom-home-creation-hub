
import React from 'react';
import SEO from '@/components/common/SEO';
import { getEstimationStructuredData } from '@/components/estimation/EstimationPageData';
import EstimationHero from '@/components/estimation/EstimationHero';
import EstimationBenefits from '@/components/estimation/EstimationBenefits';
import EstimationTrustMetrics from '@/components/estimation/EstimationTrustMetrics';
import EstimationFAQ from '@/components/estimation/EstimationFAQ';
import EstimationLocationCities from '@/components/estimation/EstimationLocationCities';

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

      <EstimationHero />
      <EstimationBenefits />
      <EstimationTrustMetrics />
      <EstimationFAQ />
      <EstimationLocationCities />
    </>
  );
};

export default Estimation;
