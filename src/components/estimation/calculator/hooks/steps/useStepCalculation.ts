
import { useState, useEffect } from 'react';
import { FormData } from '../../types';
import { getVisibleSteps } from '../../steps';

export const useStepCalculation = (formData: FormData, currentStep: number) => {
  const [totalSteps, setTotalSteps] = useState(36); // Default higher value
  
  // Get visible steps based on form data
  const visibleSteps = getVisibleSteps(formData);
  
  // Calculate total steps whenever form data changes
  useEffect(() => {
    // Calculate based on visible steps and form path
    let calculatedTotalSteps = visibleSteps.length;
    
    // Project-specific adjustments
    if (formData.projectType === "renovation") {
      if (!formData.includeEcoSolutions && !formData.includeRenewableEnergy) {
        calculatedTotalSteps -= 2; // Remove non-applicable steps
      }
    } else if (formData.projectType === "construction") {
      if (!formData.includeOptions) {
        calculatedTotalSteps -= 1;
      }
    }
    
    // Ensure a minimum number of steps
    calculatedTotalSteps = Math.max(calculatedTotalSteps, 14);
    
    setTotalSteps(calculatedTotalSteps);
  }, [visibleSteps.length, formData]);
  
  return {
    totalSteps,
    visibleSteps
  };
};
