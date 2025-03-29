
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Droplet } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';
import { PlomberieSchema } from '../types/validationSchemas';
import { PlomberieFormProps } from '../types/formTypes';

const PlomberieForm: React.FC<PlomberieFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues = {}
}) => {
  const form = useForm({
    resolver: zodResolver(PlomberieSchema),
    defaultValues: {
      plumbingType: formData?.plumbingType || defaultValues?.plumbingType || "",
    },
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const plumbingTypeOptions = [
    { id: "standard", label: "Standard", description: "Installation de plomberie traditionnelle" },
    { id: "premium", label: "Premium", description: "Installation de qualité supérieure" },
    { id: "economique", label: "Économique", description: "Installation à coût réduit" },
    { id: "intelligente", label: "Intelligente", description: "Avec systèmes connectés" },
    { id: "ecologique", label: "Écologique", description: "Économie d'eau et matériaux durables" },
    { id: "sansAvis", label: "Sans avis", description: "Pas de préférence spécifique" }
  ];

  return (
    <motion.div
      key="step-plomberie"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <Droplet className="h-5 w-5 text-progineer-gold" />
            <h2 className="text-2xl font-semibold">Plomberie</h2>
          </div>
          
          <FormField
            control={form.control}
            name="plumbingType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type d'installation de plomberie</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {plumbingTypeOptions.map((option) => (
                      <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option.id} />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium">
                            {option.label}
                          </FormLabel>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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

export default PlomberieForm;
