
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
          goToNextStep={() => {
            // L'étape de contact est généralement la dernière, affichage des résultats
            console.log("Formulaire de contact complété, génération du devis estimatif");
          }}
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
          defaultValues={{
            firstName: formData.firstName || '',
            lastName: formData.lastName || '',
            email: formData.email || '',
            phone: formData.phone || '',
            message: formData.message || '',
            city: formData.city || '',
            termsAccepted: formData.termsAccepted || false
          }}
        />
      );
    },
  };
};
