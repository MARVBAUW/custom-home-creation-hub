
import { EstimationFormData, FormData } from './formTypes';

/**
 * Base form props interface used by all form components
 */
export interface BaseFormProps {
  formData: EstimationFormData | FormData;
  updateFormData: (data: Partial<EstimationFormData | FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

export interface ContactFormProps extends BaseFormProps {
  // Add any specific props for contact forms
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

export interface ProjectDetailsProps extends BaseFormProps {
  // Add any specific props for project details forms
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}
