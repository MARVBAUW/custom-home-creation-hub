
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
    setTotalSteps(visibleSteps.length);
  }, [visibleSteps.length]);

  // Naviguer à l'étape suivante
  const goToNextStep = () => {
    setAnimationDirection('forward');
    setStep(prevStep => Math.min(prevStep + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Naviguer à l'étape précédente
  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    setStep(prevStep => Math.max(prevStep - 1, 1));
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
