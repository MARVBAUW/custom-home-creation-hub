
import React from 'react';
import Container from '@/components/common/Container';

const ContactLocationMap = () => {
  return (
    <section className="py-16 bg-progineer-light/50 border-t border-progineer-gold/10">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-rare tracking-wide mb-4 text-progineer-dark">Nos zones d'intervention</h2>
          <p className="text-gray-600">
            Nous intervenons dans toute la région Provence-Alpes-Côte d'Azur
          </p>
        </div>
        
        <div className="h-[400px] bg-white rounded-xl border border-progineer-gold/20 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Carte des zones d'intervention à venir</p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <h3 className="text-xl font-medium mb-4 text-progineer-dark">Zones d'intervention principales</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm border border-progineer-gold/10">
              <p className="font-medium text-progineer-gold">Marseille</p>
              <p className="text-sm text-gray-600">et alentours</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-progineer-gold/10">
              <p className="font-medium text-progineer-gold">Nice</p>
              <p className="text-sm text-gray-600">et alentours</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-progineer-gold/10">
              <p className="font-medium text-progineer-gold">Toulon</p>
              <p className="text-sm text-gray-600">et alentours</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm border border-progineer-gold/10">
              <p className="font-medium text-progineer-gold">Cannes</p>
              <p className="text-sm text-gray-600">et alentours</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactLocationMap;
