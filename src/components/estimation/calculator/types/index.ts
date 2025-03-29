
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
  
  // Interior finishes
  plasteringType?: string;
  doorType?: string;
  flooringType?: string;
  tileSurface?: number;
  parquetSurface?: number;
  paintSurface?: number;
  
  // Exterior features
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  
  // Special features
  smartHome?: boolean;
  solarPanels?: boolean;
  fancyKitchen?: boolean;
  
  // Finishing level
  finishingLevel?: string;
  
  // Contact details
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
  termsAccepted?: boolean;
  
  // Additional properties for calculation
  niveaux?: number;
  étages?: number;
  combles?: number;
  sousSOl?: boolean;
  chambres?: number;
  sallesDeBain?: number;
  cuisine?: string;
  salon?: boolean;
  salleManger?: boolean;
  bureau?: boolean;
  fondationType?: string;
  structureMurs?: string;
  typeCouverture?: string;
  typeMenuiseries?: string;
  typeIsolation?: string;
  typeVentilation?: string;
  typeEnergie?: string;
  domotique?: boolean;
  alarme?: boolean;
  climatisation?: boolean;
  aspCentralisée?: boolean;
  terrasse?: boolean;
  balcon?: boolean;
  piscine?: boolean;
  poolHouse?: boolean;
  aménagementPaysager?: boolean;
  clôture?: boolean;
  portail?: boolean;
  carport?: boolean;
  niveauFinition?: string;
  budgetMaxi?: number;
  délaiSouhaité?: string;
  contraintesParticulières?: string;
  wallCovering?: string;
  zipCode?: string;
  timeline?: string;
  additionalDetails?: string;
  
  // Estimation type
  estimationType?: string;
}

export * from './formTypes';
export * from './clientTypes';
export * from './envelopeTypes';
export * from './constructionTypes';
export * from './roomsTypes';
export * from './interiorTypes';
export * from './specialFeaturesTypes';
export * from './renovationTypes';
export * from './validationSchemas';
export * from './baseTypes';
export * from './clientTypeForm';
