
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import ClientTypeStep from '../steps/ClientTypeStep';

const ClientTypeForm: React.FC<BaseFormProps> = (props) => {
  // This component is a wrapper around ClientTypeStep
  return <ClientTypeStep formData={props.formData} updateFormData={props.updateFormData} goToNextStep={props.goToNextStep} />;
};

export default ClientTypeForm;
