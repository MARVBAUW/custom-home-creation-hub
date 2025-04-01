
export interface FormData {
  clientType?: string;
  projectType?: string;
  surface?: number;
  city?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  budget?: number;
  constructionType?: string;
  [key: string]: any;
}

/**
 * Base form props interface used by all form components
 */
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

export interface ContactFormProps extends BaseFormProps {
  // Specific contact form props
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}
