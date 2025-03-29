
import React from 'react';
import { FormData } from '../../types';
import ContactForm from '../../FormSteps/ContactForm';
import { StepComponentRegistry, FormStepProps } from './StepComponents';

export const createContactStepRegistry = (
  formData: FormData,
  onContactSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    contact: (props: FormStepProps) => {
      const { animationDirection } = props;
      
      return (
        <ContactForm
          defaultValues={{
            firstName: formData.firstName || '',
            lastName: formData.lastName || '',
            email: formData.email || '',
            phone: formData.phone || '',
            message: formData.message || '',
            city: formData.city || '',
            termsAccepted: formData.termsAccepted || false
          }}
          onSubmit={(data) => {
            // Préparation des données de contact pour soumission
            const contactData = {
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              phone: data.phone || '',
              message: data.message || '',
              city: data.city || formData.city || '',
              termsAccepted: data.termsAccepted || false
            };
            
            onContactSubmit(contactData);
          }}
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
        />
      );
    },
  };
};
