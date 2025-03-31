
import { EstimationResponseData as AppEstimationResponseData } from '../types';
import { EstimationResponseData as EstimFormEstimationResponseData } from '../types/estimationFormData';

/**
 * Helper function to convert between different EstimationResponseData types
 * Used to ensure compatibility when the interface is defined in multiple places
 */
export const convertEstimationResponseData = (data: AppEstimationResponseData): EstimFormEstimationResponseData => {
  return {
    constructionCosts: data.constructionCosts,
    fees: {
      architect: data.fees.architect,
      engineeringFees: data.fees.engineeringFees,
      architectFees: data.fees.architectFees,
      officialFees: data.fees.officialFees,
      inspectionFees: data.fees.inspectionFees,
      technicalStudies: data.fees.technicalStudies,
      other: data.fees.other,
      total: data.fees.total
    },
    otherCosts: data.otherCosts,
    totalAmount: data.totalAmount,
    timeline: data.timeline
  };
};
