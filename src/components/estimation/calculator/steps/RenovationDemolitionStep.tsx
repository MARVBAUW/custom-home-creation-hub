
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Hammer, ConstructionIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface RenovationDemolitionStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const RenovationDemolitionStep: React.FC<RenovationDemolitionStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      demolitionType: formData.demolitionType || '',
      existingSurface: formData.existingSurface || '',
      needsDemolition: formData.needsDemolition || false
    }
  });
  
  const demolitionType = watch('demolitionType');
  const needsDemolition = demolitionType !== 'non_concerne';
  
  const onSubmit = (data: any) => {
    updateFormData({
      ...data,
      needsDemolition: demolitionType !== 'non_concerne'
    });
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Démolition / Dépose</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Type de démolition nécessaire</Label>
            <RadioGroup className="grid gap-4">
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="partielle" id="partielle" {...register('demolitionType')} />
                <Label htmlFor="partielle" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Hammer className="h-5 w-5 text-orange-500" />
                  <span>Démolition partielle</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="complete" id="complete" {...register('demolitionType')} />
                <Label htmlFor="complete" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Hammer className="h-5 w-5 text-red-500" />
                  <span>Démolition complète</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="depose" id="depose" {...register('demolitionType')} />
                <Label htmlFor="depose" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <ConstructionIcon className="h-5 w-5 text-yellow-500" />
                  <span>Dépose sans démolition importante</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="non_concerne" id="non_concerne" {...register('demolitionType')} />
                <Label htmlFor="non_concerne" className="flex flex-1 cursor-pointer">
                  <span>Non concerné</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {needsDemolition && (
            <div className="space-y-2">
              <Label htmlFor="existingSurface">Surface existante concernée (m²)</Label>
              <Input
                id="existingSurface"
                type="number"
                placeholder="Ex: 80"
                {...register('existingSurface', { 
                  required: needsDemolition ? 'Veuillez indiquer la surface concernée' : false
                })}
              />
              {errors.existingSurface && (
                <p className="text-sm text-red-500">{errors.existingSurface.message as string}</p>
              )}
            </div>
          )}
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
  );
};

export default RenovationDemolitionStep;
