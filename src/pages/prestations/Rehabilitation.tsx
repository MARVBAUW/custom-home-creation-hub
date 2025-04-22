
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const Rehabilitation = () => {
  return (
    <>
      <SEO
        title="Réhabilitation de bâtiments | Maître d'œuvre PACA - Progineer"
        description="Réhabilitation complète de bâtiments anciens à Marseille, Nice, Toulon et dans toute la région PACA."
        keywords="réhabilitation, maître d'œuvre, patrimoine, rénovation lourde, PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/rehabilitation"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Réhabilitation</h1>
          <InternalLinkText
            text="La réhabilitation de bâtiments anciens nécessite un savoir-faire spécifique. Progineer assure la réussite de vos projets de réhabilitation en respectant le patrimoine architectural, l'efficacité énergétique et les normes en vigueur. Contactez notre équipe pour une étude personnalisée."
            className="text-lg text-gray-700 mb-4"
            maxOccurrences={2}
          />
        </Container>
      </section>
    </>
  );
};
export default Rehabilitation;
