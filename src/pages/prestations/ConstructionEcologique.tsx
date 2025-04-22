
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const ConstructionEcologique = () => {
  return (
    <>
      <SEO
        title="Construction écologique | Maître d'œuvre PACA - Progineer"
        description="Solutions de construction écologique à Marseille et dans toute la région PACA, pour un habitat respectueux de l'environnement."
        keywords="construction écologique, maison bois, matériaux biosourcés, passif, maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/construction-ecologique"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Construction écologique</h1>
          <InternalLinkText
            text="Progineer conçoit et réalise des projets de construction écologique, avec une démarche responsable et innovante. Découvrez nos solutions en maison à ossature bois, rénovation énergétique, conception bioclimatique et optimisation d'espace."
            className="text-lg text-gray-700 mb-4"
            maxOccurrences={2}
          />
        </Container>
      </section>
    </>
  );
};
export default ConstructionEcologique;
