
import React from 'react';
import { InternalLinkText } from '@/utils/internalLinking';

const SkillsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Agencement spatial</h4>
        <p className="text-gray-600 text-sm">
          <InternalLinkText 
            text="Optimisation des circulations et création d'espaces fonctionnels adaptés à votre quotidien"
            maxOccurrences={1}
          />
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Harmonie chromatique</h4>
        <p className="text-gray-600 text-sm">
          <InternalLinkText 
            text="Sélection de palettes de couleurs équilibrées et cohérentes avec votre style"
            maxOccurrences={1}
          />
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Sélection de matériaux</h4>
        <p className="text-gray-600 text-sm">
          <InternalLinkText 
            text="Choix de revêtements et matériaux durables et esthétiques"
            maxOccurrences={1}
          />
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Éclairage architectural</h4>
        <p className="text-gray-600 text-sm">
          <InternalLinkText 
            text="Conception de plans lumière pour valoriser vos espaces"
            maxOccurrences={1}
          />
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Mobilier sur mesure</h4>
        <p className="text-gray-600 text-sm">
          <InternalLinkText 
            text="Création de pièces uniques adaptées à vos espaces et besoins"
            maxOccurrences={1}
          />
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Art & décoration</h4>
        <p className="text-gray-600 text-sm">
          <InternalLinkText 
            text="Sélection d'œuvres et accessoires pour personnaliser votre intérieur"
            maxOccurrences={1}
          />
        </p>
      </div>
    </div>
  );
};

export default SkillsGrid;
