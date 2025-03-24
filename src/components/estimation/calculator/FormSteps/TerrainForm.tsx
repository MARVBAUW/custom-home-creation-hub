
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Map } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';

const TerrainSchema = z.object({
  terrainType: z.array(z.string()).min(1, "Veuillez sélectionner au moins un type de terrain"),
});

type TerrainFormProps = {
  defaultValues: {
    terrainType: string[];
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
      terrainType: defaultValues.terrainType || [],
    },
  });

  const terrainOptions = [
    {
      id: "rocheux",
      label: "Rocheux",
      description: "Terrain avec des roches",
      image: "https://storage.tally.so/ca35d469-4aca-4551-b106-d82eb6685aad/DALL-E-2024-10-23-11.00.10---A-beautiful-illustration-of-a-rocky-terrain-showing-a-rugged-landscape-with-scattered-rocks-and-boulders.-The-ground-is-uneven-with-stone-formations-.webp"
    },
    {
      id: "argileux",
      label: "Argileux",
      description: "Terrain argileux",
      image: "https://storage.tally.so/19204de1-2be8-40c9-82fa-ee1469480b67/DALL-E-2024-10-23-11.00.08---A-beautiful-illustration-of-a-clayey-terrain-showing-a-landscape-with-slightly-cracked-earth-and-a-smooth-surface.-The-ground-looks-soft-and-dense-w.webp"
    },
    {
      id: "plat",
      label: "Plat",
      description: "Terrain plat",
      image: "https://storage.tally.so/02f06ce3-8138-4760-881a-3caaebe90099/DALL-E-2024-10-23-11.00.12---A-beautiful-illustration-of-a-flat-terrain-showing-a-wide-open-plain-with-even-ground.-The-landscape-is-serene-and-peaceful-with-short-green-grass-.webp"
    },
    {
      id: "accidente",
      label: "Accidenté",
      description: "Terrain accidenté",
      image: "https://storage.tally.so/1c1404ae-601d-4378-a2ff-d235bd924c65/DALL-E-2024-10-23-10.56.00---An-illustration-of-rugged-accidented-terrain-with-uneven-and-irregular-ground-levels-showing-a-variety-of-small-hills-dips-and-mounds.-The-landsca.webp"
    },
    {
      id: "pentue",
      label: "Pentu",
      description: "Terrain en pente",
      image: "https://storage.tally.so/e0576168-a151-4776-b05e-640c8aa7f610/DALL-E-2024-10-23-11.01.11---A-beautiful-illustration-of-a-steep-terrain-showing-a-sloped-landscape-with-a-noticeable-incline.-The-ground-features-scattered-rocks-and-patches-of-.webp"
    },
    {
      id: "viabilise",
      label: "Viabilisé",
      description: "Terrain viabilisé",
      image: "https://storage.tally.so/cc16539f-40fa-4acf-8503-1ab1ae322053/DALL-E-2024-10-23-11.09.38---A-detailed-illustration-of-a-serviced-viabilise-terrain-showing-a-flat-plot-of-land-with-essential-infrastructure-in-place.-The-landscape-is-clean-.webp"
    },
    {
      id: "sansObjet",
      label: "Sans objet",
      description: "Terrain sans particularité"
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
            <Map className="mr-2 text-progineer-gold" />
            Caractéristiques du terrain
          </h2>
          
          <FormField
            control={form.control}
            name="terrainType"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Type de terrain</FormLabel>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {terrainOptions.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="terrainType"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-col items-start space-y-3 border rounded-lg p-4 hover:border-gray-300 transition-all"
                          >
                            <FormControl>
                              <div className="flex flex-col items-center w-full">
                                {item.image && (
                                  <div className="w-full h-32 rounded-md overflow-hidden mb-3">
                                    <img 
                                      src={item.image} 
                                      alt={item.label} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex gap-2 items-center">
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                  <div className="grid gap-1.5 leading-none">
                                    <label
                                      htmlFor={item.id}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {item.label}
                                    </label>
                                    {item.description && (
                                      <p className="text-xs text-muted-foreground">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
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
