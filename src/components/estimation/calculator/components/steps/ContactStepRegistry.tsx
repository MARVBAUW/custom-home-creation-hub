
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ContactForm from '../../FormSteps/ContactForm';
import { EstimationFormData, FormData } from '../../types/formTypes';

// Registry for contact steps (step 40)
export const createContactStepRegistry = (
  formData: EstimationFormData | FormData,
  onContactSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    40: (props: FormStepProps) => (
      <ContactForm
        formData={formData}
        updateFormData={onContactSubmit}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        onSubmit={onContactSubmit}
      />
    ),
  };
};
