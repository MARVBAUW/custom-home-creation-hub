
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: 'Veuillez sélectionner un sujet' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
  consent: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter la politique de confidentialité'
  })
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    }
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Appel à la fonction Edge de Supabase
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });
      
      if (error) throw error;
      
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et vous contacterons rapidement.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6">Nous contacter</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom et prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Téléphone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="06 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Sujet */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sujet <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="devis">Demande de devis</SelectItem>
                      <SelectItem value="information">Renseignements</SelectItem>
                      <SelectItem value="rendez-vous">Prise de rendez-vous</SelectItem>
                      <SelectItem value="autre">Autre demande</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea 
                    rows={5}
                    placeholder="Décrivez votre projet ou votre demande..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Consentement */}
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    J'accepte que mes données soient traitées conformément à la <a href="/privacy-policy" className="text-khaki-600 hover:underline">politique de confidentialité</a> de Progineer. <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full justify-center bg-khaki-700 hover:bg-khaki-800 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              'Envoyer ma demande'
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            * Champs obligatoires
          </p>
        </form>
      </Form>
      
      {/* Alternative Contact Methods */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-medium mb-4">Autres moyens de nous contacter</h4>
        <div className="space-y-4">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-khaki-600 mr-3" />
            <a href="tel:+33783762156" className="text-gray-700 hover:text-khaki-600 transition-colors">
              +33 7 83 76 21 56
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-khaki-600 mr-3" />
            <a href="mailto:progineer.moe@gmail.com" className="text-gray-700 hover:text-khaki-600 transition-colors">
              progineer.moe@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
