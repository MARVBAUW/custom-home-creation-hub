
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Here you would typically send the data to your backend

    toast({
      title: "Demande envoyée",
      description: "Votre demande de parrainage a bien été envoyée. Nous vous contacterons rapidement."
    });
    form.reset();
  };

  return <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Inscrivez-vous au programme</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="firstName" render={({
            field
          }) => <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="lastName" render={({
            field
          }) => <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="phone" render={({
            field
          }) => <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre numéro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Informations sur votre filleul</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="referralName" render={({
              field
            }) => <FormItem>
                    <FormLabel>Nom du filleul</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de la personne référée" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="referralPhone" render={({
              field
            }) => <FormItem>
                    <FormLabel>Téléphone du filleul</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro de téléphone du filleul" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>
          </div>
          
          <FormField control={form.control} name="message" render={({
          field
        }) => <FormItem>
                <FormLabel>Message (optionnel)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Informations complémentaires sur le projet de votre filleul" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <FormField control={form.control} name="acceptTerms" render={({
          field
        }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    J'accepte que mes données personnelles soient traitées conformément à la politique de confidentialité.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>} />
          
          <Button type="submit" className="w-full bg-[#787346]">
            Envoyer ma demande de parrainage
          </Button>
        </form>
      </Form>
    </div>;
};

export default ParrainageForm;
