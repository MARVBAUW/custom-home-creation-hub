
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PlomberieFormProps } from '../types/formTypes';
import { PlomberieSchema } from '../types/validationSchemas';

type FormValues = z.infer<typeof PlomberieSchema>;

const PlomberieForm: React.FC<PlomberieFormProps> = ({
  formData,
  updateFormData,
  defaultValues,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(PlomberieSchema),
    defaultValues: {
      plumbingType: formData?.plumbingType || defaultValues?.plumbingType || '',
    },
  });

  const onSubmit = (values: FormValues) => {
    updateFormData?.(values);
    if (goToNextStep) goToNextStep();
  };

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Plomberie</h2>
        <p className="text-muted-foreground text-sm">
          Sélectionnez le type d'installation de plomberie pour votre projet
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="plumbingType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de plomberie</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="standard" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/plomberie-standard.jpg"
                          alt="Plomberie standard"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Standard</div>
                        <p className="text-sm text-muted-foreground">
                          Installation standard avec tuyauterie conventionnelle
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="premium" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/plomberie-premium.jpg"
                          alt="Plomberie premium"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Premium</div>
                        <p className="text-sm text-muted-foreground">
                          Installation haut de gamme avec systèmes économiseurs d'eau
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="eco" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/plomberie-eco.jpg"
                          alt="Plomberie écologique"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Écologique</div>
                        <p className="text-sm text-muted-foreground">
                          Système avec récupération d'eau de pluie et recyclage
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="basic" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/plomberie-basique.jpg"
                          alt="Plomberie basique"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Basique</div>
                        <p className="text-sm text-muted-foreground">
                          Installation simple pour les besoins essentiels
                        </p>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Précédent
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              Continuer
              <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </Form>
    </AnimatedStepTransition>
  );
};

export default PlomberieForm;
