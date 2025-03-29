
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PeintureSchema } from '../types/validationSchemas';
import { PeintureFormProps } from '../types/formTypes';
import { toFormValue } from '../utils/typeConversions';

const PeintureForm: React.FC<PeintureFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { handleSubmit, formState: { errors }, control, watch } = useForm({
    resolver: zodResolver(PeintureSchema),
    defaultValues: {
      basicPaintPercentage: toFormValue(formData.basicPaintPercentage) || '70',
      decorativePaintPercentage: toFormValue(formData.decorativePaintPercentage) || '10',
      wallpaperPercentage: toFormValue(formData.wallpaperPercentage) || '10',
      woodCladPercentage: toFormValue(formData.woodCladPercentage) || '5',
      stoneCladPercentage: toFormValue(formData.stoneCladPercentage) || '5'
    }
  });

  const basicPaintPct = Number(watch('basicPaintPercentage') || 0);
  const decorativePaintPct = Number(watch('decorativePaintPercentage') || 0);
  const wallpaperPct = Number(watch('wallpaperPercentage') || 0);
  const woodCladPct = Number(watch('woodCladPercentage') || 0);
  const stoneCladPct = Number(watch('stoneCladPercentage') || 0);
  
  const totalPct = basicPaintPct + decorativePaintPct + wallpaperPct + woodCladPct + stoneCladPct;
  const isValidTotal = totalPct === 100;

  const submitHandler = (data: any) => {
    updateFormData(data);
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Peinture & Revêtements Muraux</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="font-medium">Total des pourcentages : {totalPct}%</div>
                {!isValidTotal && (
                  <p className="text-red-500 text-sm mt-1">
                    La somme des pourcentages doit être égale à 100%
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="basicPaintPercentage">Peinture standard</Label>
                <span>{basicPaintPct}%</span>
              </div>
              <Controller
                name="basicPaintPercentage"
                control={control}
                render={({ field }) => (
                  <Slider
                    defaultValue={[Number(field.value) || 70]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(String(vals[0]))}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="decorativePaintPercentage">Peinture décorative</Label>
                <span>{decorativePaintPct}%</span>
              </div>
              <Controller
                name="decorativePaintPercentage"
                control={control}
                render={({ field }) => (
                  <Slider
                    defaultValue={[Number(field.value) || 10]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(String(vals[0]))}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="wallpaperPercentage">Papier peint</Label>
                <span>{wallpaperPct}%</span>
              </div>
              <Controller
                name="wallpaperPercentage"
                control={control}
                render={({ field }) => (
                  <Slider
                    defaultValue={[Number(field.value) || 10]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(String(vals[0]))}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="woodCladPercentage">Lambris bois</Label>
                <span>{woodCladPct}%</span>
              </div>
              <Controller
                name="woodCladPercentage"
                control={control}
                render={({ field }) => (
                  <Slider
                    defaultValue={[Number(field.value) || 5]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(String(vals[0]))}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="stoneCladPercentage">Parement pierre</Label>
                <span>{stoneCladPct}%</span>
              </div>
              <Controller
                name="stoneCladPercentage"
                control={control}
                render={({ field }) => (
                  <Slider
                    defaultValue={[Number(field.value) || 5]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(String(vals[0]))}
                  />
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Précédent
            </Button>
            <Button type="submit" disabled={!isValidTotal}>
              Suivant
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PeintureForm;
