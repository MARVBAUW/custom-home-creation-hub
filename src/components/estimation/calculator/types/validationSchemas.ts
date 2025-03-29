
import * as z from 'zod';

// Schema for client type selection
export const ClientTypeSchema = z.object({
  clientType: z.string().min(1, "Veuillez sélectionner un type de client"),
});

// Schema for professional project
export const ProfessionalProjectSchema = z.object({
  activity: z.string().min(1, "Veuillez sélectionner une activité"),
  projectType: z.string().min(1, "Veuillez sélectionner un type de projet"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// Schema for individual project
export const IndividualProjectSchema = z.object({
  projectType: z.string().min(1, "Veuillez sélectionner un type de projet"),
});

// Schema for estimation type
export const EstimationTypeSchema = z.object({
  estimationType: z.string().min(1, "Veuillez sélectionner un type d'estimation"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions",
  }),
});

// Schema for construction details
export const ConstructionDetailsSchema = z.object({
  surface: z.string().min(1, "Veuillez indiquer la surface"),
  levels: z.string().min(1, "Veuillez indiquer le nombre de niveaux"),
  units: z.string().min(1, "Veuillez indiquer le nombre de logements"),
});

// Schema for menuiseries exterieures
export const MenuiseriesExtSchema = z.object({
  windowType: z.string().min(1, "Veuillez sélectionner un type de menuiserie"),
  shutterType: z.string().min(1, "Veuillez sélectionner un type de volet"),
  windowRenovationArea: z.string().optional(),
  windowNewArea: z.string().optional(),
});

// Schema for plomberie
export const PlomberieSchema = z.object({
  plumbingType: z.string().min(1, "Veuillez sélectionner un type de plomberie"),
});

// Schema for terrain
export const TerrainSchema = z.object({
  terrainType: z.string().optional(),
  terrainSurface: z.string().optional(),
  landPrice: z.string().optional(),
  terrainAccess: z.string().optional(),
  waterConnection: z.boolean().optional(),
  electricityConnection: z.boolean().optional(),
  gasConnection: z.boolean().optional(),
  sewerConnection: z.boolean().optional(),
  fiberConnection: z.boolean().optional(),
  needsSepticTank: z.boolean().optional(),
  floodRisk: z.boolean().optional(),
  claySoil: z.boolean().optional(),
  rockySoil: z.boolean().optional(),
  wetlandZone: z.boolean().optional(),
  heritageZone: z.boolean().optional(),
});

// Schema for gros oeuvre
export const GrosOeuvreSchema = z.object({
  foundationType: z.string().optional(),
  soilType: z.string().optional(),
  wallType: z.string().optional(),
  wallThickness: z.string().optional(),
  hasBasement: z.boolean().optional(),
  basementType: z.string().optional(),
  floorType: z.string().optional(),
  slopedLand: z.boolean().optional(),
  difficultAccess: z.boolean().optional(),
  needsDemolition: z.boolean().optional(),
  needsWaterManagement: z.boolean().optional(),
});

// Schema for charpente
export const CharpenteSchema = z.object({
  roofType: z.string().min(1, "Veuillez sélectionner un type de toiture"),
});

// Schema for combles
export const ComblesSchema = z.object({
  atticType: z.string().min(1, "Veuillez sélectionner un type de combles"),
});

// Schema for couverture
export const CouvertureSchema = z.object({
  roofingType: z.string().min(1, "Veuillez sélectionner un type de couverture"),
});

// Schema for facade
export const FacadeSchema = z.object({
  stonePercentage: z.string().optional(),
  plasterPercentage: z.string().optional(),
  brickPercentage: z.string().optional(),
  metalCladdingPercentage: z.string().optional(),
  woodCladdingPercentage: z.string().optional(),
  stoneCladdingPercentage: z.string().optional(),
});

// Schema for isolation
export const IsolationSchema = z.object({
  insulationType: z.string().min(1, "Veuillez sélectionner un type d'isolation"),
});

// Schema for electricite
export const ElectriciteSchema = z.object({
  electricalType: z.string().min(1, "Veuillez sélectionner un type d'installation électrique"),
});

// Schema for chauffage
export const ChauffageSchema = z.object({
  heatingType: z.string().min(1, "Veuillez sélectionner un type de chauffage"),
  hasAirConditioning: z.boolean().optional(),
});

// Schema for platrerie
export const PlatrerieSchema = z.object({
  plasteringType: z.string().min(1, "Veuillez sélectionner un type de plâtrerie"),
});

// Schema for menuiseries interieures
export const MenuiseriesIntSchema = z.object({
  doorType: z.string().min(1, "Veuillez sélectionner un type de portes"),
  interiorFittings: z.array(z.string()).optional(),
});

// Schema for carrelage
export const CarrelageSchema = z.object({
  floorTileType: z.string().min(1, "Veuillez sélectionner un type de carrelage sol"),
  wallTileType: z.string().optional(),
  floorTilePercentage: z.string().optional(),
});

// Schema for parquet
export const ParquetSchema = z.object({
  parquetType: z.string().optional(),
  parquetPercentage: z.string().optional(),
  softFloorType: z.string().optional(),
  softFloorPercentage: z.string().optional(),
});

// Schema for peinture
export const PeintureSchema = z.object({
  basicPaintPercentage: z.string().optional(),
  decorativePaintPercentage: z.string().optional(),
  wallpaperPercentage: z.string().optional(),
  woodCladPercentage: z.string().optional(),
  stoneCladPercentage: z.string().optional(),
});

// Schema for amenagement exterieur
export const AmenagementExtSchema = z.object({
  landscapingType: z.string().optional(),
  gardenSurface: z.string().optional(),
  pool: z.boolean().optional(),
  outdoorKitchen: z.boolean().optional(),
  landscapingBudget: z.string().optional(),
  terrace: z.boolean().optional(),
});

// Schema for contact
export const ContactSchema = z.object({
  firstName: z.string().min(1, "Veuillez indiquer votre prénom"),
  lastName: z.string().min(1, "Veuillez indiquer votre nom"),
  email: z.string().email("Veuillez indiquer une adresse email valide"),
  phone: z.string().min(1, "Veuillez indiquer votre numéro de téléphone"),
  city: z.string().optional(),
  message: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions",
  }),
});
