
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
  
  // Construction details
  wallType?: string;
  foundationType?: string;
  soilType?: string;
  wallThickness?: string;
  hasBasement?: boolean;
  basementType?: string;
  flooringType?: string;
  floorType?: string;
  slopedLand?: boolean;
  difficultAccess?: boolean;
  needsDemolition?: boolean;
  needsWaterManagement?: boolean;
  
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
  windowRenovationArea?: string;
  windowNewArea?: string;
  interiorDoorsType?: string;
  
  // Technical systems
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Interior finishes
  plasteringType?: string;
  floorTileType?: string;
  parquetType?: string;
  paintType?: string;
  
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
  
  // Renovation specific
  renovationType?: string;
  renovationAreas?: string[];
  
  // Additional properties
  constructionType?: string;
}
