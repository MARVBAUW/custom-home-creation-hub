
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
  timeline: EstimationTimeline;
  fees: FeeCosts;
  dateGenerated: string;
  isComplete: boolean;
}
