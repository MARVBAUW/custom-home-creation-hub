
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const Estimation = () => {
  // Structured data for WebPage with Service description
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Estimation de projet de construction ou rénovation",
    "description": "Estimez gratuitement votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre en région PACA.",
    "url": "https://progineer.fr/estimation",
    "mainEntity": {
      "@type": "Service",
      "name": "Estimation de projet de construction",
      "description": "Service d'estimation de projet de construction, rénovation ou extension proposé par Progineer en région PACA.",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Progineer",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Marseille",
          "addressRegion": "PACA",
          "addressCountry": "FR"
        }
      },
      "areaServed": ["Marseille", "Nice", "Toulon", "Cannes", "Fréjus", "PACA"],
      "serviceType": "Estimation de projet",
      "audience": {
        "@type": "Audience",
        "audienceType": "Particuliers et professionnels"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Estimer votre projet de construction ou rénovation | Progineer"
        description="Estimez gratuitement votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre expert en région PACA. Devis personnalisé."
        keywords="estimation projet construction, devis travaux PACA, coût maison sur mesure, estimation rénovation Marseille, prix extension maison, budget construction"
        canonicalUrl="https://progineer.fr/estimation"
        structuredData={structuredData}
      />

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Estimation
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Estimez votre projet en quelques clics
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Notre outil d'estimation vous donne une idée du budget nécessaire pour votre projet 
              de construction, rénovation ou extension en région PACA.
            </p>
          </div>
        </Container>
      </section>

      {/* Estimation form placeholder section */}
      <section className="py-16">
        <Container size="md">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Formulaire d'estimation
            </h2>
            
            <div className="text-center text-gray-500 p-12">
              <p className="mb-4">Le formulaire d'estimation interactif sera bientôt disponible.</p>
              <p>En attendant, contactez-nous pour obtenir une estimation personnalisée.</p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button href="/contact">Nous contacter</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-stone-50 border-t border-stone-200 mt-16">
        <Container>
          <div className="text-sm text-stone-500">
            <h2 className="text-base font-medium mb-2 text-stone-700">Estimation de projets de construction en PACA</h2>
            <p>
              Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Estimation précise de vos projets par nos architectes et ingénieurs. Nous intervenons à Marseille, Nice, Toulon, Cannes, Saint-Tropez et dans toute la région PACA pour vous proposer un devis détaillé et personnalisé.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Estimation;
