
import { z } from "zod";

// Schémas Zod pour la validation des formulaires de base
export const ClientTypeSchema = z.object({
  clientType: z.enum(["professional", "individual"], {
    required_error: "Veuillez sélectionner votre profil",
  }),
});

export const EstimationTypeSchema = z.object({
  estimationType: z.enum(["quick", "precise"], {
    required_error: "Veuillez sélectionner le type d'estimation",
  }),
  termsAccepted: z.boolean().refine(value => value === true, {
    message: "Vous devez accepter les conditions",
  }),
});

export const ContactSchema = z.object({
  firstName: z.string().min(1, "Veuillez indiquer votre prénom"),
  lastName: z.string().min(1, "Veuillez indiquer votre nom"),
  phone: z.string().min(10, "Veuillez indiquer un numéro de téléphone valide"),
  email: z.string().email("Veuillez indiquer un email valide"),
});

// Main FormData interface that combines all the types
export type FormData = {
  clientType: string;
  activity: string;
  projectType: string;
  startDate: string;
  endDate: string;
  estimationType: string;
  termsAccepted: boolean;
  surface: string;
  levels: string;
  units: string;
  
  // Terrain
  terrainType: string;
  
  // Construction details
  wallType: string;
  roofType: string;
  atticType: string;
  roofingType: string;
  insulationType: string;
  
  // Facade
  stonePercentage: string;
  plasterPercentage: string;
  brickPercentage: string;
  metalCladdingPercentage: string;
  woodCladdingPercentage: string;
  stoneCladdingPercentage: string;
  
  // Windows and other elements
  windowType: string;
  windowRenovationArea?: string;
  windowNewArea?: string;
  electricalType: string;
  plumbingType: string;
  heatingType: string;
  hasAirConditioning: string;
  plasteringType: string;
  doorType: string;
  interiorFittings: string[];
  
  // Flooring
  floorTileType: string;
  wallTileType: string;
  floorTilePercentage: string;
  parquetType: string;
  parquetPercentage: string;
  softFloorType: string;
  softFloorPercentage: string;
  
  // Wall coverings
  basicPaintPercentage: string;
  decorativePaintPercentage: string;
  wallpaperPercentage: string;
  woodCladPercentage: string;
  stoneCladPercentage: string;
  
  // Optional features
  energyType: string;
  solutionType: string;
  landscapeLevel: string;
  fencingLength: string;
  gateLength: string;
  terraceArea: string;
  landscapeArea: string;
  carport: string;
  pool: string;
  poolArea: string;
  poolHeating: string;
  jacuzzi: string;
  jacuzziArea: string;
  
  // Kitchen and bathroom
  kitchenType: string;
  bathroomType: string;
  bathroomCount: string;
  
  // Renovation-specific fields
  demolitionItems?: string[];
  facadePercentage?: string;
  plasteringPercentage?: string;
  flooringPercentage?: string;
  interiorDoorsPercentage?: string;
  windowsPercentage?: string;
  plumbingPercentage?: string;
  sanitaryPercentage?: string;
  electricalPercentage?: string;
  acPercentage?: string;
  ventilationPercentage?: string;
  heatingPercentage?: string;
  entireNonStructuralPercentage?: string;
  demolitionArea?: string;
  
  // Feature flags to control form flow
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  includeOptions?: boolean;
  includeLandscaping?: boolean;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  
  // Contact info
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
