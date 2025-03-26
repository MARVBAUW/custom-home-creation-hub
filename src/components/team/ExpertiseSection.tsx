
import React from 'react';
import Container from '@/components/common/Container';
import { CheckCircle } from 'lucide-react';

const expertise = [
  "Réglementation et démarches administratives",
  "Optimisation énergétique et environnementale",
  "Pilotage d'appels d'offres",
  "Conseil en aménagement urbain et territorial",
  "Assistance à la réception et livraison des travaux",
  "Planification et gestion budgétaire",
  "Études de marché et valorisation immobilière",
  "Expertise en rénovation et réhabilitation",
  "Accompagnement en design d'espace",
  "Conseil en montage financier et subventions"
];

const ExpertiseSection = () => {
  return (
    <section className="py-20 bg-stone-50">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Nos savoir-faire
          </h2>
          <div className="w-20 h-1 bg-progineer-gold mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Progineer réunit des compétences variées pour vous offrir un accompagnement complet sur tous vos projets de construction et d'aménagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <CheckCircle className="h-5 w-5 text-progineer-gold mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExpertiseSection;
