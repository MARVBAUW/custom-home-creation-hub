
import React from 'react';
import DefaultStepContent from '../../DefaultStepContent';
import { BaseFormProps } from '../../types/formTypes';

// Define types for the step components props
export interface StepComponentProps {
  animationDirection: 'forward' | 'backward';
  goToPreviousStep: () => void;
}

export interface DefaultStepProps extends StepComponentProps {
  step: number;
  visibleSteps: any[];
  goToNextStep: () => void;
  totalSteps: number;
}

// Type for forms that need default values
export interface FormStepProps<T = any> extends StepComponentProps {
  defaultValues?: T;
  onSubmit?: (data: T) => void;
}

// Step component registry - updated to allow both number and string keys
export type StepComponentRegistry = {
  [key: number | string]: (props: any) => JSX.Element;
};

// Factory function to create step components with their props
export const createStepComponent = (
  step: number | string, 
  registry: StepComponentRegistry, 
  props: any
): JSX.Element => {
  const Component = registry[step];
  
  if (Component) {
    return <Component {...props} />;
  }
  
  return <DefaultStepContent {...props} />;
};
