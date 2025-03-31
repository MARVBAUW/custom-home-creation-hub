
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

// Extended FormData interface compatible with EstimationFormData
export interface FormData extends Omit<EstimationFormData, 'budget' | 'poolHeating' | 'surface' | 'terassementsViabilisation'> {
  surface?: number | string;
  projectDescription?: string;
  projectPurpose?: string;
  commercialAccepted?: boolean;
  budget?: number | string;
  poolHeating?: boolean | string;
  terassementsViabilisation?: number | boolean;
  [key: string]: string | number | boolean | string[] | { [key: string]: string | number } | undefined;
}
