
import React from 'react';
import Container from '@/components/common/Container';
import { InternalLinkText } from '@/utils/internalLinking';

const DesignInterieurHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
      <Container size="md">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Design d'intérieur
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Design d'intérieur à Marseille et PACA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            <InternalLinkText 
              text="Créez des intérieurs esthétiques et fonctionnels qui reflètent votre personnalité et votre mode de vie. Notre équipe de designers transforme vos espaces en lieux uniques."
              maxOccurrences={2}
            />
          </p>
        </div>
      </Container>
    </section>
  );
};

export default DesignInterieurHero;
