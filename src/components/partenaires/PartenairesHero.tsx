
import React from 'react';
import Container from '@/components/common/Container';

const PartenairesHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
      <Container size="md">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Partenaires
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Devenez partenaire Progineer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Rejoignez notre réseau de professionnels du bâtiment et bénéficiez 
            d'opportunités de collaboration sur des projets en région PACA.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PartenairesHero;
