
export interface ProjectDetails {
  projectType: string;
  surface: number;
  location: string;
  constructionType: string;
  bedrooms: number;
  bathrooms: number;
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
}

export interface OtherCosts {
  land: number;
  demolition: number;
  siteDevelopment: number;
  total: number;
  insurance: number;
  contingency: number;
  taxes: number;
  miscellaneous: number;
}

export interface EstimationTimeline {
  design: number;
  permits: number;
  construction: number;
  totalMonths: number;
  bidding?: number;
  total?: number;
}

export interface CategoryCost {
  name: string;
  cost: number;
  percentage: number;
}

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
