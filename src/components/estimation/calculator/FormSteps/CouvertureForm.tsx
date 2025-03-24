
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

const RoofingSchema = z.object({
  roofingType: z.string().min(1, "Veuillez sélectionner un type de couverture"),
});

type CouvertureFormProps = {
  defaultValues: {
    roofingType: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const CouvertureForm: React.FC<CouvertureFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(RoofingSchema),
    defaultValues: {
      roofingType: defaultValues.roofingType || "",
    },
  });

  const roofingOptions = [
    {
      id: "tuilePlate",
      label: "Tuile plate",
      description: "Couverture en tuiles plates traditionnelles",
      image: "https://storage.tally.so/3faa0ac4-67a3-4bdc-88d7-0cdd0011af19/toiture_dune_maison.jpg"
    },
    {
      id: "tuileRonde",
      label: "Tuile ronde",
      description: "Couverture en tuiles canal",
      image: "https://storage.tally.so/bf4955e0-2e61-44e2-954f-96fb74b88a94/images-3-.jpg"
    },
    {
      id: "ardoise",
      label: "Ardoise",
      description: "Couverture en ardoise naturelle",
      image: "https://storage.tally.so/8149bd44-67ad-46b2-832a-9f7614399bdb/telecharger-5-.jpg"
    },
    {
      id: "zinc",
      label: "Zinc joint debout",
      description: "Couverture en zinc à joint debout",
      image: "https://storage.tally.so/a0bc6578-a067-4229-b498-ba3d9000d813/DSCN0270-scaled.jpg"
    },
    {
      id: "chaume",
      label: "Toit de chaume",
      description: "Couverture traditionnelle en chaume",
      image: "https://storage.tally.so/12152575-8de9-47c7-b7ec-e2f880a49a3f/toiture_chaume.webp"
    },
    {
      id: "bacAcier",
      label: "Bac acier",
      description: "Couverture en bac acier",
      image: "https://storage.tally.so/6caab145-3ae3-4a26-8e1b-c5aa22293147/bac-acier-toiture.jpg"
    },
    {
      id: "bitume",
      label: "Étanchéité bitume",
      description: "Couverture plate avec membrane bitumineuse",
      image: "https://storage.tally.so/7e20cf08-76a7-4734-9a6f-3e3898401825/images-2-.jpg"
    },
    {
      id: "vegetalisee",
      label: "Toiture végétalisée",
      description: "Couverture plate végétalisée",
      image: "https://storage.tally.so/447602be-4e30-4349-ace1-102bb434bd01/telecharger-4-.jpg"
    },
    {
      id: "gravillonnee",
      label: "Toiture gravillonnée",
      description: "Couverture plate gravillonnée",
      image: "https://storage.tally.so/e89b21f9-1a52-4ee2-9ec2-7016ff0db2c1/telecharger-3-.jpg"
    }
  ];

  return (
    <motion.div
      key="step-couverture"
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
            Type de couverture
          </h2>
          
          <FormField
            control={form.control}
            name="roofingType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-base">Choisissez le type de couverture</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {roofingOptions.map((option) => (
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

export default CouvertureForm;
