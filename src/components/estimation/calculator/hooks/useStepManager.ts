
import { useCallback } from 'react';
import { FormData } from '../types';
import { validateStep } from '../utils/navigationPathUtils';
import { useToast } from '@/hooks/use-toast';

interface UseStepManagerProps {
  step: number;
  setStep: (step: number) => void;
  formData: FormData;
  setAnimationDirection: (direction: 'forward' | 'backward') => void;
}

export const useStepManager = ({
  step,
  setStep,
  formData,
  setAnimationDirection
}: UseStepManagerProps) => {
  const { toast } = useToast();

  const goToNextStep = useCallback(() => {
    const { isValid, errors } = validateStep(step, formData);
    
    if (!isValid) {
      toast({
        title: "Champs requis",
        description: errors.join('. '),
        variant: "destructive"
      });
      return;
    }

    setAnimationDirection('forward');
    setStep(step + 1);
  }, [step, formData, setStep, setAnimationDirection, toast]);

  const goToPreviousStep = useCallback(() => {
    setAnimationDirection('backward');
    setStep(Math.max(0, step - 1));
  }, [step, setStep, setAnimationDirection]);

  const canGoNext = useCallback(() => {
    const { isValid } = validateStep(step, formData);
    return isValid;
  }, [step, formData]);

  const canGoBack = useCallback(() => {
    return step > 0;
  }, [step]);

  return {
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoBack
  };
};
