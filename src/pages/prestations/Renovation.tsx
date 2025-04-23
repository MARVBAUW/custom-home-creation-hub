
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import RenovationHero from '@/components/prestations/renovation/RenovationHero';
import RenovationSidebar from '@/components/prestations/renovation/RenovationSidebar';
import RenovationContent from '@/components/prestations/renovation/RenovationContent';

interface RenovationProps {
  forcedSeoParams?: {
    title: string;
    description: string;
    h1: string;
    city: string;
    profession: string;
  };
}

const Renovation: React.FC<RenovationProps> = ({ forcedSeoParams }) => {
  const cityName = forcedSeoParams?.city ? forcedSeoParams.city.replace(/-/g, ' ') : '';
  
  return (
    <>
      <SEO 
        title={forcedSeoParams?.title || "Rénovation complète de maisons et appartements en PACA | Progineer"}
        description={forcedSeoParams?.description || "Experts en rénovation à Marseille et en PACA. Transformez votre habitat avec Progineer, maître d'œuvre spécialisé en rénovation complète de maisons et appartements."}
        keywords={`rénovation maison${cityName ? ` ${cityName}` : ''}, rénovation appartement, transformation habitat, maître d'œuvre PACA, rénovation complète`}
        canonicalUrl={forcedSeoParams ? undefined : "https://progineer.fr/prestations-maitre-oeuvre/renovation"}
      />

      <RenovationHero customH1={forcedSeoParams?.h1} customCity={forcedSeoParams?.city} />
      <PrestationsSubNav activeService="renovation" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <RenovationSidebar city={forcedSeoParams?.city} />
            </div>
            <div className="lg:col-span-3">
              <RenovationContent city={forcedSeoParams?.city} />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text={`Rénovation de maisons et d'appartements ${cityName ? `à ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}` : 'en PACA'} par Progineer, maître d'œuvre spécialisé en transformation d'habitat. Nos experts vous accompagnent dans tous vos projets de rénovation ${cityName || 'à Marseille, Nice, Toulon'} et dans toute la région Provence-Alpes-Côte d'Azur pour améliorer votre confort et valoriser votre patrimoine.`}
        additionalKeywords={[
          `rénovation énergétique ${cityName || 'PACA'}`, 
          `modernisation habitat ${cityName || 'Marseille'}`, 
          "transformation intérieure maison", 
          "rénovation appartement ancien", 
          "réhabilitation logement méditerranée"
        ]}
      />
    </>
  );
};

export default Renovation;
