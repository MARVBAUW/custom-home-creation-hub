
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { BaseFormProps } from '../types/baseFormProps';
import { toFormValue, ensureNumber } from '../utils/typeConversions';

const ConstructionDetailsForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      doorCount: toFormValue(formData.doorCount)
    }
  });

  const onSubmit = (data: any) => {
    updateFormData({
      doorCount: ensureNumber(data.doorCount)
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Détails de construction</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doorCount">Nombre de portes</Label>
              <Input
                id="doorCount"
                placeholder="Ex: 8"
                type="number"
                {...register("doorCount")}
              />
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

export default ConstructionDetailsForm;
