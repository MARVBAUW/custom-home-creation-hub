
import React from 'react';
import Container from '@/components/common/Container';

const ContactHero = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-progineer-light to-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-white z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/lovable-uploads/23fe2b30-1f84-472d-a3c8-d4c413ffbbc4.png')`,
            backgroundPosition: 'center',
            transform: 'scale(1.05)',
          }}
        ></div>
      </div>
      
      <Container size="md" className="relative z-10">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-progineer-gold/10 text-progineer-gold text-sm font-medium">
            Contact
          </div>
          <h1 className="text-4xl md:text-5xl font-rare tracking-wide mb-6 text-progineer-dark">
            Parlons de votre projet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 speakable">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
            et vous accompagner dans la réalisation de votre projet.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ContactHero;
