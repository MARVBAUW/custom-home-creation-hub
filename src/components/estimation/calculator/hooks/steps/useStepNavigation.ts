
import { useState } from 'react';
import { FormData } from '../../types';

export const useStepNavigation = (currentStep: number, formData: FormData) => {
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Navigate to the next step
  const goToNextStep = () => {
    setAnimationDirection('forward');
    // Find the next appropriate step based on the form path
    let nextStep = currentStep + 1;
    
    // Handle step skipping based on project type and user choices
    if (formData.projectType === "renovation") {
      // Skip eco-solutions step if not needed
      if (nextStep === 14 && !formData.includeEcoSolutions) {
        nextStep = 15;
      }
      // Skip renewable energy step if not needed
      if (nextStep === 15 && !formData.includeRenewableEnergy) {
        nextStep = 16;
      }
    } else if (formData.projectType === "construction") {
      // Skip options step for construction if not needed
      if (nextStep === 26 && !formData.includeOptions) {
        nextStep = 27;
      }
    }
    
    return {
      nextStep,
      animationDirection: 'forward' as const
    };
  };

  // Navigate to the previous step
  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    
    // Similar logic for backward navigation
    let prevStep = currentStep - 1;
    
    // Handle skipping steps when going backward
    if (formData.projectType === "renovation") {
      if (prevStep === 15 && !formData.includeRenewableEnergy) {
        prevStep = 14;
      }
      if (prevStep === 14 && !formData.includeEcoSolutions) {
        prevStep = 13;
      }
    } else if (formData.projectType === "construction") {
      if (prevStep === 26 && !formData.includeOptions) {
        prevStep = 25;
      }
    }
    
    // Ensure we don't go below step 1
    prevStep = Math.max(prevStep, 1);
    
    return {
      prevStep,
      animationDirection: 'backward' as const
    };
  };

  return {
    animationDirection,
    goToNextStep,
    goToPreviousStep,
  };
};
