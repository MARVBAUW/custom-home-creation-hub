
export interface FormData {
  // Client type
  clientType?: string;
  
  // Project type
  projectType?: string;
  landIncluded?: string;
  
  // Terrain details
  terrainType?: string;
  terrainSurface?: number;
  landPrice?: number;
  
  // Construction details
  constructionType?: string;
  constructionStyle?: string;
  levels?: number | string;
  surface?: number;
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
  
  // Menuiseries extérieures
  windowType?: string;
  doorType?: string;
  
  // Electricité
  electricalType?: string;
  
  // Plomberie
  plumbingType?: string;
  
  // Chauffage
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Platrerie
  plasteringType?: string;
  interiorFittings?: string;
  
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
  
  // Budget
  budget?: number;
  
  // Additional fields for calculations
  finishLevel?: string;
  hasLand?: boolean;
  
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
