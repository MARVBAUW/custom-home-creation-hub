
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import ConstructionNeuveHero from '@/components/prestations/construction-neuve/ConstructionNeuveHero';
import ConstructionNeuveSidebar from '@/components/prestations/construction-neuve/ConstructionNeuveSidebar';
import ConstructionNeuveContent from '@/components/prestations/construction-neuve/ConstructionNeuveContent';
import ConstructionNeuveSEOContent from '@/components/prestations/construction-neuve/ConstructionNeuveSEOContent';

interface ConstructionNeuveProps {
  forcedSeoParams?: {
    title: string;
    description: string;
    h1: string;
    city: string;
    profession: string;
  };
}

const ConstructionNeuve: React.FC<ConstructionNeuveProps> = ({ forcedSeoParams }) => {
  const cityName = forcedSeoParams?.city ? forcedSeoParams.city.replace(/-/g, ' ') : '';
  
  return (
    <>
      <SEO 
        title={forcedSeoParams?.title || "Construction de maisons sur mesure en PACA | Maître d'œuvre Progineer"}
        description={forcedSeoParams?.description || "Spécialiste en construction de maisons individuelles à Marseille et en PACA. Créez la maison de vos rêves avec Progineer, maître d'œuvre expert en construction sur mesure."}
        keywords={`construction maison${cityName ? ` ${cityName}` : ''}, maison sur mesure, construction individuelle, maître d'œuvre PACA, construction neuve`}
        canonicalUrl={forcedSeoParams ? undefined : "https://progineer.fr/prestations-maitre-oeuvre/construction-neuve"}
      />

      <ConstructionNeuveHero customH1={forcedSeoParams?.h1} customCity={forcedSeoParams?.city} />
      <PrestationsSubNav activeService="construction-neuve" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <ConstructionNeuveSidebar city={forcedSeoParams?.city} />
            </div>
            <div className="lg:col-span-3">
              <ConstructionNeuveContent city={forcedSeoParams?.city} />
              <ConstructionNeuveSEOContent />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text={`Construction de maisons sur mesure ${cityName ? `à ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}` : 'en PACA'} par Progineer, maître d'œuvre spécialisé en construction neuve. Nos experts vous accompagnent dans tous vos projets de construction ${cityName || 'à Marseille, Nice, Toulon'} et dans toute la région Provence-Alpes-Côte d'Azur pour créer la maison de vos rêves.`}
        additionalKeywords={[
          `construction villa ${cityName || 'PACA'}`, 
          `maison neuve ${cityName || 'Marseille'}`, 
          "construction moderne méditerranée", 
          "villa individuelle sur mesure", 
          "construction maison contemporaine"
        ]}
      />
    </>
  );
};

export default ConstructionNeuve;
