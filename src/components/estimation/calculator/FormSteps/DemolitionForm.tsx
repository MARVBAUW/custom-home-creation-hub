import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Hammer, HardHat, AlertTriangle } from 'lucide-react';
import { calculateDemolitionCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

// Define the checkbox items for demolition types
const demolitionTypes = [
  { id: 'noDemolition', label: 'PAS DE DEMOLITION', value: 'PAS DE DEMOLITION' },
  { id: 'grossOeuvre', label: 'GROS OEUVRE (MACONNERIE, DALLE..)', value: 'GROS OEUVRE (MACONNERIE, DALLE..)' },
  { id: 'facade', label: 'REVETEMENT DE FACADE', value: 'REVETEMENT DE FACADE' },
  { id: 'platrerie', label: 'PLATRERIE', value: 'PLATRERIE' },
  { id: 'sol', label: 'REVETEMENTS DE SOL', value: 'REVETEMENTS DE SOL' },
  { id: 'menuiseriesInt', label: 'MENUISERIES INTERIEURES', value: 'MENUISERIES INTERIEURES' },
  { id: 'menuiseriesExt', label: 'MENUISERIES EXTERIEURES', value: 'MENUISERIES EXTERIEURES' },
  { id: 'plomberie', label: 'PLOMBERIE', value: 'PLOMBERIE' },
  { id: 'sanitaire', label: 'EQUIPEMENTS SANITAIRES', value: 'EQUIPEMENTS SANITAIRES' },
  { id: 'electricite', label: 'ELECTRICITE', value: 'ELECTRICITE' },
  { id: 'clim', label: 'CLIMATISATION', value: 'CLIMATISATION' },
  { id: 'ventilation', label: 'VENTILATION', value: 'VENTILATION' },
  { id: 'chauffage', label: 'CHAUFFAGE', value: 'CHAUFFAGE' },
  { id: 'totalite', label: 'TOTALITE HORS GROS OEUVRE', value: 'TOTALITE HORS GROS OEUVRE' }
];

// Schema for the form validation
const formSchema = z.object({
  demolitionTypes: z.array(z.string()).nonempty("Veuillez sélectionner au moins une option"),
  percentages: z.record(z.string().optional()),
  totalArea: z.string().optional(),
});

const DemolitionForm: React.FC<BaseFormProps> = ({ 
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
      demolitionTypes: formData.demolitionTypes?.length 
        ? formData.demolitionTypes 
        : ['PAS DE DEMOLITION'],
      percentages: formData.demolitionPercentages || {},
      totalArea: formData.demolitionTotalArea?.toString() || "",
    },
  });

  // For checking if a demolition type is selected
  const selectedTypes = form.watch('demolitionTypes');
  
  // Function to check if "PAS DE DEMOLITION" is selected
  const isNoDemolitionSelected = selectedTypes.includes('PAS DE DEMOLITION');
  
  // Function to handle demolition type changes
  const handleDemolitionTypeChange = (checked: boolean, value: string) => {
    const currentValues = form.getValues('demolitionTypes');
    
    // Handle "PAS DE DEMOLITION" special case
    if (value === 'PAS DE DEMOLITION' && checked) {
      // If 'PAS DE DEMOLITION' is checked, uncheck all others
      form.setValue('demolitionTypes', ['PAS DE DEMOLITION']);
    } else if (checked) {
      // If any other option is checked, uncheck 'PAS DE DEMOLITION'
      const filteredValues = currentValues.filter(v => v !== 'PAS DE DEMOLITION');
      form.setValue('demolitionTypes', [...filteredValues, value]);
    } else {
      // If unchecked, simply remove the value
      form.setValue('demolitionTypes', currentValues.filter(v => v !== value));
      
      // If no options left, default to 'PAS DE DEMOLITION'
      if (form.getValues('demolitionTypes').length === 0) {
        form.setValue('demolitionTypes', ['PAS DE DEMOLITION']);
      }
    }
  };

  // Function to handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Skip calculations if 'PAS DE DEMOLITION' is selected
    if (values.demolitionTypes.includes('PAS DE DEMOLITION')) {
      updateFormData({
        demolitionTypes: values.demolitionTypes,
        demolitionPercentages: {},
        demolitionTotalArea: 0,
        demolitionCost: 0,
      });
      goToNextStep();
      return;
    }
    
    // Get the total project surface
    const projectSurface = ensureNumber(formData.surface);
    
    // Calculate the demolition cost for each selected type
    let totalDemolitionCost = 0;
    const costs: Record<string, number> = {};
    
    values.demolitionTypes.forEach(type => {
      if (type !== 'PAS DE DEMOLITION' && type !== 'TOTALITE HORS GROS OEUVRE') {
        const percentage = ensureNumber(values.percentages?.[type]);
        const cost = calculateDemolitionCost(type, projectSurface, percentage);
        costs[type] = cost;
        totalDemolitionCost += cost;
      } else if (type === 'TOTALITE HORS GROS OEUVRE') {
        const area = ensureNumber(values.totalArea);
        const cost = calculateDemolitionCost(type, area, 100); // 100% for totalite
        costs[type] = cost;
        totalDemolitionCost += cost;
      }
    });
    
    // Update form data with values and calculated cost
    updateFormData({
      demolitionTypes: values.demolitionTypes,
      demolitionPercentages: values.percentages,
      demolitionTotalArea: ensureNumber(values.totalArea),
      demolitionCost: totalDemolitionCost,
      demolitionDetailedCosts: costs,
      montantT: ensureNumber(formData.montantT) + totalDemolitionCost
    });
    
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
        <Hammer className="h-6 w-6" />
        <h2>Démolition et dépose</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-6">
                <div className="flex items-center text-amber-700 mb-2">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Instructions</h3>
                </div>
                <p className="text-sm text-amber-700">
                  Indiquez les pourcentages correspondant aux parties à démolir. Par exemple, la démolition de la moitié des revêtements de façade équivaut à 50%.
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="demolitionTypes"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Démolition / Dépose *</FormLabel>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {demolitionTypes.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="demolitionTypes"
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
                                      handleDemolitionTypeChange(!!checked, item.value);
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium">
                                    {item.label}
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
              
              {/* Show percentage inputs for selected demolition types except 'PAS DE DEMOLITION' and 'TOTALITE HORS GROS OEUVRE' */}
              {!isNoDemolitionSelected && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Proportions des existants à démolir</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedTypes.map((type) => {
                      if (type !== 'PAS DE DEMOLITION' && type !== 'TOTALITE HORS GROS OEUVRE') {
                        return (
                          <FormField
                            key={type}
                            control={form.control}
                            name={`percentages.${type}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{type} (% à démolir)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="Pourcentage (0-100)"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
              
              {/* Show total area input if 'TOTALITE HORS GROS OEUVRE' is selected */}
              {selectedTypes.includes('TOTALITE HORS GROS OEUVRE') && (
                <FormField
                  control={form.control}
                  name="totalArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surface de plancher des existants à démolir (m²)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Surface en m²"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {/* Cost calculation summary */}
              {!isNoDemolitionSelected && (
                <div className="rounded-md bg-slate-50 p-4 mt-4">
                  <div className="flex items-center">
                    <HardHat className="h-5 w-5 mr-2 text-orange-600" />
                    <span className="font-medium">Coût estimé de démolition: </span>
                  </div>
                  
                  {/* Show cost estimate for each selected type */}
                  <div className="mt-2 space-y-1">
                    {selectedTypes.map((type) => {
                      if (type !== 'PAS DE DEMOLITION') {
                        let cost = 0;
                        if (type === 'TOTALITE HORS GROS OEUVRE') {
                          const area = ensureNumber(form.watch('totalArea'));
                          cost = calculateDemolitionCost(type, area, 100);
                        } else {
                          const percentage = ensureNumber(form.watch(`percentages.${type}`));
                          cost = calculateDemolitionCost(type, ensureNumber(formData.surface), percentage);
                        }
                        return (
                          <div key={type} className="flex justify-between text-sm">
                            <span>{type}:</span>
                            <span className="font-medium">{cost.toLocaleString()} €</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                    
                    {/* Total cost */}
                    <div className="flex justify-between font-medium pt-2 border-t mt-2">
                      <span>TOTAL:</span>
                      <span className="text-primary">
                        {selectedTypes.reduce((total, type) => {
                          if (type !== 'PAS DE DEMOLITION') {
                            if (type === 'TOTALITE HORS GROS OEUVRE') {
                              const area = ensureNumber(form.watch('totalArea'));
                              return total + calculateDemolitionCost(type, area, 100);
                            } else {
                              const percentage = ensureNumber(form.watch(`percentages.${type}`));
                              return total + calculateDemolitionCost(type, ensureNumber(formData.surface), percentage);
                            }
                          }
                          return total;
                        }, 0).toLocaleString()} €
                      </span>
                    </div>
                  </div>
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

export default DemolitionForm;
