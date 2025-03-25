
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';

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

  // Options de carrelage sol avec des URLs d'images fiables
  const floorTileOptions = [
    {
      id: "standard",
      label: "Standard",
      description: "Carrelage grès cérame qualité standard",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/4217b7b4-1fac-4bec-a9c3-cbb4ce23fe6a.jpg"
    },
    {
      id: "premium",
      label: "Premium",
      description: "Carrelage grande dimension haute qualité",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/e97d33df-c168-48b7-b32a-02ed31ab8a0c.jpg"
    },
    {
      id: "natural",
      label: "Pierre naturelle",
      description: "Carrelage en pierre naturelle (marbre, travertin...)",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/8fb5aca9-f0c3-40c8-9353-1d2b5faf24e7.jpg"
    },
    {
      id: "design",
      label: "Design",
      description: "Carrelage avec motifs ou effets spéciaux",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/4da62bfb-0ad5-478c-8d5a-b99dc7c32be9.jpg"
    }
  ];

  // Options de carrelage mural avec des URLs d'images fiables
  const wallTileOptions = [
    {
      id: "standard",
      label: "Standard",
      description: "Faïence standard pour salle de bain et cuisine",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/4f1e7e20-1cdc-4d66-8d90-37d10fa9f7e9.jpg"
    },
    {
      id: "premium",
      label: "Premium",
      description: "Faïence haute qualité avec motifs et reliefs",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/1ebfa14b-61fc-48f3-a5e9-76ddbf40b5ce.jpg"
    },
    {
      id: "metro",
      label: "Métro",
      description: "Carrelage type métro pour style rétro ou industriel",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/6da9fa26-bd9d-4ade-b8e0-67e13c29dadb.jpg"
    },
    {
      id: "mosaic",
      label: "Mosaïque",
      description: "Petites mosaïques décoratives pour effet luxe",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/a0f1fb51-10d3-4cf2-a27e-f4c532bb6a6c.jpg"
    }
  ];

  // Gestion des erreurs d'image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/placeholder-building.jpg";
  };

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 flex items-center">
          <Grid className="mr-2 text-progineer-gold" />
          Carrelage
        </h2>
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
                    {floorTileOptions.map(option => (
                      <FormItem key={option.id} className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-progineer-gold/10 [&:has([data-state=checked])]:border-progineer-gold">
                        <FormControl>
                          <RadioGroupItem value={option.id} className="sr-only" />
                        </FormControl>
                        <div className="w-full text-center">
                          <img
                            src={option.image}
                            alt={option.label}
                            className="w-full h-32 object-cover rounded-md mb-3"
                            onError={handleImageError}
                          />
                          <div className="font-medium">{option.label}</div>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </FormItem>
                    ))}
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
                    {wallTileOptions.map(option => (
                      <FormItem key={option.id} className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-progineer-gold/10 [&:has([data-state=checked])]:border-progineer-gold">
                        <FormControl>
                          <RadioGroupItem value={option.id} className="sr-only" />
                        </FormControl>
                        <div className="w-full text-center">
                          <img
                            src={option.image}
                            alt={option.label}
                            className="w-full h-32 object-cover rounded-md mb-3"
                            onError={handleImageError}
                          />
                          <div className="font-medium">{option.label}</div>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </FormItem>
                    ))}
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
              className="flex items-center gap-2 group hover:border-progineer-gold/80"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Précédent
            </Button>
            <Button 
              type="submit" 
              className="group hover:bg-progineer-gold/90 bg-progineer-gold"
            >
              Continuer
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>
      </Form>
    </AnimatedStepTransition>
  );
};

export default CarrelageForm;
