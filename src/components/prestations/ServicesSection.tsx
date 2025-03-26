
import React from 'react';
import Container from '@/components/common/Container';
import ClienteleSection from './ClienteleSection';
import ServicesList from './ServicesList';

const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-16">
      <Container className="px-4 sm:px-6">
        {/* Clientèle - particuliers et professionnels */}
        <ClienteleSection />

        {/* Services détaillés */}
        <ServicesList />
      </Container>
    </section>
  );
};

export default ServicesSection;
