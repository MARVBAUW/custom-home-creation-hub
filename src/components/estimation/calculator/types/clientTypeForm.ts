
import { z } from "zod";

export const ClientTypeSchema = z.object({
  clientType: z.enum(["individual", "professional"], {
    required_error: "Veuillez sélectionner un type de client",
  }),
});
