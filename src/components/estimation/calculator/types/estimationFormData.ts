
import { z } from "zod";

export interface EstimationFormData {
  // Client type
  clientType?: string;
  
  // Project details
  projectType?: string;
  surface?: number | string;
  city?: string;
  
  // Budget
  budget?: number | string;
  
  // Estimation type
  estimationType?: string;
  termsAccepted?: boolean;
  
  // Professional specific
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // Construction details
  constructionType?: string;
  levels?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  kitchens?: number | string;
  livingRooms?: number | string;
  livingRoomSize?: number | string;
  livingRoomStyle?: string;
  units?: number | string;
  
  // Renovation specific
  buildingCondition?: string;
  renovationScope?: string;
  
  // Terrain details
  landIncluded?: string | boolean;
  landPrice?: number | string;
  terrainType?: string;
  landType?: string;
  terrainSurface?: number | string;
  terassementsViabilisation?: number;
  viabilisation?: number;
  
  // Demolition details
  demolitionType?: string;
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: number };
  demolitionTotalArea?: number | string;
  existingSurface?: number | string;
  surfaceDemo?: number;
  demoCost?: number;
  
  // Gros oeuvre
  wallType?: string;
  foundationType?: string;
  createWalls?: boolean;
  wallArea?: number | string;
  createFloors?: boolean;
  floorType?: string;
  floorArea?: number | string;
  structuralFeatures?: string[];
  structuralFeatureValues?: { [key: string]: number | string };
  
  // Charpente
  roofType?: string;
  roofArea?: number | string;
  
  // Combles
  atticType?: string;
  
  // Couverture
  roofingType?: string;
  roofingArea?: number | string;
  
  // Amount calculations
  montantT?: number;
  
  // Special routing
  skipToContact?: boolean;
  
  // Finish details
  finishStandard?: string;
  finishingLevel?: string;
  finishLevel?: string;
  
  // Special features
  solarPanels?: boolean;
  solarPanelType?: string;
  solarPanelSurface?: number | string;
  windTurbineType?: string;
  rainwaterHarvesting?: boolean;
  homeAutomation?: boolean;
  energyEfficiency?: boolean;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Water and eco systems
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  
  // Exterior features
  pool?: boolean;
  poolType?: string;
  poolArea?: number | string;
  poolHeating?: string;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  carportType?: string;
  jacuzziType?: string;
  jacuzziArea?: number | string;
  exteriorFeatures?: string[];
  
  // Garden and landscape
  landscapingType?: string;
  landscapingArea?: number | string;
  fencingLength?: number | string;
  gateLength?: number | string;
  terraceArea?: number | string;
  gardenSurface?: number | string;
  landscapingBudget?: number | string;
  
  // Floor related properties
  floorTileType?: string;
  floorTilePercentage?: number | string;
  parquetType?: string;
  parquetPercentage?: number | string;
  softFloorType?: string;
  softFloorPercentage?: number | string;
  wallTileType?: string;
  
  // Personal information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  
  // Additional fields for specific steps
  constructionStyle?: string;
  insulationType?: string;
  
  // Facade fields
  stonePercentage?: number | string;
  plasterPercentage?: number | string;
  brickPercentage?: number | string;
  metalCladdingPercentage?: number | string;
  woodCladdingPercentage?: number | string;
  stoneCladdingPercentage?: number | string;
  
  // Windows and doors
  windowType?: string;
  windowRenovationArea?: number | string;
  windowNewArea?: number | string;
  
  // Technical systems
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Interior finishings
  plasteringType?: string;
  doorType?: string;
  interiorDoorsType?: string;
  hasMoldings?: boolean;
  hasCustomFurniture?: boolean;
  
  // Paint and wall coverings
  paintType?: string;
  basicPaintPercentage?: number | string;
  decorativePaintPercentage?: number | string;
  wallpaperPercentage?: number | string;
  woodPanelingPercentage?: number | string;
  stonePanelingPercentage?: number | string;
  paintSurface?: number | string;

  // Renewable energy
  renewableEnergyType?: string;
  
  // Environmental solutions
  environmentalSolutionType?: string;
  
  // Project requirements
  needsDemolition?: boolean;
  
  // Room types
  bathroomType?: string;
  bathroomCount?: number | string;
  kitchenType?: string;
  kitchenCost?: number;
  
  // Additional properties
  basement?: boolean;
  garage?: boolean;
  
  // Properties needed for special features
  domotic?: boolean;
  alarm?: boolean;
  centralVacuum?: boolean;
  smartHome?: boolean;
  complexity?: string;
  qualityStandard?: string;
  name?: string;
}

// For backwards compatibility, FormData is an alias of EstimationFormData
export type FormData = EstimationFormData;

// Definition of the estimation response
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
  totalAmount: number;
  timeline: {
    design: number;
    permits: number;
    bidding: number;
    construction: number;
    total: number;
  };
  categories?: Array<{ category: string; amount: number; details?: string }>;
}

// For FeeCosts used elsewhere
export interface FeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  officialFees: number;
  inspectionFees: number;
  technicalStudies: number;
  other: number;
  total: number;
}

// For Timeline
export interface EstimationTimeline {
  design: number;
  permits: number;
  bidding: number;
  construction: number;
  total: number;
}
