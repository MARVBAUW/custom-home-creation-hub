
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import ExtensionHero from '@/components/prestations/extension/ExtensionHero';
import ExtensionSidebar from '@/components/prestations/extension/ExtensionSidebar';
import ExtensionContent from '@/components/prestations/extension/ExtensionContent';

interface ExtensionProps {
  forcedSeoParams?: {
    title: string;
    description: string;
    h1: string;
    city: string;
    profession: string;
  };
}

const Extension: React.FC<ExtensionProps> = ({ forcedSeoParams }) => {
  const cityName = forcedSeoParams?.city ? forcedSeoParams.city.replace(/-/g, ' ') : '';
  
  return (
    <>
      <SEO 
        title={forcedSeoParams?.title || "Extension de maison sur mesure en PACA | Maître d'œuvre Progineer"}
        description={forcedSeoParams?.description || "Spécialiste en extension de maison à Marseille et en PACA. Agrandissez votre espace habitable avec une extension sur-mesure réalisée par Progineer, votre maître d'œuvre expert."}
        keywords={`extension maison${cityName ? ` ${cityName}` : ''}, agrandissement maison, extension sur-mesure, maître d'œuvre PACA, extension Marseille`}
        canonicalUrl={forcedSeoParams ? undefined : "https://progineer.fr/prestations-maitre-oeuvre/extension"}
      />

      <ExtensionHero customH1={forcedSeoParams?.h1} customCity={forcedSeoParams?.city} />
      <PrestationsSubNav activeService="extension" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <ExtensionSidebar city={forcedSeoParams?.city} />
            </div>
            <div className="lg:col-span-3">
              <ExtensionContent city={forcedSeoParams?.city} />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text={`Extension et agrandissement de maisons ${cityName ? `à ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}` : 'en PACA'} par Progineer, maître d'œuvre spécialisé dans les projets d'extension. Nos experts vous accompagnent dans tous vos projets d'agrandissement ${cityName || 'à Marseille, Nice, Toulon'} et dans toute la région Provence-Alpes-Côte d'Azur pour optimiser et valoriser votre habitat.`}
        additionalKeywords={[
          `extension maison contemporaine ${cityName || 'PACA'}`, 
          `agrandissement villa ${cityName || 'PACA'}`, 
          `surélévation maison ${cityName || 'Marseille'}`, 
          "véranda sur mesure", 
          "extension bois méditerranée"
        ]}
      />
    </>
  );
};

export default Extension;
