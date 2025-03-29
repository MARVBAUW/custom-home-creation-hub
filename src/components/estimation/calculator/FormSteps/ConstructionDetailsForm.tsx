
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Building } from "lucide-react";
import { motion } from 'framer-motion';
import { ConstructionDetailsSchema } from '../types';
import { slideVariants } from '../animations';

type ConstructionDetailsFormProps = {
  defaultValues: {
    surface: string;
    levels: string;
    units: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const ConstructionDetailsForm: React.FC<ConstructionDetailsFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(ConstructionDetailsSchema),
    defaultValues: {
      surface: defaultValues.surface || "",
      levels: defaultValues.levels || "",
      units: defaultValues.units || "",
    },
  });

  return (
    <motion.div
      key="step-construction-details"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Building className="mr-2 text-progineer-gold" />
            Détails de construction
          </h2>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="surface"
              render={({ field }) => (
                <FormItem className="estimation-animate-fade" style={{animationDelay: '0.1s'}}>
                  <FormLabel>Surface approximative (m²)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 120" 
                      {...field} 
                      className="estimation-input" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="levels"
              render={({ field }) => (
                <FormItem className="estimation-animate-fade" style={{animationDelay: '0.2s'}}>
                  <FormLabel>Nombre de niveaux</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 2" 
                      {...field} 
                      className="estimation-input" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem className="estimation-animate-fade" style={{animationDelay: '0.3s'}}>
                  <FormLabel>Nombre de logements</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 1" 
                      {...field} 
                      className="estimation-input" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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

export default ConstructionDetailsForm;
