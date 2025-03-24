
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";
import { motion } from 'framer-motion';
import { EstimationTypeSchema } from '../types';
import { slideVariants } from '../animations';

type EstimationTypeFormProps = {
  defaultValues: {
    estimationType: string;
    termsAccepted: boolean;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const EstimationTypeForm: React.FC<EstimationTypeFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(EstimationTypeSchema),
    defaultValues: {
      estimationType: defaultValues.estimationType || "",
      termsAccepted: defaultValues.termsAccepted || false,
    },
  });

  return (
    <motion.div
      key="step-estimation-type"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Calculator className="mr-2 text-progineer-gold" />
            Type d'estimation
          </h2>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="estimationType"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>Choisissez le niveau de précision souhaité</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-4"
                    >
                      <div
                        onClick={() => form.setValue("estimationType", "quick")}
                        className={`flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          field.value === "quick" 
                            ? "border-progineer-gold bg-progineer-gold/10 shadow-md transform scale-[1.02]" 
                            : "border-gray-200 hover:bg-muted/50 hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value="quick" className="sr-only" />
                        <div className="flex-1">
                          <div className={`font-medium transition-colors duration-300 ${
                            field.value === "quick" ? "text-progineer-gold" : "text-gray-900"
                          }`}>
                            Rapide (5 minutes)
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Estimation avec une précision à +/- 10%
                          </p>
                        </div>
                      </div>
                      
                      <div
                        onClick={() => form.setValue("estimationType", "precise")}
                        className={`flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          field.value === "precise" 
                            ? "border-progineer-gold bg-progineer-gold/10 shadow-md transform scale-[1.02]" 
                            : "border-gray-200 hover:bg-muted/50 hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value="precise" className="sr-only" />
                        <div className="flex-1">
                          <div className={`font-medium transition-colors duration-300 ${
                            field.value === "precise" ? "text-progineer-gold" : "text-gray-900"
                          }`}>
                            Précise (15 minutes)
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Estimation détaillée avec une précision à +/- 5%
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 estimation-animate-fade" style={{animationDelay: '0.4s'}}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      J'accepte que mes données soient utilisées pour me contacter concernant mon projet
                    </FormLabel>
                    <FormMessage />
                  </div>
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

export default EstimationTypeForm;
