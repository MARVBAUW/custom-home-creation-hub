
export interface FormData {
  clientType?: 'individual' | 'professional';
  projectType?: string;
  estimationType?: 'quick' | 'precise';
  surface?: number;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  constructionType?: string;
  terrainType?: string;
  montantT?: number;
  landIncluded?: boolean;
  landPrice?: number;
  [key: string]: any;
}

export interface StepRendererProps {
  step: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  animationDirection: 'forward' | 'backward';
  goToNextStep?: () => void;
  goToPreviousStep?: () => void;
  isSubmitting?: boolean;
  goToStep?: (step: number) => void;
  onComplete?: () => void;
}

export interface BaseStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}
