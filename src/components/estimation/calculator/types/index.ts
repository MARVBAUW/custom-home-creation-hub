
import { BaseSyntheticEvent } from 'react';

// Define the EstimationResponseData interface that's missing
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

// Rename from FormData to EstimationFormData to avoid conflict with HTML's FormData
export interface EstimationFormData {
  // Client & Project Information
  clientType?: string;
  projectType?: string;
  projectPurpose?: string;
  estimationType?: string;
  activity?: string;
  landIncluded?: string;
  budget?: number | string;
  startDate?: string;
  endDate?: string;
  termsAccepted?: boolean;
  hasLand?: boolean;
  
  // Construction Details
  surface?: number | string;
  levels?: number | string;
  storyCount?: string;
  units?: number | string;
  constructionType?: string;
  constructionStyle?: string;
  gardenSurface?: number | string;
  landPrice?: number | string;
  terrainType?: string;
  terrainSurface?: number | string;
  terrainAccess?: string;
  
  // Rooms & Layout
  roomCount?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  bathroomCount?: number | string;
  bathroomType?: string;
  kitchenType?: string;
  livingRoomSize?: string;
  livingRoomStyle?: string;
  basement?: boolean;
  garage?: boolean;
  
  // Structure
  foundationType?: string;
  wallType?: string;
  wallThickness?: string;
  hasBasement?: boolean;
  basementType?: string;
  floorType?: string;
  slopedLand?: boolean;
  difficultAccess?: boolean;
  needsDemolition?: boolean;
  needsWaterManagement?: boolean;
  soilType?: string;
  
  // Roof
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  
  // Envelope
  stonePercentage?: number | string;
  plasterPercentage?: number | string;
  brickPercentage?: number | string;
  metalCladdingPercentage?: number | string;
  woodCladdingPercentage?: number | string;
  stoneCladdingPercentage?: number | string;
  
  // Windows & Doors
  windowType?: string;
  shutterType?: string;
  windowRenovationArea?: number | string;
  windowNewArea?: number | string;
  doorType?: string;
  interiorDoorsType?: string;
  interiorFittings?: string[];
  
  // Technical Systems
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  insulationType?: string;
  
  // Finishes
  plasteringType?: string;
  finishLevel?: string;
  finishingLevel?: string;
  paintType?: string;
  basicPaintPercentage?: number | string;
  decorativePaintPercentage?: number | string;
  wallpaperPercentage?: number | string;
  
  // Flooring
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: number | string;
  parquetType?: string;
  parquetPercentage?: number | string;
  softFloorType?: string;
  softFloorPercentage?: number | string;
  
  // Exterior & Landscaping
  landscapingType?: string | string[];
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  landscapingBudget?: number | string;
  
  // Special Features
  domotic?: boolean;
  alarm?: boolean;
  centralVacuum?: boolean;
  smartHome?: boolean;
  solarPanels?: boolean;
  solarPanelType?: string;
  solarPanelSurface?: number | string;
  windTurbineType?: string;
  rainwaterHarvesting?: boolean;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  exteriorFeatures?: string[];
  
  // Section Toggles
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Utilities & Connections
  waterConnection?: boolean;
  electricityConnection?: boolean;
  gasConnection?: boolean;
  sewerConnection?: boolean;
  fiberConnection?: boolean;
  needsSepticTank?: boolean;
  floodRisk?: boolean;
  claySoil?: boolean;
  rockySoil?: boolean;
  wetlandZone?: boolean;
  heritageZone?: boolean;
  
  // Contact Information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
  
  // Construction processes
  demolitionType?: string;
  existingSurface?: number | string;
  
  // Complexity
  complexity?: string;
  qualityStandard?: string;
  
  // Any additional custom fields
  [key: string]: any;
}

// Create an alias for backward compatibility
export type FormData = EstimationFormData;

// Export other types from the folder
export * from './formTypes';
export * from './conversationalTypes';
export * from './baseTypes';
