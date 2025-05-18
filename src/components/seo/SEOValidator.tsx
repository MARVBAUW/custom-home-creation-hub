
import React, { useState, useEffect } from 'react';
import { validatePageSEO } from '@/utils/seoValidator';

/**
 * Composant pour valider les éléments SEO d'une page en temps réel
 * Ce composant ne s'affiche qu'en mode développement
 */
const SEOValidator: React.FC = () => {
  const [seoIssues, setSeoIssues] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Ne s'exécute qu'en environnement de développement
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
    
    // Délai pour laisser la page se charger complètement
    const timer = setTimeout(() => {
      const { issues } = validatePageSEO();
      setSeoIssues(issues);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Ne rien afficher en production ou si aucun problème
  if (process.env.NODE_ENV !== 'development' || seoIssues.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-md shadow-md flex items-center"
      >
        <span className="mr-1">SEO</span>
        <span className="inline-flex items-center justify-center w-5 h-5 bg-white text-amber-500 rounded-full text-xs font-bold">
          {seoIssues.length}
        </span>
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 max-h-96 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 mb-2">Problèmes SEO détectés</h4>
          <ul className="text-sm text-gray-600">
            {seoIssues.map((issue, index) => (
              <li key={index} className="mb-1 pb-1 border-b border-gray-100 last:border-0">
                • {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SEOValidator;
