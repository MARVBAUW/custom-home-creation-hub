
import { BaseSyntheticEvent } from 'react';
import { EstimationFormData, EstimationResponseData } from './estimationFormData';
import { BaseFormProps } from './baseTypes';
import { PDFGenerationOptions } from './pdf-types';

export type { BaseFormProps };

export interface FormStepProps extends BaseFormProps {
  // This is a base interface for form components
}

export interface ClientTypeStepProps extends BaseFormProps {
  // Specific props for ClientTypeStep
  goToPreviousStep?: () => void; // Make this optional since it might not be needed in the first step
}

export interface ExtendedFormProps extends FormStepProps {
  // This is a base interface for form components
  onSubmit?: (data: Partial<EstimationFormData>) => void;
  defaultValues?: Partial<EstimationFormData>;
  isLoading?: boolean;
  estimationResult?: EstimationResponseData | number | null;
  categoriesAmounts?: Array<{ category: string; amount: number }>;
}

export interface ResultsFormProps extends FormStepProps {
  estimationResult?: EstimationResponseData | number | null;
  isLoading?: boolean;
  categoriesAmounts?: Array<{ category: string; amount: number }>;
}

export interface EstimationCalculatorProps {
  initialData?: Partial<EstimationFormData>;
  onComplete?: (data: EstimationFormData, result: EstimationResponseData) => void;
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
  currentStep?: number;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  isSubmitting?: boolean;
  isComplete?: boolean;
  onComplete?: () => void;
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

export interface ConstructionDetailsStepProps extends FormStepProps {
  // Add any construction-specific props here
  estimationType?: string;
}

export interface StepRendererProps {
  step: number;
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  totalSteps?: number;
  isSubmitting?: boolean;
  goToStep?: (step: number) => void;
  onComplete?: () => void;
}

export interface ContactDetailsStepProps extends FormStepProps {
  onSubmit?: (data: Partial<EstimationFormData>) => void;
  animationDirection: 'forward' | 'backward';  // Make sure this is required
}

export interface DetailedEstimationReportProps {
  formData: EstimationFormData;
  estimation: any; // Add this property
  includeTerrainPrice?: boolean;
  options?: PDFGenerationOptions;
}
