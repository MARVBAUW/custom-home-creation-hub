
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { BaseFormProps } from '../types/formTypes';
import { toFormValue } from '../utils/typeConversions';

const RoomsDetailsForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      bedrooms: toFormValue(formData.bedrooms),
      bathrooms: toFormValue(formData.bathrooms)
    }
  });

  const onSubmit = (data: any) => {
    updateFormData({
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Détails des pièces</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Nombre de chambres</Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                placeholder="Ex: 3"
                {...register("bedrooms", { required: "Le nombre de chambres est requis" })}
              />
              {errors.bedrooms && (
                <p className="text-sm text-red-500">{errors.bedrooms.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Nombre de salles de bain</Label>
              <Input
                id="bathrooms"
                type="number"
                min="0"
                placeholder="Ex: 2"
                {...register("bathrooms", { required: "Le nombre de salles de bain est requis" })}
              />
              {errors.bathrooms && (
                <p className="text-sm text-red-500">{errors.bathrooms.message?.toString()}</p>
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

export default RoomsDetailsForm;
