
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import CouvertureForm from '../../FormSteps/CouvertureForm';
import IsolationForm from '../../FormSteps/IsolationForm';
import FacadeForm from '../../FormSteps/FacadeForm';
import MenuiseriesExtForm from '../../FormSteps/MenuiseriesExtForm';
import { FormData } from '../../types';
import {
  CouvertureFormProps,
  IsolationFormProps,
  FacadeFormProps,
  MenuiseriesExtFormProps
} from '../../types/formTypes';

// Registry for envelope steps (steps 10-13)
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
        formData={formData}
        updateFormData={(data) => onCouvertureSubmit({
          roofingType: data.roofingType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          roofingType: formData.roofingType || ''
        }}
      />
    ),
    11: (props: FormStepProps) => (
      <FacadeForm
        formData={formData}
        updateFormData={(data) => onFacadeSubmit({
          stonePercentage: data.stonePercentage !== undefined ? Number(data.stonePercentage) : 0,
          plasterPercentage: data.plasterPercentage !== undefined ? Number(data.plasterPercentage) : 0,
          brickPercentage: data.brickPercentage !== undefined ? Number(data.brickPercentage) : 0,
          metalCladdingPercentage: data.metalCladdingPercentage !== undefined ? Number(data.metalCladdingPercentage) : 0,
          woodCladdingPercentage: data.woodCladdingPercentage !== undefined ? Number(data.woodCladdingPercentage) : 0,
          stoneCladdingPercentage: data.stoneCladdingPercentage !== undefined ? Number(data.stoneCladdingPercentage) : 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          stonePercentage: formData.stonePercentage?.toString() || '0',
          plasterPercentage: formData.plasterPercentage?.toString() || '0',
          brickPercentage: formData.brickPercentage?.toString() || '0',
          metalCladdingPercentage: formData.metalCladdingPercentage?.toString() || '0',
          woodCladdingPercentage: formData.woodCladdingPercentage?.toString() || '0',
          stoneCladdingPercentage: formData.stoneCladdingPercentage?.toString() || '0'
        }}
      />
    ),
    12: (props: FormStepProps) => (
      <MenuiseriesExtForm
        formData={formData}
        updateFormData={(data) => onMenuiseriesExtSubmit({
          windowType: data.windowType || '',
          windowRenovationArea: data.windowRenovationArea !== undefined ? Number(data.windowRenovationArea) : 0,
          windowNewArea: data.windowNewArea !== undefined ? Number(data.windowNewArea) : 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          windowType: formData.windowType || '',
          windowRenovationArea: formData.windowRenovationArea?.toString() || '0',
          windowNewArea: formData.windowNewArea?.toString() || '0'
        }}
      />
    ),
    13: (props: FormStepProps) => (
      <IsolationForm
        formData={formData}
        updateFormData={(data) => onIsolationSubmit({
          insulationType: data.insulationType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          insulationType: formData.insulationType || ''
        }}
      />
    ),
  };
};
