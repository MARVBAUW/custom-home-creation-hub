
// Re-export all types from individual files
export * from './baseTypes';
export * from './formTypes';
export * from './estimationFormData';

// Create a unified type definition to resolve incompatibilities between FormData and EstimationFormData
import { EstimationFormData as OriginalEstimationFormData, 
        EstimationResponseData as OriginalEstimationResponseData, 
        FeeCosts as OriginalFeeCosts,
        EstimationTimeline } from './estimationFormData';
import { FormData as OriginalFormData } from './formTypes';

// Create unified types that combine both versions
export interface UnifiedFormData {
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
  
  // Generated values - the critical field that's causing compatibility issues
  terassementsViabilisation?: number | string | boolean;
  montantT?: number | string;
  totalAmount?: number | string;
  budgetAvailable?: number | string;

  // Contact form specific fields
  projectPurpose?: string;
  commercialAccepted?: boolean;
  
  // Add an index signature to allow for string indexing
  [key: string]: string | number | boolean | string[] | { [key: string]: string | number } | undefined;
}

// Unified response data type
export interface UnifiedEstimationResponseData {
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
    officialFees?: number;
    inspectionFees?: number;
    technicalStudies?: number;
    other?: number;
    masterBuilderFees?: number;
    safetyCoordination?: number;
    technicalControl?: number;
    insurance?: number;
    total: number;
  };
  otherCosts: {
    insurance?: number;
    contingency?: number;
    taxes?: number;
    miscellaneous?: number;
    landRegistry?: number;
    urbanismTax?: number;
    landTax?: number;
    connectionFees?: number;
    total: number;
  };
  totalAmount: number;
  categories: Array<{ category: string; amount: number; details?: string }> | Array<{ name: string; amount: number }>;
  timeline: {
    design?: number;
    permits?: number;
    bidding?: number;
    construction?: number;
    total?: number;
    duration?: number;
    startDate?: string;
    endDate?: string;
    type?: EstimationTimeline | string;
  };
}

// Unified fee costs
export interface UnifiedFeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  // Include all possible properties as optional
  officialFees?: number;
  inspectionFees?: number;
  technicalStudies?: number;
  other?: number;
  masterBuilderFees?: number;
  safetyCoordination?: number;
  technicalControl?: number;
  insurance?: number;
  taxAndPermits?: number;
  total: number;
}

// Export the unified types to use across the codebase
export type FormData = UnifiedFormData;
export type EstimationFormData = UnifiedFormData;
export type EstimationResponseData = UnifiedEstimationResponseData;
export type FeeCosts = UnifiedFeeCosts;

// Re-export EstimationTimeline with explicit reference to avoid ambiguity
export { EstimationTimeline } from './estimationFormData';
