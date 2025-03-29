
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { BaseFormProps } from '../types/formTypes';
import { toFormValue } from '../utils/typeConversions';

const ProjectDetailsForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      surface: toFormValue(formData.surface),
      city: toFormValue(formData.city)
    }
  });

  const onSubmit = (data: any) => {
    updateFormData({
      surface: data.surface,
      city: data.city
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Détails du projet</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="surface">Surface du projet (m²)</Label>
              <Input
                id="surface"
                placeholder="Ex: 100"
                {...register("surface", { required: "La surface est requise" })}
              />
              {errors.surface && (
                <p className="text-sm text-red-500">{errors.surface.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Ville du projet</Label>
              <Input
                id="city"
                placeholder="Ex: Marseille"
                {...register("city", { required: "La ville est requise" })}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message?.toString()}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Précédent
            </Button>
            <Button type="submit">
              Suivant
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProjectDetailsForm;
