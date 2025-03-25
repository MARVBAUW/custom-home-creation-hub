
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Globe2 } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';

const TerrainSchema = z.object({
  terrainType: z.string().min(1, "Veuillez sélectionner un type de terrain"),
});

type TerrainFormProps = {
  defaultValues: {
    terrainType: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const TerrainForm: React.FC<TerrainFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(TerrainSchema),
    defaultValues: {
      terrainType: defaultValues.terrainType || "",
    },
  });

  const terrainOptions = [
    {
      id: "plat",
      label: "Terrain plat",
      description: "Terrain avec un relief plat, sans pente significative"
    },
    {
      id: "legere_pente",
      label: "Légère pente",
      description: "Terrain avec une pente légère"
    },
    {
      id: "forte_pente",
      label: "Forte pente",
      description: "Terrain avec une pente importante"
    },
    {
      id: "sans_avis",
      label: "Sans avis",
      description: "Je n'ai pas de préférence particulière"
    }
  ];

  return (
    <motion.div
      key="step-terrain"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Globe2 className="mr-2 text-progineer-gold" />
            Type de terrain
          </h2>
          
          <FormField
            control={form.control}
            name="terrainType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-base">Choisissez le type de terrain</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {terrainOptions.map((option) => (
                      <div key={option.id} className="relative">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={option.id}
                          className="flex flex-col items-start border rounded-lg p-4 cursor-pointer transition-all peer-checked:border-progineer-gold peer-checked:bg-progineer-gold/10 peer-focus:ring-2 peer-focus:ring-progineer-gold/30 hover:border-gray-300"
                        >
                          <div className="text-left">
                            <div className="text-base font-medium">
                              {option.label}
                            </div>
                            {option.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {option.description}
                              </p>
                            )}
                          </div>
                        </label>
                      </div>
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

export default TerrainForm;
