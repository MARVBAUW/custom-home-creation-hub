
import React from 'react';
import { FormData } from '../../types';
import CouvertureForm from '../../FormSteps/CouvertureForm';
import IsolationForm from '../../FormSteps/IsolationForm';
import FacadeForm from '../../FormSteps/FacadeForm';
import MenuiseriesExtForm from '../../FormSteps/MenuiseriesExtForm';
import { StepComponentRegistry } from './StepComponents';

export const createEnvelopeStepRegistry = (
  formData: FormData,
  onCouvertureSubmit: (data: { roofingType: string }) => void,
  onIsolationSubmit: (data: { insulationType: string }) => void,
  onFacadeSubmit: (data: any) => void,
  onMenuiseriesExtSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    12: (props) => (
      <CouvertureForm
        {...props}
        formData={formData}
        onSubmit={onCouvertureSubmit}
        defaultValues={{ roofingType: formData.roofingType }}
      />
    ),
    13: (props) => (
      <IsolationForm
        {...props}
        formData={formData}
        onSubmit={onIsolationSubmit}
        defaultValues={{ insulationType: formData.insulationType }}
      />
    ),
    14: (props) => (
      <FacadeForm
        {...props}
        formData={formData}
        onSubmit={onFacadeSubmit}
        defaultValues={{
          stonePercentage: formData.stonePercentage,
          plasterPercentage: formData.plasterPercentage,
          brickPercentage: formData.brickPercentage,
          metalCladdingPercentage: formData.metalCladdingPercentage,
          woodCladdingPercentage: formData.woodCladdingPercentage,
          stoneCladdingPercentage: formData.stoneCladdingPercentage
        }}
      />
    ),
    15: (props) => (
      <MenuiseriesExtForm
        {...props}
        formData={formData}
        updateFormData={(data) => {
          const formData: Partial<FormData> = {
            windowType: data.windowType,
            windowRenovationArea: data.windowRenovationArea,
            windowNewArea: data.windowNewArea
          };
          props.updateFormData(formData);
          props.goToNextStep();
        }}
      />
    ),
  };
};
