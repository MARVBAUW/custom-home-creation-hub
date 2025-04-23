
import React from 'react';
import Button from '@/components/common/Button';
import { formatCityName } from '@/utils/localSEOUtils';

interface DesignInterieurSidebarProps {
  city?: string;
}

const DesignInterieurSidebar: React.FC<DesignInterieurSidebarProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <div className="space-y-8">
      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Nos services de design{cityDisplay ? ` à ${cityDisplay}` : ''}</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Conception d'intérieur</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Aménagement d'espace</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Décoration intérieure</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Home staging</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Conseils en aménagement</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Sélection de mobilier</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Pourquoi nous choisir{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium">Créativité</h4>
              <p className="text-sm text-gray-600">Concepts innovants et personnalisés</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium">Expertise technique</h4>
              <p className="text-sm text-gray-600">Connaissance des matériaux et tendances</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium">Vision globale</h4>
              <p className="text-sm text-gray-600">Entre esthétique et fonctionnalité</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">4</span>
            </div>
            <div>
              <h4 className="font-medium">Engagement qualité</h4>
              <p className="text-sm text-gray-600">Suivi rigoureux des projets</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Besoin d'un devis{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="text-gray-600 mb-4">
          Contactez-nous pour discuter de votre projet de design intérieur{cityDisplay ? ` à ${cityDisplay}` : ''} et obtenir un devis personnalisé.
        </p>
        <Button href="/contact" className="w-full bg-khaki-700 hover:bg-khaki-800 text-white">
          Demander un devis gratuit
        </Button>
      </div>
    </div>
  );
};

export default DesignInterieurSidebar;
