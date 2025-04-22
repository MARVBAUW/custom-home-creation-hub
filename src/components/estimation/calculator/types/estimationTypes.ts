
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
  masterBuilderFees?: number;
  safetyCoordination?: number;
  technicalControl?: number;
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
  name?: string;
  cost?: number;
  percentage?: number;
  category: string;
  amount: number;
}

export interface EstimationResponseData {
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
  
  // Additional fields for estimation calculations
  heatingType?: string;
  hasAirConditioning?: boolean;
  insulationType?: string;
  demolitionNeeded?: boolean;
  renovationType?: string;
  
  // Fields for AmenagementExtForm
  includeLandscaping?: boolean;
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  
  // Fields for AmenagementPaysagersForm
  landscapingType?: string | string[];
  landscapingArea?: number;
  fencingLength?: number;
  gateLength?: number;
  terraceArea?: number;
  
  // Fields for CarrelageForm
  floorTileType?: string;
  floorTilePercentage?: number;
  wallTileType?: string;
  
  // Fields for ChauffageForm
  heatingSystemType?: string;
  montantT?: number;
  
  // Fields for CombleForm
  atticType?: string;
  
  // Fields for ConstructionDetailsForm
  doorCount?: number;
  
  // Fields for CouvertureForm and CharpenteForm
  roofType?: string;
  roofArea?: number;
  
  // Fields for DemolitionForm
  demolitionTypes?: string[];
  demolitionPercentages?: Record<string, number>;
  demolitionTotalArea?: number;
  demolitionCost?: number;
  demolitionDetailedCosts?: Record<string, number>;
  
  // Additional fields that may be referenced
  foundationType?: string;
  windowType?: string;
  insulationLevel?: string;
  electricalUpgrade?: boolean;
  plumbingUpgrade?: boolean;
  kitchenType?: string;
  bathroomCount?: number;
  hasBasement?: boolean;
  specialFeatures?: string[];
  exteriorFinishType?: string;
  landArea?: number;
  
  // Fields for ElectriciteForm
  electricalType?: string;
  
  // Fields for EnergiesRenouvelablesForm
  renewableEnergyType?: string;
  
  // Any other fields that might be used in calculations
  [key: string]: any;
}
