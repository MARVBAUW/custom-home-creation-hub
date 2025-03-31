
import { FormData, EstimationResponseData } from './index';

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection?: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
  estimationResult?: number | EstimationResponseData;
}

export interface ClientTypeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ProjectTypeStepProps {
  formData: FormData;
  updateFormData: (data: { projectType: string; landIncluded?: string }) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isIndividual?: boolean;
}

export interface TerrainDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export interface ConstructionDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  estimationType?: string;
}

export interface RoomsDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export interface FinishDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export interface SpecialFeaturesStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export interface ExteriorFeaturesStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export interface ContactDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export interface EstimationResultsProps {
  estimation: number | null;
  formData: FormData;
  goToPreviousStep: () => void;
  updateFormData?: (data: Partial<FormData>) => void;
  goToNextStep?: () => void;
  isLoading?: boolean;
}

export interface ResultsFormProps {
  formData: FormData;
  estimationResult?: number | null | EstimationResponseData;
  categoriesAmounts?: { category: string; amount: number }[];
  goToPreviousStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  animationDirection?: 'forward' | 'backward';
  isLoading?: boolean;
}

// Add these interfaces to fix StepRendererProps and FormNavigationProps
export interface StepRendererProps {
  step: number;
  totalSteps: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isSubmitting: boolean;
  goToStep: (step: number) => void;
  onComplete: () => void;
}

export interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  isSubmitting: boolean;
  isComplete: boolean;
  onComplete: () => void;
}
