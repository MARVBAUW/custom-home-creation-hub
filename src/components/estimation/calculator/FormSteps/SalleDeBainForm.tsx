
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Bath, Shower } from 'lucide-react';
import { calculateBathroomCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

// Schema for the form validation
const formSchema = z.object({
  bathroomType: z.enum(['BASE', 'MILIEU DE GAMME', 'PREMIUM', 'SANS OBJET', 'NON CONCERNE'], {
    required_error: "Veuillez sélectionner un type de salle de bain",
  }),
  bathroomCount: z.string()
    .min(1, "Veuillez indiquer le nombre de salles de bain")
    .refine((val) => !isNaN(Number(val)), {
      message: "Veuillez entrer un nombre valide",
    })
    .refine((val) => Number(val) > 0, {
      message: "Le nombre doit être supérieur à 0",
    }),
});

const SalleDeBainForm: React.FC<BaseFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep, 
  goToPreviousStep,
  animationDirection 
}) => {
  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bathroomType: formData.bathroomType || undefined,
      bathroomCount: formData.bathroomCount?.toString() || "1",
    },
  });

  // Function to handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert bathroom count to number
    const bathroomCount = ensureNumber(values.bathroomCount, 1);
    
    // Calculate the bathroom cost
    const bathroomCost = calculateBathroomCost(values.bathroomType, bathroomCount);
    
    // Update form data with values and calculated cost
    updateFormData({
      bathroomType: values.bathroomType,
      bathroomCount: bathroomCount,
      bathroomCost: bathroomCost,
    });
    
    // If bathroom type is SANS OBJET or NON CONCERNE, continue to next step
    if (values.bathroomType === 'SANS OBJET' || values.bathroomType === 'NON CONCERNE') {
      goToNextStep();
      return;
    }
    
    // Only continue if the count is valid
    if (bathroomCount > 0) {
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
        <Bath className="h-6 w-6" />
        <h2>Salles d'eau / Salles de bain</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bathroomType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Qualité des prestations *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="BASE" id="base" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="base"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Base
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Équipements standards, finitions basiques (2 000 € / salle de bain)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="MILIEU DE GAMME" id="mid" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="mid"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Milieu de gamme
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Équipements de qualité, finitions soignées (3 150 € / salle de bain)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="PREMIUM" id="premium" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="premium"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Premium
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Équipements haut de gamme, finitions luxueuses (4 200 € / salle de bain)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="SANS OBJET" id="sans" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="sans"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Sans objet
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Pas de salle de bain dans le projet
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="NON CONCERNE" id="non" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="non"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Non concerné
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Le projet n'inclut pas de travaux sur les salles de bain
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {(form.watch('bathroomType') && 
                form.watch('bathroomType') !== 'SANS OBJET' && 
                form.watch('bathroomType') !== 'NON CONCERNE') && (
                <FormField
                  control={form.control}
                  name="bathroomCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Nombre de salles de bain / douche *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="Nombre de salles de bain" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {(form.watch('bathroomType') && 
                form.watch('bathroomType') !== 'SANS OBJET' && 
                form.watch('bathroomType') !== 'NON CONCERNE' && 
                form.watch('bathroomCount')) && (
                <div className="rounded-md bg-slate-50 p-4 mt-4">
                  <div className="flex items-center">
                    <Shower className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium">Coût estimé: </span>
                    <span className="ml-2">
                      {calculateBathroomCost(
                        form.watch('bathroomType'), 
                        ensureNumber(form.watch('bathroomCount'), 1)
                      ).toLocaleString()} €
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ce montant est calculé pour {ensureNumber(form.watch('bathroomCount'), 1)} {ensureNumber(form.watch('bathroomCount'), 1) > 1 ? 'salles de bain' : 'salle de bain'}
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

export default SalleDeBainForm;
