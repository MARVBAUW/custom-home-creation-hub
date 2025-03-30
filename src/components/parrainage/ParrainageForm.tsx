
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Le prénom doit contenir au moins 2 caractères'
  }),
  lastName: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères'
  }),
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide'
  }),
  phone: z.string().min(10, {
    message: 'Veuillez entrer un numéro de téléphone valide'
  }),
  referralName: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères'
  }),
  referralPhone: z.string().min(10, {
    message: 'Veuillez entrer un numéro de téléphone valide'
  }),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions'
  })
});

type FormValues = z.infer<typeof formSchema>;

const ParrainageForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      referralName: '',
      referralPhone: '',
      message: '',
      acceptTerms: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Préparer le contenu HTML de l'email
      const emailContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #f5f5f5; padding: 20px; border-bottom: 3px solid #d4af37; }
              .title { color: #d4af37; margin: 0; }
              .content { margin: 20px 0; }
              .footer { background-color: #f5f5f5; padding: 20px; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">Nouvelle demande de parrainage - Progineer</h1>
              </div>
              
              <div class="content">
                <p><strong>Parrain</strong></p>
                <p><strong>Nom:</strong> ${data.lastName}</p>
                <p><strong>Prénom:</strong> ${data.firstName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Téléphone:</strong> ${data.phone}</p>
                
                <p><strong>Filleul</strong></p>
                <p><strong>Nom:</strong> ${data.referralName}</p>
                <p><strong>Téléphone:</strong> ${data.referralPhone}</p>
                
                <p><strong>Message:</strong></p>
                <p>${data.message ? data.message.replace(/\n/g, '<br>') : 'Aucun message'}</p>
              </div>
              
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de parrainage du site Progineer.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Préparer les données pour l'envoi
      const emailData = {
        to: ["progineer.moe@gmail.com"], // L'email de l'administrateur
        subject: `[Parrainage Progineer] Nouvelle demande de ${data.firstName} ${data.lastName}`,
        html: emailContent,
        from: "Formulaire de parrainage <noreply@progineer.fr>"
      };

      // Appeler la fonction Edge via Supabase
      const { data: responseData, error } = await supabase.functions.invoke('send-email', {
        body: emailData
      });

      if (error) {
        throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
      }

      // Envoyer également un email de confirmation au parrain
      const confirmationEmailContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #f5f5f5; padding: 20px; border-bottom: 3px solid #d4af37; }
              .title { color: #d4af37; margin: 0; }
              .content { margin: 20px 0; }
              .footer { background-color: #f5f5f5; padding: 20px; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">Confirmation de votre demande de parrainage - Progineer</h1>
              </div>
              
              <div class="content">
                <p>Bonjour ${data.firstName} ${data.lastName},</p>
                <p>Nous avons bien reçu votre demande de parrainage et nous vous remercions de votre confiance.</p>
                <p>Un membre de notre équipe prendra contact rapidement avec votre filleul et vous tiendra informé de l'avancement du projet.</p>
                <p>Voici un récapitulatif de votre demande :</p>
                <p><strong>Filleul:</strong> ${data.referralName}</p>
                <p><strong>Téléphone du filleul:</strong> ${data.referralPhone}</p>
                <p>Nous vous rappelons que le parrainage vous donne droit à un bon d'achat d'une valeur de 200€ si le projet de votre filleul se concrétise avec Progineer.</p>
              </div>
              
              <div class="footer">
                <p>Cordialement,</p>
                <p>L'équipe Progineer</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Envoyer l'email de confirmation au parrain
      const confirmationEmailData = {
        to: [data.email],
        subject: "Confirmation de votre demande de parrainage - Progineer",
        html: confirmationEmailContent,
        from: "Progineer <noreply@progineer.fr>"
      };

      await supabase.functions.invoke('send-email', {
        body: confirmationEmailData
      });

      setIsSuccess(true);
      toast({
        title: "Demande envoyée",
        description: "Votre demande de parrainage a bien été envoyée. Nous vous contacterons rapidement."
      });
      form.reset();

      // Réinitialiser le succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Inscrivez-vous au programme</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre numéro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Informations sur votre filleul</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="referralName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du filleul</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de la personne référée" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="referralPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone du filleul</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro de téléphone du filleul" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (optionnel)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Informations complémentaires sur le projet de votre filleul" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    J'accepte que mes données personnelles soient traitées conformément à la politique de confidentialité.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-[#787346]"
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Demande envoyée !
              </>
            ) : "Envoyer ma demande de parrainage"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ParrainageForm;
