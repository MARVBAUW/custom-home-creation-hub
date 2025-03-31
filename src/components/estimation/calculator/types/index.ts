// Re-export all types from individual files
export * from './baseTypes';
export * from './estimationFormData';
export * from './formTypes';
export * from './clientTypeProps';
export * from './pdf-types';

// Ensure type exports are clear and don't have duplicates
export type { EstimationFormData, FormData, EstimationResponseData, FeeCosts } from './estimationFormData';
export type { BaseFormProps } from './formTypes';
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
  DetailedEstimationReportProps,
  PDFGenerationOptions
} from './formTypes';

// Re-export all types from the main types file
export * from '../types';
