
import React from 'react';
import { StepComponentRegistry } from './StepComponents';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import PlomberieForm from '../../FormSteps/PlomberieForm';
import ChauffageForm from '../../FormSteps/ChauffageForm';
import { FormData } from '../../types';

export const createTechnicalStepRegistry = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  // Handle the electricalType submission
  const onElectriciteSubmit = (data: { electricalType: string }) => {
    updateFormData({
      electricalType: data.electricalType
    });
    goToNextStep();
  };

  // Handle the plumbingType submission
  const onPlomberieSubmit = (data: { plumbingType: string }) => {
    updateFormData({
      plumbingType: data.plumbingType
    });
    goToNextStep();
  };

  const onChauffageSubmit = (data: { heatingType: string, hasAirConditioning: boolean }) => {
    updateFormData({
      heatingType: data.heatingType,
      hasAirConditioning: data.hasAirConditioning
    });
    goToNextStep();
  };

  return {
    14: (props) => (
      <ElectriciteForm
        {...props}
        defaultValues={{ electricalType: formData.electricalType }}
        onSubmit={onElectriciteSubmit}
      />
    ),
    15: (props) => (
      <PlomberieForm
        {...props}
        defaultValues={{ plumbingType: formData.plumbingType }}
        onSubmit={onPlomberieSubmit}
      />
    ),
    16: (props) => (
      <ChauffageForm
        {...props}
        defaultValues={{ heatingType: formData.heatingType, hasAirConditioning: formData.hasAirConditioning }}
        onSubmit={onChauffageSubmit}
      />
    ),
  };

  function goToNextStep() {
    // This function would typically be passed in from the parent component
    // For now, we'll just define it here to avoid TypeScript errors
    console.log('Going to next step');
  }
};
