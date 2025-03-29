
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Layers } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface InsulationStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const InsulationStep: React.FC<InsulationStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      insulationType: formData.insulationType || ''
    }
  });
  
  const onSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Isolation</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">Type d'isolation souhaitée</Label>
            <RadioGroup className="grid gap-2" defaultValue={formData.insulationType}>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="base" id="base" {...register('insulationType', { required: 'Veuillez sélectionner un type d\'isolation' })} />
                <Label htmlFor="base" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Layers className="h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Isolation standard</p>
                    <p className="text-sm text-gray-500">Isolation conforme aux normes actuelles</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="performance" id="performance" {...register('insulationType')} />
                <Label htmlFor="performance" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Layers className="h-5 w-5 text-green-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Isolation performante</p>
                    <p className="text-sm text-gray-500">Isolation renforcée pour économies d'énergie</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="ultraPerformance" id="ultraPerformance" {...register('insulationType')} />
                <Label htmlFor="ultraPerformance" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Layers className="h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Isolation haute performance</p>
                    <p className="text-sm text-gray-500">Isolation premium pour maison passive/basse consommation</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="non_concerne" id="non_concerne" {...register('insulationType')} />
                <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
              </div>
            </RadioGroup>
            {errors.insulationType && (
              <p className="text-sm text-red-500">{errors.insulationType.message as string}</p>
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

export default InsulationStep;
