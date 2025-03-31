
import { z } from 'zod';

// Re-export types from types/formTypes.ts for compatibility
export { FormData, EstimationFormData, EstimationResponseData } from './types/formTypes';

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
