
import React from 'react';
import ProgressBar from '../ProgressBar';
import StepContext from '../StepContext';
import EstimationResult from '../EstimationResult';
import { getStepIcon, getStepTitle } from '../steps';
import { FormData } from '../types';

type CalculatorLayoutProps = {
  step: number;
  totalSteps: number;
  formData: FormData;
  estimationResult: number | null;
  showResultDialog: boolean;
  setShowResultDialog: (show: boolean) => void;
  children: React.ReactNode;
};

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  step,
  totalSteps,
  formData,
  estimationResult,
  showResultDialog,
  setShowResultDialog,
  children
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Barre de progression */}
      <ProgressBar currentStep={step} totalSteps={totalSteps} />

      {/* Contenu de l'étape avec visualisateur */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 bg-white shadow-sm border rounded-lg p-6 estimation-form-container">
          {children}
        </div>
        
        <StepContext
          step={step}
          title={getStepTitle(step)}
          icon={getStepIcon(step)}
          formData={formData}
          totalSteps={totalSteps}
        />
      </div>
      
      {/* Résultat de l'estimation avec animation et données du formulaire */}
      <EstimationResult
        showResultDialog={showResultDialog}
        setShowResultDialog={setShowResultDialog}
        estimationResult={estimationResult}
        formData={formData}
      />
    </div>
  );
};

export default CalculatorLayout;
