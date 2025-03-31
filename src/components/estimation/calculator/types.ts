
export interface FormData {
  projectType?: string;
  surface?: number | string;
  city?: string;
  landType?: string;
  complexity?: string;
  qualityStandard?: string;
  constructionType?: string;
  constructionStyle?: string;
  email?: string;
  name?: string;
  phone?: string;
  insulationType?: string;
  roofingType?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  landPrice?: number | string;
  // Add other form fields as needed
}

export interface ConstructionCosts {
  structuralWork: number;
  finishingWork: number;
  technicalLots: number;
  externalWorks: number;
  total: number;
}

export interface FeeCosts {
  architectFees: number;
  engineeringFees: number;
  officialFees: number;
  inspectionFees: number;
  total: number;
}

export interface OtherCosts {
  insurance: number;
  contingency: number;
  taxes: number;
  miscellaneous: number;
  total: number;
}

export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}

export interface EstimationResponseData {
  constructionCosts: ConstructionCosts;
  fees: FeeCosts;
  otherCosts: OtherCosts;
  totalAmount: number;
  timeline: EstimationTimeline;
}
