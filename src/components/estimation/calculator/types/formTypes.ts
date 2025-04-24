
export interface FormData {
  projectType?: string;
  surface?: string | number;
  city?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  constructionType?: string;
  [key: string]: any;
}

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: Partial<FormData>;
}
