
import { EstimationResponseData as AppEstimationResponseData } from '../types';
import { EstimationResponseData as EstimFormEstimationResponseData, FeeCosts } from '../types/estimationFormData';

/**
 * Helper function to convert between different EstimationResponseData types
 * Used to ensure compatibility when the interface is defined in multiple places
 */
export const convertEstimationResponseData = (data: AppEstimationResponseData): EstimFormEstimationResponseData => {
  return {
    constructionCosts: data.constructionCosts,
    fees: {
      architect: data.fees.architect || 0,
      engineeringFees: data.fees.engineeringFees || 0,
      architectFees: data.fees.architectFees || 0,
      officialFees: data.fees.officialFees || 0,
      inspectionFees: data.fees.inspectionFees || 0,
      technicalStudies: data.fees.technicalStudies || 0,
      other: data.fees.other || 0,
      total: data.fees.total || 0
    },
    otherCosts: data.otherCosts,
    totalAmount: data.totalAmount,
    timeline: data.timeline
  };
};

/**
 * Helper function to ensure all FeeCosts properties are defined
 * Used to fix compatibility issues between different FeeCosts interfaces
 */
export const ensureFullFeeCosts = (fees: Partial<FeeCosts>): FeeCosts => {
  return {
    architect: fees.architect || 0,
    engineeringFees: fees.engineeringFees || 0,
    architectFees: fees.architectFees || 0,
    officialFees: fees.officialFees || 0,
    inspectionFees: fees.inspectionFees || 0,
    technicalStudies: fees.technicalStudies || 0,
    other: fees.other || 0,
    total: fees.total || 0
  };
};
