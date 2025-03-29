
export * from './formTypes';

// Define all the properties that can be part of the form data
export interface FormData {
  // Client information
  clientType?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  message?: string;
  firstName?: string;
  lastName?: string;
  
  // Project details
  projectType?: string;
  activity?: string;
  startDate?: string;
  endDate?: string;
  estimationType?: string;
  termsAccepted?: boolean;
  landIncluded?: string; // Added this property for terrain inclusion
  
  // Construction details
  surface?: string | number;
  levels?: string | number;
  units?: string | number;
  roomCount?: string | number;
  city?: string;
  
  // Terrain
  terrainType?: string;
  terrainSurface?: string | number;
  terrainAccess?: string;
  landPrice?: string | number;
  hasLand?: boolean;
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
  
  // Gros oeuvre
  foundationType?: string;
  soilType?: string;
  wallType?: string;
  wallThickness?: string | number;
  hasBasement?: boolean;
  basementType?: string;
  floorType?: string;
  slopedLand?: boolean;
  difficultAccess?: boolean;
  needsDemolition?: boolean;
  needsWaterManagement?: boolean;
  
  // Charpente
  roofType?: string;
  
  // Combles
  atticType?: string;
  
  // Couverture
  roofingType?: string;
  
  // Façade
  facadeMaterial?: string;
  stonePercentage?: string | number;
  plasterPercentage?: string | number;
  brickPercentage?: string | number;
  metalCladdingPercentage?: string | number;
  woodCladdingPercentage?: string | number;
  stoneCladdingPercentage?: string | number;
  
  // Menuiseries extérieures
  windowType?: string;
  shutterType?: string;
  windowRenovationArea?: string | number;
  windowNewArea?: string | number;
  
  // Isolation
  insulationType?: string;
  
  // Électricité
  electricalType?: string;
  
  // Plomberie
  plumbingType?: string;
  
  // Chauffage et climatisation
  heatingType?: string;
  energySource?: string;
  hasAirConditioning?: boolean;
  
  // Plâtrerie
  plasteringType?: string;
  
  // Menuiseries intérieures
  doorType?: string;
  interiorDoorsType?: string;
  interiorFittings?: string | string[];
  
  // Carrelage
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: string | number;
  
  // Parquet
  parquetType?: string;
  parquetPercentage?: string | number;
  softFloorType?: string;
  softFloorPercentage?: string | number;
  flooringType?: string;
  
  // Peinture
  paintType?: string;
  basicPaintPercentage?: string | number;
  decorativePaintPercentage?: string | number;
  wallpaperPercentage?: string | number;
  woodCladPercentage?: string | number;
  stoneCladPercentage?: string | number;
  
  // Cuisine et salle de bain
  kitchenType?: string;
  kitchenBudget?: string | number;
  bathroomType?: string;
  bathroomBudget?: string | number;
  bathroomCount?: number;
  
  // Features
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  
  // Special features
  solarPanelType?: string;
  solarPanelSurface?: string | number;
  rainwaterHarvesting?: boolean;
  ecoFriendlyInsulation?: boolean;
  gardenSurface?: string | number;
  pool?: boolean;
  landscapingType?: string;
  landscapingBudget?: string | number;
  outdoorKitchen?: boolean;
  windTurbineType?: string;
  greywaterRecycling?: boolean;
  terrace?: boolean;
  
  // Other
  finishLevel?: string;
  budget?: string | number;
  renovationType?: string;
  renovationAreas?: string[];
  exteriorFeatures?: string[];
  constructionType?: string;
  cityTaxRate?: number;
}
