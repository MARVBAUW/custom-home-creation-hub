
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
      <h2 className="text-3xl font-semibold mb-6">Optimisation d'espace{cityDisplay ? ` à ${cityDisplay}` : ''}</h2>
      <p className="mb-8 text-gray-700">
        Notre expertise en <strong>optimisation d'espace</strong> {cityDisplay ? ` à ${cityDisplay}` : ''} vous permet de maximiser chaque mètre carré de votre habitat. Nous concevons des aménagements intelligents et fonctionnels, parfaitement adaptés à vos besoins.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop" 
          alt="Optimisation d'espace réalisée par Progineer en PACA"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Aménagement optimisé d'un petit appartement à Marseille</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos solutions d'optimisation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rangements sur mesure</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Création de rangements intégrés et optimisés pour exploiter tous les recoins de votre habitat."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Bibliothèques sur mesure</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Placards intégrés</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Solutions sous escalier</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Mobilier multifonction</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Conception et installation de mobilier adaptatif qui remplit plusieurs fonctions dans un espace limité."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Lits escamotables</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Tables transformables</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Modules combinés</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Mezzanines et estrades</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Création d'espaces superposés pour exploiter la hauteur et gagner de la surface au sol."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Chambres en mezzanine</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Estrades avec rangements</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Bureaux suspendus</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Cloisons modulables</h4>
          <p className="text-gray-600 mb-4">
            <InternalLinkText 
              text="Installation de séparations amovibles pour créer des espaces flexibles adaptables à vos besoins."
              maxOccurrences={1}
            />
          </p>
          <ul className="text-sm text-gray-600">
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Parois coulissantes</span>
            </li>
            <li className="flex items-start mb-1">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Bibliothèques séparatrices</span>
            </li>
            <li className="flex items-start">
              <span className="text-khaki-600 mr-2">✓</span>
              <span>Rideaux et voilages</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre démarche d'optimisation</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <ol className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
            <div>
              <h4 className="font-medium">Analyse de l'espace</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Étude approfondie de votre espace, des contraintes et des possibilités d'aménagement."
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
                  text="Création de solutions personnalisées adaptées à vos besoins et à votre mode de vie."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
            <div>
              <h4 className="font-medium">Visualisation du projet</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Présentation de plans, esquisses et rendus 3D pour visualiser les aménagements proposés."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">4</span>
            <div>
              <h4 className="font-medium">Réalisation et installation</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Fabrication et mise en place des aménagements par des artisans qualifiés."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet d'optimisation{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="mb-6">
          <InternalLinkText 
            text={`Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre espace${cityDisplay ? ` à ${cityDisplay}` : ''} et de vous proposer des solutions pour l'optimiser.`}
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
