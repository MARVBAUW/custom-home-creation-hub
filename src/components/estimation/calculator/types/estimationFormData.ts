
// Define standard form data type for estimation form
export interface EstimationFormData {
  // Client information
  clientType?: 'individual' | 'professional' | string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  budget?: number | string;
  
  // Project basic information
  projectType?: 'construction' | 'renovation' | 'extension' | 'division' | string;
  projectDescription?: string;
  projectLocation?: string;
  projectDeadline?: string;
  surface?: number | string;
  levels?: number | string;
  units?: number | string;
  
  // Land information
  landOwnership?: 'owned' | 'to-purchase' | string;
  landArea?: number | string;
  landType?: string;
  landSlope?: string;
  landAccess?: string;
  landPrice?: number | string;
  
  // Construction details
  constructionType?: string;
  constructionStyle?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  basement?: boolean | string;
  garage?: boolean | string;
  atticType?: string;
  roofType?: string;
  roofArea?: number | string;
  foundationType?: string;
  landscapingType?: string | string[];
  landscapingArea?: number | string;
  fencingLength?: number | string;
  gateLength?: number | string;
  terraceArea?: number | string;
  
  // Renovation details
  renovationScope?: string;
  
  // Demolition
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: string | number };
  demolitionTotalArea?: number | string;
  
  // Structural work
  createWalls?: "OUI" | "NON" | boolean;
  wallArea?: number | string;
  createFloors?: "OUI" | "NON" | boolean;
  floorType?: "BOIS" | "BETON" | string;
  floorArea?: number | string;
  structuralFeatures?: string[];
  structuralFeatureValues?: { [key: string]: string | number };
  
  // Roof
  roofingType?: string;
  roofingArea?: number | string;
  
  // Windows and doors
  windowType?: string;
  windowRenovationArea?: number | string;
  windowNewArea?: number | string;
  
  // Plumbing
  plumbingType?: string;
  
  // Features
  hasSwimmingPool?: boolean | string;
  hasTerrace?: boolean | string;
  hasSolarPanels?: boolean | string;
  hasGeothermalEnergy?: boolean | string;
  
  // Interior details
  doorType?: string;
  interiorDoorType?: string;
  doorCount?: number | string;
  
  // Kitchen and bathroom
  bathroomType?: string;
  bathroomCount?: number | string;
  kitchenType?: string;
  kitchenCost?: number | string;
  
  // Options
  carportType?: string;
  poolType?: string;
  poolArea?: number | string;
  poolHeating?: boolean | string;
  jacuzziType?: string;
  jacuzziArea?: number | string;
  
  // Environmental features
  renewableEnergyType?: string;
  environmentalSolutionType?: string;
  
  // Finishing details
  flooringType?: string;
  wallFinishType?: string;
  ceilingFinishType?: string;
  paintType?: string;
  
  // Heating and cooling
  heatingType?: string;
  hasAirConditioning?: boolean | string;
  
  // Budget and planning
  desiredStartDate?: string;
  desiredCompletionDate?: string;
  totalBudget?: number | string;
  
  // Financing information
  financingMethod?: string;
  loanPercentage?: number | string;
  loanTerm?: number | string;
  interestRate?: number | string;
  
  // Special requests
  additionalNotes?: string;
  
  // Generated values
  terassementsViabilisation?: number | string;
  montantT?: number | string;
  totalAmount?: number | string;
  budgetAvailable?: number | string;

  // Contact form specific fields
  projectPurpose?: string;
  commercialAccepted?: boolean;
  
  // Flexible type fields for form handling
  [key: string]: string | number | boolean | string[] | { [key: string]: string | number } | undefined;
}

// Timeline for the estimation
export enum EstimationTimeline {
  Fast = 'fast',
  Standard = 'standard',
  Flexible = 'flexible'
}

// Response data from estimation calculation
export interface EstimationResponseData {
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
    masterBuilderFees?: number;
    safetyCoordination?: number;
    technicalControl?: number;
    insurance?: number;
    officialFees?: number;
    inspectionFees?: number;
    technicalStudies?: number;
    other?: number;
    total: number;
  };
  otherCosts: {
    landRegistry?: number;
    urbanismTax?: number;
    landTax?: number;
    connectionFees?: number;
    insurance?: number;
    contingency?: number;
    taxes?: number;
    miscellaneous?: number;
    total: number;
  };
  totalAmount: number;
  categories: { category: string; amount: number; details?: string }[];
  timeline: {
    duration?: number;
    startDate?: string;
    endDate?: string;
    type?: EstimationTimeline | string;
    design?: number;
    permits?: number;
    bidding?: number;
    construction?: number;
    total?: number;
  };
}

// Full data shape for form and calculation
export interface FeeCosts {
  architectFees: number;
  masterBuilderFees?: number;
  technicalStudies?: number;
  insurance?: number;
  taxAndPermits?: number;
  officialFees?: number;
  inspectionFees?: number;
  other?: number;
}

// Export FormData for backward compatibility
export type FormData = EstimationFormData;
