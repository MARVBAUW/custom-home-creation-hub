
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
    if (formData.clientType === "individual") {
      // Si le choix est "particulier", sauter l'étape "projet professionnel"
      if (currentStep === 1) {
        nextStep = 3; // Aller directement à l'étape "projet particulier"
      }
    } else if (formData.clientType === "professional") {
      // Si le choix est "professionnel", sauter l'étape "projet particulier"
      if (currentStep === 2) {
        nextStep = 4; // Aller directement à l'étape "type d'estimation"
      }
    }
    
    if (formData.projectType === "renovation") {
      // Sauter l'étape des solutions écologiques si non nécessaire
      if (nextStep === 22 && !formData.includeEcoSolutions) {
        nextStep = 23;
      }
      // Sauter l'étape des énergies renouvelables si non nécessaire
      if (nextStep === 23 && !formData.includeRenewableEnergy) {
        nextStep = 24;
      }
      // Sauter l'étape d'aménagement paysager si non nécessaire
      if (nextStep === 24 && !formData.includeLandscaping) {
        nextStep = 25;
      }
    } else if (formData.projectType === "construction") {
      // Sauter l'étape des options pour la construction si non nécessaire
      if (nextStep === 25 && !formData.includeOptions) {
        nextStep = 26;
      }
      // Sauter l'étape cuisine si non nécessaire
      if (nextStep === 26 && !formData.includeCuisine) {
        nextStep = 27;
      }
      // Sauter l'étape salle de bain si non nécessaire
      if (nextStep === 27 && !formData.includeBathroom) {
        nextStep = 28;
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
    if (formData.clientType === "individual") {
      // Si on revient de l'étape "projet particulier" vers la première étape
      if (currentStep === 3) {
        prevStep = 1; // Retourner à l'étape "type de client"
      }
    } else if (formData.clientType === "professional") {
      // Si on revient de l'étape "type d'estimation" vers l'étape "projet professionnel"
      if (currentStep === 4) {
        prevStep = 2; // Retourner à l'étape "projet professionnel"
      }
    }
    
    if (formData.projectType === "renovation") {
      if (prevStep === 24 && !formData.includeLandscaping) {
        prevStep = 23;
      }
      if (prevStep === 23 && !formData.includeRenewableEnergy) {
        prevStep = 22;
      }
      if (prevStep === 22 && !formData.includeEcoSolutions) {
        prevStep = 21;
      }
    } else if (formData.projectType === "construction") {
      if (prevStep === 27 && !formData.includeBathroom) {
        prevStep = 26;
      }
      if (prevStep === 26 && !formData.includeCuisine) {
        prevStep = 25;
      }
      if (prevStep === 25 && !formData.includeOptions) {
        prevStep = 24;
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
