
import { FormData } from './estimationFormData';

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
  defaultValues?: Partial<FormData>;
  onSubmit?: (data: Partial<FormData>) => void;
}
