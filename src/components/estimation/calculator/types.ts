import { z } from "zod";

// Schémas Zod pour la validation des formulaires
export const ClientTypeSchema = z.object({
  clientType: z.enum(["professional", "individual"], {
    required_error: "Veuillez sélectionner votre profil",
  }),
});

export const ProfessionalProjectSchema = z.object({
  activity: z.enum(["offices", "commerce", "hotel", "restaurant", "industry", "realEstate"], {
    required_error: "Veuillez sélectionner votre activité",
  }),
  projectType: z.enum(["construction", "renovation", "extension", "optimization", "division", "design"], {
    required_error: "Veuillez sélectionner le type de projet",
  }),
  startDate: z.string({
    required_error: "Veuillez sélectionner une date de début souhaitée",
  }),
  endDate: z.string({
    required_error: "Veuillez sélectionner une date de fin souhaitée",
  }),
});

export const IndividualProjectSchema = z.object({
  projectType: z.enum(["construction", "renovation", "extension", "optimization", "division", "design"], {
    required_error: "Veuillez sélectionner le type de projet",
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

export const ConstructionDetailsSchema = z.object({
  surface: z.string().min(1, "Veuillez indiquer la surface"),
  levels: z.string().min(1, "Veuillez indiquer le nombre de niveaux"),
  units: z.string().min(1, "Veuillez indiquer le nombre de logements"),
});

export const TerrainSchema = z.object({
  terrainType: z.array(z.string()).min(1, "Veuillez sélectionner au moins un type de terrain"),
});

export const BuildingTypeSchema = z.object({
  wallType: z.enum(["brique", "parpaing", "porotherme", "pierre", "beton", "betonCellulaire", "sansAvis"], {
    required_error: "Veuillez sélectionner un type de mur",
  }),
});

export const RoofSchema = z.object({
  roofType: z.enum(["toitureAccessible", "toitureInaccessible", "charpenteIndustrielle", "charpenteTraditionnelle"], {
    required_error: "Veuillez sélectionner un type de toiture",
  }),
});

export const AtticSchema = z.object({
  atticType: z.enum(["amenageable", "perdu"], {
    required_error: "Veuillez sélectionner un type de comble",
  }),
});

export const RoofingSchema = z.object({
  roofingType: z.enum(["tuilePlate", "tuileRonde", "ardoise", "zinc", "chaume", "bacAcier", "bitume", "vegetalisee", "gravillonnee"], {
    required_error: "Veuillez sélectionner un type de couverture",
  }),
});

export const InsulationSchema = z.object({
  insulationType: z.enum(["base", "performance", "ultraPerformance", "sansAvis"], {
    required_error: "Veuillez sélectionner un type d'isolation",
  }),
});

export const FacadeSchema = z.object({
  stonePercentage: z.string().default("0"),
  plasterPercentage: z.string().default("0"),
  brickPercentage: z.string().default("0"),
  metalCladdingPercentage: z.string().default("0"),
  woodCladdingPercentage: z.string().default("0"),
  stoneCladdingPercentage: z.string().default("0"),
});

export const MenuiseriesExtSchema = z.object({
  windowType: z.string({
    required_error: "Veuillez sélectionner un type de menuiserie",
  }),
  windowRenovationArea: z.string().optional(),
  windowNewArea: z.string().optional(),
});

export const ElectricalSchema = z.object({
  electricalType: z.enum(["base", "avancee", "hautDeGamme", "domotique"], {
    required_error: "Veuillez sélectionner un type d'installation électrique",
  }),
});

export const PlumbingSchema = z.object({
  plumbingType: z.enum(["base", "avancee", "hautDeGamme"], {
    required_error: "Veuillez sélectionner un type de plomberie",
  }),
});

export const HeatingSchema = z.object({
  heatingType: z.enum(["qualitePrix", "ecologique", "economique", "sansAvis"], {
    required_error: "Veuillez sélectionner un type de chauffage",
  }),
  hasAirConditioning: z.enum(["yes", "no", "sansAvis"], {
    required_error: "Veuillez préciser si vous souhaitez une climatisation",
  }),
});

export const PlasteringSchema = z.object({
  plasteringType: z.enum(["base", "specifique", "avancee"], {
    required_error: "Veuillez sélectionner un type de plâtrerie",
  }),
});

export const InteriorDoorsSchema = z.object({
  doorType: z.enum(["base", "standard", "hautDeGamme"], {
    required_error: "Veuillez sélectionner un type de portes intérieures",
  }),
  interiorFittings: z.array(z.string()).default([]),
});

export const TilingSchema = z.object({
  floorTileType: z.enum(["base", "milieuDeGamme", "hautDeGamme", "none"], {
    required_error: "Veuillez sélectionner un type de carrelage",
  }),
  wallTileType: z.enum(["base", "milieuDeGamme", "hautDeGamme", "none"], {
    required_error: "Veuillez sélectionner un type de faïence",
  }),
  floorTilePercentage: z.string().default("0"),
});

export const ParquetSchema = z.object({
  parquetType: z.enum(["base", "milieuDeGamme", "hautDeGamme", "none"], {
    required_error: "Veuillez sélectionner un type de parquet",
  }),
  parquetPercentage: z.string().default("0"),
  softFloorType: z.enum(["base", "milieuDeGamme", "hautDeGamme", "none"], {
    required_error: "Veuillez sélectionner un type de sol souple",
  }),
  softFloorPercentage: z.string().default("0"),
});

export const PaintingSchema = z.object({
  basicPaintPercentage: z.string().default("0"),
  decorativePaintPercentage: z.string().default("0"),
  wallpaperPercentage: z.string().default("0"),
  woodCladPercentage: z.string().default("0"),
  stoneCladPercentage: z.string().default("0"),
});

export const KitchenSchema = z.object({
  kitchenType: z.enum(["none", "kitchenette", "base", "plus", "premium"], {
    required_error: "Veuillez sélectionner un type de cuisine",
  }),
});

export const BathroomSchema = z.object({
  bathroomType: z.enum(["none", "base", "milieuDeGamme", "premium"], {
    required_error: "Veuillez sélectionner un type de salle de bain",
  }),
  bathroomCount: z.string().min(1, "Veuillez indiquer le nombre de salles de bain"),
});

export const ContactSchema = z.object({
  firstName: z.string().min(1, "Veuillez indiquer votre prénom"),
  lastName: z.string().min(1, "Veuillez indiquer votre nom"),
  phone: z.string().min(10, "Veuillez indiquer un numéro de téléphone valide"),
  email: z.string().email("Veuillez indiquer un email valide"),
});

export const DemolitionSchema = z.object({
  demolitionItems: z.array(z.string()).default([]),
  facadePercentage: z.string().optional(),
  plasteringPercentage: z.string().optional(),
  flooringPercentage: z.string().optional(),
  interiorDoorsPercentage: z.string().optional(),
  windowsPercentage: z.string().optional(),
  plumbingPercentage: z.string().optional(),
  sanitaryPercentage: z.string().optional(),
  electricalPercentage: z.string().optional(),
  acPercentage: z.string().optional(),
  ventilationPercentage: z.string().optional(),
  heatingPercentage: z.string().optional(),
  entireNonStructuralPercentage: z.string().optional(),
  demolitionArea: z.string().optional(),
});

export const RenovationGrosOeuvreSchema = z.object({
  createWalls: z.enum(["oui", "non"]).default("non"),
  wallsArea: z.string().optional(),
  createFloors: z.enum(["oui", "non"]).default("non"),
  floorType: z.enum(["bois", "beton"]).optional(),
  floorArea: z.string().optional(),
  specificItems: z.array(z.string()).default([]),
  plumbingLength: z.string().optional(),
  structuralWallArea: z.string().optional(),
  ipnLength: z.string().optional(),
  wallOpeningArea: z.string().optional(),
  stairOpeningArea: z.string().optional(),
  foundationLength: z.string().optional(),
  foundationBlocks: z.string().optional(),
  screedArea: z.string().optional(),
  sewerConnectionLength: z.string().optional(),
});

export const RenovationCharpenteSchema = z.object({
  roofStructureType: z.string(),
  renovationArea: z.string(),
});

export const RenovationCouvertureSchema = z.object({
  roofCoveringType: z.string(),
  renovationArea: z.string(),
});

export const RenovationFacadeSchema = z.object({
  facadeTypes: z.array(z.string()).default([]),
  stonePercentage: z.string().optional(),
  plasterPercentage: z.string().optional(),
  brickPercentage: z.string().optional(),
  metalCladdingPercentage: z.string().optional(),
  woodCladdingPercentage: z.string().optional(),
  stoneCladdingPercentage: z.string().optional(),
});

export const AmenagementPaysagerSchema = z.object({
  landscapingType: z.array(z.string()).default([]),
  landscapingArea: z.string().optional(),
  fencingLength: z.string().optional(),
  gateLength: z.string().optional(),
  terraceArea: z.string().optional(),
  
});

export const OptionsSchema = z.object({
  carportType: z.string().optional(),
  poolType: z.string().optional(),
  poolArea: z.string().optional(),
  poolHeating: z.string().optional(),
  jacuzziType: z.string().optional(),
  jacuzziArea: z.string().optional(),
});

export const EnergiesRenouvelablesSchema = z.object({
  energyType: z.string(),
});

export const SolutionsEnvironSchema = z.object({
  solutionType: z.string(),
});

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
  terrainType: string[];
  
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
