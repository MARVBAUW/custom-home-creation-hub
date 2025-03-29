
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData, BaseFormStepProps } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

// Schema for validation
const formSchema = z.object({
  surface: z.string().min(1, "La surface est requise"),
  city: z.string().min(1, "La ville est requise"),
  levels: z.string().min(1, "Le nombre de niveaux est requis"),
  roomCount: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProjectDetailsForm: React.FC<BaseFormStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surface: formData?.surface?.toString() || '',
      city: formData?.city || '',
      levels: formData?.levels?.toString() || '',
      roomCount: formData?.roomCount?.toString() || '',
    }
  });

  const onSubmit = (data: FormValues) => {
    updateFormData?.({
      surface: data.surface,
      city: data.city,
      levels: data.levels,
      roomCount: data.roomCount
    });
    goToNextStep?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Détails du projet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="surface">Surface en m²</Label>
            <Controller
              name="surface"
              control={control}
              render={({ field }) => (
                <Input
                  id="surface"
                  placeholder="Ex: 120"
                  {...field}
                />
              )}
            />
            {errors.surface && <p className="text-sm text-red-500">{errors.surface.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  id="city"
                  placeholder="Ex: Paris"
                  {...field}
                />
              )}
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="levels">Nombre de niveaux</Label>
            <Controller
              name="levels"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="levels">
                    <SelectValue placeholder="Sélectionnez le nombre de niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 niveau (plain-pied)">Plain-pied</SelectItem>
                    <SelectItem value="2 niveaux (R+1)">2 niveaux (R+1)</SelectItem>
                    <SelectItem value="3 niveaux (R+2)">3 niveaux (R+2)</SelectItem>
                    <SelectItem value="4 niveaux ou plus">4 niveaux ou plus</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.levels && <p className="text-sm text-red-500">{errors.levels.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomCount">Nombre de pièces (optionnel)</Label>
            <Controller
              name="roomCount"
              control={control}
              render={({ field }) => (
                <Input
                  id="roomCount"
                  placeholder="Ex: 5"
                  {...field}
                />
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Précédent
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
          >
            Suivant
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProjectDetailsForm;
