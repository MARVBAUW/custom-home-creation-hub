
interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  setAnimationDirection: (direction: 'forward' | 'backward') => void;
}

interface StepCalculationProps {
  visibleSteps: any[];
}

export const useStepNavigation = ({
  currentStep,
  totalSteps,
  setCurrentStep,
  setAnimationDirection,
}: StepNavigationProps) => {
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setAnimationDirection('forward');
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setAnimationDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };

  return { goToNextStep, goToPreviousStep };
};

export const useStepCalculation = ({ visibleSteps }: StepCalculationProps) => {
  // Le nombre total d'étapes est le nombre d'étapes visibles
  const totalSteps = visibleSteps.length || 5; // Fallback à 5 si les étapes visibles ne sont pas encore calculées

  return { totalSteps };
};
