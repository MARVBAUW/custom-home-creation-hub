
import React from 'react';
import { BaseFormProps } from '../types';
import ContactDetailsStep from '../steps/ContactDetailsStep';
import { FormData } from '../types';

interface ContactFormProps extends BaseFormProps {
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  // This component is a wrapper around ContactDetailsStep
  return <ContactDetailsStep 
    formData={props.formData} 
    updateFormData={props.updateFormData} 
    goToNextStep={props.goToNextStep} 
    goToPreviousStep={props.goToPreviousStep}
    animationDirection={props.animationDirection}
    onSubmit={props.onSubmit}
  />;
};

export default ContactForm;
