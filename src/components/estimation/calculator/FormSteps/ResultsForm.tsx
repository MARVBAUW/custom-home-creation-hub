
import React from 'react';
import { ResultsFormProps } from '../types/formTypes';
import EstimationResults from '../steps/EstimationResults';

const ResultsForm: React.FC<ResultsFormProps> = ({
  estimationResult,
  formData,
  goToPreviousStep,
  updateFormData,
  goToNextStep,
  animationDirection
}) => {
  return (
    <EstimationResults 
      estimation={estimationResult} 
      formData={formData} 
      goToPreviousStep={goToPreviousStep}
      updateFormData={updateFormData}
      goToNextStep={goToNextStep}
      isLoading={estimationResult === null}
    />
  );
};

export default ResultsForm;
