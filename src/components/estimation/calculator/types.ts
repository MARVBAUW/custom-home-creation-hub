
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
  wallType: z.enum(["brick", "concrete", "stone", "cinder", "porotherm", "cellularConcrete"], {
    required_error: "Veuillez sélectionner un type de mur",
  }),
});

export const RoofSchema = z.object({
  roofType: z.enum(["accessibleTerrace", "inaccessibleTerrace", "industrialFrame", "traditionalFrame"], {
    required_error: "Veuillez sélectionner un type de toiture",
  }),
});

export const AtticSchema = z.object({
  atticType: z.enum(["convertible", "lost"], {
    required_error: "Veuillez sélectionner un type de comble",
  }),
});

export const RoofingSchema = z.object({
  roofingType: z.enum(["flatTile", "roundTile", "slate", "zinc", "thatch", "metalSheet", "bitumen", "vegetated", "gravel"], {
    required_error: "Veuillez sélectionner un type de couverture",
  }),
});

export const InsulationSchema = z.object({
  insulationType: z.enum(["basic", "performance", "ultraPerformance"], {
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

export const WindowsSchema = z.object({
  windowType: z.enum(["wood", "pvc", "aluminum", "mixedWoodAlu", "coloredPvc"], {
    required_error: "Veuillez sélectionner un type de menuiserie",
  }),
});

export const ElectricalSchema = z.object({
  electricalType: z.enum(["basic", "advanced", "highEnd", "highEndWithDomotics"], {
    required_error: "Veuillez sélectionner un type d'installation électrique",
  }),
});

export const PlumbingSchema = z.object({
  plumbingType: z.enum(["basic", "advanced", "highEnd"], {
    required_error: "Veuillez sélectionner un type de plomberie",
  }),
});

export const HeatingSchema = z.object({
  heatingType: z.enum(["bestValue", "mostEcological", "mostEconomical"], {
    required_error: "Veuillez sélectionner un type de chauffage",
  }),
  hasAirConditioning: z.enum(["yes", "no"], {
    required_error: "Veuillez préciser si vous souhaitez une climatisation",
  }),
});

export const PlasteringSchema = z.object({
  plasteringType: z.enum(["basic", "specific", "advanced"], {
    required_error: "Veuillez sélectionner un type de plâtrerie",
  }),
});

export const InteriorDoorsSchema = z.object({
  doorType: z.enum(["basic", "standard", "highEnd"], {
    required_error: "Veuillez sélectionner un type de portes intérieures",
  }),
  interiorFittings: z.array(z.string()).default([]),
});

export const TilingSchema = z.object({
  floorTileType: z.enum(["basic", "midRange", "highEnd", "none"], {
    required_error: "Veuillez sélectionner un type de carrelage",
  }),
  wallTileType: z.enum(["basic", "midRange", "highEnd", "none"], {
    required_error: "Veuillez sélectionner un type de faïence",
  }),
  floorTilePercentage: z.string().default("0"),
});

export const ParquetSchema = z.object({
  parquetType: z.enum(["basic", "midRange", "highEnd", "none"], {
    required_error: "Veuillez sélectionner un type de parquet",
  }),
  parquetPercentage: z.string().default("0"),
  softFloorType: z.enum(["basic", "midRange", "highEnd", "none"], {
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

export const RenewableEnergySchema = z.object({
  energyType: z.enum(["regulatory", "optimized", "semiAutonomous", "autonomous", "none"], {
    required_error: "Veuillez sélectionner un type d'énergie renouvelable",
  }),
});

export const EnvironmentalSolutionsSchema = z.object({
  solutionType: z.enum(["possibleInBudget", "mediumPriority", "highPriority", "none"], {
    required_error: "Veuillez sélectionner un type de solution environnementale",
  }),
});

export const LandscapingSchema = z.object({
  landscapeLevel: z.enum(["little", "much", "passionately", "none"], {
    required_error: "Veuillez sélectionner un niveau d'aménagement paysager",
  }),
  fencingLength: z.string().default("0"),
  gateLength: z.string().default("0"),
  terraceArea: z.string().default("0"),
  landscapeArea: z.string().default("0"),
});

export const OptionsSchema = z.object({
  carport: z.enum(["none", "single", "double"]).default("none"),
  pool: z.enum(["none", "polyester", "concrete", "lagoon"]).default("none"),
  poolArea: z.string().default("0"),
  poolHeating: z.enum(["yes", "no"]).default("no"),
  jacuzzi: z.enum(["none", "basic", "plus", "premium"]).default("none"),
  jacuzziArea: z.string().default("0"),
});

export const KitchenSchema = z.object({
  kitchenType: z.enum(["none", "kitchenette", "basic", "plus", "premium"], {
    required_error: "Veuillez sélectionner un type de cuisine",
  }),
});

export const BathroomSchema = z.object({
  bathroomType: z.enum(["none", "basic", "midRange", "premium"], {
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

export type EstimationStep = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  skipCondition?: (formData: any) => boolean;
};

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
  terrainType: string[];
  wallType: string;
  roofType: string;
  atticType: string;
  roofingType: string;
  insulationType: string;
  stonePercentage: string;
  plasterPercentage: string;
  brickPercentage: string;
  metalCladdingPercentage: string;
  woodCladdingPercentage: string;
  stoneCladdingPercentage: string;
  windowType: string;
  electricalType: string;
  plumbingType: string;
  heatingType: string;
  hasAirConditioning: string;
  plasteringType: string;
  doorType: string;
  interiorFittings: string[];
  floorTileType: string;
  wallTileType: string;
  floorTilePercentage: string;
  parquetType: string;
  parquetPercentage: string;
  softFloorType: string;
  softFloorPercentage: string;
  basicPaintPercentage: string;
  decorativePaintPercentage: string;
  wallpaperPercentage: string;
  woodCladPercentage: string;
  stoneCladPercentage: string;
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
  kitchenType: string;
  bathroomType: string;
  bathroomCount: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
