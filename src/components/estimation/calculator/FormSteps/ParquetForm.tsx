
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
import { ParquetFormProps } from '../types/formTypes';

const formSchema = z.object({
  parquetType: z.string().min(1, { message: 'Veuillez sélectionner un type de parquet' }),
  parquetPercentage: z.string(),
  softFloorType: z.string().min(1, { message: 'Veuillez sélectionner un type de sol souple' }),
  softFloorPercentage: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const ParquetForm: React.FC<ParquetFormProps> = ({
  defaultValues,
  updateFormData,
  goToPreviousStep,
  animationDirection,
  goToNextStep,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parquetType: defaultValues?.parquetType || '',
      parquetPercentage: defaultValues?.parquetPercentage?.toString() || '30',
      softFloorType: defaultValues?.softFloorType || '',
      softFloorPercentage: defaultValues?.softFloorPercentage?.toString() || '10',
    },
  });

  const handleSubmit = (values: FormValues) => {
    updateFormData(values);
    goToNextStep();
  };

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Parquet & Sol souple</h2>
        <p className="text-muted-foreground text-sm">
          Définissez les types de revêtements de sol et leurs proportions
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="parquetType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de parquet</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="stratifie" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/parquet-stratifie.jpg"
                          alt="Parquet stratifié"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Stratifié</div>
                        <p className="text-sm text-muted-foreground">
                          Imitation bois économique et facile d'entretien
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="contrecolle" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/parquet-contrecolle.jpg"
                          alt="Parquet contrecollé"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Contrecollé</div>
                        <p className="text-sm text-muted-foreground">
                          Parquet avec couche supérieure en bois véritable
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="massif" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/parquet-massif.jpg"
                          alt="Parquet massif"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Massif</div>
                        <p className="text-sm text-muted-foreground">
                          Parquet traditionnel en bois massif, durable et noble
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="bambou" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/parquet-bambou.jpg"
                          alt="Parquet bambou"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Bambou</div>
                        <p className="text-sm text-muted-foreground">
                          Alternative écologique et très résistante
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
            name="parquetPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pourcentage de surface en parquet : {field.value}%
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

          <FormField
            control={form.control}
            name="softFloorType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de sol souple</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="lino" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/sol-lino.jpg"
                          alt="Linoléum"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Linoléum</div>
                        <p className="text-sm text-muted-foreground">
                          Sol souple naturel et écologique
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="pvc" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/sol-pvc.jpg"
                          alt="PVC"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">PVC</div>
                        <p className="text-sm text-muted-foreground">
                          Revêtement vinyle économique et résistant à l'eau
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="moquette" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/sol-moquette.jpg"
                          alt="Moquette"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Moquette</div>
                        <p className="text-sm text-muted-foreground">
                          Confort thermique et acoustique optimal
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="caoutchouc" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/sol-caoutchouc.jpg"
                          alt="Caoutchouc"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Caoutchouc</div>
                        <p className="text-sm text-muted-foreground">
                          Grande résistance et amortissement des chocs
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
            name="softFloorPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pourcentage de surface en sol souple : {field.value}%
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

export default ParquetForm;
