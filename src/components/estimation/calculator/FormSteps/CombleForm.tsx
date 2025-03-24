
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';

const CombleSchema = z.object({
  atticType: z.string().min(1, "Veuillez sélectionner un type de comble"),
});

type CombleFormProps = {
  defaultValues: {
    atticType: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const CombleForm: React.FC<CombleFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(CombleSchema),
    defaultValues: {
      atticType: defaultValues.atticType || "",
    },
  });

  const atticOptions = [
    {
      id: "amenageable",
      label: "Combles aménageables",
      description: "Combles qui peuvent être transformés en espace habitable",
      image: "https://storage.tally.so/07e80bce-c186-4610-91fb-d3ce483c87f5/images.jpg"
    },
    {
      id: "perdu",
      label: "Combles perdus",
      description: "Combles non aménageables",
      image: "https://storage.tally.so/73f29ee3-606d-45f5-8a17-b67d49ffd4ad/telecharger.jpg"
    }
  ];

  return (
    <motion.div
      key="step-comble"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Layers className="mr-2 text-progineer-gold" />
            Type de comble
          </h2>
          
          <FormField
            control={form.control}
            name="atticType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-base">Choisissez le type de comble</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {atticOptions.map((option) => (
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
                            <div className="w-full h-40 rounded-md overflow-hidden mb-3">
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

export default CombleForm;
