
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
        defaultValues={{ clientType: formData.clientType }}
        onSubmit={onClientTypeSubmit}
        animationDirection={props.animationDirection}
      />
    ),
    2: (props: FormStepProps) => (
      <ProfessionalProjectForm
        defaultValues={{
          activity: formData.activity,
          projectType: formData.projectType,
          startDate: formData.startDate,
          endDate: formData.endDate,
        }}
        onSubmit={onProfessionalProjectSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    3: (props: FormStepProps) => (
      <IndividualProjectForm
        defaultValues={{
          projectType: formData.projectType,
        }}
        onSubmit={onIndividualProjectSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    4: (props: FormStepProps) => (
      <EstimationTypeForm
        defaultValues={{
          estimationType: formData.estimationType,
          termsAccepted: formData.termsAccepted,
        }}
        onSubmit={onEstimationTypeSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
