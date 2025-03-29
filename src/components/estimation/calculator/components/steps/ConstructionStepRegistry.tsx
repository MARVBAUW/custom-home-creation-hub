
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ConstructionDetailsForm from '../../FormSteps/ConstructionDetailsForm';
import TerrainForm from '../../FormSteps/TerrainForm';
import GrosOeuvreForm from '../../FormSteps/GrosOeuvreForm';
import CharpenteForm from '../../FormSteps/CharpenteForm';
import CombleForm from '../../FormSteps/CombleForm';
import { FormData, FormDataStepProps } from '../../types';

// Registry for construction steps (steps 5-9)
export const createConstructionStepRegistry = (
  formData: FormData,
  onConstructionDetailsSubmit: (data: any) => void,
  onTerrainSubmit: (data: { terrainType: string }) => void,
  onGrosOeuvreSubmit: (data: { wallType: string }) => void,
  onCharpenteSubmit: (data: { roofType: string }) => void,
  onComblesSubmit: (data: { atticType: string }) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    5: (props: FormStepProps) => (
      <ConstructionDetailsForm
        formData={formData}
        updateFormData={(data) => onConstructionDetailsSubmit({
          surface: data.surface ? String(data.surface) : '',
          levels: data.levels ? String(data.levels) : '',
          units: data.units ? String(data.units) : ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    6: (props: FormStepProps) => (
      <TerrainForm
        formData={formData}
        updateFormData={(data) => onTerrainSubmit({
          terrainType: data.terrainType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    7: (props: FormStepProps) => (
      <GrosOeuvreForm
        formData={formData}
        updateFormData={(data) => onGrosOeuvreSubmit({
          wallType: data.wallType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    8: (props: FormStepProps) => (
      <CharpenteForm
        formData={formData}
        updateFormData={(data) => onCharpenteSubmit({
          roofType: data.roofType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    9: (props: FormStepProps) => (
      <CombleForm
        formData={formData}
        updateFormData={(data) => onComblesSubmit({
          atticType: data.atticType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
