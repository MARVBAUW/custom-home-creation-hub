
import React from 'react';
import Container from '@/components/common/Container';

const ContactHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-white z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/lovable-uploads/e0f4ca87-d189-4420-9ae4-bc145e7365d1.png')`,
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      
      <Container size="md" className="relative z-10">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
            Contact
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Contactez notre équipe
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Notre équipe est à votre écoute pour répondre à vos questions et vous accompagner dans votre projet en région PACA.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ContactHero;
