
import React from 'react';
import { StepComponentRegistry } from './StepComponents';
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
    contact: (props: { animationDirection: 'forward' | 'backward', goToPreviousStep: () => void }) => (
      <ContactForm
        formData={formData}
        updateFormData={(data) => onContactSubmit({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          email: data.email || '',
          message: data.message || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
