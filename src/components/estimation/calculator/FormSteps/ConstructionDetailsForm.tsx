
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BaseFormProps } from '../types';
import { ensureNumber, toFormValue } from '../utils/typeConversions';

// Define the form schema for this step
const formSchema = z.object({
  constructionType: z.string().optional(),
  constructionStyle: z.string().optional(),
  surface: z.string().min(1, "La surface est requise"),
  levels: z.string().min(1, "Le nombre de niveaux est requis"),
  bedrooms: z.string().min(1, "Le nombre de chambres est requis"),
  bathrooms: z.string().min(1, "Le nombre de salles de bain est requis"),
  basement: z.boolean().optional(),
  garage: z.boolean().optional(),
});

const ConstructionDetailsForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Create form with default values from formData
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      constructionType: formData.constructionType || "",
      constructionStyle: formData.constructionStyle || "",
      surface: toFormValue(formData.surface) || "",
      levels: toFormValue(formData.levels) || "",
      bedrooms: toFormValue(formData.bedrooms) || "",
      bathrooms: toFormValue(formData.bathrooms) || "",
      basement: formData.basement || false,
      garage: formData.garage || false,
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert string values to numbers where appropriate
    updateFormData({
      constructionType: values.constructionType,
      constructionStyle: values.constructionStyle,
      surface: ensureNumber(values.surface),
      levels: ensureNumber(values.levels),
      bedrooms: ensureNumber(values.bedrooms),
      bathrooms: ensureNumber(values.bathrooms),
      basement: values.basement,
      garage: values.garage,
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <Card className="bg-white/50 backdrop-blur transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-xl text-center">Détails de construction</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="constructionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de construction</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de construction" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="traditional">Traditionnelle</SelectItem>
                        <SelectItem value="contemporary">Contemporaine</SelectItem>
                        <SelectItem value="eco">Écologique</SelectItem>
                        <SelectItem value="modular">Modulaire</SelectItem>
                        <SelectItem value="passive">Passive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="constructionStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style architectural</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="modern">Moderne</SelectItem>
                        <SelectItem value="traditional">Traditionnel</SelectItem>
                        <SelectItem value="mediterranean">Méditerranéen</SelectItem>
                        <SelectItem value="industrial">Industriel</SelectItem>
                        <SelectItem value="minimalist">Minimaliste</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface habitable (m²)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="levels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de niveaux</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de chambres</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de salles de bain</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="basement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Sous-sol</FormLabel>
                      <FormDescription>
                        Inclure un sous-sol dans la construction
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="garage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Garage</FormLabel>
                      <FormDescription>
                        Inclure un garage dans la construction
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
              >
                Précédent
              </Button>
              <Button type="submit">Continuer</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ConstructionDetailsForm;
