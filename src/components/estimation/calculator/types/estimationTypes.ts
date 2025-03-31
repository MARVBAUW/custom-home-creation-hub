
import { EstimationTimeline, FeeCosts } from './index';

export interface EstimationResponseData {
  projectType: string;
  projectDetails: {
    surface: number;
    city: string;
    bedrooms: number;
    bathrooms: number;
  };
  estimatedCost: {
    total: number;
    perSquareMeter: number;
    breakdown: {
      materials: number;
      labor: number;
      fees: number;
    };
  };
  // Added these properties to match what the components are expecting
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
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
  categories?: Array<{ category: string; amount: number }>;
  timeline: EstimationTimeline;
  fees: FeeCosts;
  dateGenerated: string;
  isComplete: boolean;
}
