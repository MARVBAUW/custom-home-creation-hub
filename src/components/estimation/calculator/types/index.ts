
// Types communs pour l'ensemble du formulaire d'estimation

export interface FormData {
  // Informations client
  clientType?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  message?: string;
  agreeTerms?: boolean;
  newsletter?: boolean;
  termsAccepted?: boolean;
  
  // Informations projet professionnel
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // Informations projet commun
  projectType?: string;
  estimationType?: string;
  surface?: number;
  levels?: number;
  units?: number;
  
  // Terrain
  terrainType?: string;
  terrainAccess?: string;
  terrainSurface?: number;
  landPrice?: number;
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
  wallType?: string;
  foundationType?: string;
  soilType?: string;
  wallThickness?: number;
  hasBasement?: boolean;
  basementType?: string;
  floorType?: string;
  slopedLand?: boolean;
  difficultAccess?: boolean;
  needsDemolition?: boolean;
  needsWaterManagement?: boolean;
  
  // Charpente et combles
  roofType?: string;
  atticType?: string;
  
  // Couverture
  roofingType?: string;
  
  // Isolation
  insulationType?: string;
  
  // Façade
  facadeMaterial?: string;
  
  // Façade rénovation
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  stoneCladPercentage?: number;
  windowRenovationArea?: number;
  
  // Menuiseries extérieures
  windowType?: string;
  shutterType?: string;
  
  // Techniques
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean | string;
  
  // Plâtrerie
  plasteringType?: string;
  
  // Menuiseries intérieures
  interiorDoorsType?: string;
  doorType?: string;
  
  // Revêtements
  tileType?: string;
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: number | string;
  parquetPercentage?: number | string;
  softFloorPercentage?: number | string;
  parquetType?: string;
  softFloorType?: string;
  flooringType?: string;
  
  // Peinture
  paintType?: string;
  basicPaintPercentage?: number | string;
  decorativePaintPercentage?: number | string;
  wallpaperPercentage?: number | string;
  woodCladPercentage?: number | string;
  stoneCladPercentage?: number | string;
  
  // Aménagements extérieurs
  gardenArea?: number;
  gardenSurface?: number;
  terrace?: boolean;
  swimmingPool?: boolean;
  garage?: boolean;
  carport?: boolean;
  driveway?: boolean;
  fence?: boolean;
  gate?: boolean;
  garden?: boolean;
  terraceType?: string;
  terraceArea?: number;
  poolType?: string;
  garageSize?: string;
  outdoorLighting?: boolean;
  irrigation?: boolean;
  outdoorKitchen?: boolean;
  pergola?: boolean;
  exteriorFeatures?: string[];

  // Pièces spécifiques
  kitchenType?: string;
  bathroomType?: string;
  bathroomCount?: string;
  
  // Options écologiques et énergies renouvelables
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Solutions environnementales
  energyType?: string;
  solutionType?: string;
  solarPanelSurface?: number;
  ecoFriendlyInsulation?: boolean;
  
  // Type de construction et finitions
  constructionType?: string;
  constructionMode?: string;
  finishLevel?: string;
  
  // Pour la rénovation
  renovationType?: string;
  renovationAreas?: string[];
  
  // Informations fiscales
  cityTaxRate?: number;
}

export * from './formTypes';
export * from './validationSchemas';
