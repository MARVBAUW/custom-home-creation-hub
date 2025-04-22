
export interface ProjectDetails {
  projectType: string;
  surface: number;
  location: string;
  constructionType: string;
  bedrooms: number;
  bathrooms: number;
  city: string;
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
  bidding: number;
  construction: number;
  total: number;
  totalMonths: number;
}

export interface CategoryCost {
  name: string;
  cost: number;
  percentage: number;
  category: string;
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

export interface ConversationState {
  currentStep: string;
  askedQuestions: any[];
  completedFields: any[];
  formProgress: number;
  messages: any[]; // Array of message objects
}

// Expanding the FormData interface to include all necessary fields
export interface FormData {
  clientType?: string;
  projectType?: string;
  surface?: number;
  facadeSurface?: number;
  city?: string;
  location?: string;
  constructionType?: string;
  bedrooms?: number;
  bathrooms?: number;
  budget?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  projectDescription?: string;
  projectPurpose?: string;
  message?: string;
  termsAccepted?: boolean;
  commercialAccepted?: boolean;
  formCompleted?: boolean;
  // Additional fields that might be used in calculations
  heatingType?: string;
  hasAirConditioning?: boolean;
  insulationType?: string;
  demolitionNeeded?: boolean;
  renovationType?: string;
}
