
// Types for the estimation response
export interface EstimationResponseData {
  projectType: string;
  projectDetails: ProjectDetails;
  estimatedCost: number;
  constructionCosts: ConstructionCosts;
  fees: FeeCosts;
  otherCosts: OtherCosts;
  totalAmount: number;
  dateGenerated: string;
  isComplete: boolean;
  timeline: EstimationTimeline;
  categories: CategoryCost[];
}

export interface ProjectDetails {
  projectType: string;
  surface: number;
  location: string;
  constructionType: string;
  bedrooms: number;
  bathrooms: number;
  city?: string; // Making city optional
}

export interface ConstructionCosts {
  structuralWork: number;
  finishingWork: number;
  technicalLots: number;
  externalWorks: number;
  total: number;
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
  masterBuilderFees?: number; // Added as optional
}

export interface OtherCosts {
  land: number;
  demolition: number;
  siteDevelopment: number;
  insurance: number;
  contingency: number;
  taxes: number;
  miscellaneous: number;
  total: number;
}

export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding?: number;
  construction: number;
  total?: number;
  totalMonths: number;
}

export interface CategoryCost {
  cost: number;
  percentage: number;
  name?: string; // Added as optional
  category?: string; // Added as optional
}
