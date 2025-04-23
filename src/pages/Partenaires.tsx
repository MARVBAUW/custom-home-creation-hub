
import React from 'react';
import SEO from '@/components/common/SEO';
import PartenairesHero from '@/components/partenaires/PartenairesHero';
import BenefitsSection from '@/components/partenaires/BenefitsSection';
import PartnersSection from '@/components/partenaires/PartnersSection';
import ProcessSection from '@/components/partenaires/ProcessSection';
import SEOFooter from '@/components/common/SEOFooter';
import GoogleBusinessData from '@/components/common/GoogleBusinessData';
import { Card } from '@/components/ui/card';
import { getBusinessStructuredData } from '@/utils/googleBusiness';

const Partenaires = () => {
  // Structured data specifically for the Partners page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Devenir partenaire de Progineer",
    "description": "Devenez partenaire de Progineer, architecte et maître d'œuvre en région PACA. Opportunités pour artisans, professionnels du BTP et agents commerciaux.",
    "url": "https://progineer.fr/devenir-partenaire",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Programme de partenariat Progineer",
      "description": "Programme de partenariat pour artisans et professionnels du bâtiment en PACA.",
      "offers": {
        "@type": "Offer",
        "description": "Opportunités de collaboration sur des projets de construction et rénovation."
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/images/progineer-logo.png"
      }
    },
    "isPartOf": getBusinessStructuredData()
  };

  return (
    <>
      <SEO
        title="Nos Partenaires | Réseau Progineer - Architecte & Maître d'œuvre en PACA"
        description="Découvrez notre réseau de partenaires qualifiés - artisans, bureaux d'études et professionnels du BTP qui contribuent à la réussite de vos projets de construction en PACA."
        keywords="partenaires architecte, artisans BTP PACA, réseau professionnels construction, collaboration maître d'œuvre"
        canonicalUrl="https://progineer.fr/devenir-partenaire"
        structuredData={structuredData}
      />

      <main>
        <h1 className="sr-only">Devenir partenaire de Progineer - Programme de collaboration pour professionnels du bâtiment</h1>
        
        {/* Hero section */}
        <PartenairesHero />

        {/* Benefits section */}
        <BenefitsSection />

        {/* Who Can Apply section with contact form */}
        <PartnersSection />

        {/* How it works section */}
        <ProcessSection />

        {/* Business Info */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Nos informations</h2>
              <GoogleBusinessData showHours className="shadow-none border-0" />
            </Card>
          </div>
        </section>
      </main>

      {/* SEO Footer */}
      <SEOFooter 
        text="Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Rejoignez notre réseau de partenaires artisans et professionnels du bâtiment pour collaborer sur des projets de qualité dans la région Provence-Alpes-Côte d'Azur. Notre programme de partenariat offre des opportunités de croissance et de visibilité pour les experts du secteur immobilier et de la construction."
        additionalKeywords={["partenariat artisans PACA", "réseau professionnels construction", "collaboration architecte", "opportunités BTP Marseille", "programme partenaires bâtiment"]}
      />
    </>
  );
};

export default Partenaires;
