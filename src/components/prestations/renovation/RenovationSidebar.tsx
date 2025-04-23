import React from 'react';
import Button from '@/components/common/Button';
import { formatCityName } from '@/utils/localSEOUtils';

interface RenovationSidebarProps {
  city?: string;
}

const RenovationSidebar: React.FC<RenovationSidebarProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <div className="space-y-8">
      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Nos services de rénovation{cityDisplay ? ` à ${cityDisplay}` : ''}</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Rénovation complète d'appartement</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Rénovation de maison individuelle</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Rénovation énergétique</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Réaménagement d'espace</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Mise aux normes électriques</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Rénovation de salle de bain</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Rénovation de cuisine</span>
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
              <h4 className="font-medium">Expertise locale</h4>
              <p className="text-sm text-gray-600">Connaissance approfondie du bâti{cityDisplay ? ` à ${cityDisplay}` : ' en PACA'}</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium">Accompagnement complet</h4>
              <p className="text-sm text-gray-600">De la conception à la livraison</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium">Artisans qualifiés</h4>
              <p className="text-sm text-gray-600">Réseau de professionnels certifiés</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">4</span>
            </div>
            <div>
              <h4 className="font-medium">Transparence</h4>
              <p className="text-sm text-gray-600">Devis détaillés et suivi régulier</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Besoin d'un devis{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="text-gray-600 mb-4">
          Contactez-nous pour discuter de votre projet de rénovation{cityDisplay ? ` à ${cityDisplay}` : ''} et obtenir un devis personnalisé.
        </p>
        <Button href="/contact" className="w-full bg-khaki-700 hover:bg-khaki-800 text-white">
          Demander un devis gratuit
        </Button>
      </div>
    </div>
  );
};

export default RenovationSidebar;
