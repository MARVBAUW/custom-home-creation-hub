
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import OptimisationEspaceHero from '@/components/prestations/optimisation-espace/OptimisationEspaceHero';
import OptimisationEspaceSidebar from '@/components/prestations/optimisation-espace/OptimisationEspaceSidebar';
import OptimisationEspaceContent from '@/components/prestations/optimisation-espace/OptimisationEspaceContent';
import OptimisationEspaceSEOContent from '@/components/prestations/optimisation-espace/OptimisationEspaceSEOContent';

interface OptimisationEspaceProps {
  forcedSeoParams?: {
    title: string;
    description: string;
    h1: string;
    city: string;
    profession: string;
  };
}

const OptimisationEspace: React.FC<OptimisationEspaceProps> = ({ forcedSeoParams }) => {
  const cityName = forcedSeoParams?.city ? forcedSeoParams.city.replace(/-/g, ' ') : '';
  
  return (
    <>
      <SEO 
        title={forcedSeoParams?.title || "Optimisation d'espace et aménagement intérieur en PACA | Progineer"}
        description={forcedSeoParams?.description || "Maximisez votre surface habitable grâce à nos solutions d'optimisation d'espace à Marseille et en PACA. Progineer, maître d'œuvre spécialiste de l'aménagement intelligent."}
        keywords={`optimisation d'espace${cityName ? ` ${cityName}` : ''}, aménagement intérieur, gain de place, maître d'œuvre PACA, petit espace`}
        canonicalUrl={forcedSeoParams ? undefined : "https://progineer.fr/prestations-maitre-oeuvre/optimisation-espace"}
      />

      <OptimisationEspaceHero customH1={forcedSeoParams?.h1} customCity={forcedSeoParams?.city} />
      <PrestationsSubNav activeService="optimisation-espace" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <OptimisationEspaceSidebar city={forcedSeoParams?.city} />
            </div>
            <div className="lg:col-span-3">
              <OptimisationEspaceContent city={forcedSeoParams?.city} />
              <OptimisationEspaceSEOContent />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text={`Optimisation d'espace ${cityName ? `à ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}` : 'à Marseille et en PACA'} par Progineer, maître d'œuvre spécialisé en aménagement intérieur. Nos experts vous accompagnent dans tous vos projets d'optimisation d'espace ${cityName || 'à Marseille, Nice, Toulon'} et dans toute la région Provence-Alpes-Côte d'Azur pour maximiser le potentiel de vos surfaces.`}
        additionalKeywords={[
          `gain de place habitat ${cityName || 'PACA'}`, 
          `aménagement optimal ${cityName || 'Marseille'}`, 
          "solutions petits espaces", 
          "agencement intelligent", 
          "optimisation surface habitable"
        ]}
      />
    </>
  );
};

export default OptimisationEspace;
