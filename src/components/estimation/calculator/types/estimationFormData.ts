
export interface EstimationFormData {
  // Client type
  clientType?: string;
  
  // Project details
  projectType?: string;
  surface?: number;
  city?: string;
  
  // Budget
  budget?: number;
  
  // Terrain details
  landIncluded?: string;
  landPrice?: number;
  terrainType?: string;
  landType?: string;
  
  // Construction details
  constructionType?: string;
  levels?: number;
  bedrooms?: number;
  bathrooms?: number;
  kitchens?: number;
  livingRooms?: number;
  
  // Finish details
  finishStandard?: string;
  
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
  
  // Exterior features
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  exteriorFeatures?: string[];
  
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
  
  // Landscaping fields
  landscapingType?: string;
  gardenSurface?: number | string;
  landscapingBudget?: number | string;
  
  // Renewable energy fields
  
  // Eco-friendly features
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  
  // Additional properties for specific project types
  needsDemolition?: boolean;
  demolitionType?: string;
  units?: number;
  terrainSurface?: number | string;
  livingRoomSize?: number | string;
  livingRoomStyle?: string;
  finishingLevel?: string;
  bathroomType?: string;
  kitchenType?: string;
  
  // Additional properties
  basement?: boolean;
  garage?: boolean;
}

// For backward compatibility, create an alias
export type FormData = EstimationFormData;
