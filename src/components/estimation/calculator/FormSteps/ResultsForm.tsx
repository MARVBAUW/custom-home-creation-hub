
import React from 'react';
import { ResultsFormProps } from '../types/formTypes';
import EstimationResults from '../steps/EstimationResults';

const ResultsForm: React.FC<ResultsFormProps> = (props) => {
  return (
    <EstimationResults 
      estimation={props.estimationResult} 
      formData={props.formData} 
      goToPreviousStep={props.goToPreviousStep}
      updateFormData={props.updateFormData}
      goToNextStep={props.goToNextStep}
    />
  );
};

export default ResultsForm;
