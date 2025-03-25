
import { useState, useEffect } from 'react';
import { getVisibleSteps } from '../steps';
import { FormData } from '../types';

export const useEstimationSteps = (formData: FormData) => {
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(36); // Valeur par défaut plus élevée
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Calculer les étapes visibles en fonction des données du formulaire
  const visibleSteps = getVisibleSteps(formData);
  
  // Mettre à jour le nombre total d'étapes lorsque les données du formulaire changent
  useEffect(() => {
    // Le nombre total d'étapes dépend du chemin du formulaire
    let calculatedTotalSteps = visibleSteps.length;
    
    // Ajustements spécifiques selon le type de projet
    if (formData.projectType === "renovation") {
      // Ajout d'étapes spécifiques à la rénovation
      if (!formData.includeEcoSolutions && !formData.includeRenewableEnergy) {
        calculatedTotalSteps -= 2; // Retirer les étapes non applicables
      }
    } else if (formData.projectType === "construction") {
      // Comportement spécifique pour la construction neuve
      if (!formData.includeOptions) {
        calculatedTotalSteps -= 1;
      }
    }
    
    // S'assurer que le minimum d'étapes est respecté
    calculatedTotalSteps = Math.max(calculatedTotalSteps, 14); // Au moins 14 étapes
    
    setTotalSteps(calculatedTotalSteps);
    
    // Si l'étape actuelle est supérieure au nouveau total, ajuster
    if (step > calculatedTotalSteps) {
      setStep(calculatedTotalSteps);
    }
  }, [visibleSteps.length, formData, step]);

  // Naviguer à l'étape suivante
  const goToNextStep = () => {
    setAnimationDirection('forward');
    // Trouver la prochaine étape appropriée selon le chemin
    let nextStep = step + 1;
    
    // Gérer les sauts d'étapes selon le type de projet et les choix précédents
    if (formData.projectType === "renovation") {
      // Logique de navigation pour la rénovation
      if (nextStep === 14 && !formData.includeEcoSolutions) {
        nextStep = 15; // Sauter l'étape éco-solutions
      }
      if (nextStep === 15 && !formData.includeRenewableEnergy) {
        nextStep = 16; // Sauter l'étape énergies renouvelables
      }
    } else if (formData.projectType === "construction") {
      // Logique de navigation pour la construction
      if (nextStep === 26 && !formData.includeOptions) {
        nextStep = 27; // Sauter l'étape options
      }
    }
    
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Naviguer à l'étape précédente
  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    
    // Logique similaire pour revenir en arrière
    let prevStep = step - 1;
    
    // Gérer les étapes à sauter en retour arrière
    if (formData.projectType === "renovation") {
      if (prevStep === 15 && !formData.includeRenewableEnergy) {
        prevStep = 14; // Sauter l'étape énergies renouvelables en retour
      }
      if (prevStep === 14 && !formData.includeEcoSolutions) {
        prevStep = 13; // Sauter l'étape éco-solutions en retour
      }
    } else if (formData.projectType === "construction") {
      if (prevStep === 26 && !formData.includeOptions) {
        prevStep = 25; // Sauter l'étape options en retour
      }
    }
    
    setStep(Math.max(prevStep, 1)); // Ne pas descendre en dessous de 1
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    step,
    setStep,
    totalSteps,
    animationDirection,
    visibleSteps,
    goToNextStep,
    goToPreviousStep
  };
};
