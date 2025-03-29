
// Contains definitions for construction and terrain related steps
import { z } from "zod";

// For the Construction Extension form (page #5)
export const ConstructionExtensionSchema = z.object({
  surface: z.string().min(1, "Veuillez indiquer la surface de votre projet"),
  levels: z.string().min(1, "Veuillez indiquer le nombre de niveaux"),
  units: z.string().min(1, "Veuillez indiquer le nombre de logements"),
});

// For the Terrain form (page #6)
export const TerrainSchema = z.object({
  terrainType: z.enum([
    "ROCHEUX", 
    "ARGILEUX", 
    "PLAT", 
    "ACCIDENTE", 
    "PENTUE", 
    "VIABILISE",
    "SANS OBJET"
  ], {
    required_error: "Veuillez sélectionner un type de terrain",
  }),
});

// For the Demolition form (page #7)
export const DemolitionSchema = z.object({
  demolitionType: z.enum([
    "PAS DE DEMOLITION TERRAIN VIERGE",
    "DEMOLITION DES EXISTANTS  25%",
    "DEMOLITION DES EXISTANTS  50%",
    "DEMOLITION DES EXISTANTS  75%",
    "DEMOLITION DES EXISTANTS  100%"
  ], {
    required_error: "Veuillez sélectionner un type de démolition",
  }),
  existingSurface: z.string().optional(),
});

// For the Gros Oeuvre form (page #8)
export const GrosOeuvreSchema = z.object({
  wallType: z.enum([
    "BRIQUES",
    "PARPAING",
    "POROTHERME",
    "PIERRE",
    "BETON",
    "BETON CELLULAIRE",
    "SANS AVIS"
  ], {
    required_error: "Veuillez sélectionner un type de mur",
  }),
});

// For the Charpente form (page #9)
export const CharpenteSchema = z.object({
  roofType: z.enum([
    "TOITURE TERRASSE ACCESSIBLE",
    "TOITURE TERRASSE INACCESSIBLE",
    "CHARPENTE INDUSTRIELLE",
    "CHARPENTE TRADITIONNELLE"
  ], {
    required_error: "Veuillez sélectionner un type de charpente",
  }),
});

// For the Comble form (page #10)
export const CombleSchema = z.object({
  atticType: z.enum([
    "COMBLES AMENAGEABLES",
    "COMBLES PERDUS"
  ], {
    required_error: "Veuillez sélectionner un type de comble",
  }),
});
