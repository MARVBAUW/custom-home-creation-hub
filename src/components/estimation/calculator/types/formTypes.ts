
import { z } from 'zod';
import type { FormData } from './estimationTypes';

// Re-export the FormData type
export type { FormData };

// Define the ConversationState type
export interface ConversationState {
  currentStep: string;
  askedQuestions: string[];
  completedFields: string[];
  formProgress: number;
  messages: Array<{
    type: 'user' | 'bot';
    content: string;
    timestamp?: string;
  }>;
}

// Define the BaseFormProps interface with optional defaultValues and onSubmit
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

// Define the ContactFormProps interface
export interface ContactFormProps extends BaseFormProps {
  // Additional properties specific to contact forms
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}
