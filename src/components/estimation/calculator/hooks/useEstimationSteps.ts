
import { useState, useEffect } from 'react';
import { useStepNavigation } from './steps/useStepNavigation';
import { useStepCalculation } from './steps/useStepCalculation';
import { FormData } from '../types';

export const useEstimationSteps = (formData: FormData) => {
  const [step, setStep] = useState(1);
  const { animationDirection, goToNextStep, goToPreviousStep } = useStepNavigation(step, formData);
  const { totalSteps, visibleSteps } = useStepCalculation(formData, step);
  
  // Adjust current step if it exceeds the new total
  useEffect(() => {
    if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [totalSteps, step]);

  // Enhanced navigation functions that update the step
  const handleNextStep = () => {
    const { nextStep, animationDirection } = goToNextStep();
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousStep = () => {
    const { prevStep, animationDirection } = goToPreviousStep();
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
