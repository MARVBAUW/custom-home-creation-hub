
import React from 'react';
import { ResultsFormProps } from '../types/formTypes';
import EstimationResults from '../steps/EstimationResults';

const ResultsForm: React.FC<ResultsFormProps> = ({ estimationResult, formData }) => {
  return <EstimationResults 
    estimation={estimationResult} 
    formData={formData}
  />;
};

export default ResultsForm;
