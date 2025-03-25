
import { useState, useEffect } from 'react';
import { useStepNavigation } from './steps/useStepNavigation';
import { useStepCalculation } from './steps/useStepCalculation';
import { FormData } from '../types';

export const useEstimationSteps = (formData: FormData) => {
  const [step, setStep] = useState(1);
  const { animationDirection, goToNextStep, goToPreviousStep } = useStepNavigation(step, formData);
  const { totalSteps, visibleSteps } = useStepCalculation(formData, step);
  
  // Ajuster l'étape actuelle si elle dépasse le nouveau total
  useEffect(() => {
    if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [totalSteps, step]);

  // Fonctions de navigation améliorées qui mettent à jour l'étape
  const handleNextStep = () => {
    const { nextStep, animationDirection: newDirection } = goToNextStep();
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousStep = () => {
    const { prevStep, animationDirection: newDirection } = goToPreviousStep();
    setStep(prevStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    step,
    setStep,
    totalSteps,
    animationDirection,
    visibleSteps,
    goToNextStep: handleNextStep,
    goToPreviousStep: handlePreviousStep
  };
};
