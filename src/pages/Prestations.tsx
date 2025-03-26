
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import PrestationsHero from '@/components/prestations/PrestationsHero';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import ServicesSection from '@/components/prestations/ServicesSection';
import ProcessSection from '@/components/prestations/ProcessSection';
import CTASection from '@/components/prestations/CTASection';
import SEOFooter from '@/components/prestations/SEOFooter';

const Prestations = () => {
  const location = useLocation();
  
  // Scroll to hash on initial load and hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Nos prestations | Architecte et Maître d'œuvre PACA - Progineer</title>
        <meta name="description" content="Progineer propose des services de maîtrise d'œuvre pour particuliers et professionnels : construction, rénovation, aménagement et optimisation énergétique." />
        <meta name="keywords" content="maître d'œuvre PACA, architecte Marseille, construction maison sur mesure, rénovation énergétique, extension maison, optimisation espace" />
      </Helmet>

      {/* Hero section */}
      <PrestationsHero />

      {/* Sub-navigation */}
      <PrestationsSubNav />

      {/* Services Overview */}
      <ServicesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* CTA section */}
      <CTASection />

      {/* SEO Footer */}
      <SEOFooter />
    </>
  );
};

export default Prestations;
