
import { EstimationFormData } from './estimationFormData';

/**
 * Base props for form components
 */
export interface BaseFormProps {
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward' | string;
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

// FormData interface compatible with EstimationFormData
export interface FormData extends EstimationFormData {
  [key: string]: string | number | boolean | string[] | { [key: string]: string | number } | undefined;
}

// Export type aliases for backward compatibility
export type { EstimationFormData } from './estimationFormData';
