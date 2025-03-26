
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const TeamProjects = () => {
  return (
    <section className="py-16 bg-khaki-50 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 dark:text-white">
            Nos réalisations
          </h2>
          <div className="w-20 h-1 bg-progineer-gold mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/8d532cc9-a94b-4199-b9a4-7fc8b3be4f0e.png" 
              alt="Maison contemporaine avec piscine" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-1 dark:text-white">Villa contemporaine</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Construction neuve avec piscine</p>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/4e95bb0e-3e4c-48a0-b08b-9db77d6ee437.png" 
              alt="Cuisine moderne avec îlot central" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-1 dark:text-white">Aménagement intérieur</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Cuisine ouverte avec îlot central</p>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/7853bb71-eac7-46a1-b29e-f843fb2017df.png" 
              alt="Salon moderne avec escalier" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-1 dark:text-white">Espace de vie</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Salon avec cheminée suspendue</p>
            </div>
          </div>
          
          {/* Project 4 */}
          <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/07270ac3-7ab5-4a34-a094-bdb6453247dc.png" 
              alt="Esplanade urbaine" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-1 dark:text-white">Aménagement urbain</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Esplanade résidentielle</p>
            </div>
          </div>
          
          {/* Project 5 */}
          <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/0d5258af-ddb8-4899-a647-cc2768c16f0b.png" 
              alt="Villa provençale avec piscine" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-1 dark:text-white">Villa néo-provençale</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Construction avec toiture en tuiles</p>
            </div>
          </div>
          
          {/* Project 6 */}
          <div className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/7f302166-d127-4673-b85a-26a2d1698c8f.png" 
              alt="Immeuble moderne" 
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-1 dark:text-white">Immeuble urbain</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Rénovation façade et structure</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button href="/realisations-architecte-maison" size="lg">
            Découvrir toutes nos réalisations
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default TeamProjects;
