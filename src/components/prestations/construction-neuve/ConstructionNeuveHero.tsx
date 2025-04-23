
import React from 'react';
import Container from '@/components/common/Container';
import { InternalLinkText } from '@/utils/internalLinking';
import { formatCityName } from '@/utils/localSEOUtils';

interface ConstructionNeuveHeroProps {
  customH1?: string;
  customCity?: string;
}

const ConstructionNeuveHero: React.FC<ConstructionNeuveHeroProps> = ({ customH1, customCity }) => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
      <Container size="md">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Construction neuve
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            {customH1 || `Construction de maisons sur mesure en PACA`}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            <InternalLinkText 
              text={customCity ? 
                `Faites construire votre maison individuelle à ${formatCityName(customCity)} avec Progineer. Notre expertise en maîtrise d'œuvre vous garantit un projet sur mesure et de qualité.` :
                `Des conceptions sur mesure pour créer la maison de vos rêves. Nous vous accompagnons à chaque étape de votre projet de construction neuve.`
              }
              maxOccurrences={2}
            />
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ConstructionNeuveHero;
