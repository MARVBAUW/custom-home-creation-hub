
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  electricalType: z.string().min(1, { message: 'Veuillez sélectionner une option' }),
});

type FormValues = z.infer<typeof formSchema>;

type ElectriciteFormProps = {
  defaultValues: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const ElectriciteForm: React.FC<ElectriciteFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electricalType: defaultValues.electricalType || '',
    },
  });

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Électricité</h2>
        <p className="text-muted-foreground text-sm">
          Choisissez le type d'installation électrique pour votre projet
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="electricalType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type d'installation</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem className="flex flex-col space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="standard" id="standard" className="absolute top-4 right-4" />
                      </FormControl>
                      <div className="w-full">
                        <img
                          src="/images/electricite-standard.jpg"
                          alt="Installation standard"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <label htmlFor="standard" className="text-base font-medium block">Standard</label>
                        <p className="text-sm text-muted-foreground">
                          Installation de base avec prises et interrupteurs standards
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="premium" id="premium" className="absolute top-4 right-4" />
                      </FormControl>
                      <div className="w-full">
                        <img
                          src="/images/electricite-premium.jpg"
                          alt="Installation premium"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <label htmlFor="premium" className="text-base font-medium block">Premium</label>
                        <p className="text-sm text-muted-foreground">
                          Installation haut de gamme avec domotique et smart home
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="economy" id="economy" className="absolute top-4 right-4" />
                      </FormControl>
                      <div className="w-full">
                        <img
                          src="/images/electricite-economic.jpg"
                          alt="Installation économique"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <label htmlFor="economy" className="text-base font-medium block">Économique</label>
                        <p className="text-sm text-muted-foreground">
                          Installation basique avec équipements essentiels
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="smart" id="smart" className="absolute top-4 right-4" />
                      </FormControl>
                      <div className="w-full">
                        <img
                          src="/images/electricite-domotique.jpg"
                          alt="Domotique"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <label htmlFor="smart" className="text-base font-medium block">Domotique complète</label>
                        <p className="text-sm text-muted-foreground">
                          Système complet de contrôle intelligent de la maison
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
            <Button type="submit">Continuer</Button>
          </div>
        </form>
      </Form>
    </AnimatedStepTransition>
  );
};

export default ElectriciteForm;
