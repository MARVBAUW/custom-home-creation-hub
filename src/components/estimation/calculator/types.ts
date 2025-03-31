
import { z } from 'zod';

export interface FormData {
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  companyName?: string;
  companyType?: string;
  projectSize?: string;
  projectBudget?: string;
  projectLocation?: string;
  surface?: number | string;
  terrainType?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  insulationType?: string;
  electricalType?: string;
  plumbingType?: string;
  existingSurface?: number | string;
  buildingCondition?: string;
  renovationScope?: string;
  terassementsViabilisation?: boolean | number;
  
  // Additional fields to fix missing property errors
  city?: string;
  landPrice?: number | string;
  levels?: number | string;
  finishLevel?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  kitchens?: number | string;
  livingRooms?: number | string;
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  solarPanels?: boolean;
  rainwaterHarvesting?: boolean;
  homeAutomation?: boolean;
  energyEfficiency?: boolean;
  complexity?: string;
  qualityStandard?: string;
  landIncluded?: boolean | string;
  
  // Facade percentages
  stonePercentage?: string;
  plasterPercentage?: string;
  brickPercentage?: string;
  metalCladdingPercentage?: string;
  woodCladdingPercentage?: string;
  stoneCladdingPercentage?: string;
  
  // Windows
  windowType?: string;
  windowRenovationArea?: string | number;
  windowNewArea?: string | number;
  
  // Skip navigation flag
  skipToContact?: boolean;
  
  // Montant total (total cost) used in many components
  montantT?: number;
  
  // Contact information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  
  // New fields for the forms that reported missing properties
  doorType?: string;
  finishStandard?: string;
  foundationType?: string;
  carportType?: string;
  poolType?: string;
  poolArea?: number | string;
  poolHeating?: string;
  jacuzziType?: string;
  jacuzziArea?: number | string;
  landscapingType?: string;
  landscapingArea?: number | string;
  fencingLength?: number | string;
  gateLength?: number | string;
  terraceArea?: number | string;
  roofArea?: number | string;
  roofingArea?: number | string;
  bathroomType?: string;
  bathroomCount?: number | string;
  kitchenType?: string;
  kitchenCost?: number;
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: number };
  demolitionTotalArea?: number | string;
  createWalls?: boolean;
  wallArea?: number | string;
  createFloors?: boolean;
  floorType?: string;
  floorArea?: number | string;
  structuralFeatures?: string[];
  structuralFeatureValues?: { [key: string]: number | string };
  renewableEnergyType?: string;
  environmentalSolutionType?: string;
  termsAccepted?: boolean;
  activity?: string;
  startDate?: string;
  endDate?: string;
}

export interface EstimationResponseData {
  totalAmount: number;
  categories: Array<{ name: string; amount: number }>;
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
    officialFees: number;
    inspectionFees: number;
    technicalStudies: number;
    other: number;
    total: number;
  };
  otherCosts: {
    insurance: number;
    contingency: number;
    taxes: number;
    miscellaneous: number;
    total: number;
  };
  timeline: {
    design: number;
    permits: number;
    bidding: number;
    construction: number;
    total: number;
  };
}

// Define EstimationTimeline for use in EstimationTimeline.tsx
export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}

// Add other types that might be needed in the application
