
// Re-export all types from individual files
export * from './baseTypes';
export * from './estimationFormData';
export * from './formTypes';
export * from './clientTypeProps';
export * from './pdf-types';

// Ensure type exports are clear and don't have duplicates
export type { EstimationFormData, FormData, EstimationResponseData, FeeCosts } from './estimationFormData';
export type { BaseFormProps } from './baseTypes';
export type { 
  FormStepProps, 
  ExtendedFormProps, 
  ResultsFormProps,
  EstimationCalculatorProps,
  FormNavigationProps,
  EstimationValidationError,
  FormSubmitContext,
  ConstructionDetailsStepProps,
  StepRendererProps,
  ClientTypeStepProps,
  ContactDetailsStepProps,
  DetailedEstimationReportProps
} from './formTypes';

// Export PDF related types
export type { PDFGenerationOptions } from './pdf-types';
export type { EnhancedJsPDF } from './pdf-types';
