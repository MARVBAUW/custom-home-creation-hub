
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import StepRenderer from './StepRenderer';
import FormNavigation from './FormNavigation';
import { FormData, EstimationResponseData } from '../types';
import { useEstimationCalculator } from '../hooks/useEstimationCalculator';
import EstimationResult from '../EstimationResult';
import { calculateEstimation } from '../calculationUtils';

interface CalculatorLayoutProps {
  currentStep: number;
  totalSteps: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  isSubmitting: boolean;
  goToStep: (step: number) => void;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  currentStep,
  totalSteps,
  onNextStep,
  onPrevStep,
  formData,
  updateFormData,
  isSubmitting,
  goToStep,
}) => {
  const [showResultDialog, setShowResultDialog] = useState(false);
  const { estimationResult } = useEstimationCalculator(formData);
  const progress = Math.round((currentStep / totalSteps) * 100);

  // Handler for when the form is completely filled out
  const handleComplete = () => {
    const sampleEstimation = calculateEstimation(formData);
    setShowResultDialog(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-khaki-500 to-khaki-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          Étape {currentStep} sur {totalSteps}
        </div>
      </div>

      <div className="min-h-[300px]">
        <StepRenderer
          step={currentStep}
          formData={formData}
          updateFormData={updateFormData}
          goToNextStep={onNextStep}
          goToPreviousStep={onPrevStep}
          isSubmitting={isSubmitting}
          goToStep={goToStep}
          onComplete={handleComplete}
        />
      </div>

      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
        isSubmitting={isSubmitting}
        isComplete={currentStep === totalSteps}
        onComplete={handleComplete}
      />

      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Estimation de votre projet</DialogTitle>
          </DialogHeader>
          <EstimationResult
            estimation={calculateEstimation(formData)}
            formData={formData}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setShowResultDialog(false)}>Fermer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalculatorLayout;
