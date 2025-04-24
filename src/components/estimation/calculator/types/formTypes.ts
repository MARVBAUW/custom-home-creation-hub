
import { z } from 'zod';

export interface EstimationFormData {
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
  completed?: boolean;
  currentStep?: number;
  progress?: number;
  budget?: number;
  additionalDetails?: string;
  windowType?: string;
  windowRenovationArea?: number;
  windowNewArea?: number;
  plasteringType?: string;
  interiorFittings?: string;
  doorType?: string;
  interiorDoorsType?: string;
  hasMoldings?: boolean;
  hasCustomFurniture?: boolean;
  [key: string]: any;
}

// FormData alias for backward compatibility
export type FormData = EstimationFormData;

// Re-export BaseFormProps from baseFormProps.ts to maintain backward compatibility
export type { BaseFormProps } from './baseFormProps';

export interface StepRendererProps {
  step: number;
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
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

export interface EstimationState {
  step: number;
  totalSteps: number;
  formData: EstimationFormData;
  estimationResult: any;
  isSubmitting: boolean;
  animationDirection: 'forward' | 'backward';
  isComplete: boolean;
}
