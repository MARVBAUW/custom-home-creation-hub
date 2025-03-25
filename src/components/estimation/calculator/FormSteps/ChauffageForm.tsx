
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
  heatingType: z.string().min(1, { message: 'Veuillez sélectionner une option de chauffage' }),
  hasAirConditioning: z.string().min(1, { message: 'Veuillez indiquer si vous souhaitez la climatisation' }),
});

type FormValues = z.infer<typeof formSchema>;

type ChauffageFormProps = {
  defaultValues: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const ChauffageForm: React.FC<ChauffageFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heatingType: defaultValues.heatingType || '',
      hasAirConditioning: defaultValues.hasAirConditioning || '',
    },
  });

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Chauffage & Climatisation</h2>
        <p className="text-muted-foreground text-sm">
          Choisissez votre système de chauffage et climatisation
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="heatingType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de chauffage</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="gaz" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/chauffage-gaz.jpg"
                          alt="Chauffage au gaz"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Gaz</div>
                        <p className="text-sm text-muted-foreground">
                          Chaudière à condensation au gaz naturel
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="pompe-chaleur" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/chauffage-pompe-chaleur.jpg"
                          alt="Pompe à chaleur"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Pompe à chaleur</div>
                        <p className="text-sm text-muted-foreground">
                          Système air-eau performant et économique
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="electrique" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/chauffage-electrique.jpg"
                          alt="Chauffage électrique"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Électrique</div>
                        <p className="text-sm text-muted-foreground">
                          Radiateurs électriques à inertie ou programmables
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="geothermie" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/chauffage-geothermie.jpg"
                          alt="Géothermie"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Géothermie</div>
                        <p className="text-sm text-muted-foreground">
                          Chauffage par le sol utilisant l'énergie géothermique
                        </p>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasAirConditioning"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Climatisation</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="yes" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/climatisation-oui.jpg"
                          alt="Avec climatisation"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Avec climatisation</div>
                        <p className="text-sm text-muted-foreground">
                          Installation d'un système de climatisation
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="no" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/climatisation-non.jpg"
                          alt="Sans climatisation"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Sans climatisation</div>
                        <p className="text-sm text-muted-foreground">
                          Pas de système de climatisation
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

export default ChauffageForm;
