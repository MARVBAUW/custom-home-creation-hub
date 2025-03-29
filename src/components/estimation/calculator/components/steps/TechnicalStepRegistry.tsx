
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
        formData={formData}
        updateFormData={(data) => onElectriciteSubmit({
          electricalType: data.electricalType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    15: (props: FormStepProps) => (
      <PlomberieForm
        formData={formData}
        updateFormData={(data) => onPlomberieSubmit({
          plumbingType: data.plumbingType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    16: (props: FormStepProps) => (
      <ChauffageForm
        formData={formData}
        updateFormData={(data) => onChauffageSubmit({
          heatingType: data.heatingType || '',
          hasAirConditioning: data.hasAirConditioning || false
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
