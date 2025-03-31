
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
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Building, Warehouse, Construction } from 'lucide-react';
import { 
  calculateMasonryWallCost, 
  calculateFloorCost, 
  calculateStructuralFeatureCost 
} from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

// Define specific features checkboxes
const specificFeatures = [
  { id: 'reseaux', label: 'RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE', value: 'RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE', unit: 'ml' },
  { id: 'demol', label: 'DEMOLITION MUR PORTEUR', value: 'DEMOLITION MUR PORTEUR', unit: 'm²' },
  { id: 'ipn', label: 'POSE D\'UN IPN', value: 'POSE D\'UN IPN', unit: 'ml' },
  { id: 'ouverture', label: 'OUVERTURE EN FACADE/MUR PORTEUR', value: 'OUVERTURE EN FACADE/MUR PORTEUR', unit: 'm²' },
  { id: 'tremie', label: 'CREATION D\'UNE TREMIE* (ouverture dans un plancher pour accéder à un étage supérieur)', value: 'CREATION D\'UNE TREMIE* (ouverture dans un plancher pour accéder à un étage supérieur)', unit: 'm²' },
  { id: 'semelle', label: 'FONDATION SEMELLE', value: 'FONDATION SEMELLE', unit: 'ml' },
  { id: 'massif', label: 'FONDATION MASSIF', value: 'FONDATION MASSIF', unit: 'nombre' },
  { id: 'chape', label: 'CHAPE', value: 'CHAPE', unit: 'm²' },
  { id: 'raccordement', label: 'RACCORDEMENT SANTAIRE RESEAU URBAIN', value: 'RACCORDEMENT SANTAIRE RESEAU URBAIN', unit: 'ml' }
];

// Schema for the form validation
const formSchema = z.object({
  createWalls: z.enum(['OUI', 'NON'], {
    required_error: "Veuillez sélectionner une option",
  }),
  wallArea: z.string().optional(),
  createFloors: z.enum(['OUI', 'NON'], {
    required_error: "Veuillez sélectionner une option",
  }),
  floorType: z.enum(['BOIS', 'BETON'], {
    required_error: "Veuillez sélectionner un type de plancher",
  }).optional(),
  floorArea: z.string().optional(),
  specificFeatures: z.array(z.string()),
  featureValues: z.record(z.string().optional()),
});

