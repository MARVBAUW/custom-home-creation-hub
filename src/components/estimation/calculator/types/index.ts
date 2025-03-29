
// Type principal pour les données du formulaire d'estimation
export interface FormData {
  // Type de client
  clientType?: string;
  
  // Type de projet
  projectType?: string;
  
  // Type d'estimation
  estimationType?: 'Rapide 5 mins (Précision à + ou - 10%)' | 'Précise 15 mins (précision à + ou- 5%)' | string;
  termsAccepted?: boolean;
  
  // Détails de construction
  constructionType?: string;
  constructionStyle?: string;
  surface?: number | string;
  levels?: number | string;
  units?: number | string;
  
  // Chambres et pièces
  roomCount?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  bathroomCount?: number | string;
  bathroomType?: string;
  kitchenType?: string;
  livingRoomSize?: string;
  livingRoomStyle?: string;
  
  // Caractéristiques spéciales
  basement?: boolean;
  garage?: boolean;
  
  // Terrain
  terrainType?: string;
  terrainSurface?: number | string;
  terrainAccess?: string;
  landPrice?: number | string;
  landIncluded?: string;
  hasLand?: boolean;
  
  // Démolition
  demolitionType?: string;
  existingSurface?: number | string;
  
  // Gros œuvre
  wallType?: string;
  foundationType?: string;
  
  // Charpente et couverture
  roofType?: string;
  roofingType?: string;
  
  // Combles
  atticType?: string;
  
  // Isolation et façade
  insulationType?: string;
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  
  // Menuiseries
  windowType?: string;
  windowRenovationArea?: number | string;
  windowNewArea?: number | string;
  
  // Menuiseries intérieures
  doorType?: string;
  interiorDoorsType?: string;
  
  // Équipements techniques
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Platerie
  plasteringType?: string;
  
  // Revêtements sols
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: number;
  
  // Parquet
  parquetType?: string;
  parquetPercentage?: number;
  softFloorType?: string;
  softFloorPercentage?: number;
  
  // Peinture
  paintType?: string;
  basicPaintPercentage?: number;
  decorativePaintPercentage?: number;
  wallpaperPercentage?: number;
  
  // Finitions
  finishLevel?: string;
  finishingLevel?: string;
  
  // Aménagements extérieurs
  landscapingType?: string;
  gardenSurface?: number | string;
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  exteriorFeatures?: string[];
  
  // Énergies renouvelables
  solarPanelType?: string;
  solarPanelSurface?: number | string;
  windTurbineType?: string;
  solarPanels?: boolean;
  
  // Solutions écologiques
  rainwaterHarvesting?: boolean;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  
  // Options spéciales
  domotic?: boolean;
  alarm?: boolean;
  centralVacuum?: boolean;
  smartHome?: boolean;
  
  // Options d'inclusion d'étapes
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Budget
  budget?: number | string;
  
  // Données pour les professionnels
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // Coordonnées de contact
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
}
