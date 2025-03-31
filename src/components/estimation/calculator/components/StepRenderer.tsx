
import React from 'react';
import { StepRendererProps } from '../types/formTypes';

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  totalSteps,
  isSubmitting,
  goToStep,
  onComplete,
}) => {
  // This component would render the appropriate step component based on the current step
  // This could be a switch statement that maps steps to components

  const renderStep = () => {
    // Here we'd render different components based on the step number
    // For now this is just a placeholder
    return (
      <div>
        <h2>Step {step} of {totalSteps}</h2>
        <div>Form content would go here</div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={step === 0}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <button
            onClick={step === totalSteps - 1 ? onComplete : goToNextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isSubmitting}
          >
            {step === totalSteps - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  return <div className="p-4">{renderStep()}</div>;
};

export default StepRenderer;
