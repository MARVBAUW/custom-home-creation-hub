
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import ConstructionNeuveHero from '@/components/prestations/construction-neuve/ConstructionNeuveHero';
import ConstructionNeuveSidebar from '@/components/prestations/construction-neuve/ConstructionNeuveSidebar';
import ConstructionNeuveContent from '@/components/prestations/construction-neuve/ConstructionNeuveContent';

const ConstructionNeuve = () => {
  return (
    <>
      <SEO 
        title="Construction sur mesure | Maître d'œuvre PACA - Progineer"
        description="Construction neuve de maisons individuelles et petits collectifs à Marseille et en PACA, avec un maître d'œuvre pour un accompagnement de A à Z."
        keywords="construction sur mesure, construction maison, maître d'œuvre marseille, construction PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/construction-neuve"
      />

      <ConstructionNeuveHero />
      <PrestationsSubNav activeService="construction-neuve" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <ConstructionNeuveSidebar />
            </div>
            <div className="lg:col-span-3">
              <ConstructionNeuveContent />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text="Construction de maisons sur mesure en PACA par Progineer, maître d'œuvre spécialisé en construction neuve. Nos experts vous accompagnent dans tous vos projets de construction à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour créer la maison de vos rêves."
      />
    </>
  );
};

export default ConstructionNeuve;
