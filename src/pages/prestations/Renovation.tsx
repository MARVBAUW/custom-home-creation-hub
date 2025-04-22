
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import RenovationHero from '@/components/prestations/renovation/RenovationHero';
import RenovationSidebar from '@/components/prestations/renovation/RenovationSidebar';
import RenovationContent from '@/components/prestations/renovation/RenovationContent';

const Renovation = () => {
  return (
    <>
      <SEO 
        title="Rénovation de maisons et appartements | Maître d'œuvre PACA - Progineer"
        description="Découvrez notre service de rénovation complète à Marseille et en PACA. Transformation de votre habitat par des experts en architecture et maîtrise d'œuvre."
        keywords="rénovation maison, rénovation appartement, maître d'œuvre PACA, rénovation Marseille, architecte rénovation"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/renovation"
      />

      <RenovationHero />
      <PrestationsSubNav activeService="renovation" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <RenovationSidebar />
            </div>
            <div className="lg:col-span-3">
              <RenovationContent />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text="Rénovation de maisons et d'appartements en PACA par Progineer, maître d'œuvre spécialisé en transformation d'habitat. Nos experts vous accompagnent dans tous vos projets de rénovation à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour améliorer votre confort et valoriser votre patrimoine."
      />
    </>
  );
};

export default Renovation;
