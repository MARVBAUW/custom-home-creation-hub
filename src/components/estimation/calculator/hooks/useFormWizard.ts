
import { useState, useEffect } from 'react';
import { FormData } from '../types';

interface FormStep {
  id: string;
  title: string;
  description?: string;
  isOptional?: boolean;
  condition?: (formData: FormData) => boolean;
}

export interface FormWizardOptions {
  initialStep?: number;
  onStepChange?: (currentStep: number, totalSteps: number) => void;
  onComplete?: (formData: FormData) => void;
}

export const useFormWizard = (
  steps: FormStep[],
  initialData: FormData = {},
  options: FormWizardOptions = {}
) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [currentStepIndex, setCurrentStepIndex] = useState(options.initialStep || 0);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Filter steps based on conditions
  const visibleSteps = steps.filter(step => 
    !step.condition || step.condition(formData)
  );

  const totalSteps = visibleSteps.length;
  const currentStep = visibleSteps[currentStepIndex] || visibleSteps[0];
  const progress = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  // Navigation functions
  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setAnimationDirection('forward');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 300);
    } else {
      completeForm();
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setAnimationDirection('backward');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev - 1);
      }, 300);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setAnimationDirection(stepIndex > currentStepIndex ? 'forward' : 'backward');
      setTimeout(() => {
        setCurrentStepIndex(stepIndex);
      }, 300);
    }
  };

  const completeForm = () => {
    setIsSubmitting(true);
    setIsComplete(true);
    if (options.onComplete) {
      options.onComplete(formData);
    }
    setIsSubmitting(false);
  };

  const resetForm = (newInitialData: FormData = {}) => {
    setFormData(newInitialData);
    setCurrentStepIndex(options.initialStep || 0);
    setIsComplete(false);
  };

  // Call onStepChange callback when the step changes
  useEffect(() => {
    if (options.onStepChange) {
      options.onStepChange(currentStepIndex, totalSteps);
    }
  }, [currentStepIndex, totalSteps]);

  return {
    formData,
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    isSubmitting,
    isComplete,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    completeForm,
    resetForm
  };
};
