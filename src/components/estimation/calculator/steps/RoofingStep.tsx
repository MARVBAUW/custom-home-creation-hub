
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Umbrella } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface RoofingStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const RoofingStep: React.FC<RoofingStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      roofingType: formData.roofingType || ''
    }
  });
  
  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Couverture</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">Type de couverture</Label>
            <RadioGroup className="grid gap-2" defaultValue={formData.roofingType}>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="tuilePlate" id="tuilePlate" {...register('roofingType', { required: 'Veuillez sélectionner un type de couverture' })} />
                <Label htmlFor="tuilePlate" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Umbrella className="h-5 w-5 text-red-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Tuiles plates</p>
                    <p className="text-sm text-gray-500">Couverture traditionnelle en tuiles plates</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="tuileRonde" id="tuileRonde" {...register('roofingType')} />
                <Label htmlFor="tuileRonde" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Umbrella className="h-5 w-5 text-orange-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Tuiles rondes</p>
                    <p className="text-sm text-gray-500">Couverture en tuiles canal/romaines</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="ardoise" id="ardoise" {...register('roofingType')} />
                <Label htmlFor="ardoise" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Umbrella className="h-5 w-5 text-slate-700" />
                  <div className="space-y-1">
                    <p className="font-medium">Ardoise</p>
                    <p className="text-sm text-gray-500">Couverture en ardoise naturelle ou synthétique</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="zinc" id="zinc" {...register('roofingType')} />
                <Label htmlFor="zinc" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Umbrella className="h-5 w-5 text-gray-400" />
                  <div className="space-y-1">
                    <p className="font-medium">Zinc</p>
                    <p className="text-sm text-gray-500">Couverture métallique en zinc</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="toitVegetalise" id="toitVegetalise" {...register('roofingType')} />
                <Label htmlFor="toitVegetalise" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Umbrella className="h-5 w-5 text-green-600" />
                  <div className="space-y-1">
                    <p className="font-medium">Toit végétalisé</p>
                    <p className="text-sm text-gray-500">Toiture avec végétation</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="non_concerne" id="non_concerne" {...register('roofingType')} />
                <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
              </div>
            </RadioGroup>
            {errors.roofingType && (
              <p className="text-sm text-red-500">{errors.roofingType.message as string}</p>
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

export default RoofingStep;
