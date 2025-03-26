
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ContactForm from '../../FormSteps/ContactForm';
import { FormData } from '../../types';

// Registry for the contact step (final step)
export const createContactStepRegistry = (
  formData: FormData,
  onContactSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  // 'contact' is now a valid key in StepComponentRegistry
  return {
    contact: (props: FormStepProps) => (
      <ContactForm
        defaultValues={{
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
        }}
        onSubmit={onContactSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
