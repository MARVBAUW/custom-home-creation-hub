
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
import { ArrowLeft, ArrowRight, Layers, BarChart } from 'lucide-react';
import { BaseFormProps } from '../types/formTypes';
import { calculateRoofingRenovCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

// Schema for the form validation
const formSchema = z.object({
  roofingType: z.enum([
    'TUILE PLATE', 
    'TUILE RONDE', 
    'ARDOISE', 
    'ZINC JOINT DEBOUT', 
    'TOIT DE CHAUME', 
    'BAC ACIER', 
    'ETANCHEITE BITUME (TOITURE PLATE)', 
    'TOITURE VEGETALISE (TOITURE PLATE)', 
    'TOITURE GRAVILLONNEE (TOITURE PLATE)', 
    'NON CONCERNE'
  ], {
    required_error: "Veuillez sélectionner un type de couverture",
  }),
  roofingArea: z.string().optional().transform(val => val === '' ? '0' : val),
});

type FormValues = z.infer<typeof formSchema>;

const CouvertureRenovForm: React.FC<BaseFormProps> = ({ 
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
      roofingType: formData.roofingType as any || undefined,
      roofingArea: formData.roofingArea ? String(formData.roofingArea) : '',
    },
  });

  // Function to handle form submission
  const onSubmit = (values: FormValues) => {
    // Calculate the cost based on the roofing type and area
    const roofingCost = calculateRoofingRenovCost(
      values.roofingType,
      values.roofingArea
    );
    
    // Update form data with values and calculated cost
    updateFormData({
      roofingType: values.roofingType,
      roofingArea: values.roofingArea,
      montantT: (formData.montantT || 0) + roofingCost,
    });
    
    // Move to next step
    goToNextStep();
  };

  // Watch the form values to update cost preview
  const watchRoofingType = form.watch('roofingType');
  const watchRoofingArea = form.watch('roofingArea');

  // Calculate the estimated cost in real-time
  const estimatedCost = React.useMemo(() => {
    if (!watchRoofingType || watchRoofingType === 'NON CONCERNE') return 0;
    return calculateRoofingRenovCost(watchRoofingType, watchRoofingArea);
  }, [watchRoofingType, watchRoofingArea]);

  // Get the price per m² based on the selected roofing type
  const getPricePerM2 = (type: string): number => {
    switch (type) {
      case 'TUILE PLATE': return 125;
      case 'TUILE RONDE': return 130;
      case 'ARDOISE': return 180;
      case 'ZINC JOINT DEBOUT': return 200;
      case 'TOIT DE CHAUME': return 250;
      case 'BAC ACIER': return 115;
      case 'ETANCHEITE BITUME (TOITURE PLATE)': return 125;
      case 'TOITURE VEGETALISE (TOITURE PLATE)': return 186;
      case 'TOITURE GRAVILLONNEE (TOITURE PLATE)': return 145;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
        <Layers className="h-6 w-6" />
        <h2>Couverture / Étanchéité (Reprise Rénovation)</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="roofingType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Type de couverture à rénover *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="TUILE PLATE" id="tuile-plate" />
                            <Label
                              htmlFor="tuile-plate"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Tuile plate
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/3faa0ac4-67a3-4bdc-88d7-0cdd0011af19/toiture_dune_maison.jpg" 
                            alt="Tuile plate" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            125 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="TUILE RONDE" id="tuile-ronde" />
                            <Label
                              htmlFor="tuile-ronde"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Tuile ronde
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/bf4955e0-2e61-44e2-954f-96fb74b88a94/images-3-.jpg" 
                            alt="Tuile ronde" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            130 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="ARDOISE" id="ardoise" />
                            <Label
                              htmlFor="ardoise"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Ardoise
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/8149bd44-67ad-46b2-832a-9f7614399bdb/telecharger-5-.jpg" 
                            alt="Ardoise" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            180 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="ZINC JOINT DEBOUT" id="zinc" />
                            <Label
                              htmlFor="zinc"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Zinc joint debout
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/a0bc6578-a067-4229-b498-ba3d9000d813/DSCN0270-scaled.jpg" 
                            alt="Zinc joint debout" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            200 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="TOIT DE CHAUME" id="chaume" />
                            <Label
                              htmlFor="chaume"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Toit de chaume
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/12152575-8de9-47c7-b7ec-e2f880a49a3f/toiture_chaume.webp" 
                            alt="Toit de chaume" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            250 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="BAC ACIER" id="bac-acier" />
                            <Label
                              htmlFor="bac-acier"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Bac acier
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/6caab145-3ae3-4a26-8e1b-c5aa22293147/bac-acier-toiture.jpg" 
                            alt="Bac acier" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            115 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="ETANCHEITE BITUME (TOITURE PLATE)" id="bitume" />
                            <Label
                              htmlFor="bitume"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Étanchéité bitume (toiture plate)
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/7e20cf08-76a7-4734-9a6f-3e3898401825/images-2-.jpg" 
                            alt="Étanchéité bitume" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            125 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="TOITURE VEGETALISE (TOITURE PLATE)" id="vegetalise" />
                            <Label
                              htmlFor="vegetalise"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Toiture végétalisée (toiture plate)
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/447602be-4e30-4349-ace1-102bb434bd01/telecharger-4-.jpg" 
                            alt="Toiture végétalisée" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            186 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="TOITURE GRAVILLONNEE (TOITURE PLATE)" id="gravillonnee" />
                            <Label
                              htmlFor="gravillonnee"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Toiture gravillonnée (toiture plate)
                            </Label>
                          </div>
                          <img 
                            src="https://storage.tally.so/e89b21f9-1a52-4ee2-9ec2-7016ff0db2c1/telecharger-3-.jpg" 
                            alt="Toiture gravillonnée" 
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <p className="text-sm text-muted-foreground">
                            145 € / m²
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                          <div className="flex items-center w-full">
                            <RadioGroupItem value="NON CONCERNE" id="non-concerne" />
                            <Label
                              htmlFor="non-concerne"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
              
              {watchRoofingType && watchRoofingType !== 'NON CONCERNE' && (
                <FormField
                  control={form.control}
                  name="roofingArea"
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
                            form.trigger('roofingArea');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {watchRoofingType && watchRoofingType !== 'NON CONCERNE' && watchRoofingArea && Number(watchRoofingArea) > 0 && (
                <div className="rounded-md bg-slate-50 p-4 mt-4">
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-amber-600" />
                    <span className="font-medium">Coût estimé: </span>
                    <span className="ml-2">
                      {estimatedCost.toLocaleString()} €
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ce montant correspond à la rénovation de {ensureNumber(watchRoofingArea, 0)} m² de {watchRoofingType.toLowerCase()} à {getPricePerM2(watchRoofingType)} € / m²
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

export default CouvertureRenovForm;
