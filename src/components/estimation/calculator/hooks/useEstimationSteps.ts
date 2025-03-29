
import { useState, useEffect } from 'react';
import { FormData } from '../types';
import { stepDefinitions } from '../steps/stepDefinitions';

export const useEstimationSteps = (formData: FormData) => {
  const [visibleSteps, setVisibleSteps] = useState<any[]>([]);

  useEffect(() => {
    // Filtrer les étapes visibles en fonction des données du formulaire
    const filteredSteps = stepDefinitions.filter(
      (step) => !step.skipCondition(formData)
    );
    
    setVisibleSteps(filteredSteps);
  }, [formData]);

  return { visibleSteps };
};
