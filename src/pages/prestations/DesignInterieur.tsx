
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import DesignInterieurHero from '@/components/prestations/design-interieur/DesignInterieurHero';
import DesignInterieurSidebar from '@/components/prestations/design-interieur/DesignInterieurSidebar';
import DesignInterieurContent from '@/components/prestations/design-interieur/DesignInterieurContent';

interface DesignInterieurProps {
  forcedSeoParams?: {
    title: string;
    description: string;
    h1: string;
    city: string;
    profession: string;
  };
}

const DesignInterieur: React.FC<DesignInterieurProps> = ({ forcedSeoParams }) => {
  const cityName = forcedSeoParams?.city ? forcedSeoParams.city.replace(/-/g, ' ') : '';
  
  return (
    <>
      <SEO 
        title={forcedSeoParams?.title || "Design d'intérieur et aménagement d'espace en PACA | Progineer"}
        description={forcedSeoParams?.description || "Expert en design d'intérieur à Marseille et en PACA. Créez des espaces harmonieux et fonctionnels avec Progineer, spécialiste de l'aménagement intérieur sur-mesure."}
        keywords={`design d'intérieur${cityName ? ` ${cityName}` : ''}, aménagement d'espace, décoration intérieure, maître d'œuvre PACA, intérieur sur-mesure`}
        canonicalUrl={forcedSeoParams ? undefined : "https://progineer.fr/prestations-maitre-oeuvre/design-interieur"}
      />

      <DesignInterieurHero customH1={forcedSeoParams?.h1} customCity={forcedSeoParams?.city} />
      <PrestationsSubNav activeService="design-interieur" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <DesignInterieurSidebar city={forcedSeoParams?.city} />
            </div>
            <div className="lg:col-span-3">
              <DesignInterieurContent city={forcedSeoParams?.city} />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text={`Design d'intérieur ${cityName ? `à ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}` : 'à Marseille et en PACA'} par Progineer, maître d'œuvre spécialisé en conception d'espaces. Nos experts vous accompagnent dans tous vos projets de design intérieur ${cityName || 'à Marseille, Nice, Toulon'} et dans toute la région Provence-Alpes-Côte d'Azur pour créer des espaces qui vous ressemblent.`}
        additionalKeywords={[
          `aménagement intérieur ${cityName || 'PACA'}`, 
          `design d'espace ${cityName || 'Marseille'}`, 
          "décoration intérieure professionnelle", 
          "optimisation espace habitable", 
          "conception intérieure méditerranéenne"
        ]}
      />
    </>
  );
};

export default DesignInterieur;
