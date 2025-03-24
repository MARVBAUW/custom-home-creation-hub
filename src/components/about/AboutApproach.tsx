
import React from 'react';
import Container from '@/components/common/Container';

const AboutApproach = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1517056338492-cb43f18f4208?q=80&w=2070&auto=format&fit=crop" 
              alt="Réunion d'équipe Progineer" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-semibold mb-6">Notre approche</h2>
            <p className="text-gray-600 mb-4">
              Chez Progineer, nous croyons qu'un projet réussi commence par une écoute attentive. Nous prenons le temps de comprendre vos besoins, vos contraintes et vos aspirations afin de vous proposer des solutions sur mesure.
            </p>
            <p className="text-gray-600 mb-4">
              Nous adoptons une approche collaborative, en vous impliquant à chaque étape du processus et en vous aidant à prendre des décisions éclairées. Notre objectif est de vous guider tout au long du projet, en vous apportant notre expertise technique et créative.
            </p>
            <p className="text-gray-600 mb-4">
              La durabilité est au cœur de notre philosophie. Nous concevons des espaces qui non seulement répondent à vos besoins actuels, mais qui sont également adaptables, économes en énergie et respectueux de l'environnement.
            </p>
            <p className="text-gray-600">
              Enfin, nous accordons une grande importance à la coordination entre tous les intervenants du projet, en assurant une communication fluide et en anticipant les potentiels problèmes, pour une réalisation sans accroc.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutApproach;
