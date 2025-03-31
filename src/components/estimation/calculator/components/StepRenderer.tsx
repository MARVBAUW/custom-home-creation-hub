
import React from 'react';
import { FormData } from '../types/formTypes';

export interface StepRendererProps {
  step: number;
  totalSteps?: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  isSubmitting?: boolean;
  goToStep?: (step: number) => void;
  onComplete?: () => void;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  totalSteps,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  isSubmitting,
  goToStep,
  onComplete
}) => {
  // Placeholder renderer - actual implementation would map to your step components
  return (
    <div>
      {/* This would be replaced by your actual step component logic based on the current step */}
      <div>Step content for step {step + 1} out of {totalSteps}</div>
    </div>
  );
};

export default StepRenderer;
