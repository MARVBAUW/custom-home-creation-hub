
import React from 'react';
import Button from '@/components/common/Button';
import { InternalLinkText } from '@/utils/internalLinking';

const OptimisationEspaceContent = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Optimisez votre espace de vie</h2>
      <p className="mb-8 text-gray-700">
        Chez Progineer, nous transformons vos espaces pour <strong>exploiter pleinement chaque mètre carré</strong> tout en créant des intérieurs fonctionnels et esthétiques. Notre expertise en optimisation d'espace vous permet de redécouvrir le potentiel caché de votre logement ou local professionnel.
      </p>

      <div className="mb-12">
        <img 
          src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop" 
          alt="Exemple d'optimisation d'espace réalisée par Progineer"
          className="w-full h-auto rounded-xl mb-4"
        />
        <p className="text-sm text-gray-500 text-center">Optimisation d'un appartement à Marseille</p>
      </div>

      <h3 className="text-2xl font-medium mb-4">Nos solutions d'optimisation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Réorganisation des espaces</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Redéfinition des cloisonnements et des circulations pour créer un agencement plus fonctionnel et adapté à votre mode de vie."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Rangements intégrés</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Conception de solutions de rangement sur mesure qui s'intègrent parfaitement à votre intérieur et exploitent les moindres recoins."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Aménagements multifonctions</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Création d'espaces modulables qui s'adaptent à différents usages selon vos besoins quotidiens ou occasionnels."
              maxOccurrences={1}
            />
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-xl font-medium mb-3">Mezzanines et surfaces verticales</h4>
          <p className="text-gray-600">
            <InternalLinkText 
              text="Exploitation de la hauteur sous plafond pour créer des surfaces supplémentaires et optimiser le volume disponible."
              maxOccurrences={1}
            />
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4">Notre méthode d'optimisation</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <ol className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
            <div>
              <h4 className="font-medium">Analyse des besoins et du mode de vie</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous étudions vos habitudes, vos contraintes et vos aspirations pour comprendre comment vous utilisez votre espace au quotidien."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
            <div>
              <h4 className="font-medium">Diagnostic spatial et ergonomique</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous identifions les points forts et les points faibles de votre espace actuel ainsi que son potentiel d'optimisation."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
            <div>
              <h4 className="font-medium">Proposition d'aménagement</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous élaborons des solutions d'optimisation sur mesure, illustrées par des plans et des visuels 3D pour vous projeter dans votre futur espace."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">4</span>
            <div>
              <h4 className="font-medium">Réalisation et aménagement</h4>
              <p className="text-gray-600 text-sm">
                <InternalLinkText 
                  text="Nous coordonnons la mise en œuvre des travaux et l'installation des aménagements pour concrétiser votre projet d'optimisation."
                  maxOccurrences={1}
                />
              </p>
            </div>
          </li>
        </ol>
      </div>

      <h3 className="text-2xl font-medium mb-4">Exemples de réalisations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-medium mb-2">Studio 25m² à Marseille</h4>
          <p className="text-gray-600 text-sm">Création d'une mezzanine, rangements intégrés et mobilier multifonction</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-medium mb-2">Appartement familial à Aix</h4>
          <p className="text-gray-600 text-sm">Réorganisation des cloisons et optimisation des espaces de vie</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-medium mb-2">Bureaux professionnels à Toulon</h4>
          <p className="text-gray-600 text-sm">Aménagement d'espaces de travail flexibles et ergonomiques</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-medium mb-2">Local commercial à Nice</h4>
          <p className="text-gray-600 text-sm">Optimisation de l'espace de vente et des zones de stockage</p>
        </div>
      </div>

      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-2xl font-medium mb-4">Vous avez un projet d'optimisation ?</h3>
        <p className="mb-6">
          <InternalLinkText 
            text="Contactez-nous pour un premier échange sans engagement. Nous serons ravis d'étudier votre espace et de vous proposer des solutions adaptées à vos besoins et à votre budget."
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
