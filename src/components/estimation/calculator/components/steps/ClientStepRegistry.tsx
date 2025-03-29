
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import ClientTypeForm from '../../FormSteps/ClientTypeForm';
import ProfessionalProjectForm from '../../FormSteps/ProfessionalProjectForm';
import IndividualProjectForm from '../../FormSteps/IndividualProjectForm';
import EstimationTypeForm from '../../FormSteps/EstimationTypeForm';
import { FormData } from '../../types';

// Registry for client and project type steps (steps 1-4)
export const createClientStepRegistry = (
  formData: FormData,
  onClientTypeSubmit: (data: { clientType: string }) => void,
  onProfessionalProjectSubmit: (data: any) => void,
  onIndividualProjectSubmit: (data: { projectType: string }) => void,
  onEstimationTypeSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    1: (props: FormStepProps) => (
      <ClientTypeForm
        formData={formData}
        updateFormData={(data) => onClientTypeSubmit({ clientType: data.clientType || '' })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{ clientType: formData.clientType }}
        onSubmit={onClientTypeSubmit}
      />
    ),
    2: (props: FormStepProps) => (
      <ProfessionalProjectForm
        formData={formData}
        updateFormData={onProfessionalProjectSubmit}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          activity: formData.activity,
          projectType: formData.projectType,
          startDate: formData.startDate,
          endDate: formData.endDate,
        }}
        onSubmit={onProfessionalProjectSubmit}
      />
    ),
    3: (props: FormStepProps) => (
      <IndividualProjectForm
        formData={formData}
        updateFormData={onIndividualProjectSubmit}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          projectType: formData.projectType,
        }}
        onSubmit={onIndividualProjectSubmit}
      />
    ),
    4: (props: FormStepProps) => (
      <EstimationTypeForm
        formData={formData}
        updateFormData={onEstimationTypeSubmit}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          estimationType: formData.estimationType,
          termsAccepted: formData.termsAccepted || false,
        }}
        onSubmit={onEstimationTypeSubmit}
      />
    ),
  };
};
