
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, ArrowRightIcon } from "lucide-react";

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Le nom complet doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide."
  }),
  address: z.string().min(5, {
    message: "Veuillez entrer une adresse valide."
  }),
  companyName: z.string().optional(),
  projectType: z.enum(['residential', 'commercial', 'industrial', 'public', 'other']),
  projectDescription: z.string().min(30, {
    message: "Merci de fournir une description d'au moins 30 caractères."
  }),
  projectBudget: z.string().optional(),
  projectLocation: z.string().min(2, {
    message: "Veuillez préciser la localisation du projet."
  })
})

const ClientOnboardingForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      companyName: "",
      projectType: "residential",
      projectDescription: "",
      projectBudget: "",
      projectLocation: ""
    },
  })

  // Check if there's data from a previous estimation
  useEffect(() => {
    const estimationData = localStorage.getItem('projectEstimation');
    if (estimationData) {
      try {
        const data = JSON.parse(estimationData);
        // Pre-fill form with estimation data if available
        if (data.clientName) form.setValue('fullName', data.clientName);
        if (data.clientEmail) form.setValue('email', data.clientEmail);
        if (data.projectType) form.setValue('projectType', data.projectType);
        if (data.projectLocation) form.setValue('projectLocation', data.projectLocation);
        if (data.projectBudget) form.setValue('projectBudget', data.projectBudget.toString());
        if (data.projectDescription) form.setValue('projectDescription', data.projectDescription);
      } catch (error) {
        console.error('Error parsing estimation data:', error);
      }
    }
  }, [form]);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      toast({
        title: "Erreur de session",
        description: "Impossible de vérifier votre session",
        variant: "destructive",
      });
      return;
    }
    
    if (!sessionData.session) {
      // User is not signed in, create a new account
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: "password123", // temporary password
        options: {
          data: {
            full_name: values.fullName || '',
            phone: values.phone,
            address: values.address,
            company_name: values.companyName,
            project_type: values.projectType,
            project_description: values.projectDescription,
            project_budget: values.projectBudget,
            project_location: values.projectLocation,
            is_admin: false, // default to regular user
            registration_date: new Date().toISOString()
          }
        }
      });
      
      if (error) {
        toast({
          title: "Erreur lors de la création du compte.",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Also create a project for the new user
        if (data.user) {
          await supabase.from('client_projects').insert({
            user_id: data.user.id,
            title: `Projet ${values.projectType} - ${values.projectLocation}`,
            project_type: values.projectType === 'residential' ? 'new' : 'other',
            construction_type: values.projectType,
            description: values.projectDescription,
            location: values.projectLocation,
            budget: parseInt(values.projectBudget || '0'),
            surface: 0, // Will be updated later
            status: 'new',
            created_at: new Date().toISOString()
          });
        }
        
        toast({
          title: "Compte créé avec succès.",
          description: "Veuillez vérifier votre email pour confirmer votre compte.",
        });
        navigate("/sign-in");
      }
    } else {
      // User is already signed in, update their profile and create/update project
      const userId = sessionData.session.user.id;
      
      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          company_name: values.companyName,
          updated_at: new Date().toISOString()
        });
        
      if (profileError) {
        toast({
          title: "Erreur lors de la mise à jour du profil",
          description: profileError.message,
          variant: "destructive",
        });
        return;
      }
      
      // Check if user already has a project
      const { data: existingProjects, error: projectCheckError } = await supabase
        .from('client_projects')
        .select('id')
        .eq('user_id', userId);
        
      if (projectCheckError) {
        toast({
          title: "Erreur lors de la vérification des projets",
          description: projectCheckError.message,
          variant: "destructive",
        });
        return;
      }
      
      if (existingProjects && existingProjects.length > 0) {
        // Update existing project
        const { error: updateError } = await supabase
          .from('client_projects')
          .update({
            title: `Projet ${values.projectType} - ${values.projectLocation}`,
            project_type: values.projectType === 'residential' ? 'new' : 'other',
            construction_type: values.projectType,
            description: values.projectDescription,
            location: values.projectLocation,
            budget: parseInt(values.projectBudget || '0'),
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProjects[0].id);
          
        if (updateError) {
          toast({
            title: "Erreur lors de la mise à jour du projet",
            description: updateError.message,
            variant: "destructive",
          });
          return;
        }
      } else {
        // Create new project
        const { error: createError } = await supabase
          .from('client_projects')
          .insert({
            user_id: userId,
            title: `Projet ${values.projectType} - ${values.projectLocation}`,
            project_type: values.projectType === 'residential' ? 'new' : 'other',
            construction_type: values.projectType,
            description: values.projectDescription,
            location: values.projectLocation,
            budget: parseInt(values.projectBudget || '0'),
            surface: 0, // Will be updated later
            status: 'new',
            created_at: new Date().toISOString()
          });
          
        if (createError) {
          toast({
            title: "Erreur lors de la création du projet",
            description: createError.message,
            variant: "destructive",
          });
          return;
        }
      }
      
      toast({
        title: "Informations enregistrées avec succès",
        description: "Votre profil et projet ont été mis à jour.",
      });
      
      navigate("/workspace/client-area");
    }
  }

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-khaki-800">Créer un compte client</CardTitle>
        <CardDescription>
          Complétez le formulaire ci-dessous pour créer votre espace client et soumettre votre projet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom Complet*</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
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
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="jean.dupont@example.com" {...field} />
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
                      <FormLabel>Téléphone*</FormLabel>
                      <FormControl>
                        <Input placeholder="06 XX XX XX XX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Société (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de votre société" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Adresse*</FormLabel>
                      <FormControl>
                        <Input placeholder="123 rue de la Paix, 75000 Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium text-gray-900">Informations projet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de projet*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Résidentiel</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industriel</SelectItem>
                          <SelectItem value="public">Établissement public</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation du projet*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ville, département" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget estimé (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 150 000 €" {...field} />
                      </FormControl>
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
                    <FormLabel>Description du projet*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre projet en détail (type de construction, surface, besoins spécifiques...)" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Ces informations nous aideront à mieux comprendre vos besoins avant notre premier échange.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" className="bg-khaki-600 hover:bg-khaki-700 text-white">
                Créer un compte
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t border-gray-100 bg-gray-50 px-6 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CheckIcon className="h-4 w-4 text-green-500" />
          <span>Vos données sont protégées et utilisées uniquement pour votre projet</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ClientOnboardingForm;
