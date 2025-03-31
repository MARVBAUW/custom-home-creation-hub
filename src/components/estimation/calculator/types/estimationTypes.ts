
import { EstimationTimeline, FeeCosts } from '../types';

/**
 * Interface for estimation response data
 */
export interface EstimationResponseData {
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
    total: number;
  };
  fees: FeeCosts;
  otherCosts: {
    insurance: number;
    contingency: number;
    taxes: number;
    miscellaneous: number;
    total: number;
  };
  totalAmount: number;
  timeline: EstimationTimeline;
  categories: Array<{
    category: string;
    amount: number;
  }>;
}
