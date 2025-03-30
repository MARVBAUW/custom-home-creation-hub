
import React from 'react';
import { InfoIcon } from 'lucide-react';

export const UpdateNotice: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-khaki-50 border border-khaki-100 rounded-lg flex items-start w-full">
      <InfoIcon className="h-5 w-5 text-khaki-600 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-khaki-800 mb-1">Mises à jour régulières</h4>
        <p className="text-sm text-gray-600">
          Nos guides et ressources sont mis à jour régulièrement pour refléter les dernières réglementations et meilleures pratiques. 
          Revenez consulter cette page fréquemment pour découvrir les nouvelles ressources disponibles.
        </p>
      </div>
    </div>
  );
};
