import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const {
    toast
  } = useToast();
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
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form data submitted:', data);
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais."
      });
      setIsSuccess(true);
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
  const subjectOptions = [{
    value: "information",
    label: "Demande d'information"
  }, {
    value: "devis",
    label: "Demande de devis"
  }, {
    value: "rendez-vous",
    label: "Prise de rendez-vous"
  }, {
    value: "reclamation",
    label: "Réclamation"
  }, {
    value: "autre",
    label: "Autre"
  }];
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField control={form.control} name="name" render={({
          field
        }) => <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <FormField control={form.control} name="email" render={({
          field
        }) => <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField control={form.control} name="phone" render={({
          field
        }) => <FormItem>
                <FormLabel>Téléphone (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Votre numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <FormField control={form.control} name="subject" render={({
          field
        }) => <FormItem>
                <FormLabel>Sujet</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjectOptions.map(option => <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />
        </div>
        
        <FormField control={form.control} name="message" render={({
        field
      }) => <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Votre message..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <div className="pt-4">
          <Button type="submit" disabled={isSubmitting || isSuccess} className="w-full sm:w-auto px-8 text-white bg-[#767346]">
            {isSubmitting ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </> : isSuccess ? <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Envoyé !
              </> : "Envoyer le message"}
          </Button>
        </div>
      </form>
    </Form>;
};
export default ContactForm;