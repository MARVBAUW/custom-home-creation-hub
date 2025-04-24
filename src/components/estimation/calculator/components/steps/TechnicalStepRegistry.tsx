
import React from 'react';
import { EstimationFormData, FormData } from '../../types/formTypes';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import PlomberieForm from '../../FormSteps/PlomberieForm';
import { StepComponentRegistry } from './StepComponents';

export const createTechnicalStepRegistry = (
  formData: EstimationFormData | FormData,
  updateFormData: (data: Partial<EstimationFormData | FormData>) => void,
  goToPreviousStep: () => void,
  goToNextStep: () => void
): StepComponentRegistry => {
  return {
    16: (props) => (
      <ElectriciteForm
        {...props}
        formData={formData}
        updateFormData={updateFormData}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />
    ),
    17: (props) => (
      <PlomberieForm
        {...props}
        formData={formData}
        updateFormData={updateFormData}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />
    ),
  };
};
