
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const RealisationsArchitecturales = () => {
  return (
    <>
      <SEO
        title="Réalisations architecturales | Maître d'œuvre PACA - Progineer"
        description="Portfolio de réalisations architecturales à Marseille, Aix, Toulon et dans toute la région PACA."
        keywords="réalisations architecturales, portfolio, maître d'œuvre, projets immobiliers, PACA"
        canonicalUrl="https://progineer.fr/realisations-architecturales"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Réalisations architecturales</h1>
          <InternalLinkText
            text="Découvrez une sélection de nos réalisations architecturales : maisons individuelles, petits collectifs résidentiels, extensions, réhabilitations et rénovations d'appartements en région PACA. Notre équipe de maître d'œuvre intervient pour tout projet sur mesure : construction, extension, optimisation ou design d'intérieur."
            className="text-lg text-gray-700 mb-4"
            maxOccurrences={2}
          />
        </Container>
      </section>
    </>
  );
};
export default RealisationsArchitecturales;
