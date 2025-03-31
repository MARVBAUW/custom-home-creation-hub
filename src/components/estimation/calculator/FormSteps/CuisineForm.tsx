
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
import { ArrowLeft, ArrowRight, KitchenPot, CookingPot } from 'lucide-react';
import { calculateKitchenCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

// Schema for the form validation
const formSchema = z.object({
  kitchenType: z.enum(['KITCHENETTE', 'CUISINE DE BASE', 'CUISINE +', 'CUISINIE PREMIUM', 'SANS CUISINE'], {
    required_error: "Veuillez sélectionner un type de cuisine",
  }),
});

const CuisineForm: React.FC<BaseFormProps> = ({ 
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
      kitchenType: formData.kitchenType || undefined,
    },
  });

  // Function to handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Get the current units count (or default to 1)
    const unitCount = ensureNumber(formData.units, 1);
    
    // Calculate the kitchen cost
    const kitchenCost = calculateKitchenCost(values.kitchenType, unitCount);
    
    // Update form data with values and calculated cost
    updateFormData({
      kitchenType: values.kitchenType,
      kitchenCost: kitchenCost,
    });
    
    // If no kitchen selected, skip to the next form
    if (values.kitchenType === 'SANS CUISINE') {
      goToNextStep();
      return;
    }
    
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
        <KitchenPot className="h-6 w-6" />
        <h2>Équipement de cuisine</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="kitchenType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Type de cuisine *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="KITCHENETTE" id="kitchenette" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="kitchenette"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Kitchenette
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Petit espace cuisine, équipements basiques (2 700 €)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="CUISINE DE BASE" id="base" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="base"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Cuisine de base
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Cuisine équipée standard (8 500 €)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="CUISINE +" id="plus" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="plus"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Cuisine +
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Cuisine équipée milieu de gamme (13 500 €)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="CUISINIE PREMIUM" id="premium" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="premium"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Cuisine premium
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Cuisine équipée haut de gamme (19 000 €)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                          <RadioGroupItem value="SANS CUISINE" id="none" />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="none"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Sans cuisine
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Pas d'équipement de cuisine inclus dans le projet
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch('kitchenType') && form.watch('kitchenType') !== 'SANS CUISINE' && (
                <div className="rounded-md bg-slate-50 p-4 mt-4">
                  <div className="flex items-center">
                    <CookingPot className="h-5 w-5 mr-2 text-amber-600" />
                    <span className="font-medium">Coût estimé: </span>
                    <span className="ml-2">
                      {calculateKitchenCost(form.watch('kitchenType'), ensureNumber(formData.units, 1)).toLocaleString()} €
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ce montant est calculé pour {ensureNumber(formData.units, 1)} {ensureNumber(formData.units, 1) > 1 ? 'logements' : 'logement'}
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

export default CuisineForm;
