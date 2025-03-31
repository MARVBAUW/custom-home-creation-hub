
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Square, Grid } from 'lucide-react';
import { BaseFormProps } from '../types/formTypes';

const CarrelageForm: React.FC<BaseFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep, 
  goToPreviousStep 
}) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      floorTileType: formData.floorTileType || 'standard',
      floorTilePercentage: formData.floorTilePercentage || 50
    }
  });

  const watchTileType = watch('floorTileType');
  const watchTilePercentage = watch('floorTilePercentage');

  const onSubmit = (data: any) => {
    // Use object literal instead of trying to set custom properties directly
    const updatedData = {
      floorTileType: data.floorTileType,
      floorTilePercentage: data.floorTilePercentage
    };
    
    updateFormData(updatedData);
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Carrelage</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Type de carrelage</Label>
            <RadioGroup className="grid gap-2" defaultValue={watchTileType}>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="standard" id="standard" 
                  {...register('floorTileType')} 
                  onChange={() => setValue('floorTileType', 'standard')} />
                <Label htmlFor="standard" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Square className="h-5 w-5 text-gray-400" />
                  <div className="space-y-1">
                    <p className="font-medium">Carrelage standard</p>
                    <p className="text-sm text-gray-500">Grès cérame qualité standard</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="premium" id="premium" 
                  {...register('floorTileType')} 
                  onChange={() => setValue('floorTileType', 'premium')} />
                <Label htmlFor="premium" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Square className="h-5 w-5 text-amber-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Carrelage premium</p>
                    <p className="text-sm text-gray-500">Grès cérame qualité supérieure</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="luxury" id="luxury" 
                  {...register('floorTileType')} 
                  onChange={() => setValue('floorTileType', 'luxury')} />
                <Label htmlFor="luxury" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Grid className="h-5 w-5 text-purple-500" />
                  <div className="space-y-1">
                    <p className="font-medium">Carrelage luxe</p>
                    <p className="text-sm text-gray-500">Pierre naturelle, marbre ou équivalent</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="non_concerne" id="non_concerne" 
                  {...register('floorTileType')} 
                  onChange={() => setValue('floorTileType', 'non_concerne')} />
                <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
              </div>
            </RadioGroup>
          </div>
          
          {watchTileType !== 'non_concerne' && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-base font-medium">Proportion de surface carrelée</Label>
                <span className="text-sm font-medium">{watchTilePercentage}%</span>
              </div>
              <Slider
                defaultValue={[Number(watchTilePercentage)]}
                max={100}
                step={5}
                onValueChange={(value) => setValue('floorTilePercentage', value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
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

export default CarrelageForm;
