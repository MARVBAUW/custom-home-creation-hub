
import { EstimationTimeline, FeeCosts } from '../types';

export interface CategoryCost {
  category: string;
  amount: number;
}

export interface ConstructionCosts {
  structuralWork: number;
  finishingWork: number;
  technicalLots: number;
  externalWorks: number;
  total: number;
}

export interface OtherCosts {
  insurance: number;
  contingency: number;
  taxes: number;
  miscellaneous: number;
  total: number;
}

export interface ProjectDetails {
  surface: number;
  location: string;
  projectType: string;
  constructionType?: string;
  [key: string]: any;
}

/**
 * Complete estimation response data format
 */
export interface EstimationResponseData {
  constructionCosts: ConstructionCosts;
  fees: FeeCosts;
  otherCosts: OtherCosts;
  totalAmount: number;
  timeline: EstimationTimeline;
  categories: CategoryCost[];
  
  // Additional fields needed by components
  projectType: string;
  projectDetails: ProjectDetails;
  estimatedCost: number;
  dateGenerated: string;
  isComplete: boolean;
}

// Export EstimationTimeline to resolve the missing export error
export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}
