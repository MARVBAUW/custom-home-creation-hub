
export interface FormData {
  clientType?: string;
  projectType?: string;
  surface?: number;
  city?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  budget?: number;
  constructionType?: string;
  [key: string]: any;
}

export interface EstimationResponseData {
  projectType: string;
  projectDetails: {
    surface: number;
    location: string;
    projectType: string;
    constructionType?: string;
    bedrooms?: number;
    bathrooms?: number;
    city?: string;
    [key: string]: any;
  };
  estimatedCost: number | {
    total: number;
    perSquareMeter: number;
    breakdown: {
      materials: number;
      labor: number;
      fees: number;
    }
  };
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
  categories: Array<{
    category: string;
    amount: number;
  }>;
  dateGenerated: string;
  isComplete: boolean;
}
