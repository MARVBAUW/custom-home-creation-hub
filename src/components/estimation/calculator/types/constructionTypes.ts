
import { z } from "zod";

export const ConstructionDetailsSchema = z.object({
  surface: z.string().min(1, "Veuillez indiquer la surface"),
  levels: z.string().min(1, "Veuillez indiquer le nombre de niveaux"),
  units: z.string().min(1, "Veuillez indiquer le nombre de logements"),
});

export const TerrainSchema = z.object({
  terrainType: z.string().min(1, "Veuillez sélectionner un type de terrain"),
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
