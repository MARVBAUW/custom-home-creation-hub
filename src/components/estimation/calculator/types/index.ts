
// Re-export all types from individual files
export * from './baseTypes';

// Create a unified type definition to resolve incompatibilities between FormData and EstimationFormData
import { EstimationFormData as OriginalEstimationFormData, 
        EstimationResponseData as OriginalEstimationResponseData, 
        FeeCosts as OriginalFeeCosts,
        EstimationTimeline } from './estimationFormData';
import { FormData as OriginalFormData, 
        EstimationResponseData as LegacyEstimationResponseData,
        FeeCosts as LegacyFeeCosts } from '../types';

// Create unified types that combine both versions
export interface UnifiedFormData extends Omit<OriginalEstimationFormData, 'budget' | 'poolHeating'> {
  // Add properties with flexible types to handle mixed data types
  surface?: number | string;
  poolHeating?: boolean | string;
  budget?: number | string;
  [key: string]: any; // Allow for dynamic properties
}

// Export the unified types with the original names for backward compatibility
export type FormData = UnifiedFormData;
export type EstimationFormData = UnifiedFormData;

// Unified response data type
export interface UnifiedEstimationResponseData {
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
    // Include all properties from both types
    officialFees?: number;
    inspectionFees?: number;
    technicalStudies?: number;
    other?: number;
    masterBuilderFees?: number;
    safetyCoordination?: number;
    technicalControl?: number;
    insurance?: number;
    total: number;
  };
  otherCosts: {
    insurance?: number;
    contingency?: number;
    taxes?: number;
    miscellaneous?: number;
    landRegistry?: number;
    urbanismTax?: number;
    landTax?: number;
    connectionFees?: number;
    total: number;
  };
  totalAmount: number;
  categories: Array<{ category: string; amount: number; details?: string }>;
  timeline: {
    design?: number;
    permits?: number;
    bidding?: number;
    construction?: number;
    total?: number;
    duration?: number;
    startDate?: string;
    endDate?: string;
    type?: EstimationTimeline | string;
  };
}

// Export the unified response data type with both original names
export type EstimationResponseData = UnifiedEstimationResponseData;

// Unified fee costs
export interface UnifiedFeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  // Include all possible properties
  officialFees?: number;
  inspectionFees?: number;
  technicalStudies?: number;
  other?: number;
  masterBuilderFees?: number;
  safetyCoordination?: number;
  technicalControl?: number;
  insurance?: number;
  taxAndPermits?: number;
  total: number;
}

// Export the unified fee costs with both original names
export type FeeCosts = UnifiedFeeCosts;

// Re-export EstimationTimeline with explicit reference to avoid ambiguity
export { EstimationTimeline } from './estimationFormData';
