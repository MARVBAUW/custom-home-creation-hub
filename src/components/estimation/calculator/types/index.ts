
// Main form data interface that represents all possible fields in the estimation form
export interface FormData {
  // Client information
  clientType?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  budget?: string | number;
  
  // Project details
  projectType?: string;
  estimationType?: string;
  termsAccepted?: boolean;
  surface?: string | number;
  city?: string;
  cityTaxRate?: number;
  levels?: string | number;
  roomCount?: string | number;
  units?: string | number;
  finishLevel?: string;
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // Professional project details
  professionalProjectType?: string;
  
  // Land information
  hasLand?: boolean;
  landPrice?: string | number;
  terrainType?: string;
  terrainSurface?: number; // Added missing property
  terrainAccess?: string; // Added missing property
  
  // Connections and utility services
  waterConnection?: boolean; // Added missing property
  electricityConnection?: boolean; // Added missing property
  gasConnection?: boolean; // Added missing property
  sewerConnection?: boolean; // Added missing property
  fiberConnection?: boolean; // Added missing property
  needsSepticTank?: boolean; // Added missing property
  
  // Terrain conditions
  floodRisk?: boolean; // Added missing property
  claySoil?: boolean; // Added missing property
  rockySoil?: boolean; // Added missing property
  wetlandZone?: boolean; // Added missing property
  heritageZone?: boolean; // Added missing property
  
  // Construction details
  wallType?: string;
  foundationType?: string; // Added missing property
  soilType?: string; // Added missing property
  wallThickness?: string | number; // Added missing property
  hasBasement?: boolean; // Added missing property
  basementType?: string; // Added missing property
  flooringType?: string;
  floorType?: string; // Added missing property
  slopedLand?: boolean; // Added missing property
  difficultAccess?: boolean; // Added missing property
  needsDemolition?: boolean; // Added missing property
  needsWaterManagement?: boolean; // Added missing property
  
  // Roof and structure
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  
  // Insulation and facade
  insulationType?: string;
  facadeMaterial?: string;
  
  // Windows and doors
  windowType?: string;
  shutterType?: string;
  windowRenovationArea?: string | number;
  windowNewArea?: string | number;
  interiorDoorsType?: string;
  doorType?: string; // Added missing property
  
  // Technical systems
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Interior finishes
  plasteringType?: string;
  floorTileType?: string;
  wallTileType?: string; // Added missing property
  parquetType?: string;
  paintType?: string;
  
  // Paint and finish percentages
  parquetPercentage?: number; // Added missing property
  softFloorType?: string; // Added missing property
  softFloorPercentage?: number; // Added missing property
  basicPaintPercentage?: number; // Added missing property
  decorativePaintPercentage?: number; // Added missing property
  wallpaperPercentage?: number; // Added missing property
  woodCladPercentage?: number; // Added missing property
  stoneCladPercentage?: number; // Added missing property
  metalCladdingPercentage?: number; // Added missing property
  
  // Exterior features
  landscapingType?: string;
  landscapingBudget?: string;
  exteriorFeatures?: string[];
  
  // Kitchen and bathroom
  kitchenType?: string;
  kitchenBudget?: string;
  bathroomType?: string;
  bathroomBudget?: string;
  bathroomCount?: number;
  
  // Special features
  solarPanelType?: string;
  windTurbineType?: string;
  rainwaterHarvesting?: boolean;
  greywaterRecycling?: boolean;
  pool?: boolean;
  outdoorKitchen?: boolean;
  terrace?: boolean;
  solarPanelSurface?: number;
  ecoFriendlyInsulation?: boolean;
  gardenSurface?: number;
  
  // Feature toggles
  includeEcoSolutions?: boolean; // Added missing property
  includeRenewableEnergy?: boolean; // Added missing property
  includeLandscaping?: boolean; // Added missing property
  includeOptions?: boolean; // Added missing property
  includeCuisine?: boolean; // Added missing property
  includeBathroom?: boolean; // Added missing property
  
  // Renovation specific
  renovationType?: string;
  renovationAreas?: string[];
  
  // Additional properties
  constructionType?: string;
}
