
import React from 'react';
import Container from '@/components/common/Container';

const FAQHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
      <Container size="md">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            FAQ
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Questions fréquemment posées
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Retrouvez les réponses aux questions les plus courantes sur la maîtrise d'œuvre,
            la construction et la rénovation en région PACA.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default FAQHero;
