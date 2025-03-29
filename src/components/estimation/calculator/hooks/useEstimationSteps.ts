
import { useState, useEffect } from 'react';
import { FormData } from '../types';
import { stepDefinitions } from '../steps/stepDefinitions';

export const useEstimationSteps = (formData: FormData) => {
  const [visibleSteps, setVisibleSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    // Filtrer les étapes visibles en fonction des données du formulaire
    const filteredSteps = stepDefinitions.filter(
      (step) => !step.skipCondition(formData)
    );
    
    setVisibleSteps(filteredSteps);
  }, [formData]);

  // Calculate total steps based on visible steps
  const totalSteps = visibleSteps.length || 5; // Fallback to 5 if visibleSteps is empty

  // Navigation functions
  const goToNextStep = () => {
    setAnimationDirection('forward');
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return { 
    visibleSteps,
    step: currentStep,
    setStep: setCurrentStep,
    totalSteps,
    animationDirection,
    goToNextStep,
    goToPreviousStep
  };
};
