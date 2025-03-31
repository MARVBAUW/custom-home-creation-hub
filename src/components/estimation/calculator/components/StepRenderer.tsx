import React from 'react';
import { StepRendererProps } from '../types/formTypes';

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  totalSteps,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  isSubmitting,
  goToStep,
  onComplete
}) => {
  // This component should be implemented with actual step content
  return (
    <div className="space-y-4">
      <p>Étape {step + 1} sur {totalSteps}</p>
      {/* Here you would render the appropriate step component based on the current step */}
      <div className="p-4 border rounded">
        <p>Contenu de l'étape {step + 1}</p>
      </div>
    </div>
  );
};

export default StepRenderer;
