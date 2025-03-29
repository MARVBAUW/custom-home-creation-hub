
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import Section from '@/components/common/Section';
import Container from '@/components/common/Container';
import EstimationHero from '@/components/estimation/EstimationHero';
import EstimationBenefits from '@/components/estimation/EstimationBenefits';
import EstimationTrustMetrics from '@/components/estimation/EstimationTrustMetrics';
import EstimationFAQ from '@/components/estimation/EstimationFAQ';
import EstimationLocationCities from '@/components/estimation/EstimationLocationCities';
import EstimationForm from '@/components/estimation/EstimationForm';
import EstimationCalculator from '@/components/estimation/calculator';
import WorkEstimationForm from '@/components/estimation/calculator/WorkEstimationForm';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from "@/components/ui/card";
import { EstimationPageData } from '@/components/estimation/EstimationPageData';

/**
 * Page d'estimation de projet
 * @returns {JSX.Element} La page d'estimation
 */
const Estimation = () => {
  const {
    pageTitle,
    pageDescription,
    heroTitle,
    heroSubtitle,
    heroImage,
    benefitsTitle,
    benefitsSubtitle,
    benefits,
    trustMetricsTitle,
    trustMetrics,
    faqTitle,
    faqSubtitle,
    faqs,
    locationTitle,
    locationCities,
  } = EstimationPageData;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/estimation"
      />
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "${pageTitle}",
              "description": "${pageDescription}",
              "url": "https://progineer.fr/estimation"
            }
          `}
        </script>
      </Helmet>

      {/* Contenu principal */}
      <EstimationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
      />

      {/* Section de l'estimateur de projet */}
      <Section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Estimez votre projet en quelques clics</h2>
            <p className="mt-2 text-lg text-gray-600">Obtenez une estimation détaillée et personnalisée</p>
          </div>
          
          <Card className="shadow-md mx-auto max-w-4xl">
            <CardContent className="p-4 sm:p-6">
              <WorkEstimationForm />
            </CardContent>
          </Card>
          
        </Container>
      </Section>

      <EstimationBenefits
        title={benefitsTitle}
        subtitle={benefitsSubtitle}
        benefits={benefits}
      />

      <EstimationTrustMetrics
        title={trustMetricsTitle}
        metrics={trustMetrics}
      />

      <EstimationFAQ
        title={faqTitle}
        subtitle={faqSubtitle}
        faqs={faqs}
      />

      <EstimationLocationCities
        title={locationTitle}
        cities={locationCities}
      />
    </Layout>
  );
};

export default Estimation;
