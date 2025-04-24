
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ContactForm from '../../FormSteps/ContactForm';
import { FormData } from '../../types';

// Registry for contact steps (step 40)
export const createContactStepRegistry = (
  formData: FormData,
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
        // Remove defaultValues prop since it's not in the ContactFormProps interface
        onSubmit={onContactSubmit}
      />
    ),
  };
};
