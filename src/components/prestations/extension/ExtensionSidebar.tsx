import React from 'react';
import Button from '@/components/common/Button';
import { formatCityName } from '@/utils/localSEOUtils';

interface ExtensionSidebarProps {
  city?: string;
}

const ExtensionSidebar: React.FC<ExtensionSidebarProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <div className="space-y-8">
      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Pourquoi choisir Progineer pour votre extension{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Expertise en conception d'extensions</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Connaissance des réglementations locales</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Intégration harmonieuse à l'existant</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Suivi personnalisé de votre projet</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">✓</span>
            <span>Respect des délais et des budgets</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Types d'extensions</h3>
        <ul className="space-y-2">
          <li className="flex items-center py-2 border-b border-gray-100">
            <span className="w-2 h-2 bg-khaki-400 rounded-full mr-3"></span>
            <span>Extension de plain-pied</span>
          </li>
          <li className="flex items-center py-2 border-b border-gray-100">
            <span className="w-2 h-2 bg-khaki-400 rounded-full mr-3"></span>
            <span>Surélévation</span>
          </li>
          <li className="flex items-center py-2 border-b border-gray-100">
            <span className="w-2 h-2 bg-khaki-400 rounded-full mr-3"></span>
            <span>Véranda & jardin d'hiver</span>
          </li>
          <li className="flex items-center py-2 border-b border-gray-100">
            <span className="w-2 h-2 bg-khaki-400 rounded-full mr-3"></span>
            <span>Extension à toit plat</span>
          </li>
          <li className="flex items-center py-2 border-b border-gray-100">
            <span className="w-2 h-2 bg-khaki-400 rounded-full mr-3"></span>
            <span>Extension en bois</span>
          </li>
          <li className="flex items-center py-2">
            <span className="w-2 h-2 bg-khaki-400 rounded-full mr-3"></span>
            <span>Extension contemporaine</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Démarches administratives</h3>
        <p className="text-gray-700 mb-4 text-sm">
          Selon la nature et l'ampleur de votre projet d'extension{cityDisplay ? ` à ${cityDisplay}` : ''}, différentes autorisations peuvent être nécessaires :
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <div>
              <span className="font-medium">Déclaration préalable :</span>
              <p className="text-gray-600">Pour les extensions de moins de 40m²</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <div>
              <span className="font-medium">Permis de construire :</span>
              <p className="text-gray-600">Pour les extensions plus importantes</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <div>
              <span className="font-medium">Consultation des ABF :</span>
              <p className="text-gray-600">Si votre bien est situé dans une zone protégée</p>
            </div>
          </li>
        </ul>
        <p className="text-sm text-gray-700 mt-4">
          Nous vous accompagnons dans toutes ces démarches administratives.
        </p>
      </div>
      
      <div className="bg-khaki-700 p-6 rounded-lg text-white">
        <h3 className="text-xl font-semibold mb-4">Besoin d'un devis pour votre extension{cityDisplay ? ` à ${cityDisplay}` : ''} ?</h3>
        <p className="mb-6 text-khaki-100">
          Contactez-nous pour obtenir un devis personnalisé et gratuit pour votre projet d'extension.
        </p>
        <Button href="/contact" className="w-full bg-white text-khaki-800 hover:bg-khaki-100">
          Demander un devis gratuit
        </Button>
      </div>
    </div>
  );
};

export default ExtensionSidebar;
