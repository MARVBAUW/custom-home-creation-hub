
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { BaseFormProps } from '../types/formTypes';
import { calculateRoofFrameworkRenovCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/montantUtils';

// Schema for the form validation
const formSchema = z.object({
  roofType: z.enum(['TOITURE TERRASSE ACCESSIBLE', 'TOITURE TERRASSE INACCESSIBLE', 'CHARPENTE INDUSTRIELLE', 'CHARPENTE TRADITIONNELLE', 'NON CONCERNE'], {
    required_error: "Veuillez sélectionner un type de charpente",
  }),
  roofArea: z.string().optional().transform(val => val === '' ? '0' : val),
});

type FormValues = z.infer<typeof formSchema>;

const CharpenteRenovForm: React.FC<BaseFormProps> = ({ 
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
      roofArea: formData.roofArea ? String(formData.roofArea) : '',
    },
  });

  // Function to handle form submission
  const onSubmit = (values: FormValues) => {
    // Calculate the cost based on the roof type and area
    const roofCost = calculateRoofFrameworkRenovCost(
      values.roofType,
      values.roofArea
    );
    
    // Update form data with values and calculated cost
    updateFormData({
      roofType: values.roofType,
      roofArea: values.roofArea,
      montantT: (formData.montantT || 0) + roofCost,
    });
    
    // Move to next step
    goToNextStep();
  };

  // Watch the form values to update cost preview
  const watchRoofType = form.watch('roofType');
  const watchRoofArea = form.watch('roofArea');

  // Calculate the estimated cost in real-time
  const estimatedCost = React.useMemo(() => {
    if (!watchRoofType || watchRoofType === 'NON CONCERNE') return 0;
    return calculateRoofFrameworkRenovCost(watchRoofType, watchRoofArea);
  }, [watchRoofType, watchRoofArea]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
        <Home className="h-6 w-6" />
        <h2>Charpente (Rénovation / Reprise)</h2>
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
                    <FormLabel className="text-base">Type de charpente à rénover *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="TOITURE TERRASSE ACCESSIBLE" id="terrasse-accessible" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="terrasse-accessible"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Toiture terrasse accessible
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/387c3e1b-17ef-4822-a53b-de5a43148e50/ABE-Etancheite-Couvertines-24.jpg" 
                                alt="Toiture terrasse accessible" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              190 € / m²
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="TOITURE TERRASSE INACCESSIBLE" id="terrasse-inaccessible" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="terrasse-inaccessible"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Toiture terrasse inaccessible
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/a3a58cb3-95d2-4edd-9ce9-65ad918abb20/images-2-.jpg" 
                                alt="Toiture terrasse inaccessible" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              180 € / m²
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="CHARPENTE INDUSTRIELLE" id="charpente-industrielle" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="charpente-industrielle"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Charpente industrielle
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/8070e55a-00c0-46ac-85f7-1c6fa6172c21/images-1-.jpg" 
                                alt="Charpente industrielle" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              160 € / m²
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="CHARPENTE TRADITIONNELLE" id="charpente-traditionnelle" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="charpente-traditionnelle"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Charpente traditionnelle
                            </Label>
                            <div className="mt-2">
                              <img 
                                src="https://storage.tally.so/09d67ffd-fe5b-47e2-aa13-18cc1ff6ad09/charpente-traditionnelle.jpg" 
                                alt="Charpente traditionnelle" 
                                className="h-24 w-auto object-cover rounded-md"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              185 € / m²
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
              
              {watchRoofType && watchRoofType !== 'NON CONCERNE' && (
                <FormField
                  control={form.control}
                  name="roofArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surface à rénover en m² *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Surface en m²"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger('roofArea');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {watchRoofType && watchRoofType !== 'NON CONCERNE' && watchRoofArea && Number(watchRoofArea) > 0 && (
                <div className="rounded-md bg-slate-50 p-4 mt-4">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-amber-600" />
                    <span className="font-medium">Coût estimé: </span>
                    <span className="ml-2">
                      {estimatedCost.toLocaleString()} €
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ce montant correspond à la rénovation de {ensureNumber(watchRoofArea)} m² de {watchRoofType.toLowerCase()}
                  </p>
                </div>
              )}
              
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

export default CharpenteRenovForm;
