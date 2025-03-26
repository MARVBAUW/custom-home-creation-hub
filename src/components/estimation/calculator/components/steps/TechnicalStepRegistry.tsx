
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import PlomberieForm from '../../FormSteps/PlomberieForm';
import ChauffageForm from '../../FormSteps/ChauffageForm';
import { FormData } from '../../types';

// Registry for technical steps (steps 14-16)
export const createTechnicalStepRegistry = (
  formData: FormData,
  onElectriciteSubmit: (data: { electricalType: string }) => void,
  onPlomberieSubmit: (data: { plumbingType: string }) => void,
  onChauffageSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    14: (props: FormStepProps) => (
      <ElectriciteForm
        defaultValues={{
          electricalType: formData.electricalType,
        }}
        onSubmit={onElectriciteSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    15: (props: FormStepProps) => (
      <PlomberieForm
        defaultValues={{
          plumbingType: formData.plumbingType,
        }}
        onSubmit={onPlomberieSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    16: (props: FormStepProps) => (
      <ChauffageForm
        defaultValues={{
          heatingType: formData.heatingType,
          hasAirConditioning: formData.hasAirConditioning,
        }}
        onSubmit={onChauffageSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
