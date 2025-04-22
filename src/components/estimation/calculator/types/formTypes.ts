
import { z } from 'zod';
import { FormData } from './estimationTypes';

// Re-export the FormData type
export type { FormData };

// Define the BaseFormProps interface
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}
