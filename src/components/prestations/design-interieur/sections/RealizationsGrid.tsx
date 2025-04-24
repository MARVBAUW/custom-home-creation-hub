
import React from 'react';
import { InternalLinkText } from '@/utils/internalLinking';

const RealizationsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h4 className="text-xl font-medium mb-3">Appartement haussmannien</h4>
        <p className="text-gray-600 mb-4">
          <InternalLinkText 
            text="Rénovation complète avec préservation des éléments d'époque et intégration de touches contemporaines."
            maxOccurrences={1}
          />
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h4 className="text-xl font-medium mb-3">Villa contemporaine</h4>
        <p className="text-gray-600 mb-4">
          <InternalLinkText 
            text="Design intérieur minimaliste et épuré avec des matériaux nobles et des jeux de lumière naturelle."
            maxOccurrences={1}
          />
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h4 className="text-xl font-medium mb-3">Espaces professionnels</h4>
        <p className="text-gray-600 mb-4">
          <InternalLinkText 
            text="Aménagement de bureaux alliant confort, ergonomie et image de marque pour une entreprise locale."
            maxOccurrences={1}
          />
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h4 className="text-xl font-medium mb-3">Rénovation de commerce</h4>
        <p className="text-gray-600 mb-4">
          <InternalLinkText 
            text="Redesign complet d'une boutique avec création d'une identité visuelle forte et d'un parcours client optimisé."
            maxOccurrences={1}
          />
        </p>
      </div>
    </div>
  );
};

export default RealizationsGrid;
