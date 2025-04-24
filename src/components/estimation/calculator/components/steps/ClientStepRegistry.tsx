import React from 'react';
import { StepComponentRegistry, DefaultStepProps } from './StepComponents';
import { EstimationFormData, FormData } from '../../types/formTypes';

interface ClientTypeProps extends DefaultStepProps {
  animationDirection: 'forward' | 'backward';
}

interface IndividualProjectProps extends DefaultStepProps {
  animationDirection: 'forward' | 'backward';
  projectType: string;
}

interface EstimationTypeProps extends DefaultStepProps {
  animationDirection: 'forward' | 'backward';
  estimationType: string;
}

export const createClientStepRegistry = (
  formData: EstimationFormData | FormData,
  onClientTypeSubmit: (data: Partial<EstimationFormData | FormData>) => void,
  onProfessionalProjectSubmit: (data: Partial<EstimationFormData | FormData>) => void,
  onIndividualProjectSubmit: (data: Partial<EstimationFormData | FormData>) => void,
  onEstimationTypeSubmit: (data: Partial<EstimationFormData | FormData>) => void,
  goBack: () => void
): StepComponentRegistry => {
  return {
    // Step 0: Client Type
    0: (props: ClientTypeProps) => {
      return (
        <div>
          <h2>Client Type Selection</h2>
          <button onClick={() => onClientTypeSubmit({ clientType: 'individual' })}>Individual</button>
          <button onClick={() => onClientTypeSubmit({ clientType: 'professional' })}>Professional</button>
        </div>
      );
    },

    // Step 1: Professional Project
    1: (props: DefaultStepProps) => {
      return (
        <div>
          <h2>Professional Project Details</h2>
          <button onClick={() => onProfessionalProjectSubmit({ activity: 'business' })}>Continue</button>
          <button onClick={goBack}>Back</button>
        </div>
      );
    },

    // Step 2: Individual Project Type
    2: (props: IndividualProjectProps) => {
      // Ensure projectType is a non-empty string before proceeding
      const safeProjectType = props.projectType || 'construction';
      
      return (
        <div>
          <h2>Individual Project Type</h2>
          <div>
            <button onClick={() => onIndividualProjectSubmit({ projectType: 'construction' })}>Construction</button>
            <button onClick={() => onIndividualProjectSubmit({ projectType: 'renovation' })}>Renovation</button>
            <button onClick={() => onIndividualProjectSubmit({ projectType: 'extension' })}>Extension</button>
            <button onClick={() => onIndividualProjectSubmit({ projectType: 'optimization' })}>Optimization</button>
            <button onClick={() => onIndividualProjectSubmit({ projectType: 'division' })}>Division</button>
          </div>
          <button onClick={goBack}>Back</button>
        </div>
      );
    },

    // Step 3: Estimation Type
    3: (props: EstimationTypeProps) => {
      // Ensure estimationType is a non-empty string before proceeding
      const safeEstimationType = props.estimationType || 'quick';
      
      return (
        <div>
          <h2>Estimation Type</h2>
          <div>
            <button onClick={() => onEstimationTypeSubmit({ estimationType: 'quick' })}>Quick</button>
            <button onClick={() => onEstimationTypeSubmit({ estimationType: 'precise' })}>Precise</button>
          </div>
          <button onClick={goBack}>Back</button>
        </div>
      );
    }
  };
};
