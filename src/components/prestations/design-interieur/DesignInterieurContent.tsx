
import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';
import { formatCityName } from '@/utils/localSEOUtils';

interface DesignInterieurContentProps {
  city?: string;
}

const DesignInterieurContent: React.FC<DesignInterieurContentProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Design d'intérieur{cityDisplay ? ` à ${cityDisplay}` : ''}</h2>
      <p className="mb-8 text-gray-700">
        Notre expertise en <strong>design d'intérieur</strong> {cityDisplay ? ` à ${cityDisplay}` : ''} vous permet de créer des espaces qui vous ressemblent. Nous concevons des intérieurs fonctionnels et esthétiques, qui s'adaptent parfaitement à votre mode de vie.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2080&auto=format&fit=crop" 
          alt="Design d'intérieur réalisé par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Conception d'un salon contemporain à Marseille</p>
      </div>

      {/* Contenu principal - gardez et adaptez selon vos besoins */}
      <h3 className="text-2xl font-medium mb-4">Nos services de design d'intérieur</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Conception d'espaces</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Optimisation des volumes et création d'aménagements sur mesure pour transformer vos espaces."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Plans optimisés</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Meubles sur mesure</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Circulation fluide</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Décoration intérieure</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Sélection de couleurs, matériaux, mobilier et accessoires pour créer une ambiance harmonieuse."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Palettes de couleurs</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Choix de matériaux</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Accessoires déco</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Home staging</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Mise en valeur de votre bien immobilier pour maximiser son attrait auprès des acheteurs potentiels."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Valorisation immobilière</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Aménagement temporaire</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Conseils pratiques</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Suivi de projet</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Coordination des artisans et suivi de la mise en œuvre pour garantir un résultat conforme à vos attentes."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Coordination des intervenants</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Suivi qualité</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Respect des délais</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre approche du design d'intérieur</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <ol className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
            <div>
              <h4 className="font-medium">Étude de vos besoins</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Compréhension de vos attentes, de votre mode de vie et de vos goûts pour créer un projet personnalisé."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
            <div>
              <h4 className="font-medium">Conception créative</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Élaboration de planches d'ambiance, plans, rendus 3D pour visualiser votre futur intérieur."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
            <div>
              <h4 className="font-medium">Sélection des éléments</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Choix des matériaux, couleurs, mobilier et accessoires en accord avec le concept défini."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">4</span>
            <div>
              <h4 className="font-medium">Mise en œuvre</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Coordination des travaux et installation des éléments pour concrétiser votre projet."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet de design intérieur{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="mb-6">
          <InternalLinkText 
            text={`Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre projet${cityDisplay ? ` à ${cityDisplay}` : ''} et de vous proposer des solutions personnalisées.`}
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

export default DesignInterieurContent;
