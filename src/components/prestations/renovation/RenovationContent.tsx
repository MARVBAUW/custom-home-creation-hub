import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';
import { formatCityName } from '@/utils/localSEOUtils';

interface RenovationContentProps {
  city?: string;
}

const RenovationContent: React.FC<RenovationContentProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Rénovez votre habitat{cityDisplay ? ` à ${cityDisplay}` : ''}</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, nous transformons votre espace de vie {cityDisplay ? ` à ${cityDisplay}` : ''} grâce à des <strong>rénovations complètes</strong> et sur mesure. De la conception à la réalisation, nous vous accompagnons pour créer un intérieur qui vous ressemble.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop" 
          alt="Exemple de rénovation réalisée par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Rénovation d'un appartement à Marseille</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos services de rénovation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rénovation intérieure</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Transformation de votre intérieur avec une optimisation de l'espace, une modernisation des équipements et une décoration soignée."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Agencement personnalisé</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Matériaux de qualité</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Finitions impeccables</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rénovation énergétique</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Amélioration de la performance énergétique de votre logement grâce à l'isolation, au remplacement des menuiseries et à l'installation de systèmes de chauffage performants."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Réduction de vos factures</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Confort thermique optimal</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Valorisation de votre bien</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rénovation de salle de bain</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Création d'une salle de bain moderne et fonctionnelle avec des équipements de qualité et un design soigné."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Aménagement sur mesure</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Choix de matériaux durables</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Installation par des professionnels</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rénovation de cuisine</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Conception et installation d'une cuisine équipée et fonctionnelle, adaptée à vos besoins et à vos envies."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Optimisation de l'espace</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Équipements modernes et performants</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Design personnalisé</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre processus de rénovation</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <ol className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
            <div>
              <h4 className="font-medium">Diagnostic et étude</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Analyse de votre bien, de vos besoins et de vos contraintes pour définir un projet de rénovation adapté."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
            <div>
              <h4 className="font-medium">Conception et planification</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Élaboration des plans, choix des matériaux et planification des travaux en accord avec vos attentes."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
            <div>
              <h4 className="font-medium">Réalisation des travaux</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Coordination des artisans, suivi rigoureux du chantier et respect des délais pour une rénovation de qualité."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">4</span>
            <div>
              <h4 className="font-medium">Réception et garanties</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Vérification des finitions, levée des réserves éventuelles et remise des clés de votre habitat rénové."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet de rénovation{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="mb-6">
          <InternalLinkText 
            text={`Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet${cityDisplay ? ` à ${cityDisplay}` : ''} et de vous proposer des solutions adaptées à vos besoins et à votre budget.`}
            maxOccurrences={1}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/estimation" className="bg-khaki-700 hover:bg-khaki-800 text-white">
            Estimer mon projet
          </Button>
          <Button href="/contact" variant="outline" className="border-khaki-300 hover:bg-khaki-50">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </>
  );
};

export default RenovationContent;
