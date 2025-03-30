
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères."
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide."
  }),
  phone: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide."
  }).optional(),
  subject: z.string().min(2, {
    message: "Veuillez sélectionner un sujet."
  }),
  message: z.string().min(10, {
    message: "Votre message doit contenir au moins 10 caractères."
  })
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
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
                <h1 class="title">Nouveau message de contact - Progineer</h1>
              </div>
              
              <div class="content">
                <p><strong>Nom:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Téléphone:</strong> ${data.phone || 'Non renseigné'}</p>
                <p><strong>Sujet:</strong> ${data.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de contact du site Progineer.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Préparer les données pour l'envoi
      const emailData = {
        to: ["progineer.moe@gmail.com"], // L'email de l'administrateur
        subject: `[Contact Progineer] ${data.subject}`,
        html: emailContent,
        from: "Formulaire de contact <noreply@progineer.fr>"
      };

      // Appeler la fonction Edge via Supabase
      const { data: responseData, error } = await supabase.functions.invoke('send-email', {
        body: emailData
      });

      if (error) {
        throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
      }

      // Envoyer également un email de confirmation au client
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
                <h1 class="title">Confirmation de votre message - Progineer</h1>
              </div>
              
              <div class="content">
                <p>Bonjour ${data.name},</p>
                <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
                <p>Un membre de notre équipe vous répondra dans les plus brefs délais.</p>
                <p>Voici un récapitulatif de votre message :</p>
                <p><strong>Sujet:</strong> ${data.subject}</p>
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

      // Envoyer l'email de confirmation au client
      const confirmationEmailData = {
        to: [data.email],
        subject: "Confirmation de votre message - Progineer",
        html: confirmationEmailContent,
        from: "Progineer <noreply@progineer.fr>"
      };

      await supabase.functions.invoke('send-email', {
        body: confirmationEmailData
      });

      setIsSuccess(true);
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais."
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

  const subjectOptions = [
    { value: "information", label: "Demande d'information" },
    { value: "devis", label: "Demande de devis" },
    { value: "rendez-vous", label: "Prise de rendez-vous" },
    { value: "reclamation", label: "Réclamation" },
    { value: "autre", label: "Autre" }
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Votre numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sujet</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjectOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Votre message..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || isSuccess} 
            className="w-full sm:w-auto px-8 text-white bg-[#767346]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Envoyé !
              </>
            ) : "Envoyer le message"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
