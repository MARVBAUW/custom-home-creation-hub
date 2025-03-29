
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ElectriciteForm from '../../FormSteps/ElectriciteForm';
import PlomberieForm from '../../FormSteps/PlomberieForm';
import ChauffageForm from '../../FormSteps/ChauffageForm';
import { FormData } from '../../types';

// Registry pour les étapes techniques (étapes 14-16)
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
          electricalType: formData.electricalType || ''
        }}
        onSubmit={(data) => onElectriciteSubmit({
          electricalType: data.electricalType || ''
        })}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    15: (props: FormStepProps) => (
      <PlomberieForm
        defaultValues={{
          plumbingType: formData.plumbingType || ''
        }}
        onSubmit={(data) => onPlomberieSubmit({
          plumbingType: data.plumbingType || ''
        })}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    16: (props: FormStepProps) => (
      <ChauffageForm
        defaultValues={{
          heatingType: formData.heatingType || '',
          hasAirConditioning: formData.hasAirConditioning || ''
        }}
        onSubmit={(data) => onChauffageSubmit({
          heatingType: data.heatingType || '',
          hasAirConditioning: data.hasAirConditioning || false
        })}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
