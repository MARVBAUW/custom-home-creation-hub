
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';
import { PlomberieSchema } from '../types/validationSchemas';
import { FormData } from '../types';

export interface PlomberieFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
}

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

  const onSubmit = (data: { plumbingType: string }) => {
    updateFormData({
      plumbingType: data.plumbingType
    });
    goToNextStep();
  };

  const plumbingOptions = [
    { id: "standard", label: "Plomberie standard", description: "Installations sans options premium" },
    { id: "premium", label: "Plomberie premium", description: "Installations haut de gamme" },
    { id: "remplacement", label: "Remplacement simple", description: "Uniquement remplacer des éléments existants" },
    { id: "renovation", label: "Rénovation complète", description: "Refaire entièrement l'installation" },
    { id: "extension", label: "Extension réseau", description: "Ajouter des points d'eau supplémentaires" },
    { id: "sansAvis", label: "Sans avis", description: "Pas de préférence particulière" }
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
          <h2 className="text-2xl font-semibold text-center mb-6">Plomberie</h2>
          
          <FormField
            control={form.control}
            name="plumbingType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de plomberie souhaitée</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    {plumbingOptions.map((option) => (
                      <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
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
