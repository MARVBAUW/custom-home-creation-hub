
// Re-export types from types/formTypes.ts for compatibility
export type { FormData, EstimationFormData } from './types/formTypes';
export type { EstimationResponseData } from './types/estimationTypes';

// Define interfaces still needed in the codebase
export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}

// Define FeeCosts for compatibility
export interface FeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  officialFees: number;
  inspectionFees: number;
  technicalStudies: number;
  other: number;
  total: number;
}
