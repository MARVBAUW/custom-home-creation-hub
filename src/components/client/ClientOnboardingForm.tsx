
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface OnboardingFormValues {
  projectName: string;
  projectType: string;
  budget: string;
  projectLocation: string;
  projectStartDate: string;
  projectDescription: string;
  preferredCommunication: string;
}

const ClientOnboardingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<OnboardingFormValues>({
    defaultValues: {
      projectName: '',
      projectType: 'construction',
      budget: '',
      projectLocation: '',
      projectStartDate: '',
      projectDescription: '',
      preferredCommunication: 'email'
    }
  });

  const onSubmit = async (data: OnboardingFormValues) => {
    if (!user) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour continuer.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Store client preferences in Supabase profile
      const { error } = await supabase
        .from('profiles')
        .update({
          project_details: {
            name: data.projectName,
            type: data.projectType,
            budget: data.budget,
            location: data.projectLocation,
            start_date: data.projectStartDate,
            description: data.projectDescription,
            preferred_communication: data.preferredCommunication
          },
          onboarding_completed: true
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Informations enregistrées",
        description: "Votre profil a été mis à jour avec succès.",
      });
      
      // Redirect to client dashboard
      navigate('/workspace/client-area');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de vos informations.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Quelques informations sur votre projet</h2>
      <p className="text-gray-600 mb-6">
        Ces informations nous aideront à mieux comprendre votre projet et à vous fournir un accompagnement personnalisé.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du projet</FormLabel>
                  <FormControl>
                    <Input placeholder="Ma nouvelle maison" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de projet</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type de projet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="construction">Construction neuve</SelectItem>
                      <SelectItem value="renovation">Rénovation</SelectItem>
                      <SelectItem value="extension">Extension</SelectItem>
                      <SelectItem value="amenagement">Aménagement intérieur</SelectItem>
                      <SelectItem value="commercial">Projet commercial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget estimé (€)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="150000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Budget approximatif pour votre projet
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localisation du projet</FormLabel>
                  <FormControl>
                    <Input placeholder="Ville ou code postal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début souhaitée</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredCommunication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode de communication préféré</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre préférence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Téléphone</SelectItem>
                      <SelectItem value="in-person">Rendez-vous en personne</SelectItem>
                      <SelectItem value="video">Visioconférence</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description du projet</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Décrivez brièvement votre projet, vos besoins et vos attentes..." 
                    className="h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-khaki-600 hover:bg-khaki-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer et continuer'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientOnboardingForm;
