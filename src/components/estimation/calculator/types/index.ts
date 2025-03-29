
// Types de base pour le formulaire d'estimation
export interface FormData {
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  surfaceArea?: number;
  floors?: number;
  terrainType?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  insulationType?: string;
  facadeMaterial?: string;
  windowType?: string;
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  plasteringType?: string;
  interiorDoorsType?: string;
  flooringType?: string;
  tileType?: string;
  paintType?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  termsAccepted?: boolean;
  surface?: number;
  levels?: number;
  units?: number;
  firstName?: string;
  lastName?: string;
  activity?: string;
  startDate?: string;
  endDate?: string;
  hasAirConditioning?: boolean;
  doorType?: string;
  interiorFittings?: string[];
  floorTileType?: string;
  wallTileType?: string;
  floorTilePercentage?: number;
  parquetType?: string;
  parquetPercentage?: number;
  softFloorType?: string;
  softFloorPercentage?: number;
  basicPaintPercentage?: number;
  decorativePaintPercentage?: number;
  wallpaperPercentage?: number;
  woodCladPercentage?: number;
  stoneCladPercentage?: number;
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  windowRenovationArea?: number;
  windowNewArea?: number;
  landPrice?: number;
  city?: string;
  finishLevel?: string;
  constructionType?: string;
  constructionMode?: string;
  terrainSurface?: number;
  terrainAccess?: string;
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
  [key: string]: any;
}

// Validation schemas for form steps
import * as z from "zod";

// Schema for EstimationType form
export const EstimationTypeSchema = z.object({
  estimationType: z.string().min(1, "Veuillez sélectionner un type d'estimation"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
});

// Exporter tous les autres types depuis les fichiers individuels
export * from './formTypes';
