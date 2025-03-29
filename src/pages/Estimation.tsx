
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import WorkEstimationForm from '@/components/estimation/calculator/WorkEstimationForm';
import EstimationPageData from '@/components/estimation/EstimationPageData';

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
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
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
      <div className="relative bg-gradient-to-b from-gray-50 to-white pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{heroTitle}</h1>
            <p className="text-xl text-gray-600">{heroSubtitle}</p>
          </div>
          
          {/* Section de l'estimateur de projet */}
          <div className="py-8">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Estimez votre projet en quelques clics</h2>
                <p className="mt-2 text-lg text-gray-600">Obtenez une estimation détaillée et personnalisée</p>
              </div>
              
              <Card className="shadow-md mx-auto max-w-4xl">
                <CardContent className="p-4 sm:p-6">
                  <WorkEstimationForm />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Avantages */}
          <div className="py-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">{benefitsTitle}</h2>
              <p className="mt-2 text-lg text-gray-600">{benefitsSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-progineer-gold/10 rounded-full">
                      <span className="text-progineer-gold">{benefit.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Métriques de confiance */}
          <div className="py-12 bg-gray-50 rounded-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">{trustMetricsTitle}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-progineer-gold mb-2">{metric.value}</div>
                  <div className="text-lg text-gray-700">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ */}
          <div className="py-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">{faqTitle}</h2>
              <p className="mt-2 text-lg text-gray-600">{faqSubtitle}</p>
            </div>
            
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-xl font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Villes d'intervention */}
          <div className="py-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">{locationTitle}</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {locationCities.map((city, index) => (
                <div key={index} className="bg-white py-2 px-4 rounded-full shadow-sm border border-gray-200">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimation;
