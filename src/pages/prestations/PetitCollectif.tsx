
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const PetitCollectif = () => {
  return (
    <>
      <SEO
        title="Petit collectif résidentiel | Maître d'œuvre PACA - Progineer"
        description="Réalisation de petits collectifs résidentiels sur mesure à Marseille et en région PACA."
        keywords="petit collectif résidentiel, construction, maître d'œuvre Marseille, collectif PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/petit-collectif"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Petit collectif résidentiel</h1>
          <InternalLinkText
            text="Spécialiste du petit collectif résidentiel, Progineer accompagne les promoteurs et investisseurs souhaitant développer un projet sur mesure dans la région PACA. Nous intervenons de l'avant-projet à la livraison, incluant le montage administratif, la construction neuve ou la réhabilitation."
            className="text-lg text-gray-700 mb-4"
            maxOccurrences={2}
          />
        </Container>
      </section>
    </>
  );
};
export default PetitCollectif;
