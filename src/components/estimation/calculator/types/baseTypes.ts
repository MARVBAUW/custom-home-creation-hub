
import { EstimationFormData } from './estimationFormData';

export interface BaseFormProps {
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  isLoading?: boolean;
  defaultValues?: Partial<EstimationFormData>;
  onSubmit?: (data: Partial<EstimationFormData>) => void;
}

export interface BaseStepProps {
  step: number;
  totalSteps: number;
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

// Re-export pour compatibility
export type FormStepProps = BaseFormProps;