const GrosOeuvreRenovForm: React.FC<BaseFormProps> = ({ 
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
      createWalls: formData.createWalls || 'NON',
      wallArea: formData.wallArea?.toString() || "",
      createFloors: formData.createFloors || 'NON',
      floorType: formData.floorType || undefined,
      floorArea: formData.floorArea?.toString() || "",
      specificFeatures: formData.structuralFeatures || [],
      featureValues: formData.structuralFeatureValues || {},
    },
  });

  // Watch form values for conditional rendering
  const createWalls = form.watch('createWalls');
  const createFloors = form.watch('createFloors');
  const selectedFeatures = form.watch('specificFeatures');

  // Function to handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Calculate masonry wall cost
    let wallCost = 0;
    if (values.createWalls === 'OUI') {
      const wallArea = ensureNumber(values.wallArea, 0);
      wallCost = calculateMasonryWallCost(wallArea);
    }
    
    // Calculate floor cost
    let floorCost = 0;
    if (values.createFloors === 'OUI' && values.floorType) {
      const floorArea = ensureNumber(values.floorArea, 0);
      floorCost = calculateFloorCost(values.floorType, floorArea);
    }
    
    // Calculate specific features costs
    let featuresTotal = 0;
    const featureCosts: Record<string, number> = {};
    
    values.specificFeatures.forEach(feature => {
      const value = ensureNumber(values.featureValues?.[feature], 0);
      const cost = calculateStructuralFeatureCost(feature, value);
      featureCosts[feature] = cost;
      featuresTotal += cost;
    });
    
    // Calculate total cost
    const totalCost = wallCost + floorCost + featuresTotal;
    
    // Update form data with values and calculated costs
    updateFormData({
      createWalls: values.createWalls,
      wallArea: ensureNumber(values.wallArea, 0),
      wallCost: wallCost,
      createFloors: values.createFloors,
      floorType: values.floorType,
      floorArea: ensureNumber(values.floorArea, 0),
      floorCost: floorCost,
      structuralFeatures: values.specificFeatures,
      structuralFeatureValues: values.featureValues,
      structuralFeatureCosts: featureCosts,
      structuralFeaturesTotal: featuresTotal,
      structuralWorkTotal: totalCost,
    });
    
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
        <Building className="h-6 w-6" />
        <h2>Gros Œuvre</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Masonry walls section */}
              <FormField
                control={form.control}
                name="createWalls"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Y a-t-il des murs maçonnés à créer/recréer ? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="OUI" id="oui-walls" />
                          <Label htmlFor="oui-walls">OUI</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="NON" id="non-walls" />
                          <Label htmlFor="non-walls">NON</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Wall area input if OUI is selected */}
              {createWalls === 'OUI' && (
                <FormField
                  control={form.control}
                  name="wallArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surface (m²)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Surface en m²"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      
                      {/* Show cost estimate */}
                      {field.value && Number(field.value) > 0 && (
                        <div className="text-sm mt-2 font-medium text-primary">
                          Coût estimé: {calculateMasonryWallCost(Number(field.value)).toLocaleString()} €
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              )}
              
              <Separator className="my-4" />
              
              {/* Floors section */}
              <FormField
                control={form.control}
                name="createFloors"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Y a-t-il des planchers à créer/recréer ? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="OUI" id="oui-floors" />
                          <Label htmlFor="oui-floors">OUI</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="NON" id="non-floors" />
                          <Label htmlFor="non-floors">NON</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Floor type and area inputs if OUI is selected */}
              {createFloors === 'OUI' && (
                <>
                  <FormField
                    control={form.control}
                    name="floorType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base">Type de plancher *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="BOIS" id="bois" />
                              <Label htmlFor="bois">BOIS</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="BETON" id="beton" />
                              <Label htmlFor="beton">BETON</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="floorArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surface (m²)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Surface en m²"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        
                        {/* Show cost estimate */}
                        {field.value && Number(field.value) > 0 && form.watch('floorType') && (
                          <div className="text-sm mt-2 font-medium text-primary">
                            Coût estimé: {calculateFloorCost(form.watch('floorType') as string, Number(field.value)).toLocaleString()} €
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              <Separator className="my-4" />
              
              {/* Specific features section */}
              <FormField
                control={form.control}
                name="specificFeatures"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Spécificités</FormLabel>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {specificFeatures.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="specificFeatures"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.value)}
                                    onCheckedChange={(checked) => {
                                      const newValues = checked
                                        ? [...field.value, item.value]
                                        : field.value?.filter(
                                            (value) => value !== item.value
                                          );
                                      field.onChange(newValues);
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium">
                                    {item.label} ({item.unit})
                                  </FormLabel>
                                </div>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Show inputs for the selected features */}
              {selectedFeatures.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Détails des spécificités</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFeatures.map((feature) => {
                      const featureInfo = specificFeatures.find(item => item.value === feature);
                      return (
                        <FormField
                          key={feature}
                          control={form.control}
                          name={`featureValues.${feature}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {featureInfo?.label} ({featureInfo?.unit})
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder={`Valeur en ${featureInfo?.unit}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                              
                              {/* Show cost estimate */}
                              {field.value && Number(field.value) > 0 && (
                                <div className="text-sm mt-2 font-medium text-primary">
                                  Coût estimé: {calculateStructuralFeatureCost(feature, Number(field.value)).toLocaleString()} €
                                </div>
                              )}
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Cost calculation summary */}
              <div className="rounded-md bg-slate-50 p-4 mt-4">
                <div className="flex items-center">
                  <Warehouse className="h-5 w-5 mr-2 text-amber-600" />
                  <span className="font-medium">Coût estimé des travaux de gros œuvre: </span>
                </div>
                
                <div className="mt-2 space-y-1">
                  {/* Masonry walls cost */}
                  {createWalls === 'OUI' && (
                    <div className="flex justify-between text-sm">
                      <span>Murs maçonnés:</span>
                      <span className="font-medium">
                        {calculateMasonryWallCost(ensureNumber(form.watch('wallArea'), 0)).toLocaleString()} €
                      </span>
                    </div>
                  )}
                  
                  {/* Floor cost */}
                  {createFloors === 'OUI' && form.watch('floorType') && (
                    <div className="flex justify-between text-sm">
                      <span>Planchers {form.watch('floorType')}:</span>
                      <span className="font-medium">
                        {calculateFloorCost(
                          form.watch('floorType') as string,
                          ensureNumber(form.watch('floorArea'), 0)
                        ).toLocaleString()} €
                      </span>
                    </div>
                  )}
                  
                  {/* Specific features costs */}
                  {selectedFeatures.map((feature) => {
                    const value = ensureNumber(form.watch(`featureValues.${feature}`), 0);
                    if (value > 0) {
                      const featureInfo = specificFeatures.find(item => item.value === feature);
                      return (
                        <div key={feature} className="flex justify-between text-sm">
                          <span>{featureInfo?.label}:</span>
                          <span className="font-medium">
                            {calculateStructuralFeatureCost(feature, value).toLocaleString()} €
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  
                  {/* Total cost */}
                  <div className="flex justify-between font-medium pt-2 border-t mt-2">
                    <span>TOTAL:</span>
                    <span className="text-primary">
                      {(
                        // Masonry walls cost
                        (createWalls === 'OUI' 
                          ? calculateMasonryWallCost(ensureNumber(form.watch('wallArea'), 0)) 
                          : 0) +
                        // Floor cost
                        (createFloors === 'OUI' && form.watch('floorType')
                          ? calculateFloorCost(
                              form.watch('floorType') as string,
                              ensureNumber(form.watch('floorArea'), 0)
                            )
                          : 0) +
                        // Specific features costs
                        selectedFeatures.reduce((total, feature) => {
                          const value = ensureNumber(form.watch(`featureValues.${feature}`), 0);
                          return total + calculateStructuralFeatureCost(feature, value);
                        }, 0)
                      ).toLocaleString()} €
                    </span>
                  </div>
                </div>
              </div>
              
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

export default GrosOeuvreRenovForm;
