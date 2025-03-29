
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import { slideVariants } from '../animations';
import { MenuiseriesExtSchema } from '../types/validationSchemas';
import { MenuiseriesExtFormProps } from '../types/formTypes';
import { Input } from '@/components/ui/input';

const MenuiseriesExtForm: React.FC<MenuiseriesExtFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues = {}
}) => {
  const form = useForm({
    resolver: zodResolver(MenuiseriesExtSchema),
    defaultValues: {
      windowType: formData?.windowType || defaultValues?.windowType || "",
      shutterType: formData?.shutterType || defaultValues?.shutterType || "",
      windowRenovationArea: formData?.windowRenovationArea?.toString() || "",
      windowNewArea: formData?.windowNewArea?.toString() || "",
    },
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const windowTypeOptions = [
    { id: "bois", label: "Bois", description: "Menuiseries en bois traditionnel" },
    { id: "pvc", label: "PVC", description: "Menuiseries en PVC moderne" },
    { id: "alu", label: "Aluminium", description: "Menuiseries en aluminium" },
    { id: "mixte", label: "Mixte Bois/Alu", description: "Menuiseries mixtes bois et aluminium" },
    { id: "pvcColore", label: "PVC Coloré", description: "Menuiseries PVC avec finition colorée" },
    { id: "sansAvis", label: "Sans avis", description: "Pas de préférence spécifique" }
  ];

  const shutterTypeOptions = [
    { id: "voletRoulant", label: "Volets roulants", description: "Volets roulants électriques ou manuels" },
    { id: "voletBattant", label: "Volets battants", description: "Volets traditionnels à battants" },
    { id: "voletCoulissant", label: "Volets coulissants", description: "Volets qui coulissent le long de la façade" },
    { id: "sansVolet", label: "Sans volets", description: "Pas de volets" },
    { id: "storeInterieur", label: "Stores intérieurs", description: "Stores montés à l'intérieur" },
    { id: "sansAvis", label: "Sans avis", description: "Pas de préférence particulière" }
  ];

  return (
    <motion.div
      key="step-menuiseries-ext"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Menuiseries Extérieures</h2>
          
          <FormField
            control={form.control}
            name="windowType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de menuiseries extérieures</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    {windowTypeOptions.map((option) => (
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
          
          <FormField
            control={form.control}
            name="shutterType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de volets</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    {shutterTypeOptions.map((option) => (
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="windowRenovationArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface rénovation (m²)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      className="w-full border rounded p-2" 
                      placeholder="Surface à rénover" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="windowNewArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface nouvelle (m²)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      className="w-full border rounded p-2" 
                      placeholder="Surface à créer" 
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

export default MenuiseriesExtForm;
