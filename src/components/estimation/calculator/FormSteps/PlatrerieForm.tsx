
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
  plasteringType: z.string().min(1, { message: 'Veuillez sélectionner une option' }),
});

type FormValues = z.infer<typeof formSchema>;

type PlatrerieFormProps = {
  defaultValues: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const PlatrerieForm: React.FC<PlatrerieFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plasteringType: defaultValues.plasteringType || '',
    },
  });

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Plâtrerie</h2>
        <p className="text-muted-foreground text-sm">
          Sélectionnez le type de plâtrerie pour les murs et plafonds
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="plasteringType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de plâtrerie</FormLabel>
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
                          src="/images/platrerie-standard.jpg"
                          alt="Plâtrerie standard"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Standard</div>
                        <p className="text-sm text-muted-foreground">
                          Plaques de plâtre standards pour murs et plafonds
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="premium" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/platrerie-premium.jpg"
                          alt="Plâtrerie premium"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Premium</div>
                        <p className="text-sm text-muted-foreground">
                          Finition haute qualité avec plâtre décoratif et moulures
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="acoustic" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/platrerie-acoustique.jpg"
                          alt="Plâtrerie acoustique"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Acoustique</div>
                        <p className="text-sm text-muted-foreground">
                          Plaques avec isolation acoustique améliorée
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="hydrofuge" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/platrerie-hydrofuge.jpg"
                          alt="Plâtrerie hydrofuge"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Hydrofuge</div>
                        <p className="text-sm text-muted-foreground">
                          Plaques spéciales résistantes à l'humidité pour pièces d'eau
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

export default PlatrerieForm;
