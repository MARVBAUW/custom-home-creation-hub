import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import OptimisationEspaceHero from '@/components/prestations/optimisation-espace/OptimisationEspaceHero';
import OptimisationEspaceSidebar from '@/components/prestations/optimisation-espace/OptimisationEspaceSidebar';
import OptimisationEspaceContent from '@/components/prestations/optimisation-espace/OptimisationEspaceContent';
import OptimisationEspaceSEOContent from '@/components/prestations/optimisation-espace/OptimisationEspaceSEOContent';

const OptimisationEspace = () => {
  return (
    <>
      <SEO 
        title="Optimisation d'espace et aménagement intérieur en PACA | Progineer"
        description="Maximisez votre surface habitable grâce à nos solutions d'optimisation d'espace à Marseille et en PACA. Progineer, maître d'œuvre spécialiste de l'aménagement intelligent."
        keywords="optimisation d'espace, aménagement intérieur, gain de place, maître d'œuvre PACA, petit espace"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/optimisation-espace"
      />

      <OptimisationEspaceHero />
      <PrestationsSubNav activeService="optimisation-espace" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <OptimisationEspaceSidebar />
            </div>
            <div className="lg:col-span-3">
              <OptimisationEspaceContent />
            </div>
          </div>
        </Container>
      </section>

      <OptimisationEspaceSEOContent />

      <SEOFooter 
        text="Optimisation d'espace à Marseille et en PACA par Progineer, maître d'œuvre spécialisé en aménagement intérieur. Nos experts vous accompagnent dans tous vos projets d'optimisation d'espace à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour maximiser le potentiel de vos surfaces."
        additionalKeywords={[
          "gain de place habitat", 
          "aménagement optimal PACA", 
          "solutions petits espaces", 
          "agencement intelligent Marseille", 
          "optimisation surface habitable"
        ]}
      />
    </>
  );
};

export default OptimisationEspace;
