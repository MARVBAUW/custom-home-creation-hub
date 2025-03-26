
import React from 'react';
import { Helmet } from 'react-helmet';
import PartenairesHero from '@/components/partenaires/PartenairesHero';
import ProcessSection from '@/components/partenaires/ProcessSection';
import BenefitsSection from '@/components/partenaires/BenefitsSection';
import PartnersSection from '@/components/partenaires/PartnersSection';
import PartnerContactForm from '@/components/partenaires/PartnerContactForm';
import SEOFooter from '@/components/partenaires/SEOFooter';

const Partenaires = () => {
  return (
    <>
      <Helmet>
        <title>Devenir Partenaire | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Rejoignez le réseau de partenaires Progineer et développez votre activité. Collaboration sur des projets d'architecture et de maîtrise d'œuvre en région PACA." />
        <meta name="keywords" content="partenaire architecte, partenaire maître d'œuvre, réseau construction PACA, collaboration architecte" />
      </Helmet>

      <PartenairesHero />
      <ProcessSection />
      <BenefitsSection />
      <PartnersSection />
      <PartnerContactForm />
      <SEOFooter />
    </>
  );
};

export default Partenaires;
