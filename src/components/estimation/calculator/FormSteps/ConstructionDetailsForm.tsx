
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import ConstructionDetailsStep from '../steps/ConstructionDetailsStep';

const ConstructionDetailsForm: React.FC<BaseFormProps> = (props) => {
  // This component is a wrapper around ConstructionDetailsStep
  return <ConstructionDetailsStep 
    formData={props.formData} 
    updateFormData={props.updateFormData} 
    goToNextStep={props.goToNextStep} 
  />;
};

export default ConstructionDetailsForm;
