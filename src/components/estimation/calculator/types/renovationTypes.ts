
import { z } from "zod";

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
