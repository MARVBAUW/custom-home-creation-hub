
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import DesignInterieurHero from '@/components/prestations/design-interieur/DesignInterieurHero';
import DesignInterieurSidebar from '@/components/prestations/design-interieur/DesignInterieurSidebar';
import DesignInterieurContent from '@/components/prestations/design-interieur/DesignInterieurContent';

const DesignInterieur = () => {
  return (
    <>
      <SEO 
        title="Design d'intérieur | Maître d'œuvre PACA - Progineer"
        description="Design d'intérieur et d'espace sur-mesure, par un maître d'œuvre à Marseille et en région PACA."
        keywords="design d'intérieur, design d'espace, aménagement intérieur, maître d'œuvre marseille"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/design-interieur"
      />

      <DesignInterieurHero />
      <PrestationsSubNav activeService="design-interieur" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <DesignInterieurSidebar />
            </div>
            <div className="lg:col-span-3">
              <DesignInterieurContent />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text="Design d'intérieur à Marseille et en PACA par Progineer, maître d'œuvre spécialisé en conception d'espaces. Nos experts vous accompagnent dans tous vos projets de design intérieur à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour créer des espaces qui vous ressemblent."
      />
    </>
  );
};

export default DesignInterieur;
