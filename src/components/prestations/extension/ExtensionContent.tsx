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
      <h2 className="text-3xl font-semibold mb-6">Agrandissez votre maison{cityDisplay ? ` à ${cityDisplay}` : ''}</h2>
      <p className="mb-8 text-gray-700">
        Notre expertise en <strong>extension de maison</strong> {cityDisplay ? ` à ${cityDisplay}` : ''} vous permet de créer de l'espace supplémentaire parfaitement intégré à votre habitat existant. Nous vous accompagnons dans toutes les étapes, de la conception aux démarches administratives.
      </p>

      <div className="mb-12">
        <img 
          src="/lovable-uploads/732fa99d-df25-4869-9ca9-b49ccf6f51a4.png" 
          alt={`Extension de maison réalisée par Progineer${cityDisplay ? ` à ${cityDisplay}` : ''}`}
          className="w-full h-auto rounded-xl mb-4 object-cover max-h-[600px]"
        />
        <p className="text-sm text-gray-500 text-center">Extension contemporaine{cityDisplay ? ` à ${cityDisplay}` : ''}</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos solutions d'extension</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Extension en rez-de-chaussée</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Agrandissez votre maison en créant une pièce supplémentaire au niveau du jardin, idéale pour un salon, une cuisine ou une chambre."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Accès direct au jardin</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Luminosité optimale</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Facilité d'accès</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Surélévation</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Gagnez de l'espace en ajoutant un étage à votre maison, sans réduire votre surface extérieure."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Conservation du jardin</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Vue dégagée</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Valorisation immobilière</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Extension à ossature bois</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Optez pour une extension écologique et rapide à mettre en œuvre grâce à la construction à ossature bois."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Matériau écologique</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Chantier rapide</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Isolation performante</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Véranda</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Créez un espace intermédiaire entre intérieur et extérieur, lumineux et agréable toute l'année."
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
              <span>Vue sur jardin</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Espace polyvalent</span>
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
              <h4 className="font-medium">Étude de faisabilité</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Analyse technique et réglementaire de votre projet pour déterminer les possibilités d'extension."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
            <div>
              <h4 className="font-medium">Conception architecturale</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Création des plans et des visuels 3D pour vous permettre de visualiser votre future extension."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
            <div>
              <h4 className="font-medium">Démarches administratives</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Montage et dépôt des dossiers de permis de construire ou déclaration préalable de travaux."
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
                  text="Coordination des artisans et suivi de chantier jusqu'à la réception de votre extension."
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
