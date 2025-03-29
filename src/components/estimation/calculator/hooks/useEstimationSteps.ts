
import { useState, useEffect } from 'react';
import { FormData } from '../types';
import { determineNextStep, determinePreviousStep } from '../utils/navigationPathUtils';

export const useEstimationSteps = (formData: FormData) => {
  const [step, setStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Déterminer le nombre total d'étapes en fonction du type de projet
  const determineStepCount = () => {
    let baseSteps = 11; // Étapes minimales
    
    // Ajuster selon le type de client
    if (formData.clientType === 'professional') {
      baseSteps = 20; // Professionnel a plus d'étapes
    } else if (formData.clientType === 'individual') {
      baseSteps = 19; // Particulier a moins d'étapes
    }
    
    // Ajuster en fonction du type de projet
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      baseSteps += 9; // Étapes supplémentaires pour rénovation/division
    } else if (formData.projectType === 'construction' || formData.projectType === 'extension') {
      baseSteps += 7; // Étapes supplémentaires pour construction/extension
    }
    
    // Ajouter des étapes pour les options choisies
    if (formData.includeEcoSolutions) baseSteps += 1;
    if (formData.includeRenewableEnergy) baseSteps += 1;
    if (formData.includeLandscaping) baseSteps += 1;
    if (formData.includeOptions) baseSteps += 1;
    if (formData.includeCuisine) baseSteps += 1;
    if (formData.includeBathroom) baseSteps += 1;
    
    return baseSteps;
  };
  
  const totalSteps = determineStepCount();
  
  // Fonction pour aller à l'étape suivante avec animation
  const goToNextStep = () => {
    if (step < totalSteps - 1) {
      setAnimationDirection('forward');
      setTimeout(() => {
        // Recalculer l'étape suivante en fonction des données du formulaire
        const nextStep = determineNextStep(step, formData);
        console.log(`Navigation: Current step ${step} -> Next step ${nextStep}`);
        setStep(nextStep);
      }, 300);
    }
  };
  
  // Fonction pour aller à l'étape précédente avec animation
  const goToPreviousStep = () => {
    if (step > 0) {
      setAnimationDirection('backward');
      setTimeout(() => {
        // Recalculer l'étape précédente en fonction des données du formulaire
        const prevStep = determinePreviousStep(step, formData);
        console.log(`Navigation: Current step ${step} -> Previous step ${prevStep}`);
        setStep(prevStep);
      }, 300);
    }
  };
  
  // Réinitialiser l'animation après chaque changement d'étape
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDirection('forward');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [step]);
  
  // Déterminer les étapes visibles en fonction des choix
  const visibleSteps = {
    clientType: 0,
    projectDetails: formData.clientType === 'professional' ? 2 : 3,
    terrain: 5,
    // ... autres étapes
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
