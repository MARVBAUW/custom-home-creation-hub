
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';
import ExtensionHero from '@/components/prestations/extension/ExtensionHero';
import ExtensionSidebar from '@/components/prestations/extension/ExtensionSidebar';
import ExtensionContent from '@/components/prestations/extension/ExtensionContent';

const Extension = () => {
  return (
    <>
      <SEO 
        title="Extension de maison sur mesure en PACA | Maître d'œuvre Progineer"
        description="Spécialiste en extension de maison à Marseille et en PACA. Agrandissez votre espace habitable avec une extension sur-mesure réalisée par Progineer, votre maître d'œuvre expert."
        keywords="extension maison, agrandissement maison, extension sur-mesure, maître d'œuvre PACA, extension Marseille"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/extension"
      />

      <ExtensionHero />
      <PrestationsSubNav activeService="extension" />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <ExtensionSidebar />
            </div>
            <div className="lg:col-span-3">
              <ExtensionContent />
            </div>
          </div>
        </Container>
      </section>

      <SEOFooter 
        text="Extension et agrandissement de maisons en PACA par Progineer, maître d'œuvre spécialisé dans les projets d'extension. Nos experts vous accompagnent dans tous vos projets d'agrandissement à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur pour optimiser et valoriser votre habitat."
        additionalKeywords={[
          "extension maison contemporaine", 
          "agrandissement villa PACA", 
          "surélévation maison Marseille", 
          "véranda sur mesure", 
          "extension bois méditerranée"
        ]}
      />
    </>
  );
};

export default Extension;
