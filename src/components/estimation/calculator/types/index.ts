
export interface FormData {
  // Client type
  clientType?: string;
  
  // Project type
  projectType?: string;
  landIncluded?: string;
  
  // Estimation type/mode
  estimationType?: 'simple' | 'standard' | 'detailed' | 'quick' | string;
  
  // Terrain details
  terrainType?: string;
  terrainSurface?: number;
  terrainAccess?: string; // Added terrainAccess property
  landPrice?: number;
  
  // Construction details
  constructionType?: string;
  constructionStyle?: string;
  levels?: number | string;
  surface?: number;
  floors?: number | string; // Added floors property
  basement?: boolean;
  garage?: boolean;
  bedrooms?: number;
  bathrooms?: number;
  
  // Gros oeuvre
  wallType?: string;
  foundationType?: string;
  
  // Charpente
  roofType?: string;
  
  // Combles
  atticType?: string;
  
  // Couverture
  roofingType?: string;
  
  // Isolation
  insulationType?: string;
  
  // Facade
  facadeType?: string;
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  
  // Menuiseries extérieures
  windowType?: string;
  doorType?: string;
  windowRenovationArea?: number;
  windowNewArea?: number;
  
  // Electricité
  electricalType?: string;
  
  // Plomberie
  plumbingType?: string;
  
  // Chauffage
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Platrerie
  plasteringType?: string;
  interiorFittings?: string[];
  
  // Menuiseries intérieures
  interiorDoorsType?: string;
  
  // Carrelage
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: number;
  tileSurface?: number;
  
  // Parquet
  parquetType?: string;
  parquetPercentage?: number;
  softFloorType?: string;
  softFloorPercentage?: number;
  parquetSurface?: number;
  
  // Peinture
  paintType?: string;
  basicPaintPercentage?: number;
  decorativePaintPercentage?: number;
  wallpaperPercentage?: number;
  paintSurface?: number;
  
  // Room details
  roomCount?: number;
  bathroomCount?: number;
  bathroomType?: string;
  bathroomBudget?: number;
  kitchenType?: string;
  kitchenBudget?: number;
  livingRoomSize?: number;
  livingRoomStyle?: string;
  
  // Special features
  domotic?: boolean;
  alarm?: boolean;
  centralVacuum?: boolean;
  smartHome?: boolean;
  solarPanels?: boolean;
  exteriorFeatures?: string[];
  solarPanelType?: string;
  solarPanelSurface?: number;
  windTurbineType?: string;
  
  // Eco solutions
  rainwaterHarvesting?: boolean;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  
  // Landscaping
  landscapingType?: string;
  gardenSurface?: number;
  
  // Exterior features
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  
  // Contact details
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
  termsAccepted?: boolean;
  
  // Budget
  budget?: number;
  
  // Additional fields for calculations
  finishLevel?: string;
  finishingLevel?: string;
  hasLand?: boolean;
  
  // Step navigation fields
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Professional project fields
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // French property equivalents
  // Structure
  niveaux?: number | string;
  étages?: number | string;
  combles?: string;
  sousSOl?: boolean;
  
  // Pièces
  chambres?: number;
  sallesDeBain?: number;
  cuisine?: string;
  salon?: number;
  salleManger?: boolean;
  bureau?: boolean;
  
  // Caractéristiques techniques
  structureMurs?: string;
  typeCouverture?: string;
  typeMenuiseries?: string;
  typeIsolation?: string;
  typeVentilation?: string;
  typeEnergie?: string;
  
  // Options
  domotique?: boolean;
  alarme?: boolean;
  climatisation?: boolean;
  aspCentralisée?: boolean;
  
  // Extérieur
  balcon?: boolean;
  piscine?: boolean;
  poolHouse?: boolean;
  aménagementPaysager?: boolean;
  clôture?: boolean;
  portail?: boolean;
  carport?: boolean;
  
  // Qualité et finitions
  niveauFinition?: string;
  
  // Contraintes
  budgetMaxi?: number;
  délaiSouhaité?: string;
  contraintesParticulières?: string;
}
