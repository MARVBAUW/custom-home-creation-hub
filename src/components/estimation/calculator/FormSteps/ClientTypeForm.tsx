
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Home } from "lucide-react";
import { motion } from 'framer-motion';
import { ClientTypeSchema } from '../types';
import { slideVariants } from '../animations';

type ClientTypeFormProps = {
  defaultValues: {
    clientType: string;
  };
  onSubmit: (data: any) => void;
  animationDirection: 'forward' | 'backward';
};

const ClientTypeForm: React.FC<ClientTypeFormProps> = ({
  defaultValues,
  onSubmit,
  animationDirection
}) => {
  const form = useForm({
    resolver: zodResolver(ClientTypeSchema),
    defaultValues: {
      clientType: defaultValues.clientType as any || undefined,
    },
  });

  return (
    <motion.div
      key="step-1"
      custom={animationDirection}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
              <span className="mr-2 text-progineer-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              Qui êtes-vous ?
            </h2>
            
            <FormField
              control={form.control}
              name="clientType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                      <div
                        onClick={() => form.setValue("clientType", "professional")}
                        className={`flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          field.value === "professional" 
                            ? "border-progineer-gold bg-progineer-gold/10 shadow-md transform scale-[1.02]" 
                            : "border-gray-200 hover:bg-muted/50 hover:border-gray-300"
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          field.value === "professional" 
                            ? "bg-progineer-gold text-white" 
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        }`}>
                          <Briefcase size={20} />
                        </div>
                        
                        <div className="flex-1">
                          <div className={`font-medium transition-colors duration-300 ${
                            field.value === "professional" ? "text-progineer-gold" : "text-gray-900"
                          }`}>
                            Professionnel
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Entreprise, commerce, bureau, industrie
                          </p>
                        </div>
                        
                        <RadioGroupItem value="professional" className="sr-only" />
                      </div>
                      
                      <div
                        onClick={() => form.setValue("clientType", "individual")}
                        className={`flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          field.value === "individual" 
                            ? "border-progineer-gold bg-progineer-gold/10 shadow-md transform scale-[1.02]" 
                            : "border-gray-200 hover:bg-muted/50 hover:border-gray-300"
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          field.value === "individual" 
                            ? "bg-progineer-gold text-white" 
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        }`}>
                          <Home size={20} />
                        </div>
                        
                        <div className="flex-1">
                          <div className={`font-medium transition-colors duration-300 ${
                            field.value === "individual" ? "text-progineer-gold" : "text-gray-900"
                          }`}>
                            Particulier
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Maison, appartement, extension
                          </p>
                        </div>
                        
                        <RadioGroupItem value="individual" className="sr-only" />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="w-full group hover:bg-progineer-gold/90 bg-progineer-gold transition-all duration-300">
            Continuer 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default ClientTypeForm;
