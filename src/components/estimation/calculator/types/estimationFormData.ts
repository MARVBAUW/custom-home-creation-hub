
// Basic estimation form data type
export interface EstimationFormData {
  projectType: string;
  surface: number;
  location: string;
  constructionType: string;
  bedrooms: number;
  bathrooms: number;
  budget: number;
  city: string;
  clientType: string;
  [key: string]: any;
}

// Response data for estimation
export interface EstimationResponseData {
  projectType: string;
  projectDetails: {
    surface: number;
    location: string;
    constructionType: string;
    bedrooms: number;
    bathrooms: number;
  };
  estimatedCost: number;
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
    total: number;
  };
  fees: {
    architect: number;
    architectFees: number;
    engineeringFees: number;
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
    land: number;
    demolition: number;
    siteDevelopment: number;
    total: number;
    insurance: number;
    contingency: number;
    taxes: number;
    miscellaneous: number;
  };
  totalAmount: number;
  dateGenerated: string;
  isComplete: boolean;
  timeline: {
    design: number;
    permits: number;
    construction: number;
    totalMonths: number;
  };
  categories: {
    name: string;
    cost: number;
    percentage: number;
  }[];
}
