
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Thermometer, Wind } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface HeatingStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const HeatingStep: React.FC<HeatingStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      heatingType: formData.heatingType || '',
      hasAirConditioning: formData.hasAirConditioning || false
    }
  });
  
  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Chauffage et Climatisation</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Système de chauffage souhaité</Label>
            <RadioGroup className="grid gap-2" defaultValue={formData.heatingType}>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="standard" id="standard-heat" {...register('heatingType', { required: 'Veuillez sélectionner une option' })} />
                <Label htmlFor="standard-heat" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Thermometer className="h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Meilleur rapport qualité prix</p>
                    <p className="text-sm text-gray-500">Système de chauffage standard mais performant</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="eco" id="eco-heat" {...register('heatingType')} />
                <Label htmlFor="eco-heat" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Thermometer className="h-5 w-5 text-green-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Le plus écologique</p>
                    <p className="text-sm text-gray-500">Systèmes à faible impact environnemental</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="economic" id="economic-heat" {...register('heatingType')} />
                <Label htmlFor="economic-heat" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Thermometer className="h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Le plus économique</p>
                    <p className="text-sm text-gray-500">Solution à moindre coût de fonctionnement</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="sans_avis" id="sans_avis-heat" {...register('heatingType')} />
                <Label htmlFor="sans_avis-heat" className="cursor-pointer">Sans avis</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="non_concerne" id="non_concerne-heat" {...register('heatingType')} />
                <Label htmlFor="non_concerne-heat" className="cursor-pointer">Non concerné</Label>
              </div>
            </RadioGroup>
            {errors.heatingType && (
              <p className="text-sm text-red-500">{errors.heatingType.message as string}</p>
            )}
          </div>
          
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-medium">Climatisation Rénovation / Création</Label>
            <RadioGroup className="grid gap-2" defaultValue={formData.hasAirConditioning ? "yes" : "no"}>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="no" id="clim-no" {...register('hasAirConditioning', { setValueAs: v => v === "yes" })} />
                <Label htmlFor="clim-no" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Wind className="h-5 w-5 text-gray-500" />
                  <span>Non</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="yes" id="clim-yes" {...register('hasAirConditioning', { setValueAs: v => v === "yes" })} />
                <Label htmlFor="clim-yes" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Wind className="h-5 w-5 text-blue-500" />
                  <span>Oui</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="sans_avis" id="clim-sans_avis" {...register('hasAirConditioning', { setValueAs: v => false })} />
                <Label htmlFor="clim-sans_avis" className="cursor-pointer">Sans avis</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="non_concerne" id="clim-non_concerne" {...register('hasAirConditioning', { setValueAs: v => false })} />
                <Label htmlFor="clim-non_concerne" className="cursor-pointer">Non concerné</Label>
              </div>
            </RadioGroup>
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

export default HeatingStep;
