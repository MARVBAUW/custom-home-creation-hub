
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  floorTileType: z.string().min(1, { message: 'Veuillez sélectionner un type de carrelage sol' }),
  wallTileType: z.string().min(1, { message: 'Veuillez sélectionner un type de carrelage mural' }),
  floorTilePercentage: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

type CarrelageFormProps = {
  defaultValues: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const CarrelageForm: React.FC<CarrelageFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      floorTileType: defaultValues.floorTileType || '',
      wallTileType: defaultValues.wallTileType || '',
      floorTilePercentage: defaultValues.floorTilePercentage || '30',
    },
  });

  const floorTilePercentage = form.watch('floorTilePercentage');

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Carrelage</h2>
        <p className="text-muted-foreground text-sm">
          Choisissez vos types de carrelage et la surface à carreler
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="floorTileType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Carrelage sol</FormLabel>
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
                          src="/images/carrelage-sol-standard.jpg"
                          alt="Carrelage sol standard"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Standard</div>
                        <p className="text-sm text-muted-foreground">
                          Carrelage grès cérame qualité standard
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="premium" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/carrelage-sol-premium.jpg"
                          alt="Carrelage sol premium"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Premium</div>
                        <p className="text-sm text-muted-foreground">
                          Carrelage grande dimension haute qualité
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="natural" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/carrelage-sol-naturel.jpg"
                          alt="Carrelage sol naturel"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Pierre naturelle</div>
                        <p className="text-sm text-muted-foreground">
                          Carrelage en pierre naturelle (marbre, travertin...)
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="design" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/carrelage-sol-design.jpg"
                          alt="Carrelage sol design"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Design</div>
                        <p className="text-sm text-muted-foreground">
                          Carrelage avec motifs ou effets spéciaux
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
            name="wallTileType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Carrelage mural</FormLabel>
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
                          src="/images/carrelage-mur-standard.jpg"
                          alt="Carrelage mural standard"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Standard</div>
                        <p className="text-sm text-muted-foreground">
                          Faïence standard pour salle de bain et cuisine
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="premium" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/carrelage-mur-premium.jpg"
                          alt="Carrelage mural premium"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Premium</div>
                        <p className="text-sm text-muted-foreground">
                          Faïence haute qualité avec motifs et reliefs
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="metro" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/carrelage-mur-metro.jpg"
                          alt="Carrelage mural métro"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Métro</div>
                        <p className="text-sm text-muted-foreground">
                          Carrelage type métro pour style rétro ou industriel
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="mosaic" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/carrelage-mur-mosaique.jpg"
                          alt="Mosaïque murale"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Mosaïque</div>
                        <p className="text-sm text-muted-foreground">
                          Petites mosaïques décoratives pour effet luxe
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
            name="floorTilePercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pourcentage de surface à carreler : {field.value}%
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[parseInt(field.value)]}
                    onValueChange={(vals) => field.onChange(vals[0].toString())}
                    className="py-4"
                  />
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

export default CarrelageForm;
