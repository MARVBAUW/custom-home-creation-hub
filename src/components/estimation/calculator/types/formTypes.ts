
import { BaseSyntheticEvent } from 'react';
import { EstimationFormData as FormData, EstimationResponseData } from './index';

export interface FormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

export interface ResultsFormProps extends FormStepProps {
  estimationResult?: EstimationResponseData | number | null;
  isLoading?: boolean;
  categoriesAmounts?: Array<{ category: string; amount: number }>;
}

export interface EstimationCalculatorProps {
  initialData?: Partial<FormData>;
  onComplete?: (data: FormData, result: EstimationResponseData) => void;
  showEmbeddedResults?: boolean;
}

export interface FormNavigationProps {
  step: number;
  totalSteps: number;
  estimationResult?: number;
  showSummary?: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onShowSummaryClick?: () => void;
}

export interface EstimationValidationError {
  path: string;
  message: string;
}

export interface FormSubmitContext {
  event?: BaseSyntheticEvent;
  isValid: boolean;
  errors: Record<string, any>;
}
