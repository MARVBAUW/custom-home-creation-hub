
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ContactForm from '../../FormSteps/ContactForm';
import { FormData } from '../../types';

// Interface for ContactForm props
interface ContactFormProps {
  defaultValues: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    message?: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

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
          message: formData.message
        }}
        onSubmit={onContactSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
