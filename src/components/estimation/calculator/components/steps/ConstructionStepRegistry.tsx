
import React from 'react';
import { FormData } from '../../types';
import ConstructionDetailsForm from '../../FormSteps/ConstructionDetailsForm';
import TerrainForm from '../../FormSteps/TerrainForm';
import GrosOeuvreForm from '../../FormSteps/GrosOeuvreForm';
import CharpenteForm from '../../FormSteps/CharpenteForm';
import ComblesForm from '../../FormSteps/ComblesForm';
import { 
  ConstructionDetailsFormProps,
  TerrainFormProps,
  GrosOeuvreFormProps,
  CharpenteFormProps,
  CombleFormProps
} from '../../types/formTypes';

export const createConstructionStepRegistry = (
  formData: FormData,
  onConstructionDetailsSubmit: (data: any) => void,
  onTerrainSubmit: (data: { terrainType: string }) => void,
  onGrosOeuvreSubmit: (data: { wallType: string }) => void,
  onCharpenteSubmit: (data: { roofType: string }) => void,
  onComblesSubmit: (data: { atticType: string }) => void,
  goToPreviousStep: () => void
) => {
  return {
    5: (props: { 
      animationDirection: 'forward' | 'backward';
      goToPreviousStep: () => void; 
    }) => {
      return (
        <ConstructionDetailsForm
          formData={formData}
          updateFormData={onConstructionDetailsSubmit}
          goToNextStep={() => {}}
          goToPreviousStep={goToPreviousStep}
          animationDirection={props.animationDirection}
          defaultValues={{
            surface: formData.surface?.toString() || '',
            levels: formData.levels?.toString() || '',
            units: formData.units?.toString() || '',
          }}
        />
      );
    },
    6: (props: { 
      animationDirection: 'forward' | 'backward';
      goToPreviousStep: () => void; 
    }) => {
      return (
        <TerrainForm
          formData={formData}
          updateFormData={(data) => onTerrainSubmit(data as { terrainType: string })}
          goToNextStep={() => {}}
          goToPreviousStep={goToPreviousStep}
          animationDirection={props.animationDirection}
          defaultValues={{
            terrainType: formData.terrainType || '',
            terrainAccess: formData.terrainAccess || '',
          }}
        />
      );
    },
    7: (props: { 
      animationDirection: 'forward' | 'backward';
      goToPreviousStep: () => void; 
    }) => {
      return (
        <GrosOeuvreForm
          formData={formData}
          updateFormData={(data) => onGrosOeuvreSubmit(data as { wallType: string })}
          goToNextStep={() => {}}
          goToPreviousStep={goToPreviousStep}
          animationDirection={props.animationDirection}
          defaultValues={{
            wallType: formData.wallType || '',
          }}
        />
      );
    },
    8: (props: { 
      animationDirection: 'forward' | 'backward';
      goToPreviousStep: () => void; 
    }) => {
      return (
        <CharpenteForm
          formData={formData}
          updateFormData={(data) => onCharpenteSubmit(data as { roofType: string })}
          goToNextStep={() => {}}
          goToPreviousStep={goToPreviousStep}
          animationDirection={props.animationDirection}
          defaultValues={{
            roofType: formData.roofType || '',
          }}
        />
      );
    },
    9: (props: { 
      animationDirection: 'forward' | 'backward';
      goToPreviousStep: () => void; 
    }) => {
      return (
        <ComblesForm
          formData={formData}
          updateFormData={(data) => onComblesSubmit(data as { atticType: string })}
          goToNextStep={() => {}}
          goToPreviousStep={goToPreviousStep}
          animationDirection={props.animationDirection}
          defaultValues={{
            atticType: formData.atticType || '',
          }}
        />
      );
    },
  };
};
