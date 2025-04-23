import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';
import { formatCityName } from '@/utils/localSEOUtils';

interface ExtensionContentProps {
  city?: string;
}

const ExtensionContent: React.FC<ExtensionContentProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Agrandissez votre habitat{cityDisplay ? ` à ${cityDisplay}` : ''}</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, nous concevons des <strong>extensions de maison</strong>{cityDisplay ? ` à ${cityDisplay}` : ''} qui s'intègrent harmonieusement à votre bâti existant tout en apportant une touche contemporaine. Notre expertise vous permet de gagner de l'espace supplémentaire sans déménager, valorisant ainsi votre patrimoine immobilier.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=2070&auto=format&fit=crop" 
          alt="Exemple d'extension réalisée par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Extension contemporaine à Aix-en-Provence</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos solutions d'extension{cityDisplay ? ` à ${cityDisplay}` : ''}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Extension horizontale</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Agrandissement de plain-pied qui prolonge votre maison, idéal pour créer un salon, une cuisine ou une chambre supplémentaire."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Surface habitable optimisée</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Continuité avec l'existant</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Valorisation du patrimoine</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Surélévation</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Ajout d'un étage supplémentaire, parfait pour les terrains avec peu d'espace au sol ou pour profiter d'une vue dégagée."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Gain d'espace sans réduire le jardin</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Amélioration de l'isolation thermique</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Modernisation de l'habitat</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Véranda & jardin d'hiver</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Espace vitré lumineux qui fait le lien entre l'intérieur et l'extérieur, utilisable comme salon, salle à manger ou jardin d'hiver."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Luminosité maximale</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Intégration au jardin</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Confort toute l'année</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Aménagement de combles</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Transformation de vos combles en espace habitable pour créer des chambres, un bureau ou un espace détente sous les toits."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Exploitation d'espace inutilisé</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Charme des pièces sous pente</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Budget maîtrisé</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre processus d'extension</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <ol className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
            <div>
              <h4 className="font-medium">Étude et faisabilité</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Analyse de votre bâtiment existant, du terrain et des contraintes urbanistiques pour définir le projet optimal."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
            <div>
              <h4 className="font-medium">Conception et démarches administratives</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Élaboration des plans et obtention du permis de construire ou de la déclaration préalable de travaux."
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
                  text="Coordination des différents corps de métier et suivi rigoureux du chantier pour garantir la qualité et le respect des délais."
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
                  text="Vérification des finitions, levée des réserves éventuelles et remise des clés de votre extension."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet d'extension{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
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

export default ExtensionContent;
