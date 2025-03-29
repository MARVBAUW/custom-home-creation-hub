
// Types génériques pour toutes les interfaces
export interface FormData {
  // Informations générales
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  termsAccepted?: boolean;
  
  // Détails du projet
  surface?: string | number;
  levels?: string;
  units?: string | number;
  roomCount?: number;
  
  // Localisation
  city?: string;
  cityTaxRate?: number;
  
  // Terrain
  terrainType?: string;
  hasLand?: boolean;
  landPrice?: number;
  landArea?: string | number;
  
  // Finition et qualité
  finishLevel?: string;
  
  // Gros œuvre
  wallType?: string;
  
  // Charpente
  roofType?: string;
  
  // Couverture
  roofingType?: string;
  
  // Isolation
  insulationType?: string;
  
  // Façade
  facadeMaterial?: string;
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
  
  // Salle de bain
  bathroomCount?: number;
  
  // Options supplémentaires
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  
  // Caractéristiques extérieures
  exteriorFeatures?: string[];
  
  // Rénovation
  renovationType?: string;
  renovationAreas?: string[];
  
  // Planning
  startDate?: string;
  endDate?: string;
  
  // Budget
  budget?: number;
  
  // Informations de contact
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  contactMethod?: string;
  
  // Autres paramètres
  [key: string]: any;
}

// Réexporter d'autres types depuis les sous-dossiers si nécessaire
export * from './validationSchemas';
