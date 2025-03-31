
import { EstimationFormData } from './estimationFormData';

export interface BaseStepProps {
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

export interface BaseFormProps {
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
  defaultValues?: Partial<EstimationFormData>;
  onSubmit?: (data: Partial<EstimationFormData>) => void;
}
