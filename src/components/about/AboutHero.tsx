
import React from 'react';
import Container from '@/components/common/Container';

const AboutHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
      <Container size="md">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            À propos
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Notre histoire et nos valeurs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Découvrez qui nous sommes et ce qui fait de Progineer un partenaire
            de confiance pour tous vos projets immobiliers.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default AboutHero;
