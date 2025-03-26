
import React from 'react';
import Container from '@/components/common/Container';

const PrestationsHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white" id="overview">
      <Container size="md">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Nos prestations
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Services de maîtrise d'œuvre
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Progineer propose un accompagnement global pour vos projets de construction, de rénovation, 
            d'aménagement et d'optimisation énergétique, que vous soyez particulier ou professionnel.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PrestationsHero;
