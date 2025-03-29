
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Droplet } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface PlumbingStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const PlumbingStep: React.FC<PlumbingStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      plumbingType: formData.plumbingType || ''
    }
  });
  
  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Plomberie</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">Choisissez le niveau de prestation de plomberie</Label>
            <RadioGroup className="grid gap-2" defaultValue={formData.plumbingType}>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="basic" id="basic-plumb" {...register('plumbingType', { required: 'Veuillez sélectionner une option' })} />
                <Label htmlFor="basic-plumb" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Droplet className="h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Prestations de base</p>
                    <p className="text-sm text-gray-500">Installation standard avec raccordements nécessaires</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="standard" id="standard-plumb" {...register('plumbingType')} />
                <Label htmlFor="standard-plumb" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Droplet className="h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Prestations avancées</p>
                    <p className="text-sm text-gray-500">Installation complète avec équipements de qualité</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="premium" id="premium-plumb" {...register('plumbingType')} />
                <Label htmlFor="premium-plumb" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Droplet className="h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Prestations haut de gamme</p>
                    <p className="text-sm text-gray-500">Installation haut de gamme avec options premium</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="non_concerne" id="non_concerne-plumb" {...register('plumbingType')} />
                <Label htmlFor="non_concerne-plumb" className="cursor-pointer">Non concerné</Label>
              </div>
            </RadioGroup>
            {errors.plumbingType && (
              <p className="text-sm text-red-500">{errors.plumbingType.message as string}</p>
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
  );
};

export default PlumbingStep;
