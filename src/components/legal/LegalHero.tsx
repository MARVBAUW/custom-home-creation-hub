
import React from 'react';
import Container from '@/components/common/Container';

interface LegalHeroProps {
  title: string;
}

const LegalHero = ({ title }: LegalHeroProps) => {
  return (
    <section className="pt-32 pb-16 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-white z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop')`,
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      
      <Container size="md" className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">{title}</h1>
      </Container>
    </section>
  );
};

export default LegalHero;
