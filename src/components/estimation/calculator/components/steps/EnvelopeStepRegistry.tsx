
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import CouvertureForm from '../../FormSteps/CouvertureForm';
import IsolationForm from '../../FormSteps/IsolationForm';
import FacadeForm from '../../FormSteps/FacadeForm';
import MenuiseriesExtForm from '../../FormSteps/MenuiseriesExtForm';
import { FormData } from '../../types';

// Registry for envelope-related steps (steps 10-13)
export const createEnvelopeStepRegistry = (
  formData: FormData,
  onCouvertureSubmit: (data: { roofingType: string }) => void,
  onIsolationSubmit: (data: { insulationType: string }) => void,
  onFacadeSubmit: (data: any) => void,
  onMenuiseriesExtSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    10: (props: FormStepProps) => (
      <CouvertureForm
        defaultValues={{
          roofingType: formData.roofingType,
        }}
        onSubmit={onCouvertureSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    11: (props: FormStepProps) => (
      <IsolationForm
        defaultValues={{
          insulationType: formData.insulationType,
        }}
        onSubmit={onIsolationSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    12: (props: FormStepProps) => (
      <FacadeForm
        defaultValues={{
          stonePercentage: formData.stonePercentage,
          plasterPercentage: formData.plasterPercentage,
          brickPercentage: formData.brickPercentage,
          metalCladdingPercentage: formData.metalCladdingPercentage,
          woodCladdingPercentage: formData.woodCladdingPercentage,
          stoneCladdingPercentage: formData.stoneCladdingPercentage,
        }}
        onSubmit={onFacadeSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    13: (props: FormStepProps) => (
      <MenuiseriesExtForm
        defaultValues={{
          windowType: formData.windowType,
          windowRenovationArea: formData.windowRenovationArea,
          windowNewArea: formData.windowNewArea,
        }}
        onSubmit={onMenuiseriesExtSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
