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
  // Fix the electricalType submission
  const onElectriciteSubmit = (data: { electricalType: string }) => {
    const formData: Partial<FormData> = {
      electricalType: data.electricalType
    };
    
    updateFormData(formData);
    goToNextStep();
  };

  // Fix the plumbingType submission
  const onPlomberieSubmit = (data: { plumbingType: string }) => {
    const formData: Partial<FormData> = {
      plumbingType: data.plumbingType
    };
    
    updateFormData(formData);
    goToNextStep();
  };

  const onChauffageSubmit = (data: { heatingType: string, hasAirConditioning: boolean }) => {
    updateFormData(data);
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
    throw new Error('Function not implemented.');
  }
};
