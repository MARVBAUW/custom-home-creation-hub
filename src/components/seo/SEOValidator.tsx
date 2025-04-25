
import React, { useEffect, useState } from 'react';
import { validatePageSEO, SEOValidationResult } from '@/utils/seoValidator';

/**
 * Composant pour valider et afficher les problèmes SEO d'une page
 * Visible uniquement en mode développement
 */
const SEOValidator: React.FC = () => {
  const [validationResult, setValidationResult] = useState<SEOValidationResult>({
    isValid: true,
    issues: []
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Attendre que le DOM soit complètement chargé
    const timer = setTimeout(() => {
      const result = validatePageSEO();
      setValidationResult(result);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Ne rien afficher en production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  // Ne rien afficher si tout est valide
  if (validationResult.isValid) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded shadow-lg">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium text-amber-700">
              Problèmes SEO détectés ({validationResult.issues.length})
            </span>
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 text-amber-700 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        
        {isExpanded && (
          <div className="border-t border-amber-200 p-4">
            <ul className="list-disc pl-5 space-y-2 text-amber-700 text-sm">
              {validationResult.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              Note: Ce message n'apparaît qu'en mode développement
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOValidator;
