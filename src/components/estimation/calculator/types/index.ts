
// Re-export types from sub-modules
export type { FormData } from './formTypes';
export type { BaseFormProps } from './formTypes';
export type { EstimationResponseData, EstimationTimeline, CategoryCost } from './estimationTypes';

// Define interfaces still needed in the codebase
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
