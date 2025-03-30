
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

type FormValues = z.infer<typeof formSchema>;

const PartnerContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      company: '',
      activity: '',
      email: '',
      phone: '',
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
                <h1 class="title">Nouvelle demande de partenariat - Progineer</h1>
              </div>
              
              <div class="content">
                <p><strong>Nom:</strong> ${data.lastName}</p>
                <p><strong>Prénom:</strong> ${data.firstName}</p>
                <p><strong>Entreprise:</strong> ${data.company}</p>
                <p><strong>Activité:</strong> ${data.activity}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Téléphone:</strong> ${data.phone}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de partenariat du site Progineer.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Préparer les données pour l'envoi
      const emailData = {
        to: ["progineer.moe@gmail.com"], // L'email de l'administrateur
        subject: `[Partenariat Progineer] Nouvelle demande de ${data.company}`,
        html: emailContent,
        from: "Formulaire de partenariat <noreply@progineer.fr>"
      };

      // Appeler la fonction Edge via Supabase
      const { data: responseData, error } = await supabase.functions.invoke('send-email', {
        body: emailData
      });

      if (error) {
        throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
      }

      // Envoyer également un email de confirmation au partenaire
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
                <h1 class="title">Confirmation de votre demande de partenariat - Progineer</h1>
              </div>
              
              <div class="content">
                <p>Bonjour ${data.firstName} ${data.lastName},</p>
                <p>Nous avons bien reçu votre demande de partenariat et nous vous remercions de l'intérêt que vous portez à Progineer.</p>
                <p>Un membre de notre équipe étudiera votre demande et vous contactera rapidement pour discuter des possibilités de collaboration.</p>
                <p>Voici un récapitulatif de votre demande :</p>
                <p><strong>Entreprise:</strong> ${data.company}</p>
                <p><strong>Activité:</strong> ${data.activity}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div class="footer">
                <p>Cordialement,</p>
                <p>L'équipe Progineer</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Envoyer l'email de confirmation au partenaire
      const confirmationEmailData = {
        to: [data.email],
        subject: "Confirmation de votre demande de partenariat - Progineer",
        html: confirmationEmailContent,
        from: "Progineer <noreply@progineer.fr>"
      };

      await supabase.functions.invoke('send-email', {
        body: confirmationEmailData
      });

      setIsSuccess(true);
      toast({
        title: "Demande envoyée",
        description: "Votre demande de partenariat a bien été envoyée. Nous vous contacterons rapidement."
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
    <div id="partner-form" className="scroll-mt-24">
      <h3 className="text-2xl font-semibold mb-6">Devenir partenaire Progineer</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de votre entreprise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activité</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre activité" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="artisan">Artisan</SelectItem>
                    <SelectItem value="entreprise">Entreprise du BTP</SelectItem>
                    <SelectItem value="architecte">Architecte / Designer</SelectItem>
                    <SelectItem value="bureau-etudes">Bureau d'études</SelectItem>
                    <SelectItem value="immobilier">Professionnel de l'immobilier</SelectItem>
                    <SelectItem value="fournisseur">Fournisseur de matériaux</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Présentez-vous et votre activité</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Parlez-nous de votre expérience, vos compétences et vos motivations pour rejoindre notre réseau." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
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
                Candidature envoyée !
              </>
            ) : "Envoyer ma candidature"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PartnerContactForm;
