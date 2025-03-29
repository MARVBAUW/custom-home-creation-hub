
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
        updateFormData={(data) => onContactSubmit(data)}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          email: formData.email || '',
          phone: formData.phone || '',
          message: formData.message || '',
          city: formData.city || '',
          termsAccepted: formData.termsAccepted || false
        }}
        onSubmit={onContactSubmit}
      />
    ),
  };
};
