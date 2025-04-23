import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';
import { formatCityName } from '@/utils/localSEOUtils';

interface OptimisationEspaceContentProps {
  city?: string;
}

const OptimisationEspaceContent: React.FC<OptimisationEspaceContentProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Optimisez chaque m² de votre espace{cityDisplay ? ` à ${cityDisplay}` : ''}</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, nous vous aidons à maximiser le potentiel de votre intérieur grâce à des solutions d'<strong>optimisation d'espace</strong> intelligentes et sur mesure{cityDisplay ? ` à ${cityDisplay}` : ''}. Que vous ayez un petit appartement ou une grande maison, nous transformons chaque recoin en un espace fonctionnel et agréable à vivre.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1563983454453-4ca344064581?q=80&w=2070&auto=format&fit=crop" 
          alt="Exemple d'optimisation d'espace réalisée par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Aménagement d'un studio à Nice</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos solutions d'optimisation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Mobilier multifonctionnel</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Des meubles ingénieux qui se transforment pour s'adapter à vos besoins : lits escamotables, tables pliantes, canapés convertibles..."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Gain de place considérable</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Adaptabilité à tous les espaces</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Esthétique et design</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rangements sur mesure</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Des solutions de rangement astucieuses qui exploitent chaque recoin : placards intégrés, étagères modulables, dressings personnalisés..."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Organisation optimale</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Intégration parfaite à votre intérieur</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Valorisation de l'espace</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Cloisons modulables & verrières</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Des systèmes de séparation flexibles qui permettent de créer des espaces distincts sans perdre en luminosité : cloisons coulissantes, verrières d'atelier, panneaux japonais..."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Flexibilité et modularité</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Luminosité préservée</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Design contemporain</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Aménagement des combles & sous-sols</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Transformation de vos espaces inutilisés en pièces à vivre : chambres, bureaux, salles de jeux, home cinémas..."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Surface habitable augmentée</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Valorisation de votre bien</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Confort amélioré</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre approche de l'optimisation</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <ol className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
            <div>
              <h4 className="font-medium">Analyse de vos besoins</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous étudions votre mode de vie, vos habitudes et vos contraintes pour comprendre vos attentes en matière d'aménagement."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
            <div>
              <h4 className="font-medium">Conception sur mesure</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous créons des plans d'aménagement 2D et 3D qui optimisent chaque mètre carré et vous permettent de visualiser votre futur intérieur."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
            <div>
              <h4 className="font-medium">Sélection de matériaux & équipements</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous vous conseillons dans le choix de matériaux durables, esthétiques et adaptés à votre budget, ainsi que dans la sélection d'équipements innovants."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">4</span>
            <div>
              <h4 className="font-medium">Réalisation des travaux</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous coordonnons les différents corps de métier et assurons le suivi rigoureux du chantier pour garantir la qualité et le respect des délais."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous souhaitez optimiser votre espace{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="mb-6">
          <InternalLinkText 
            text={`Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet${cityDisplay ? ` à ${cityDisplay}` : ''} et de vous proposer des solutions astucieuses pour transformer votre intérieur.`}
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

export default OptimisationEspaceContent;
