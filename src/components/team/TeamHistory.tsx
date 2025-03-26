
import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { CheckCircle } from 'lucide-react';

const TeamHistory = () => {
  return (
    <section className="py-16 bg-khaki-50 dark:bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 dark:text-white">
            Notre histoire
          </h2>
          <div className="w-20 h-1 bg-progineer-gold mx-auto mb-8"></div>
        </div>
        
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-6 text-lg">
          <p>
            Progineer est une entreprise d'architecture et de maîtrise d'œuvre travaillant sur des projets de construction, rénovation ou de modification du bâti existant. Nous réalisons les études, le dépôt des autorisations administratives, l'appel d'offre et le suivi des travaux.
          </p>
          
          <p>
            Nous intervenons principalement à Marseille et ses alentours, nous sommes également présent sur toute de la côte d'azur en passant par Saint Tropez, Toulon, Nice, Cannes, Fréjus.
          </p>
          
          <p>
            Progineer s'engage à mettre en œuvre des réalisations qui reflètent vos aspirations et vos besoins, en alliant innovation, savoir-faire et respect des délais.
          </p>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-khaki-200 dark:border-gray-600 mt-8">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Progineer garantit :</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-progineer-gold mr-2 mt-1" />
                <span>Une écoute attentive, afin d'offrir un suivi personnalisé respectant au mieux vos besoins et votre budget.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-progineer-gold mr-2 mt-1" />
                <span>Une communication transparente, pour assurer une coordination efficace entre vous et les entreprises partenaires de votre projet.</span>
              </li>
            </ul>
          </div>
          
          <p className="pt-4">
            Que vous soyez un particulier ou un professionnel, nous sommes à votre disposition pour vous accompagner dans la concrétisation de vos idées, afin d'obtenir un résultat à la hauteur de vos attentes.
          </p>
          
          <div className="pt-8 text-center">
            <Button href="/contact" size="lg">
              Contactez-nous pour échanger sur votre projet
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeamHistory;
