
import React from 'react';
import { EstimationFormData, FormData } from '../../types/formTypes';
import ConstructionDetailsForm from '../../FormSteps/ConstructionDetailsForm';
import TerrainForm from '../../FormSteps/TerrainForm';
import GrosOeuvreForm from '../../FormSteps/GrosOeuvreForm';
import CharpenteForm from '../../FormSteps/CharpenteForm';
import ComblesForm from '../../FormSteps/ComblesForm';

export const createConstructionStepRegistry = (
  formData: EstimationFormData | FormData,
  onConstructionDetailsSubmit: (data: any) => void,
  onTerrainSubmit: (data: any) => void,
  onGrosOeuvreSubmit: (data: any) => void,
  onCharpenteSubmit: (data: any) => void,
  onComblesSubmit: (data: any) => void,
  goToPreviousStep: () => void
) => {
  return {
    3: (props: { animationDirection: 'forward' | 'backward' }) => {
      const { animationDirection } = props;
      
      return (
        <ConstructionDetailsForm
          formData={formData}
          updateFormData={onConstructionDetailsSubmit}
          goToNextStep={() => {}} // Will be handled by the submission
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
        />
      );
    },
    4: (props: { animationDirection: 'forward' | 'backward' }) => {
      const { animationDirection } = props;
      
      return (
        <TerrainForm
          formData={formData}
          updateFormData={onTerrainSubmit}
          goToNextStep={() => {}} // Will be handled by the submission
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
        />
      );
    },
    5: (props: { animationDirection: 'forward' | 'backward' }) => {
      const { animationDirection } = props;
      
      return (
        <GrosOeuvreForm
          formData={formData}
          updateFormData={onGrosOeuvreSubmit}
          goToNextStep={() => {}} // Will be handled by the submission
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
        />
      );
    },
    6: (props: { animationDirection: 'forward' | 'backward' }) => {
      const { animationDirection } = props;
      
      return (
        <CharpenteForm
          formData={formData}
          updateFormData={onCharpenteSubmit}
          goToNextStep={() => {}} // Will be handled by the submission
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
        />
      );
    },
    7: (props: { animationDirection: 'forward' | 'backward' }) => {
      const { animationDirection } = props;
      
      return (
        <ComblesForm
          formData={formData}
          updateFormData={onComblesSubmit}
          goToNextStep={() => {}} // Will be handled by the submission
          goToPreviousStep={goToPreviousStep}
          animationDirection={animationDirection}
        />
      );
    },
  };
};
