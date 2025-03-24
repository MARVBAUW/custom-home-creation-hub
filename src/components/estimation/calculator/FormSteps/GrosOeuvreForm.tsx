
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';

const GrosOeuvreSchema = z.object({
  wallType: z.string().min(1, "Veuillez sélectionner un type de mur"),
});

type GrosOeuvreFormProps = {
  defaultValues: {
    wallType: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const GrosOeuvreForm: React.FC<GrosOeuvreFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(GrosOeuvreSchema),
    defaultValues: {
      wallType: defaultValues.wallType || "",
    },
  });

  const wallOptions = [
    {
      id: "brique",
      label: "Briques",
      description: "Murs en briques",
      image: "https://storage.tally.so/808cebc8-91ab-4484-809b-c1470631f6bb/bricklargebare-3.jpg"
    },
    {
      id: "parpaing",
      label: "Parpaing",
      description: "Murs en parpaings",
      image: "https://storage.tally.so/7b87cade-5935-4353-b20e-d8c2fd40421e/MK_MKT_PHO_Porotherm-25_texture.jpg"
    },
    {
      id: "porotherme",
      label: "Porotherme",
      description: "Murs en porotherme",
      image: "https://storage.tally.so/4a1f29f1-4511-4160-bbf6-42dedba2a402/CAUSSE-BEIGE-NUANCE-PDC14.jpg"
    },
    {
      id: "pierre",
      label: "Pierre",
      description: "Murs en pierre",
      image: "https://storage.tally.so/8503cfd4-ed5f-48c9-bf50-38af18a2b984/5ad7cf40503119c863dbd6d0ad145448.jpg"
    },
    {
      id: "beton",
      label: "Béton",
      description: "Murs en béton",
      image: "https://storage.tally.so/84bfe787-ac02-4d8f-a853-1b32ac1df454/bg-beton-cellulaire.jpg"
    },
    {
      id: "betonCellulaire",
      label: "Béton cellulaire",
      description: "Murs en béton cellulaire",
      image: "https://storage.tally.so/84bfe787-ac02-4d8f-a853-1b32ac1df454/bg-beton-cellulaire.jpg"
    },
    {
      id: "sansAvis",
      label: "Sans avis",
      description: "Je n'ai pas de préférence"
    }
  ];

  return (
    <motion.div
      key="step-gros-oeuvre"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Building2 className="mr-2 text-progineer-gold" />
            Gros œuvre
          </h2>
          
          <FormField
            control={form.control}
            name="wallType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-base">Composition des murs de façade</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {wallOptions.map((option) => (
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

export default GrosOeuvreForm;
