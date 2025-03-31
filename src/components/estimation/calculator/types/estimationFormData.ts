
// Import the FormData interface from formTypes
import { FormData } from "./formTypes";

// EstimationFormData is an alias of FormData for compatibility
export type EstimationFormData = FormData;

// Definition of the estimation response
export interface EstimationResponseData {
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
    total: number;
  };
  fees: {
    architect: number;
    engineeringFees: number;
    architectFees: number;
    officialFees: number;
    inspectionFees: number;
    technicalStudies: number;
    other: number;
    total: number;
  };
  otherCosts: {
    insurance: number;
    contingency: number;
    taxes: number;
    miscellaneous: number;
    total: number;
  };
  totalAmount: number;
  timeline: {
    design: number;
    permits: number;
    bidding: number;
    construction: number;
    total: number;
  };
  categories: Array<{ category: string; amount: number; details?: string }> | Array<{ name: string; amount: number }>;
}

// For FeeCosts used elsewhere
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

// For Timeline
export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}
