import React from 'react';
import { formatCityName } from '@/utils/localSEOUtils';

interface OptimisationEspaceSidebarProps {
  city?: string;
}

const OptimisationEspaceSidebar: React.FC<OptimisationEspaceSidebarProps> = ({ city }) => {
  const cityDisplay = city ? formatCityName(city) : '';
  
  return (
    <div className="space-y-8">
      <div className="bg-khaki-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Nos services d'optimisation{cityDisplay ? ` à ${cityDisplay}` : ''}</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Aménagement de petits espaces</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Solutions de rangement sur mesure</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Mobilier multifonctionnel</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Reconfiguration d'espaces existants</span>
          </li>
          <li className="flex items-start">
            <span className="text-khaki-600 mr-2">•</span>
            <span>Optimisation de la lumière naturelle</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Pourquoi optimiser votre espace ?</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Gain de place</h4>
            <p className="text-sm text-gray-600">Exploitez chaque centimètre carré pour maximiser l'espace disponible.</p>
          </div>
          <div>
            <h4 className="font-medium">Fonctionnalité améliorée</h4>
            <p className="text-sm text-gray-600">Des espaces plus pratiques et adaptés à votre mode de vie.</p>
          </div>
          <div>
            <h4 className="font-medium">Valorisation immobilière</h4>
            <p className="text-sm text-gray-600">Un aménagement intelligent augmente la valeur de votre bien.</p>
          </div>
          <div>
            <h4 className="font-medium">Confort accru</h4>
            <p className="text-sm text-gray-600">Des espaces bien pensés pour un quotidien plus agréable.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Nos garanties</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <div>
              <span className="font-medium">Conception sur mesure</span>
              <p className="text-sm text-gray-600">Solutions adaptées à vos besoins spécifiques</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <div>
              <span className="font-medium">Matériaux de qualité</span>
              <p className="text-sm text-gray-600">Durabilité et esthétique garanties</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <div>
              <span className="font-medium">Respect des délais</span>
              <p className="text-sm text-gray-600">Planification rigoureuse de votre projet</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <div>
              <span className="font-medium">Suivi personnalisé</span>
              <p className="text-sm text-gray-600">Un interlocuteur dédié tout au long du projet</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-khaki-700 text-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Besoin de conseils ?</h3>
        <p className="mb-4 text-khaki-50">
          Nos experts en optimisation d'espace{cityDisplay ? ` à ${cityDisplay}` : ''} sont à votre disposition pour étudier votre projet et vous proposer les meilleures solutions.
        </p>
        <a 
          href="/contact" 
          className="block text-center py-2 px-4 bg-white text-khaki-700 rounded-lg font-medium hover:bg-khaki-50 transition-colors"
        >
          Contactez-nous
        </a>
      </div>
    </div>
  );
};

export default OptimisationEspaceSidebar;
