
import { useState, useCallback } from 'react';
import { FormData } from '../../types';
import { createTypeAdaptingUpdater } from '../../utils/dataAdapter';

interface UseStepNavigationProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onComplete?: () => void;
}

export const useStepNavigation = ({
  formData,
  updateFormData: originalUpdateFormData,
  onComplete
}: UseStepNavigationProps) => {
  const [step, setStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Create a type-adapting updater function
  const updateFormData = createTypeAdaptingUpdater(originalUpdateFormData);
  
  const goToNextStep = useCallback(() => {
    setAnimationDirection('forward');
    setStep(prevStep => prevStep + 1);
  }, []);
  
  const goToPreviousStep = useCallback(() => {
    setAnimationDirection('backward');
    setStep(prevStep => Math.max(0, prevStep - 1));
  }, []);
  
  const goToStep = useCallback((stepIndex: number) => {
    setAnimationDirection(stepIndex > step ? 'forward' : 'backward');
    setStep(stepIndex);
  }, [step]);
  
  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);
  
  return {
    step,
    setStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    animationDirection,
    handleComplete,
    formData,
    updateFormData
  };
};
