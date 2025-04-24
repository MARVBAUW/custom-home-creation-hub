
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from './types';
import ClientTypeStep from './steps/ClientTypeStep';
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TerrainDetailsStep from './steps/TerrainDetailsStep';
import FinishDetailsStep from './steps/FinishDetailsStep';
import RoomsDetailsStep from './steps/RoomsDetailsStep';
import ExteriorFeaturesStep from './steps/ExteriorFeaturesStep';
import SpecialFeaturesStep from './steps/SpecialFeaturesStep';
import ContactDetailsStep from './steps/ContactDetailsStep';
import EstimationResults from './steps/EstimationResults';
import { ClientTypeStepProps } from './types/clientTypeProps';

interface EstimationFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
  currentStep?: number;
}

const EstimationForm: React.FC<EstimationFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  currentStep = 0
}) => {
  // Special case for first step that doesn't need goToPreviousStep
  const renderFirstStep = () => {
    return (
      <ClientTypeStep
        formData={formData}
        updateFormData={updateFormData}
        goToNextStep={goToNextStep}
        goToPreviousStep={goToPreviousStep}
        animationDirection={animationDirection}
      />
    );
  };

  // Render the appropriate step based on currentStep value
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderFirstStep();
      case 1:
        return (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 2:
        return (
          <TerrainDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 3:
        return (
          <RoomsDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 4:
        return (
          <FinishDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 5:
        return (
          <ExteriorFeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 6:
        return (
          <SpecialFeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 7:
        return (
          <ContactDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            animationDirection={animationDirection}
          />
        );
      case 8:
        return (
          <EstimationResults
            estimation={0}
            formData={formData}
            goToPreviousStep={goToPreviousStep}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
          />
        );
      default:
        return renderFirstStep();
    }
  };

  return (
    <Card className="w-full shadow-md border">
      <CardContent className="p-6">
        {renderStep()}
      </CardContent>
    </Card>
  );
};

export default EstimationForm;
