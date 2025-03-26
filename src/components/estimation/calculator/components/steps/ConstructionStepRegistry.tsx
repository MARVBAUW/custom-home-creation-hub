
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ConstructionDetailsForm from '../../FormSteps/ConstructionDetailsForm';
import TerrainForm from '../../FormSteps/TerrainForm';
import GrosOeuvreForm from '../../FormSteps/GrosOeuvreForm';
import CharpenteForm from '../../FormSteps/CharpenteForm';
import CombleForm from '../../FormSteps/CombleForm';
import { FormData } from '../../types';

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
        defaultValues={{
          surface: formData.surface,
          levels: formData.levels,
          units: formData.units,
        }}
        onSubmit={onConstructionDetailsSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    6: (props: FormStepProps) => (
      <TerrainForm
        defaultValues={{
          terrainType: formData.terrainType,
        }}
        onSubmit={onTerrainSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    7: (props: FormStepProps) => (
      <GrosOeuvreForm
        defaultValues={{
          wallType: formData.wallType,
        }}
        onSubmit={onGrosOeuvreSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    8: (props: FormStepProps) => (
      <CharpenteForm
        defaultValues={{
          roofType: formData.roofType,
        }}
        onSubmit={onCharpenteSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    9: (props: FormStepProps) => (
      <CombleForm
        defaultValues={{
          atticType: formData.atticType,
        }}
        onSubmit={onComblesSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
