
// Types génériques pour toutes les interfaces
export interface FormData {
  // Informations générales
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  termsAccepted?: boolean;
  
  // Détails du projet
  surface?: string | number;
  levels?: string | number;
  units?: string | number;
  roomCount?: string | number;
  
  // Localisation
  city?: string;
  cityTaxRate?: number;
  
  // Terrain
  terrainType?: string;
  hasLand?: boolean;
  landPrice?: number | string;
  landArea?: string | number;
  
  // Finition et qualité
  finishLevel?: string;
  
  // Gros œuvre
  wallType?: string;
  foundationType?: string;
  soilType?: string;
  wallThickness?: number | string;
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
  
  // Isolation
  insulationType?: string;
  ecoFriendlyInsulation?: boolean;
  
  // Façade
  facadeMaterial?: string;
  facadeType?: string;
  metalCladdingPercentage?: string | number;
  woodCladdingPercentage?: string | number;
  stoneCladdingPercentage?: string | number;
  
  // Menuiseries extérieures
  windowType?: string;
  shutterType?: string;
  windowRenovationArea?: string | number;
  windowNewArea?: string | number;
  
  // Électricité
  electricalType?: string;
  
  // Plomberie
  plumbingType?: string;
  
  // Chauffage
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Plâtrerie
  plasteringType?: string;
  
  // Menuiseries intérieures
  doorType?: string;
  interiorDoorsType?: string;
  interiorFittings?: string;
  
  // Revêtements de sol
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: string | number;
  flooringType?: string;
  
  // Parquet
  parquetType?: string;
  softFloorType?: string;
  parquetPercentage?: string | number;
  softFloorPercentage?: string | number;
  
  // Peinture
  paintType?: string;
  basicPaintPercentage?: string | number;
  decorativePaintPercentage?: string | number;
  wallpaperPercentage?: string | number;
  woodCladPercentage?: string | number;
  stoneCladPercentage?: string | number;
  
  // Cuisine
  kitchenType?: string;
  kitchenBudget?: string;
  
  // Salle de bain
  bathroomCount?: number | string;
  bathroomType?: string;
  bathroomBudget?: string;
  
  // Environnement et énergies renouvelables
  solarPanelType?: string;
  windTurbineType?: string;
  solarPanelSurface?: number | string;
  rainwaterHarvesting?: boolean;
  greywaterRecycling?: boolean;
  
  // Aménagement paysager
  landscapingType?: string;
  landscapingBudget?: string;
  gardenSurface?: string | number;
  
  // Options supplémentaires
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  pool?: boolean;
  outdoorKitchen?: boolean;
  terrace?: boolean;
  
  // Caractéristiques extérieures
  exteriorFeatures?: string[];
  
  // Rénovation
  renovationType?: string;
  renovationAreas?: string[];
  
  // Construction
  constructionType?: string;
  
  // Planning
  startDate?: string;
  endDate?: string;
  
  // Budget
  budget?: number | string;
  
  // Informations de contact
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  contactMethod?: string;
  message?: string;
  
  // Autres paramètres
  [key: string]: any;
}

// Réexporter d'autres types depuis les sous-dossiers si nécessaire
export * from './validationSchemas';
