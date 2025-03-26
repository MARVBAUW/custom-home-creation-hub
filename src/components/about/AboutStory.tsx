
import React from 'react';
import Container from '@/components/common/Container';

const AboutStory = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Notre histoire</h2>
            <p className="text-gray-600 mb-4">
              Fondée en 2018 par Marvin Bauwens, ingénieur en génie civil passionné d'architecture, Progineer est née d'une vision : proposer un service complet et personnalisé combinant l'expertise technique de l'ingénierie et la créativité de l'architecture.
            </p>
            <p className="text-gray-600 mb-4">
              Face au constat que de nombreux projets immobiliers souffraient d'un manque de coordination entre les différents intervenants, Marvin a souhaité créer une structure capable d'accompagner les clients de A à Z, en assurant une cohérence globale et une communication fluide à toutes les étapes.
            </p>
            <p className="text-gray-600 mb-4">
              D'abord établie à Marseille, l'entreprise a rapidement étendu son activité à l'ensemble de la région PACA, portée par le bouche-à-oreille de clients satisfaits et une réputation d'excellence et de fiabilité.
            </p>
            <p className="text-gray-600">
              Aujourd'hui, Progineer est reconnue comme un acteur de référence dans le domaine de la maîtrise d'œuvre et de l'architecture en Provence-Alpes-Côte d'Azur, travaillant aussi bien pour des particuliers que pour des professionnels.
            </p>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
              alt="Maison conçue par Progineer" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutStory;
