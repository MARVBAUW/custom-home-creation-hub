
import { useState } from 'react';
import { FormData } from '../../types';

export const useStepNavigation = (currentStep: number, formData: FormData) => {
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Naviguer vers l'étape suivante
  const goToNextStep = () => {
    setAnimationDirection('forward');
    
    let nextStep = currentStep + 1;
    
    // --- Routing spécifique selon le type de client ---
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
    
    // --- Routing spécifique selon le type de projet ---
    if (formData.projectType === "design") {
      // Pour les projets de design d'espace, aller directement à l'étape de contact
      return {
        nextStep: 28, // Étape finale (contact)
        animationDirection: 'forward' as const
      };
    }
    
    // --- Routing spécifique selon estimation rapide/précise ---
    if (formData.estimationType && formData.estimationType.includes("Rapide")) {
      if (currentStep === 4) {
        // Pour estimation rapide, aller à la page des prestations
        nextStep = 44; // Page des prestations concernées par le projet
      }
    }
    
    // --- Chemins spécifiques construction/extension vs rénovation/division ---
    if (formData.projectType === "construction" || formData.projectType === "extension") {
      // Sauter l'étape des questions spécifiques à la rénovation
      if (nextStep === 29) {
        nextStep = 30; // Sauter la page dédiée à la démolition en rénovation
      }
      
      // Gérer les sauts pour les options spécifiques en fonction des choix
      if (nextStep === 24 && !formData.includeRenewableEnergy) {
        nextStep = 25; // Sauter aux aménagements paysagers
      }
      if (nextStep === 25 && !formData.includeLandscaping) {
        nextStep = 26; // Sauter aux options
      }
      if (nextStep === 26 && !formData.includeOptions) {
        nextStep = 27; // Sauter à la cuisine
      }
      if (nextStep === 27 && !formData.includeCuisine) {
        nextStep = 28; // Sauter à la salle de bain
      }
      if (nextStep === 28 && !formData.includeBathroom) {
        nextStep = 45; // Aller au formulaire de contact
      }
    } else if (formData.projectType === "renovation" || formData.projectType === "division") {
      // Pour les projets de rénovation/division
      if (currentStep === 22 && !formData.includeEcoSolutions) {
        nextStep = 23; // Sauter aux énergies renouvelables
      }
      if (nextStep === 23 && !formData.includeRenewableEnergy) {
        nextStep = 24; // Sauter aux aménagements paysagers
      }
      if (nextStep === 24 && !formData.includeLandscaping) {
        nextStep = 25; // Sauter aux options
      }
      if (nextStep === 25 && !formData.includeOptions) {
        nextStep = 26; // Sauter à la cuisine
      }
      if (nextStep === 26 && !formData.includeCuisine) {
        nextStep = 27; // Sauter à la salle de bain
      }
      if (nextStep === 27 && !formData.includeBathroom) {
        nextStep = 45; // Aller au formulaire de contact
      }
    }
    
    // S'assurer de ne pas dépasser le nombre total d'étapes disponibles
    if (nextStep > 45) {
      nextStep = 45; // Étape finale (contact)
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
    
    // --- Gestion des chemins pour le retour en arrière ---
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
    
    // --- Gestion des chemins selon le type de projet ---
    if (formData.projectType === "construction" || formData.projectType === "extension") {
      // Éviter de revenir aux pages spécifiques de rénovation
      if (prevStep === 29) {
        prevStep = 28; // Éviter la page de démolition
      }
      
      // Gestion du retour pour les options
      if (prevStep === 28 && !formData.includeBathroom) {
        prevStep = 27;
      }
      if (prevStep === 27 && !formData.includeCuisine) {
        prevStep = 26;
      }
      if (prevStep === 26 && !formData.includeOptions) {
        prevStep = 25;
      }
      if (prevStep === 25 && !formData.includeLandscaping) {
        prevStep = 24;
      }
      if (prevStep === 24 && !formData.includeRenewableEnergy) {
        prevStep = 23;
      }
    } else if (formData.projectType === "renovation" || formData.projectType === "division") {
      // Gestion du retour pour les options en rénovation
      if (prevStep === 28 && !formData.includeBathroom) {
        prevStep = 27;
      }
      if (prevStep === 27 && !formData.includeCuisine) {
        prevStep = 26;
      }
      if (prevStep === 26 && !formData.includeOptions) {
        prevStep = 25;
      }
      if (prevStep === 25 && !formData.includeLandscaping) {
        prevStep = 24;
      }
      if (prevStep === 24 && !formData.includeRenewableEnergy) {
        prevStep = 23;
      }
      if (prevStep === 23 && !formData.includeEcoSolutions) {
        prevStep = 22;
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
