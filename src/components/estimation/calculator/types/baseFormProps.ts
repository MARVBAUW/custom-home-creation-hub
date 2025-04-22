
import { FormData } from './formTypes';

/**
 * Base props interface used by all form components
 */
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward' | string;
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

/**
 * Extended props for contact forms
 */
export interface ContactFormProps extends BaseFormProps {
  validateEmail?: boolean;
  requirePhone?: boolean;
  showCompanyFields?: boolean;
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

/**
 * Extended props for client type forms
 */
export interface ClientTypeFormProps extends BaseFormProps {
  clientTypes?: string[];
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

/**
 * Extended props for project type forms  
 */
export interface ProjectTypeFormProps extends BaseFormProps {
  projectTypes?: string[];
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

/**
 * Extended props for professional project forms
 */
export interface ProfessionalFormProps extends BaseFormProps {
  buildingTypes?: string[];
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

/**
 * Extended props for estimation type forms
 */
export interface EstimationTypeFormProps extends BaseFormProps {
  estimationTypes?: string[];
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}
