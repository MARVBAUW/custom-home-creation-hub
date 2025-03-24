
import React from 'react';
import Container from '@/components/common/Container';

interface LegalHeroProps {
  title: string;
}

const LegalHero = ({ title }: LegalHeroProps) => {
  return (
    <section className="pt-32 pb-16">
      <Container size="md">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">{title}</h1>
      </Container>
    </section>
  );
};

export default LegalHero;
