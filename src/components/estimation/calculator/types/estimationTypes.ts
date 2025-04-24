
// Detailed types for estimation calculations

export interface ProjectDetails {
  projectType: string;
  surface: number;
  location: string;
  constructionType: string;
  bedrooms: number;
  bathrooms: number;
  city?: string;
  [key: string]: any;
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
  total: number;
  totalMonths: number;
}

export interface CategoryCost {
  name: string;
  cost: number;
  percentage: number;
  category?: string;
  amount: number;
}

export interface EstimatedCost {
  total: number;
  perSquareMeter: number;
  breakdown: {
    materials: number;
    labor: number;
    fees: number;
  };
}

export interface EstimationResponseData {
  projectType: string;
  projectDetails: ProjectDetails;
  estimatedCost: EstimatedCost;
  constructionCosts: ConstructionCosts;
  fees: FeeCosts;
  otherCosts: OtherCosts;
  totalAmount: number;
  dateGenerated: string;
  isComplete: boolean;
  timeline: EstimationTimeline;
  categories: CategoryCost[];
}

export interface EstimationSummary {
  id?: string;
  title: string;
  projectType: string;
  surface: number;
  location: string;
  totalAmount: number;
  dateGenerated: string;
  contact?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface PDFGenerationOptions {
  includeBreakdown?: boolean;
  includeContactInfo?: boolean;
  includeTimeline?: boolean;
  includeBankReport?: boolean;
  includeHeader?: boolean;
  includeFooter?: boolean;
}
