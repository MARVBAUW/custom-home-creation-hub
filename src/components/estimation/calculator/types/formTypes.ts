
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

// Re-export BaseFormProps from baseFormProps.ts to maintain backward compatibility
// with existing imports without having to change all files
export { BaseFormProps } from './baseFormProps';

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

export interface ConversationState {
  currentStep?: string;
  askedQuestions?: string[];
  completedFields?: string[];
  formProgress?: number;
  messages: Message[];
  isTyping: boolean;
  isProcessing?: boolean;
}

export interface Message {
  id?: string;
  type: 'user' | 'assistant' | 'bot' | 'system';
  content: string;
  timestamp?: string;
  text?: string;
  options?: string[];
}
