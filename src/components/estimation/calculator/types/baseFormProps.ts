
import { EstimationFormData } from './formTypes';

export interface BaseFormProps {
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep?: () => void;
  goToPreviousStep?: () => void;
  animationDirection?: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
  onComplete?: () => void;
}
