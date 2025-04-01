
// Re-export types from sub-modules
export type { FormData, BaseFormProps } from './formTypes';
export type { EstimationResponseData, EstimationTimeline, CategoryCost } from './estimationTypes';

// Define interfaces still needed in the codebase
export interface FeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  projectManagement: number;
  officialFees: number;
  inspectionFees: number;
  technicalStudies: number;
  permits: number;
  insurance: number;
  contingency: number;
  taxes: number;
  other: number;
  total: number;
}
