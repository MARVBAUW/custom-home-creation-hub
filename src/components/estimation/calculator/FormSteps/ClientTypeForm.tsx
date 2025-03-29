
import React from 'react';
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';
import { User, Building } from 'lucide-react';

// Schema de validation pour le type de client
const clientTypeSchema = z.object({
  clientType: z.enum(["individual", "professional"], {
    required_error: "Veuillez sélectionner un type de client",
  }),
});

interface ClientTypeFormProps {
  onSubmit: (data: { clientType: string }) => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: {
    clientType?: string;
  };
}

const ClientTypeForm: React.FC<ClientTypeFormProps> = ({
  onSubmit,
  animationDirection,
  defaultValues = {}
}) => {
  // Initialisation du formulaire avec react-hook-form
  const form = useForm<z.infer<typeof clientTypeSchema>>({
    resolver: zodResolver(clientTypeSchema),
    defaultValues: {
      clientType: (defaultValues.clientType as "individual" | "professional") || undefined,
    },
  });

  // Fonction de soumission du formulaire
  const handleSubmit = (values: z.infer<typeof clientTypeSchema>) => {
    onSubmit({ clientType: values.clientType });
  };

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Vous êtes...</h3>
          <p className="text-sm text-gray-500">
            Sélectionnez votre profil pour adapter l'estimation à vos besoins spécifiques.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="clientType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <FormItem className="flex flex-col items-center">
                        <FormControl>
                          <RadioGroupItem
                            value="individual"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-6 hover:border-blue-200 hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 w-full cursor-pointer transition-all">
                          <User className="h-10 w-10 mb-3 text-blue-600" />
                          <div className="text-center">
                            <span className="text-lg font-medium">Particulier</span>
                            <p className="text-sm text-gray-500 mt-1">
                              Je souhaite construire ou rénover ma maison
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex flex-col items-center">
                        <FormControl>
                          <RadioGroupItem
                            value="professional"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-6 hover:border-blue-200 hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 w-full cursor-pointer transition-all">
                          <Building className="h-10 w-10 mb-3 text-blue-600" />
                          <div className="text-center">
                            <span className="text-lg font-medium">Professionnel</span>
                            <p className="text-sm text-gray-500 mt-1">
                              Je représente une entreprise ou une organisation
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Continuer</Button>
          </form>
        </Form>
      </div>
    </AnimatedStepTransition>
  );
};

export default ClientTypeForm;
