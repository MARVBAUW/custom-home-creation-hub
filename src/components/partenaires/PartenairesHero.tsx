
import React from 'react';
import Container from '@/components/common/Container';

const PartenairesHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-white z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop')`,
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      
      <Container size="md" className="relative z-10">
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
