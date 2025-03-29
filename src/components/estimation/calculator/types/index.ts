
import { z } from "zod";
import { RoofingSchema, InsulationSchema, FacadeSchema, MenuiseriesExtSchema } from "./envelopeTypes";

// Forme interface for base form data
export interface FormData {
  clientType?: string;
  projectType?: string;
  landIncluded?: string;
  
  // Professional project fields
  activity?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  
  // Construction details
  constructionStyle?: string;
  constructionType?: string;
  landSurface?: number;
  livingArea?: number;
  floors?: number;
  basement?: boolean;
  garage?: boolean;
  floorCount?: number;
  
  // Rooms
  bedrooms?: number;
  bathrooms?: number;
  
  // Wall & Foundation
  wallType?: string;
  foundationType?: string;
  
  // Roof
  roofType?: string;
  atticType?: string;
  
  // Envelope details
  roofingType?: string;
  insulationType?: string;
  facadeType?: string;
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  windowType?: string;
  windowRenovationArea?: number;
  windowNewArea?: number;
  
  // Technical systems
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Interior finishes
  plasteringType?: string;
  doorType?: string;
  flooringType?: string;
  tileSurface?: number;
  parquetSurface?: number;
  paintSurface?: number;
  interiorDoorsType?: string;
  interiorFittings?: string;
  
  // Floor and Wall tiles
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: number;
  
  // Parquet and soft floors
  parquetType?: string;
  parquetPercentage?: number;
  softFloorType?: string;
  softFloorPercentage?: number;
  
  // Paint and wall coverings
  paintType?: string;
  basicPaintPercentage?: number;
  decorativePaintPercentage?: number;
  wallpaperPercentage?: number;
  wallCovering?: string;
  
  // Exterior features
  pool?: boolean;
  terrace?: boolean;
  terrasse?: boolean; // French variant
  outdoorKitchen?: boolean;
  
  // Special features
  smartHome?: boolean;
  solarPanels?: boolean;
  solarPanelType?: string;
  solarPanelSurface?: number;
  windTurbineType?: string;
  fancyKitchen?: boolean;
  rainwaterHarvesting?: boolean;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  
  // Landscaping
  landscapingType?: string;
  gardenSurface?: number;
  exteriorFeatures?: string[];
  
  // Room details
  roomCount?: number;
  bathroomCount?: number;
  bathroomType?: string;
  kitchenType?: string;
  bathroomBudget?: number | string;
  kitchenBudget?: number | string;
  
  // Step control flags
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Finish level
  finishingLevel?: string;
  finishLevel?: string; // Alias pour finishingLevel pour compatibilité
  
  // Terrain details
  terrainType?: string;
  terrainSurface?: number;
  hasLand?: boolean;
  landPrice?: number;
  
  // Building details
  levels?: number;
  niveaux?: number; // French variant
  étages?: number; // French variant
  combles?: number | boolean;
  sousSOl?: boolean;
  surface?: number | string;
  
  // Contact details
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
  termsAccepted?: boolean;
  zipCode?: string;
  timeline?: string;
  additionalDetails?: string;
  
  // Estimation type
  estimationType?: string;
  
  // French variants for rooms
  chambres?: number;
  sallesDeBain?: number;
  cuisine?: string;
  salon?: boolean;
  salleManger?: boolean;
  bureau?: boolean;
  
  // French variants for technical details
  fondationType?: string;
  structureMurs?: string;
  typeCouverture?: string;
  typeMenuiseries?: string;
  typeIsolation?: string;
  typeVentilation?: string;
  typeEnergie?: string;
  
  // French variants for equipment
  domotique?: boolean;
  alarme?: boolean;
  climatisation?: boolean;
  aspCentralisée?: boolean;
  
  // French variants for exterior
  balcon?: boolean;
  piscine?: boolean;
  poolHouse?: boolean;
  aménagementPaysager?: boolean;
  clôture?: boolean;
  portail?: boolean;
  carport?: boolean;
  
  // French variants for finishing
  niveauFinition?: string;
  
  // French variants for client preferences
  budgetMaxi?: number;
  délaiSouhaité?: string;
  contraintesParticulières?: string;
}

export * from './formTypes';
export * from './clientTypes';
export * from './envelopeTypes';
export * from './constructionTypes';
export * from './roomsTypes';
export * from './interiorTypes';
export * from './specialFeaturesTypes';
export * from './renovationTypes';
export * from './baseTypes';
export * from './clientTypeForm';

// Re-export validation schemas without causing ambiguity
import * as ValidationSchemas from './validationSchemas';
export { ValidationSchemas };
