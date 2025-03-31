
// FormTypes.ts
import { EstimationFormData, EstimationResponseData } from './estimationFormData';

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

// Extended FormData interface to include contact form fields
export interface FormData extends Omit<EstimationFormData, 'budget' | 'poolHeating' | 'surface'> {
  surface?: number | string;
  projectDescription?: string;
  projectPurpose?: string;
  commercialAccepted?: boolean;
  budget?: number | string;
  poolHeating?: boolean | string;
}
