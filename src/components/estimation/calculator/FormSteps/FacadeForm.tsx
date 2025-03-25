
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';

const FacadeSchema = z.object({
  stonePercentage: z.string().optional(),
  plasterPercentage: z.string().optional(),
  brickPercentage: z.string().optional(),
  metalCladdingPercentage: z.string().optional(),
  woodCladdingPercentage: z.string().optional(),
  stoneCladdingPercentage: z.string().optional(),
}).refine(data => {
  const total = [
    Number(data.stonePercentage || 0),
    Number(data.plasterPercentage || 0),
    Number(data.brickPercentage || 0),
    Number(data.metalCladdingPercentage || 0),
    Number(data.woodCladdingPercentage || 0),
    Number(data.stoneCladdingPercentage || 0)
  ].reduce((acc, val) => acc + val, 0);
  
  return total === 100;
}, {
  message: "La somme des pourcentages doit être de 100%",
  path: ["stonePercentage"]
});

type FacadeFormProps = {
  defaultValues: {
    stonePercentage?: string;
    plasterPercentage?: string;
    brickPercentage?: string;
    metalCladdingPercentage?: string;
    woodCladdingPercentage?: string;
    stoneCladdingPercentage?: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const FacadeForm: React.FC<FacadeFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(FacadeSchema),
    defaultValues: {
      stonePercentage: defaultValues.stonePercentage || "0",
      plasterPercentage: defaultValues.plasterPercentage || "0",
      brickPercentage: defaultValues.brickPercentage || "0",
      metalCladdingPercentage: defaultValues.metalCladdingPercentage || "0",
      woodCladdingPercentage: defaultValues.woodCladdingPercentage || "0",
      stoneCladdingPercentage: defaultValues.stoneCladdingPercentage || "0",
    },
  });

  // Calculate remaining percentage
  const calculateTotal = () => {
    const values = form.getValues();
    const total = [
      Number(values.stonePercentage || 0),
      Number(values.plasterPercentage || 0),
      Number(values.brickPercentage || 0),
      Number(values.metalCladdingPercentage || 0),
      Number(values.woodCladdingPercentage || 0),
      Number(values.stoneCladdingPercentage || 0)
    ].reduce((acc, val) => acc + val, 0);
    
    return total;
  };

  return (
    <motion.div
      key="step-facade"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Home className="mr-2 text-progineer-gold" />
            Répartition des revêtements de façade
          </h2>
          
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Indiquez la répartition en pourcentage des différents revêtements sur vos façades (total: {calculateTotal()}%)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="stonePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pierre (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      className="estimation-input" 
                      min="0"
                      max="100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="plasterPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enduit (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      className="estimation-input" 
                      min="0"
                      max="100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="brickPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brique (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      className="estimation-input" 
                      min="0"
                      max="100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="metalCladdingPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bardage métallique (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      className="estimation-input" 
                      min="0"
                      max="100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="woodCladdingPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bardage bois (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      className="estimation-input" 
                      min="0"
                      max="100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="stoneCladdingPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bardage pierre (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      className="estimation-input" 
                      min="0"
                      max="100"
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

export default FacadeForm;
