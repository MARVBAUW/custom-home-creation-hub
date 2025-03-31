
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
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  [key: string]: any;
}

export interface FeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  projectManagement: number;
  officialFees: number;
  inspectionFees: number;
  technicalStudies: number;
  permits: number;
  insurance: number;
  contingency: number;
  taxes: number;
  other: number;
  total: number;
}

/**
 * Timeline estimation interface
 */
export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
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
  estimatedCost: number | {
    total: number;
    perSquareMeter: number;
    breakdown: {
      materials: number;
      labor: number;
      fees: number;
    }
  };
  dateGenerated: string;
  isComplete: boolean;
}
