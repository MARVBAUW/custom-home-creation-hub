
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';
import { useToast } from '@/components/ui/use-toast';

const FacadeRenovSchema = z.object({
  selectedFacades: z.array(z.string()).min(1, "Veuillez sélectionner au moins un type de façade").optional(),
  stonePercentage: z.string().optional(),
  plasterPercentage: z.string().optional(),
  brickPercentage: z.string().optional(),
  metalCladdingPercentage: z.string().optional(),
  woodCladdingPercentage: z.string().optional(),
  stoneCladdingPercentage: z.string().optional(),
});

type FacadeRenovFormProps = {
  defaultValues: Record<string, any>;
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const FacadeRenovForm: React.FC<FacadeRenovFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(FacadeRenovSchema),
    defaultValues: {
      selectedFacades: [],
      stonePercentage: "0",
      plasterPercentage: "0",
      brickPercentage: "0",
      metalCladdingPercentage: "0",
      woodCladdingPercentage: "0",
      stoneCladdingPercentage: "0",
      ...defaultValues
    },
  });

  const { watch, setValue } = form;
  const selectedFacades = watch("selectedFacades") || [];
  
  const facadeOptions = [
    {
      id: "pierre",
      label: "Pierre nue",
      description: "Façade en pierre naturelle apparente",
      image: "https://storage.tally.so/37123883-d433-48b2-876c-07b6c94edf49/CAUSSE-BEIGE-NUANCE-PDC14.jpg",
      percentageField: "stonePercentage"
    },
    {
      id: "enduit",
      label: "Enduit",
      description: "Façade enduite (crépi, enduit minéral, etc.)",
      image: "https://storage.tally.so/24c780b0-4d68-4fcd-b532-7ce875336243/telecharger-6-.jpg",
      percentageField: "plasterPercentage"
    },
    {
      id: "brique",
      label: "Brique",
      description: "Façade en briques apparentes",
      image: "https://storage.tally.so/91cc1e41-c3ed-43ff-ac2a-844410bb03a3/f9603eac22a9b56431e028f84d372db0.jpg",
      percentageField: "brickPercentage"
    },
    {
      id: "bardageMetal",
      label: "Bardage métallique",
      description: "Façade avec bardage en métal",
      image: "https://storage.tally.so/1c52325e-6481-4609-9828-8c21aed781ba/nettoyage-bardage.jpg",
      percentageField: "metalCladdingPercentage"
    },
    {
      id: "bardageBois",
      label: "Bardage bois",
      description: "Façade avec bardage en bois",
      image: "https://storage.tally.so/daf60556-0c23-449b-9c48-93c575c29571/b46141e05a7f311427c245c34828bb78.jpg",
      percentageField: "woodCladdingPercentage"
    },
    {
      id: "bardagePierre",
      label: "Bardage pierre",
      description: "Façade avec bardage en pierre",
      image: "https://storage.tally.so/a23bd194-7aa2-4ad4-acf6-ce5c25f1e10b/Photo-facade-pierres-naturelles-64-MEDIATEQUE-MOURENX-vetisol.jpg",
      percentageField: "stoneCladdingPercentage"
    },
    {
      id: "nonConcerne",
      label: "Non concerné",
      description: "Aucune rénovation de façade nécessaire"
    }
  ];

  // Vérifier si la somme des pourcentages est égale à 100
  const validateTotal = () => {
    // Si "Non concerné" est sélectionné, pas besoin de vérifier la somme
    if (selectedFacades.includes("nonConcerne")) {
      return true;
    }
    
    let total = 0;
    
    selectedFacades.forEach(facade => {
      const option = facadeOptions.find(opt => opt.id === facade);
      if (option && option.percentageField) {
        const percentageValue = form.getValues(option.percentageField as any);
        total += parseFloat(percentageValue) || 0;
      }
    });
    
    return total === 100;
  };

  // Gérer la soumission du formulaire avec validation des pourcentages
  const handleSubmit = (data: any) => {
    if (!validateTotal()) {
      toast({
        title: "Erreur de validation",
        description: "La somme des pourcentages doit être égale à 100%",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({
      selectedFacades: data.selectedFacades,
      stonePercentage: data.stonePercentage,
      plasterPercentage: data.plasterPercentage,
      brickPercentage: data.brickPercentage,
      metalCladdingPercentage: data.metalCladdingPercentage,
      woodCladdingPercentage: data.woodCladdingPercentage,
      stoneCladdingPercentage: data.stoneCladdingPercentage,
    });
  };

  // Réinitialiser les pourcentages lorsque les options sont désélectionnées
  useEffect(() => {
    facadeOptions.forEach(option => {
      if (option.percentageField && !selectedFacades.includes(option.id)) {
        setValue(option.percentageField as any, "0");
      }
    });
    
    // Si "Non concerné" est sélectionné, déselectionner les autres options
    if (selectedFacades.includes("nonConcerne") && selectedFacades.length > 1) {
      setValue("selectedFacades", ["nonConcerne"]);
    }
  }, [selectedFacades, setValue]);

  return (
    <motion.div
      key="step-facade-renov"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Grid className="mr-2 text-progineer-gold" />
            Rénovation de façade
          </h2>
          
          <p className="text-sm text-muted-foreground">
            Indiquez les pourcentages correspondant aux parties à rénover, par exemple : rénover la moitié des façades en enduit équivaut à 50%.
          </p>
          
          <FormField
            control={form.control}
            name="selectedFacades"
            render={() => (
              <FormItem className="space-y-6">
                <FormLabel className="text-base">Sélectionnez les types de façade à rénover</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {facadeOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="selectedFacades"
                      render={({ field }) => (
                        <FormItem
                          key={option.id}
                          className={`border rounded-lg p-4 hover:border-gray-300 transition-all ${option.id === 'nonConcerne' ? 'md:col-span-3' : ''}`}
                        >
                          <div className="flex flex-col items-center space-y-3">
                            {option.image && (
                              <div className="w-full h-40 rounded-md overflow-hidden">
                                <img 
                                  src={option.image} 
                                  alt={option.label} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="text-center">
                              <div className="text-base font-medium">
                                {option.label}
                              </div>
                              {option.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {option.description}
                                </p>
                              )}
                            </div>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    let updatedValue = [];
                                    if (option.id === "nonConcerne" && checked) {
                                      updatedValue = ["nonConcerne"];
                                    } else {
                                      updatedValue = checked
                                        ? [...(field.value || []).filter(id => id !== "nonConcerne"), option.id]
                                        : (field.value || []).filter(
                                            (value) => value !== option.id
                                          );
                                    }
                                    field.onChange(updatedValue);
                                  }}
                                />
                                <FormLabel className="text-sm">Inclure</FormLabel>
                              </div>
                            </FormControl>
                            
                            {field.value?.includes(option.id) && option.percentageField && (
                              <FormField
                                control={form.control}
                                name={option.percentageField as any}
                                render={({ field }) => (
                                  <FormItem className="mt-2 w-full">
                                    <div className="flex items-center space-x-2">
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="number"
                                          min="0"
                                          max="100"
                                          placeholder="0"
                                          className="w-24"
                                        />
                                      </FormControl>
                                      <span>%</span>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {selectedFacades.length > 0 && !selectedFacades.includes("nonConcerne") && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Répartition des façades à rénover</h3>
              <p className="text-sm text-muted-foreground mb-2">
                La somme des pourcentages doit être égale à 100%. 
                Chaque valeur représente le pourcentage de la façade à rénover avec ce matériau.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                {selectedFacades.map(facadeId => {
                  const option = facadeOptions.find(opt => opt.id === facadeId);
                  if (!option || !option.percentageField) return null;
                  const percentage = form.watch(option.percentageField as any);
                  return (
                    <div key={facadeId} className="flex items-center justify-between">
                      <span className="text-sm">{option.label}:</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between md:col-span-3 border-t pt-2 mt-2">
                  <span className="font-medium">Total:</span>
                  <span className={`font-medium ${validateTotal() ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedFacades.reduce((total, facadeId) => {
                      const option = facadeOptions.find(opt => opt.id === facadeId);
                      if (!option || !option.percentageField) return total;
                      const percentageValue = form.getValues(option.percentageField as any);
                      return total + (parseFloat(percentageValue) || 0);
                    }, 0)}%
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="w-full md:w-auto group hover:border-progineer-gold/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              Étape précédente
            </Button>
            
            <Button type="submit" className="w-full md:w-auto group hover:bg-progineer-gold/90 bg-progineer-gold transition-all duration-300">
              Continuer 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default FacadeRenovForm;
