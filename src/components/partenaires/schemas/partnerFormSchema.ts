
import { z } from 'zod';

export const partnerFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Le prénom doit contenir au moins 2 caractères'
  }),
  lastName: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères'
  }),
  company: z.string().min(2, {
    message: 'Le nom de l\'entreprise doit contenir au moins 2 caractères'
  }),
  activity: z.string().min(1, {
    message: 'Veuillez sélectionner une activité'
  }),
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide'
  }),
  phone: z.string().min(10, {
    message: 'Veuillez entrer un numéro de téléphone valide'
  }),
  message: z.string().min(10, {
    message: 'Veuillez décrire votre activité (minimum 10 caractères)'
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions'
  })
});

export type PartnerFormValues = z.infer<typeof partnerFormSchema>;
