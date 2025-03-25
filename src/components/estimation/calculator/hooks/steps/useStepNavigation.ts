
import { useState } from 'react';
import { FormData } from '../../types';

export const useStepNavigation = (currentStep: number, formData: FormData) => {
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Naviguer vers l'étape suivante
  const goToNextStep = () => {
    setAnimationDirection('forward');
    // Trouver l'étape suivante appropriée en fonction du chemin du formulaire
    let nextStep = currentStep + 1;
    
    // Gérer le saut d'étapes en fonction du type de projet et des choix de l'utilisateur
    if (formData.projectType === "renovation") {
      // Sauter l'étape des solutions écologiques si non nécessaire
      if (nextStep === 14 && !formData.includeEcoSolutions) {
        nextStep = 15;
      }
      // Sauter l'étape des énergies renouvelables si non nécessaire
      if (nextStep === 15 && !formData.includeRenewableEnergy) {
        nextStep = 16;
      }
    } else if (formData.projectType === "construction") {
      // Sauter l'étape des options pour la construction si non nécessaire
      if (nextStep === 26 && !formData.includeOptions) {
        nextStep = 27;
      }
    }
    
    return {
      nextStep,
      animationDirection: 'forward' as const
    };
  };

  // Naviguer vers l'étape précédente
  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    
    // Logique similaire pour la navigation en arrière
    let prevStep = currentStep - 1;
    
    // Gérer le saut d'étapes lors du retour en arrière
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
    
    // S'assurer qu'on ne descend pas en dessous de l'étape 1
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
