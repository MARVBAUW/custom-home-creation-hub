
// Basic form data structure
export interface FormData {
  clientType: string;
  projectType: string;
  surface: number;
  city: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  budget: number;
  constructionType: string;
  [key: string]: any;
}

// Base props for all form components
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

// Project types
export type ProjectType = 'construction' | 'renovation' | 'extension';

// Client types
export type ClientType = 'individual' | 'professional';
