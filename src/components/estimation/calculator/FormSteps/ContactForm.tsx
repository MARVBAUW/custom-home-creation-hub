
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import ContactDetailsStep from '../steps/ContactDetailsStep';

const ContactForm: React.FC<BaseFormProps> = (props) => {
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
