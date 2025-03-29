
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { FormData } from '../types';
import { BaseFormProps } from '../types/formTypes';

interface ChauffageFormValues {
  heatingType: string;
  hasAirConditioning: boolean;
}

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  defaultValues,
  onSubmit,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ChauffageFormValues>({
    defaultValues: {
      heatingType: defaultValues?.heatingType || formData.heatingType || 'standard',
      hasAirConditioning: defaultValues?.hasAirConditioning || formData.hasAirConditioning || false
    }
  });

  const handleSubmitForm = (data: ChauffageFormValues) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      const formDataToUpdate: Partial<FormData> = {
        heatingType: data.heatingType,
        hasAirConditioning: data.hasAirConditioning
      };
      updateFormData(formDataToUpdate);
      goToNextStep();
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Type de chauffage</Label>
            <RadioGroup defaultValue={formData.heatingType || 'standard'} className="grid grid-cols-1 gap-4 pt-2">
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="standard" id="standard" {...register('heatingType')} />
                <Label htmlFor="standard" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Standard</span>
                  <span className="text-sm text-gray-500">Radiateurs classiques</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="floorHeating" id="floorHeating" {...register('heatingType')} />
                <Label htmlFor="floorHeating" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Plancher chauffant</span>
                  <span className="text-sm text-gray-500">Chauffage par le sol</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="heatPump" id="heatPump" {...register('heatingType')} />
                <Label htmlFor="heatPump" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Pompe à chaleur</span>
                  <span className="text-sm text-gray-500">Solution écologique</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between border rounded-md p-4">
            <div className="space-y-0.5">
              <Label className="text-base cursor-pointer" htmlFor="ac">Climatisation</Label>
              <p className="text-sm text-gray-500">Ajouter la climatisation au projet</p>
            </div>
            <Switch 
              id="ac" 
              defaultChecked={formData.hasAirConditioning || false}
              {...register('hasAirConditioning')}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
          >
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

export default ChauffageForm;
