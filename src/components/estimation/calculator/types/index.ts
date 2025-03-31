
// Re-export all types from individual files
export * from './baseTypes';
export * from './estimationFormData';
export * from './formTypes';
export * from './clientTypeProps';
export * from './pdf-types';

// Re-export types from main files without duplicates
export type { FormData, EstimationFormData, EstimationResponseData, FeeCosts } from './formTypes';
export type { BaseFormProps, FormStepProps, ExtendedFormProps, ResultsFormProps } from './formTypes';
export type { 
  EstimationCalculatorProps,
  FormNavigationProps,
  EstimationValidationError,
  FormSubmitContext,
  ConstructionDetailsStepProps,
  StepRendererProps,
  ClientTypeStepProps,
  ContactDetailsStepProps,
  DetailedEstimationReportProps,
  PDFGenerationOptions
} from './formTypes';

// Re-export EstimationTimeline with explicit reference to avoid ambiguity
export { EstimationTimeline } from './estimationFormData';

// Re-export all types from the main types file
export * from '../types';
