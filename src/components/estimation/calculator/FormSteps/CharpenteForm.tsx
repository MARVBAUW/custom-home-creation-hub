
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';

const CharpenteSchema = z.object({
  roofType: z.string().min(1, "Veuillez sélectionner un type de charpente"),
});

type CharpenteFormProps = {
  defaultValues: {
    roofType: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const CharpenteForm: React.FC<CharpenteFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(CharpenteSchema),
    defaultValues: {
      roofType: defaultValues.roofType || "",
    },
  });

  const roofOptions = [
    {
      id: "toitureAccessible",
      label: "Toiture terrasse accessible",
      description: "Terrasse accessible sur le toit",
      image: "https://storage.tally.so/387c3e1b-17ef-4822-a53b-de5a43148e50/ABE-Etancheite-Couvertines-24.jpg"
    },
    {
      id: "toitureInaccessible",
      label: "Toiture terrasse inaccessible",
      description: "Toiture plate non accessible",
      image: "https://storage.tally.so/a3a58cb3-95d2-4edd-9ce9-65ad918abb20/images-2-.jpg"
    },
    {
      id: "charpenteIndustrielle",
      label: "Charpente industrielle",
      description: "Charpente à fermettes",
      image: "https://storage.tally.so/8070e55a-00c0-46ac-85f7-1c6fa6172c21/images-1-.jpg"
    },
    {
      id: "charpenteTraditionnelle",
      label: "Charpente traditionnelle",
      description: "Charpente artisanale en bois",
      image: "https://storage.tally.so/09d67ffd-fe5b-47e2-aa13-18cc1ff6ad09/charpente-traditionnelle.jpg"
    }
  ];

  return (
    <motion.div
      key="step-charpente"
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
            Charpente
          </h2>
          
          <FormField
            control={form.control}
            name="roofType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-base">Type de toiture</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {roofOptions.map((option) => (
                      <div key={option.id} className="relative">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={option.id}
                          className="flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all peer-checked:border-progineer-gold peer-checked:bg-progineer-gold/10 peer-focus:ring-2 peer-focus:ring-progineer-gold/30 hover:border-gray-300"
                        >
                          {option.image && (
                            <div className="w-full h-32 rounded-md overflow-hidden mb-3">
                              <img 
                                src={option.image} 
                                alt={option.label} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              {option.label}
                            </div>
                            {option.description && (
                              <p className="text-xs text-muted-foreground mt-1">
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

export default CharpenteForm;
