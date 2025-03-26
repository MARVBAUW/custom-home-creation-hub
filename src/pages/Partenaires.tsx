
import React from 'react';
import { Helmet } from 'react-helmet';
import PartenairesHero from '@/components/partenaires/PartenairesHero';
import BenefitsSection from '@/components/partenaires/BenefitsSection';
import PartnersSection from '@/components/partenaires/PartnersSection';
import ProcessSection from '@/components/partenaires/ProcessSection';
import SEOFooter from '@/components/partenaires/SEOFooter';
import GoogleBusinessData from '@/components/common/GoogleBusinessData';
import { Card } from '@/components/ui/card';

const Partenaires = () => {
  return (
    <>
      <Helmet>
        <title>Devenir partenaire | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Devenez partenaire de Progineer, architecte et maître d'œuvre en région PACA. Opportunités pour artisans, professionnels du BTP et agents commerciaux." />
        <meta name="keywords" content="partenaire architecte, artisans BTP PACA, réseau professionnels construction, collaboration maître d'œuvre" />
      </Helmet>

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
            <h3 className="text-xl font-semibold mb-4">Nos informations</h3>
            <GoogleBusinessData showHours className="shadow-none border-0" />
          </Card>
        </div>
      </section>

      {/* SEO Footer */}
      <SEOFooter />
    </>
  );
};

export default Partenaires;
