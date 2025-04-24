
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
        title="Rénovation complète de maisons et appartements en PACA | Progineer"
        description="Experts en rénovation à Marseille et en PACA. Transformez votre habitat avec Progineer, maître d'œuvre spécialisé en rénovation complète de maisons et appartements."
        keywords="rénovation maison, rénovation appartement, transformation habitat, maître d'œuvre PACA, rénovation complète"
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
        additionalKeywords={[
          "rénovation énergétique PACA", 
          "modernisation habitat Marseille", 
          "transformation intérieure maison", 
          "rénovation appartement ancien", 
          "réhabilitation logement méditerranée"
        ]}
      />
    </>
  );
};

export default Renovation;
