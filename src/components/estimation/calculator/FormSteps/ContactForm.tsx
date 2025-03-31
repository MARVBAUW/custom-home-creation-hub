
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import ContactDetailsStep from '../steps/ContactDetailsStep';
import { FormData } from '../types';

interface ContactFormProps extends BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  // This component is a wrapper around ContactDetailsStep
  return <ContactDetailsStep 
    formData={props.formData} 
    updateFormData={props.updateFormData} 
    goToNextStep={props.goToNextStep} 
    goToPreviousStep={props.goToPreviousStep}
    animationDirection={props.animationDirection as 'forward' | 'backward'}
  />;
};

export default ContactForm;
