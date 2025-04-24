
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useEstimationForm } from './hooks/useEstimationForm';
import { useStepManager } from './hooks/useStepManager';
import StepRenderer from './components/StepRenderer';
import NavigationControls from './components/NavigationControls';
import ProgressIndicator from './components/ProgressIndicator';

const EstimationWizard: React.FC = () => {
  const {
    step,
    setStep,
    formData,
    updateFormData,
    animationDirection,
    setAnimationDirection,
    calculateEstimation
  } = useEstimationForm();

  const {
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoBack
  } = useStepManager({
    step,
    setStep,
    formData,
    setAnimationDirection
  });

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressIndicator currentStep={step} totalSteps={8} />
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <StepRenderer
            step={step}
            formData={formData}
            updateFormData={updateFormData}
            animationDirection={animationDirection}
          />
          
          <NavigationControls
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            canGoNext={canGoNext()}
            canGoBack={canGoBack()}
            isLastStep={step === 7}
            onComplete={calculateEstimation}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimationWizard;
