
import React from 'react';
import { FormData } from '../../types';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import PlomberieForm from '../../FormSteps/PlomberieForm';
import { StepComponentRegistry } from './StepComponents';

export const createTechnicalStepRegistry = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
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
