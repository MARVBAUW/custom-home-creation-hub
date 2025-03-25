
import { z } from "zod";

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
