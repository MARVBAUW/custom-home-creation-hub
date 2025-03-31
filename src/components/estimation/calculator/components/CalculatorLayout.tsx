
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";
import { StepRendererProps, FormNavigationProps } from '../types/formTypes';
import { FormData } from '../types';

// Step Renderer Component
const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  totalSteps,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  isSubmitting,
  goToStep,
  onComplete
}) => {
  // Render different step components based on the current step
  switch (step) {
    case 1:
      return (
        <div className="step-container">
          <h2>Step 1: Client Information</h2>
          {/* Client information form fields here */}
        </div>
      );
    case 2:
      return (
        <div className="step-container">
          <h2>Step 2: Project Details</h2>
          {/* Project details form fields here */}
        </div>
      );
    // Add cases for additional steps
    case totalSteps:
      return (
        <div className="step-container">
          <h2>Review and Submit</h2>
          {/* Final review step */}
          <Button onClick={onComplete} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Estimation'}
          </Button>
        </div>
      );
    default:
      return (
        <div className="step-container">
          <h2>Step {step}</h2>
          <p>Content for step {step}</p>
        </div>
      );
  }
};

// Form Navigation Component
const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  onPreviousClick,
  onNextClick,
  onShowSummaryClick,
  showSummary,
  estimationResult,
  currentStep,
  onPrevStep,
  onNextStep,
  isSubmitting,
  isComplete,
  onComplete
}) => {
  // Use the appropriate previous and next handlers
  const handlePrevious = onPreviousClick || onPrevStep;
  const handleNext = onNextClick || onNextStep;
  const stepToUse = step !== undefined ? step : (currentStep !== undefined ? currentStep : 1);
  const isLastStep = stepToUse === totalSteps;

  return (
    <div className="flex justify-between mt-6">
      {stepToUse > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Précédent
        </Button>
      )}
      
      {!isLastStep ? (
        <Button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 ml-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Traitement...' : 'Suivant'}
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onComplete}
          className="flex items-center gap-2 ml-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Traitement...' : 'Finaliser'}
          <CheckIcon className="w-4 h-4" />
        </Button>
      )}
      
      {estimationResult && showSummary === false && (
        <Button
          type="button"
          variant="outline"
          onClick={onShowSummaryClick}
          className="ml-2"
        >
          Voir le résumé
        </Button>
      )}
    </div>
  );
};

// Calculator Layout Component
const CalculatorLayout: React.FC<{
  step: number;
  totalSteps: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isSubmitting: boolean;
  goToStep: (step: number) => void;
  onComplete: () => void;
}> = ({
  step,
  totalSteps,
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  isSubmitting,
  goToStep,
  onComplete
}) => {
  const progress = ((step) / totalSteps) * 100;
  
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Step indicator */}
        <div className="text-sm text-gray-500 mb-4">
          Étape {step} sur {totalSteps}
        </div>
        
        {/* Step content */}
        <StepRenderer
          step={step}
          totalSteps={totalSteps}
          formData={formData}
          updateFormData={updateFormData}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          isSubmitting={isSubmitting}
          goToStep={goToStep}
          onComplete={onComplete}
        />
        
        {/* Navigation buttons */}
        <FormNavigation
          currentStep={step}
          totalSteps={totalSteps}
          onPrevStep={goToPreviousStep}
          onNextStep={goToNextStep}
          isSubmitting={isSubmitting}
          isComplete={step === totalSteps}
          onComplete={onComplete}
        />
      </CardContent>
    </Card>
  );
};

export { CalculatorLayout, StepRenderer, FormNavigation };
