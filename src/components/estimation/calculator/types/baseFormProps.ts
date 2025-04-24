
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep?: () => void;
  goToPreviousStep?: () => void;
  animationDirection?: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
  onComplete?: () => void;
}
