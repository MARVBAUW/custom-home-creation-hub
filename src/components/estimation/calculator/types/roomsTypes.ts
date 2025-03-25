
import { z } from "zod";

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
