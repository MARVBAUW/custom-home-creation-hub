
import React from 'react';
import Button from '@/components/common/Button';
import { formatCityName } from '@/utils/localSEOUtils';

interface OptimisationEspaceSidebarProps {
  city?: string;
}

const OptimisationEspaceSidebar: React.FC<OptimisationEspaceSidebarProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <div className="space-y-8">
      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Nos solutions d'optimisation{cityDisplay ? ` à ${cityDisplay}` : ''}</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Aménagement intelligent</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Mobilier multifonction</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Rangements sur mesure</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Mezzanines et estrades</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Cloisons modulables</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Solutions gain de place</span>
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
              <h4 className="font-medium">Solutions personnalisées</h4>
              <p className="text-sm text-gray-600">Adaptées à vos contraintes spatiales</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium">Vision innovante</h4>
              <p className="text-sm text-gray-600">Approche créative des problématiques d'espace</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium">Expertise technique</h4>
              <p className="text-sm text-gray-600">Solutions pratiques et esthétiques</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-khaki-100 flex items-center justify-center mr-3">
              <span className="text-khaki-700 text-sm">4</span>
            </div>
            <div>
              <h4 className="font-medium">Réalisation soignée</h4>
              <p className="text-sm text-gray-600">Artisans qualifiés et matériaux de qualité</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Besoin d'un devis{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="text-gray-600 mb-4">
          Contactez-nous pour discuter de votre projet d'optimisation d'espace{cityDisplay ? ` à ${cityDisplay}` : ''} et obtenir un devis personnalisé.
        </p>
        <Button href="/contact" className="w-full bg-khaki-700 hover:bg-khaki-800 text-white">
          Demander un devis gratuit
        </Button>
      </div>
    </div>
  );
};

export default OptimisationEspaceSidebar;
