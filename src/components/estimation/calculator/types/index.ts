
// Use export type to avoid TS1205 when isolatedModules is enabled
export type { FormData } from './formTypes';
export type { EstimationFormData } from './estimationFormData';
export type { EstimationResponseData } from './estimationTypes';

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
