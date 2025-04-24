
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

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
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

export interface ConversationState {
  messages: Message[];
  isTyping: boolean;
}

export interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: number;
}

export interface EstimationResponseData {
  estimatedCost: number;
  breakdown: {
    [key: string]: number;
  };
  timeline: {
    [key: string]: number;
  };
}

