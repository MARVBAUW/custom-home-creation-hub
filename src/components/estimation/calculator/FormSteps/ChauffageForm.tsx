
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Thermometer } from 'lucide-react';
import { ChauffageFormProps } from '../types/formTypes';

const formSchema = z.object({
  heatingType: z.string().min(1, { message: 'Veuillez sélectionner une option de chauffage' }),
  hasAirConditioning: z.string().min(1, { message: 'Veuillez indiquer si vous souhaitez la climatisation' }),
});

type FormValues = z.infer<typeof formSchema>;

const ChauffageForm: React.FC<ChauffageFormProps> = ({
  defaultValues,
  onSubmit,
  goToPreviousStep,
  animationDirection,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heatingType: defaultValues?.heatingType || '',
      hasAirConditioning: 
        typeof defaultValues?.hasAirConditioning === 'boolean' 
          ? defaultValues.hasAirConditioning ? 'yes' : 'no' 
          : defaultValues?.hasAirConditioning || '',
    },
  });

  // Gestion des erreurs d'image pour éviter le blocage du formulaire
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://storage.googleapis.com/progineer-public/placeholder-building.jpg";
    e.currentTarget.onerror = null; // Prevent infinite error loop
  };

  // Options de chauffage avec des URLs d'images fiables
  const heatingOptions = [
    {
      id: "gaz",
      label: "Gaz",
      description: "Chaudière à condensation au gaz naturel",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/2b866fe2-beb4-4f5e-ac63-71f4ef4d3342.jpg"
    },
    {
      id: "pompe-chaleur",
      label: "Pompe à chaleur",
      description: "Système air-eau performant et économique",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/ec29ecde-2a09-47aa-b16e-a2ade0a929d3.jpg"
    },
    {
      id: "electrique",
      label: "Électrique",
      description: "Radiateurs électriques à inertie ou programmables",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/ca3db94c-a3d0-4d9b-822d-07ce7d3f5a2a.jpg"
    },
    {
      id: "geothermie",
      label: "Géothermie",
      description: "Chauffage par le sol utilisant l'énergie géothermique",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/a2ebe4aa-4ea2-40a4-bfb7-bcb96e6feb9b.jpg"
    }
  ];

  // Options de climatisation avec des URLs d'images fiables
  const acOptions = [
    {
      id: "yes",
      label: "Avec climatisation",
      description: "Installation d'un système de climatisation",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/9fa3c8b6-e91a-4559-9f27-f2ceea50dc4e.jpg"
    },
    {
      id: "no",
      label: "Sans climatisation",
      description: "Pas de système de climatisation",
      image: "https://storage.tally.so/4dfbfa40-1d1d-4fb1-812e-0c5fa8fd28ed/4b7fecef-7b11-42fe-9ee2-e8d9c3fc8e4c.jpg"
    }
  ];

  const handleFormSubmit = (values: FormValues) => {
    if (onSubmit) {
      // Conversion de "yes"/"no" en boolean pour hasAirConditioning
      const formattedData = {
        ...values,
        hasAirConditioning: values.hasAirConditioning === 'yes'
      };
      onSubmit(formattedData);
    }
  };

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 flex items-center">
          <Thermometer className="mr-2 text-progineer-gold" />
          Chauffage & Climatisation
        </h2>
        <p className="text-muted-foreground text-sm">
          Choisissez votre système de chauffage et climatisation
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
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
                    {heatingOptions.map(option => (
                      <FormItem key={option.id} className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-progineer-gold/10 [&:has([data-state=checked])]:border-progineer-gold shadow-sm">
                        <FormControl>
                          <RadioGroupItem value={option.id} className="sr-only" />
                        </FormControl>
                        <label htmlFor={option.id} className="w-full cursor-pointer">
                          <div className="w-full text-center">
                            <div className="w-full h-32 rounded-md overflow-hidden mb-3 bg-gray-100">
                              <img
                                src={option.image}
                                alt={option.label}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                                loading="lazy"
                              />
                            </div>
                            <div className="font-medium">{option.label}</div>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                        </label>
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
                    {acOptions.map(option => (
                      <FormItem key={option.id} className="flex flex-col items-center space-y-3 border border-input hover:bg-accent hover:text-accent-foreground rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:bg-progineer-gold/10 [&:has([data-state=checked])]:border-progineer-gold shadow-sm">
                        <FormControl>
                          <RadioGroupItem value={option.id} className="sr-only" />
                        </FormControl>
                        <label htmlFor={option.id} className="w-full cursor-pointer">
                          <div className="w-full text-center">
                            <div className="w-full h-32 rounded-md overflow-hidden mb-3 bg-gray-100">
                              <img
                                src={option.image}
                                alt={option.label}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                                loading="lazy"
                              />
                            </div>
                            <div className="font-medium">{option.label}</div>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                        </label>
                      </FormItem>
                    ))}
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

export default ChauffageForm;
