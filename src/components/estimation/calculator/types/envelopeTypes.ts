
import { z } from "zod";

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

export const ElectriciteSchema = z.object({
  electricalType: z.enum(["base", "advanced", "premium", "domotique"], {
    required_error: "Veuillez sélectionner un type d'installation électrique",
  }),
});

export const PlomberieSchema = z.object({
  plumbingType: z.enum(["base", "advanced", "premium"], {
    required_error: "Veuillez sélectionner un type d'installation de plomberie",
  }),
});
