
import { z } from "zod";

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
