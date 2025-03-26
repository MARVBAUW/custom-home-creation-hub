
import React from 'react';
import Container from '@/components/common/Container';
import ClienteleSection from './ClienteleSection';
import ServicesList from './ServicesList';

const ServicesSection = () => {
  return (
    <section className="py-16">
      <Container>
        {/* Clientèle - particuliers et professionnels */}
        <ClienteleSection />

        {/* Services détaillés */}
        <ServicesList />
      </Container>
    </section>
  );
};

export default ServicesSection;
