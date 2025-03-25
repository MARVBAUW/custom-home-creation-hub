
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  doorType: z.string().min(1, { message: 'Veuillez sélectionner un type de porte' }),
  interiorFittings: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

type MenuiseriesIntFormProps = {
  defaultValues: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
};

const interiorFittingOptions = [
  { id: 'dressing', label: 'Dressing sur mesure' },
  { id: 'placards', label: 'Placards intégrés' },
  { id: 'escalier', label: 'Escalier intérieur' },
  { id: 'portes-coulissantes', label: 'Portes coulissantes' },
  { id: 'verriere', label: 'Verrière intérieure' },
  { id: 'mezzanine', label: 'Mezzanine' },
];

const MenuiseriesIntForm: React.FC<MenuiseriesIntFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doorType: defaultValues.doorType || '',
      interiorFittings: defaultValues.interiorFittings || [],
    },
  });

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Menuiseries intérieures</h2>
        <p className="text-muted-foreground text-sm">
          Choisissez le type de portes et les aménagements intérieurs
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="doorType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type de portes intérieures</FormLabel>
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
                          src="/images/porte-standard.jpg"
                          alt="Portes standard"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Standard</div>
                        <p className="text-sm text-muted-foreground">
                          Portes alvéolaires avec finition simple
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="premium" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/porte-premium.jpg"
                          alt="Portes premium"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Premium</div>
                        <p className="text-sm text-muted-foreground">
                          Portes en bois massif avec finition haut de gamme
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="design" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/porte-design.jpg"
                          alt="Portes design"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Design</div>
                        <p className="text-sm text-muted-foreground">
                          Portes contemporaines avec inserts vitrés
                        </p>
                      </div>
                    </FormItem>
                    
                    <FormItem className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="coulissantes" className="sr-only" />
                      </FormControl>
                      <div className="w-full text-center">
                        <img
                          src="/images/porte-coulissante.jpg"
                          alt="Portes coulissantes"
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <div className="font-medium">Coulissantes</div>
                        <p className="text-sm text-muted-foreground">
                          Portes à galandage ou applique pour gain de place
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
            name="interiorFittings"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Aménagements intérieurs (optionnel)</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Sélectionnez les aménagements que vous souhaitez intégrer
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interiorFittingOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="interiorFittings"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0 border border-input rounded-lg p-4"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValue, option.id])
                                    : field.onChange(
                                        currentValue.filter((value) => value !== option.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="cursor-pointer">{option.label}</FormLabel>
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
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

export default MenuiseriesIntForm;
