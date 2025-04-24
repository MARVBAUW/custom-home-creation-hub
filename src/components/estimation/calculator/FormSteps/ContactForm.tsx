
import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import ContactDetailsStep from '../steps/ContactDetailsStep';

interface ContactFormProps extends BaseFormProps {
  // Inherits all props from BaseFormProps
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
