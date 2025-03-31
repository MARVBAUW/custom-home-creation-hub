
import { useState } from 'react';
import { FormData } from '../../types';

export const useStepNavigation = (currentStep: number, formData: FormData) => {
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Navigate to the next step
  const goToNextStep = () => {
    setAnimationDirection('forward');
    
    let nextStep = currentStep + 1;
    
    // --- Routing based on client type ---
    if (currentStep === 0) {
      if (formData.clientType === "professional") {
        // Si c'est un professionnel, aller directement au formulaire professionnel (étape 1)
        nextStep = 1;
      } else if (formData.clientType === "individual") {
        // Si c'est un particulier, aller au choix du type de projet (étape 2)
        nextStep = 2;
      }
    }
    
    // --- After client type selection (professional) ---
    if (currentStep === 1) {
      // Rediriger vers l'étape d'estimation (3) après le formulaire professionnel
      nextStep = 3;
    }
    
    // --- After project type selection (individual) ---
    if (currentStep === 2) {
      // Pour design d'espace ou optimisation, diriger vers le formulaire de contact
      if (formData.projectType === "design" || formData.projectType === "optimization") {
        // Aller directement au formulaire de contact (étape 45)
        nextStep = 45; 
        // Marquer qu'il s'agit d'un projet spécial nécessitant un contact direct
        updateFormData({ skipToContact: true });
      } else {
        // Pour les autres types, aller à l'étape type d'estimation
        nextStep = 3;
      }
    }
    
    // --- Routing based on estimation type ---
    if (currentStep === 3) {
      if (formData.estimationType === "quick") {
        // Pour l'estimation rapide, aller à la sélection des caractéristiques
        nextStep = 44;
      } else if (formData.estimationType === "detailed" || formData.estimationType === "standard") {
        // Pour l'estimation détaillée ou standard, suivre le chemin normal
        nextStep = 4;
      }
    }
    
    // --- Handle navigation from the features selection page (quick estimation) ---
    if (currentStep === 44) {
      // Aller au formulaire de contact
      nextStep = 45;
    }
    
    // --- Handle navigation from contact page to thank you page ---
    if (currentStep === 45) {
      nextStep = 46; // Page de remerciement
    }
    
    // --- Routing pour construction/extension vs rénovation/division ---
    if (formData.projectType === "construction" || formData.projectType === "extension") {
      // Skip la page spécifique à la rénovation
      if (nextStep === 11) {
        nextStep = 12; // Aller directement à l'isolation
      }
    }
    
    // --- Vérifier les étapes optionnelles ---
    // Sauter les étapes si les options correspondantes ne sont pas choisies
    if (nextStep === 23 && !formData.includeEcoSolutions) {
      nextStep = formData.includeRenewableEnergy ? 24 : 25;
    }
    
    if (nextStep === 24 && !formData.includeRenewableEnergy) {
      nextStep = formData.includeLandscaping ? 25 : 26;
    }
    
    if (nextStep === 25 && !formData.includeLandscaping) {
      nextStep = formData.includeOptions ? 26 : 27;
    }
    
    if (nextStep === 26 && !formData.includeOptions) {
      nextStep = formData.includeCuisine ? 27 : 28;
    }
    
    if (nextStep === 27 && !formData.includeCuisine) {
      nextStep = formData.includeBathroom ? 28 : 45;
    }
    
    if (nextStep === 28 && !formData.includeBathroom) {
      nextStep = 45; // Aller au formulaire de contact
    }
    
    // S'assurer de ne pas dépasser le nombre total d'étapes disponibles
    if (nextStep > 46) {
      nextStep = 46; // Dernière étape (page de remerciement)
    }
    
    const updateFormData = (data: Partial<FormData>) => {
      // Cette fonction sera injectée depuis le composant parent
      // C'est une référence à la fonction updateFormData du hook useEstimationCalculator
      console.log("Navigation update form data:", data);
      // La vraie implémentation est gérée par le composant parent
    };
    
    return {
      nextStep,
      animationDirection: 'forward' as const
    };
  };

  // Navigate to the previous step
  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    
    // Logique similaire pour la navigation en arrière
    let prevStep = currentStep - 1;
    
    // --- Handle navigation from thank you page back to contact page ---
    if (currentStep === 46) {
      prevStep = 45; // Retour à la page de contact
    }
    
    // --- Retour depuis le formulaire de contact ---
    if (currentStep === 45) {
      if (formData.estimationType === "quick") {
        prevStep = 44; // Retour à la sélection des caractéristiques
      } else if (formData.projectType === "design" || formData.projectType === "optimization") {
        prevStep = 2; // Retour à la sélection du type de projet
      } else if (formData.includeBathroom) {
        prevStep = 28; // Retour à la salle de bain
      } else if (formData.includeCuisine) {
        prevStep = 27; // Retour à la cuisine
      } else if (formData.includeOptions) {
        prevStep = 26; // Retour aux options
      } else if (formData.includeLandscaping) {
        prevStep = 25; // Retour à l'aménagement paysager
      } else if (formData.includeRenewableEnergy) {
        prevStep = 24; // Retour aux énergies renouvelables
      } else if (formData.includeEcoSolutions) {
        prevStep = 23; // Retour aux solutions écologiques
      } else {
        prevStep = 22; // Retour à la dernière étape standard
      }
    }
    
    // --- Navigation spécifique type client ---
    if (currentStep === 3) {
      if (formData.clientType === "professional") {
        prevStep = 1; // Retour au formulaire professionnel
      } else {
        prevStep = 2; // Retour à la sélection du type de projet
      }
    }
    
    if (currentStep === 2) {
      prevStep = 0; // Retour à la sélection du type de client
    }
    
    if (currentStep === 1) {
      prevStep = 0; // Retour à la sélection du type de client
    }
    
    // --- Navigation spécifique type projet ---
    if (formData.projectType === "construction" || formData.projectType === "extension") {
      // Éviter de revenir à des pages spécifiques à la rénovation
      if (prevStep === 11) {
        prevStep = 10; // Sauter l'étape spécifique à la rénovation
      }
    }
    
    // Ne pas descendre en dessous de l'étape 0
    prevStep = Math.max(0, prevStep);
    
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
