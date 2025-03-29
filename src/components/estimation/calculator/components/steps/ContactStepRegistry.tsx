
import React from 'react';
import { FormData } from '../../types';
import ContactForm from '../../FormSteps/ContactForm';

export const createContactStepRegistry = (
  formData: FormData,
  onContactSubmit: (data: any) => void,
  goToPreviousStep: () => void
) => {
  return {
    contact: (props: { 
      animationDirection: 'forward' | 'backward';
      goToPreviousStep: () => void; 
    }) => {
      const { animationDirection, goToPreviousStep } = props;
      
      return (
        <ContactForm
          formData={formData}
          updateFormData={(data) => {
            // Prepare data for submission
            onContactSubmit(data);
          }}
          goToNextStep={() => {
            // Contact is usually the last step, might not need to go next
            console.log("Contact form completed");
          }}
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
        />
      );
    },
  };
};
