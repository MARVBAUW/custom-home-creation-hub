
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import TerrainDetailsStep from '../steps/TerrainDetailsStep';

const TerrainForm: React.FC<BaseFormProps> = (props) => {
  // This component is a wrapper around TerrainDetailsStep
  return <TerrainDetailsStep 
    formData={props.formData} 
    updateFormData={props.updateFormData} 
    goToNextStep={props.goToNextStep} 
    goToPreviousStep={props.goToPreviousStep}
  />;
};

export default TerrainForm;
