
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { BaseFormProps } from '../types/formTypes';

// Schema for the form validation
const formSchema = z.object({
  roofType: z.enum(['TUILES', 'ARDOISES', 'ZINC', 'BACS ACIER', 'NON CONCERNE'], {
    required_error: "Veuillez sélectionner un type de couverture",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CouvertureForm: React.FC<BaseFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep, 
  goToPreviousStep,
  animationDirection 
}) => {
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roofType: formData.roofType as any || undefined,
    },
  });

  // Function to handle form submission
  const onSubmit = (values: FormValues) => {
    // Update form data with values
    updateFormData({
      roofType: values.roofType,
    });
    
    // Move to next step
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
        <Home className="h-6 w-6" />
        <h2>Couverture</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="roofType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Type de couverture *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="TUILES" id="tuiles" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="tuiles"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Tuiles
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/c64da9c0-11bb-441a-aad3-ef7c4c62ac07/tuiles.jpg" 
                                alt="Tuiles" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Couverture traditionnelle adaptée à de nombreux styles d'architecture
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="ARDOISES" id="ardoises" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="ardoises"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Ardoises
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/22e9ed03-c32c-40af-aaec-eb5bf8ec57b5/ardoises.jpg" 
                                alt="Ardoises" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Matériau élégant et durable, adapté aux régions pluvieuses
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="ZINC" id="zinc" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="zinc"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Zinc
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/8ca09df2-cd04-4db3-9e26-a1d2fb92a0de/zinc.jpg" 
                                alt="Zinc" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Choix contemporain et tendance avec une excellente longévité
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="BACS ACIER" id="bacsacier" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="bacsacier"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Bacs acier
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/dd3acb08-7d2a-45a4-a02c-a0dcbed74fe0/bacs-acier.jpg" 
                                alt="Bacs acier" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Solution économique et rapide à installer, souvent utilisée pour des bâtiments fonctionnels
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="NON CONCERNE" id="non-concerne" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="non-concerne"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Non concerné
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Précédent
                </Button>
                <Button 
                  type="submit"
                  className="flex items-center gap-2 bg-primary"
                >
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CouvertureForm;
