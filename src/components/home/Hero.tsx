
import React from 'react';
import Container from '@/components/common/Container';
import HeroParticles from './hero/HeroParticles';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import ScrollIndicator from './hero/ScrollIndicator';

const Hero = () => {
  const scrollToNextSection = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="paca" className="relative min-h-[100vh] flex items-center py-24 overflow-hidden">
      <HeroParticles />
      <HeroBackground />
      
      <Container className="relative z-20 mt-16">
        <HeroContent />
      </Container>

      <ScrollIndicator onClick={scrollToNextSection} />
    </section>
  );
};

export default Hero;
