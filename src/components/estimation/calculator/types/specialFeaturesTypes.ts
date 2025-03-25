
import { z } from "zod";

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
