
import { useEffect, useState } from 'react';
import { validatePageSEO, SEOValidationResult } from '@/utils/seoValidator';

/**
 * Hook personnalisé pour valider le SEO d'une page
 * @returns Résultat de la validation SEO
 */
export const useSEOValidator = () => {
  const [validationResult, setValidationResult] = useState<SEOValidationResult>({
    isValid: true,
    issues: []
  });
  
  const [hasChecked, setHasChecked] = useState(false);
  
  useEffect(() => {
    // Attendre que le DOM soit complètement chargé
    const timer = setTimeout(() => {
      const result = validatePageSEO();
      setValidationResult(result);
      setHasChecked(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    ...validationResult,
    hasChecked
  };
};

export default useSEOValidator;
