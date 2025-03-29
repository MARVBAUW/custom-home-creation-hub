
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ElectricalStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const ElectricalStep: React.FC<ElectricalStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      electricalType: formData.electricalType || ''
    }
  });
  
  const onSubmit = (data: any) => {
    console.log("Electrical data submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  // Cette fonction est utilisée pour les clics directs sur les options radio
  const handleDirectSelection = (value: string) => {
    console.log("Direct selection of electrical type:", value);
    updateFormData({ electricalType: value });
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Électricité</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">Choisissez le niveau de prestation électrique</Label>
            <RadioGroup className="grid gap-2" defaultValue={formData.electricalType || ""}>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem 
                  value="basic" 
                  id="basic" 
                  {...register('electricalType', { required: 'Veuillez sélectionner une option' })}
                  onClick={() => handleDirectSelection('basic')}
                />
                <Label htmlFor="basic" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Prestation de base</p>
                    <p className="text-sm text-gray-500">Installation électrique standard conforme aux normes</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem 
                  value="standard" 
                  id="standard" 
                  {...register('electricalType')}
                  onClick={() => handleDirectSelection('standard')}
                />
                <Label htmlFor="standard" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Prestations avancées</p>
                    <p className="text-sm text-gray-500">Points électriques supplémentaires, prises RJ45, etc.</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem 
                  value="premium" 
                  id="premium" 
                  {...register('electricalType')}
                  onClick={() => handleDirectSelection('premium')}
                />
                <Label htmlFor="premium" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Prestations haut de gamme</p>
                    <p className="text-sm text-gray-500">Système électrique complet avec options avancées</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem 
                  value="smart_home" 
                  id="smart_home" 
                  {...register('electricalType')}
                  onClick={() => handleDirectSelection('smart_home')}
                />
                <Label htmlFor="smart_home" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Zap className="h-5 w-5 text-green-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Prestations HG + Domotique</p>
                    <p className="text-sm text-gray-500">Installation connectée, contrôle à distance, automatisation</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem 
                  value="non_concerne" 
                  id="non_concerne" 
                  {...register('electricalType')}
                  onClick={() => handleDirectSelection('non_concerne')}
                />
                <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
              </div>
            </RadioGroup>
            {errors.electricalType && (
              <p className="text-sm text-red-500">{errors.electricalType.message as string}</p>
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

export default ElectricalStep;
