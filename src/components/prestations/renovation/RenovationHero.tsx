
import React from 'react';
import Container from '@/components/common/Container';
import { InternalLinkText } from '@/utils/internalLinking';

const RenovationHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
      <Container size="md">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Nos prestations
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Rénovation complète à Marseille et PACA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            <InternalLinkText 
              text="Des rénovations sur mesure pour transformer votre habitat existant. Nous vous accompagnons pour redonner vie à votre maison ou appartement."
              maxOccurrences={2}
            />
          </p>
        </div>
      </Container>
    </section>
  );
};

export default RenovationHero;
