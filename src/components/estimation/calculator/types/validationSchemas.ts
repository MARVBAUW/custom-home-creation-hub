
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
