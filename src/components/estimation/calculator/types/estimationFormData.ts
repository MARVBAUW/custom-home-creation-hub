
export interface EstimationFormData {
  // Client type
  clientType?: string;
  
  // Project details
  projectType?: string;
  surface?: number | string;
  city?: string;
  
  // Budget
  budget?: number | string;
  
  // Terrain details
  landIncluded?: string | boolean;
  landPrice?: number | string;
  terrainType?: string;
  landType?: string;
  terrainSurface?: number | string;
  
  // Construction details
  constructionType?: string;
  levels?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  kitchens?: number | string;
  livingRooms?: number | string;
  livingRoomSize?: number | string;
  livingRoomStyle?: string;
  
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
  terrace?: boolean;
  outdoorKitchen?: boolean;
  exteriorFeatures?: string[];
  
  // Garden and landscape
  landscapingType?: string;
  gardenSurface?: number | string;
  landscapingBudget?: number | string;
  
  // Personal information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  termsAccepted?: boolean;
  
  // Additional fields for specific steps
  activity?: string;
  startDate?: string;
  endDate?: string;
  estimationType?: string;
  constructionStyle?: string;
  wallType?: string;
  foundationType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
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
  floorTileType?: string;
  floorTilePercentage?: number | string;
  wallTileType?: string;
  parquetType?: string;
  parquetPercentage?: number | string;
  softFloorType?: string;
  softFloorPercentage?: number | string;
  paintType?: string;
  basicPaintPercentage?: number | string;
  decorativePaintPercentage?: number | string;
  wallpaperPercentage?: number | string;
  
  // Project requirements
  units?: number | string;
  needsDemolition?: boolean;
  demolitionType?: string;
  existingSurface?: number | string;
  
  // Room types
  bathroomType?: string;
  kitchenType?: string;
  
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

// Pour la rétrocompatibilité
export type FormData = EstimationFormData;

// Définition de la réponse d'estimation
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
    engineeringFees?: number;
    architectFees?: number;
    officialFees?: number;
    inspectionFees?: number;
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
}

// Interface pour les options de génération PDF
export interface PDFGenerationOptions {
  includeDetails?: boolean;
  includeLogo?: boolean;
  includeContactInfo?: boolean;
  includeBreakdown?: boolean;
  includeTerrainPrice?: boolean;
  includeTimeline?: boolean;
  includeDetailedBreakdown?: boolean;
  clientInfo?: boolean;
  companyLogo?: boolean;
  fileName?: string;
}

// Pour FeeCosts qui est utilisé ailleurs
export interface FeeCosts {
  architect?: number;
  engineeringFees?: number;
  architectFees?: number;
  officialFees?: number;
  inspectionFees?: number;
  technicalStudies?: number;
  other?: number;
  total: number;
}
