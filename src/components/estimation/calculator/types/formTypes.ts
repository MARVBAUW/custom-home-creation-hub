
import { ReactNode } from 'react';
import { FormData } from './index';

// Base interface for all form step components
export interface BaseFormStepProps {
  animationDirection: 'forward' | 'backward';
  goToPreviousStep?: () => void;
}

// Interface for form steps with default values and submit handler
export interface FormStepProps<T = any> extends BaseFormStepProps {
  defaultValues: T;
  onSubmit: (data: T) => void;
}

// Interface for form steps that work directly with FormData
export interface FormDataStepProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

// Common interface for step registry components
export interface StepComponentProps {
  title: string;
  icon: ReactNode;
  component: React.ComponentType<any>;
  skipCondition: (formData: FormData) => boolean;
}
