
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { motion } from 'framer-motion';
import { ProfessionalProjectSchema } from '../types/validationSchemas';
import { slideVariants } from '../animations';

type ProfessionalProjectFormProps = {
  defaultValues: {
    activity: string;
    projectType: string;
    startDate: string;
    endDate: string;
  };
  onSubmit: (data: any) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const ProfessionalProjectForm: React.FC<ProfessionalProjectFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(ProfessionalProjectSchema),
    defaultValues: {
      activity: defaultValues.activity || "",
      projectType: defaultValues.projectType || "",
      startDate: defaultValues.startDate || "",
      endDate: defaultValues.endDate || "",
    },
  });

  return (
    <motion.div
      key="step-professional-project"
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
            Informations sur votre projet professionnel
          </h2>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem className="estimation-animate-fade" style={{animationDelay: '0.1s'}}>
                  <FormLabel>Secteur d'activité</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="estimation-input">
                        <SelectValue placeholder="Sélectionnez votre secteur d'activité" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="restauration">Restauration</SelectItem>
                      <SelectItem value="bureaux">Bureaux</SelectItem>
                      <SelectItem value="industrie">Industrie</SelectItem>
                      <SelectItem value="logistique">Logistique</SelectItem>
                      <SelectItem value="sante">Santé</SelectItem>
                      <SelectItem value="education">Éducation</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem className="estimation-animate-fade" style={{animationDelay: '0.2s'}}>
                  <FormLabel>Type de projet</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="estimation-input">
                        <SelectValue placeholder="Sélectionnez le type de projet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="construction">Construction neuve</SelectItem>
                      <SelectItem value="renovation">Rénovation</SelectItem>
                      <SelectItem value="extension">Extension</SelectItem>
                      <SelectItem value="amenagement">Aménagement intérieur</SelectItem>
                      <SelectItem value="reconversion">Reconversion de bâtiment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="estimation-animate-fade" style={{animationDelay: '0.3s'}}>
                  <FormLabel>Date de début souhaitée (optionnel)</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      className="estimation-input" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="estimation-animate-fade" style={{animationDelay: '0.4s'}}>
                  <FormLabel>Date de fin souhaitée (optionnel)</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      className="estimation-input" 
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

export default ProfessionalProjectForm;
