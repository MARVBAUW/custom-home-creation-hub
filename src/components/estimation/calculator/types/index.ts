
// Re-export all types from individual files
export * from './baseTypes';
export * from './estimationFormData';
export * from './formTypes';
export * from './pdf-types';
export * from './clientTypeProps';

// Ensure type exports are clear and don't have duplicates
export type { EstimationFormData, FormData, EstimationResponseData, PDFGenerationOptions, FeeCosts } from './estimationFormData';
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

// Also export PDFGenerationOptions from pdf-types explicitly
export { PDFGenerationOptions } from './pdf-types';
export type { EnhancedJsPDF } from './pdf-types';
