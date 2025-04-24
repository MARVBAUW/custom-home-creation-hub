
import React from 'react';
import { InternalLinkText } from '@/utils/internalLinking';

const ProcessSection = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-10">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-start">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">1</span>
          <div>
            <h4 className="text-xl font-medium mb-2">Écoute et analyse</h4>
            <p className="text-gray-600">
              <InternalLinkText 
                text="Nous commençons par comprendre vos besoins, vos goûts et votre mode de vie pour saisir l'essence de votre projet. Cette étape d'échange est fondamentale pour créer un intérieur qui vous correspond."
                maxOccurrences={1}
              />
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-start">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">2</span>
          <div>
            <h4 className="text-xl font-medium mb-2">Concept et planches d'ambiance</h4>
            <p className="text-gray-600">
              <InternalLinkText 
                text="Nous élaborons un concept qui répond à vos attentes et créons des moodboards pour vous présenter notre vision. Ces planches d'ambiance illustrent les couleurs, textures et matériaux envisagés."
                maxOccurrences={1}
              />
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-start">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">3</span>
          <div>
            <h4 className="text-xl font-medium mb-2">Plans et visualisations 3D</h4>
            <p className="text-gray-600">
              <InternalLinkText 
                text="Nous concevons des plans détaillés et réalisons des visualisations 3D pour vous permettre de vous projeter dans votre futur intérieur avant même le début des travaux."
                maxOccurrences={1}
              />
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-start">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-khaki-100 text-khaki-700 flex items-center justify-center font-semibold mr-4">4</span>
          <div>
            <h4 className="text-xl font-medium mb-2">Coordination et réalisation</h4>
            <p className="text-gray-600">
              <InternalLinkText 
                text="Nous supervisons la mise en œuvre du projet, de la sélection des artisans à la livraison finale, en passant par le choix des mobiliers et des éléments de décoration."
                maxOccurrences={1}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
