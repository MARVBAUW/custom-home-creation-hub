
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Window } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';
import { Input } from "@/components/ui/input";

const MenuiseriesExtSchema = z.object({
  windowType: z.string().optional(),
  windowRenovationArea: z.string().optional(),
  windowNewArea: z.string().optional(),
  replacementType: z.string().optional(),
  additionType: z.string().optional(),
});

type MenuiseriesExtFormProps = {
  defaultValues: {
    windowType?: string;
    windowRenovationArea?: string;
    windowNewArea?: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const MenuiseriesExtForm: React.FC<MenuiseriesExtFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(MenuiseriesExtSchema),
    defaultValues: {
      windowType: defaultValues.windowType || "",
      windowRenovationArea: defaultValues.windowRenovationArea || "",
      windowNewArea: defaultValues.windowNewArea || "",
      replacementType: "",
      additionType: "",
    },
  });

  const { watch } = form;
  const replacementType = watch("replacementType");
  const additionType = watch("additionType");

  const windowOptions = [
    {
      id: "bois",
      label: "Bois",
      description: "Fenêtres en bois naturel",
      image: "https://storage.tally.so/431090b7-6e9f-4b65-9287-b5fbd328627a/fenetre-bois-exotique.jpg"
    },
    {
      id: "pvc",
      label: "PVC",
      description: "Fenêtres en PVC standard",
      image: "https://storage.tally.so/373eab2e-754c-4ce1-84c5-06620cd162a4/201824309.jpg"
    },
    {
      id: "alu",
      label: "Aluminium",
      description: "Fenêtres en aluminium",
      image: "https://storage.tally.so/0c7036b5-5dd9-49e7-a61d-38aa1ce89904/fenetre-aluminium.png"
    },
    {
      id: "mixte",
      label: "Mixte Bois/Alu",
      description: "Fenêtres mixtes bois/aluminium",
      image: "https://storage.tally.so/6a387837-9be3-456c-8b14-df07914e6958/fe_bois_alu.webp"
    },
    {
      id: "pvcColore",
      label: "PVC Coloré",
      description: "Fenêtres en PVC coloré",
      image: "https://storage.tally.so/d7c9b355-b6a5-4b3b-9886-459581f8c2de/fenetre-pvc-de-differente-couleur.webp"
    },
    {
      id: "nonConcerne",
      label: "Non concerné",
      description: "Aucune fenêtre à installer",
    }
  ];

  return (
    <motion.div
      key="step-menuiseries"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
            <Window className="mr-2 text-progineer-gold" />
            Menuiseries Extérieures
          </h2>

          <FormField
            control={form.control}
            name="replacementType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-lg font-medium">Remplacement de menuiseries existantes</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {windowOptions.map((option) => (
                      <div key={`replacement-${option.id}`} className="relative">
                        <RadioGroupItem
                          value={option.id}
                          id={`replacement-${option.id}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`replacement-${option.id}`}
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

          {replacementType && replacementType !== "nonConcerne" && (
            <FormField
              control={form.control}
              name="windowRenovationArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface à remplacer (m²)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Surface en m²"
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="additionType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-lg font-medium">Ajout de nouvelles menuiseries</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {windowOptions.map((option) => (
                      <div key={`addition-${option.id}`} className="relative">
                        <RadioGroupItem
                          value={option.id}
                          id={`addition-${option.id}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`addition-${option.id}`}
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

          {additionType && additionType !== "nonConcerne" && (
            <FormField
              control={form.control}
              name="windowNewArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface à ajouter (m²)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Surface en m²"
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
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

export default MenuiseriesExtForm;
