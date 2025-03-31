
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
  budget?: number;
  
  // Project basic information
  projectType?: 'construction' | 'renovation' | 'extension' | 'division' | string;
  projectDescription?: string;
  projectLocation?: string;
  projectDeadline?: string;
  surface?: number;
  levels?: number;
  units?: number;
  
  // Land information
  landOwnership?: 'owned' | 'to-purchase' | string;
  landArea?: number;
  landType?: string;
  landSlope?: string;
  landAccess?: string;
  landPrice?: number;
  
  // Construction details
  constructionType?: string;
  constructionStyle?: string;
  bedrooms?: number;
  bathrooms?: number;
  basement?: boolean;
  garage?: boolean;
  atticType?: string;
  roofType?: string;
  roofArea?: number;
  foundationType?: string;
  landscapingType?: string | string[];
  landscapingArea?: number;
  fencingLength?: number;
  gateLength?: number;
  terraceArea?: number;
  
  // Renovation details
  renovationScope?: string;
  
  // Demolition
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: string };
  demolitionTotalArea?: number;
  
  // Structural work
  createWalls?: "OUI" | "NON";
  wallArea?: number;
  createFloors?: "OUI" | "NON";
  floorType?: "BOIS" | "BETON";
  floorArea?: number;
  structuralFeatures?: string[];
  structuralFeatureValues?: { [key: string]: string };
  
  // Roof
  roofingType?: string;
  roofingArea?: number;
  
  // Windows and doors
  windowType?: string;
  windowRenovationArea?: number;
  windowNewArea?: number;
  
  // Plumbing
  plumbingType?: string;
  
  // Features
  hasSwimmingPool?: boolean;
  hasTerrace?: boolean;
  hasSolarPanels?: boolean;
  hasGeothermalEnergy?: boolean;
  
  // Interior details
  doorType?: string;
  interiorDoorType?: string;
  doorCount?: number;
  
  // Kitchen and bathroom
  bathroomType?: string;
  bathroomCount?: number;
  kitchenType?: string;
  kitchenCost?: number;
  
  // Options
  carportType?: string;
  poolType?: string;
  poolArea?: number;
  poolHeating?: boolean;
  jacuzziType?: string;
  jacuzziArea?: number;
  
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
  hasAirConditioning?: boolean;
  
  // Budget and planning
  desiredStartDate?: string;
  desiredCompletionDate?: string;
  totalBudget?: number;
  
  // Financing information
  financingMethod?: string;
  loanPercentage?: number;
  loanTerm?: number;
  interestRate?: number;
  
  // Special requests
  additionalNotes?: string;
  
  // Generated values
  terassementsViabilisation?: number;
  montantT?: number;
  totalAmount?: number;
  budgetAvailable?: number;
  
  // Additional fields for compatibility (can be boolean or number)
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
    masterBuilderFees: number;
    safetyCoordination: number;
    technicalControl: number;
    insurance: number;
    total: number;
  };
  otherCosts: {
    landRegistry: number;
    urbanismTax: number;
    landTax: number;
    connectionFees: number;
    total: number;
  };
  totalAmount: number;
  categories: { category: string; amount: number; details?: string }[];
  timeline: {
    duration: number;
    startDate?: string;
    endDate?: string;
    type: EstimationTimeline;
  };
}

// Full data shape for form and calculation
export interface FeeCosts {
  architectFees: number;
  masterBuilderFees: number;
  technicalStudies: number;
  insurance: number;
  taxAndPermits: number;
}

// Export type aliases for backward compatibility
export type FormData = EstimationFormData;
