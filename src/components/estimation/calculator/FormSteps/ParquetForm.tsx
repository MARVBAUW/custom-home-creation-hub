
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ParquetSchema } from '../types/validationSchemas';
import { ParquetFormProps } from '../types/formTypes';
import { toFormValue } from '../utils/typeConversions';

const parquetOptions = [
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxe' },
  { value: 'solid_wood', label: 'Bois massif' },
  { value: 'engineered', label: 'Contrecollé' }
];

const softFloorOptions = [
  { value: 'vinyl', label: 'PVC/Vinyle' },
  { value: 'laminate', label: 'Stratifié' },
  { value: 'carpet', label: 'Moquette' },
  { value: 'linoleum', label: 'Linoléum' }
];

const ParquetForm: React.FC<ParquetFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm({
    resolver: zodResolver(ParquetSchema),
    defaultValues: {
      parquetType: formData.parquetType || '',
      parquetPercentage: toFormValue(formData.parquetPercentage) || '50',
      softFloorType: formData.softFloorType || '',
      softFloorPercentage: toFormValue(formData.softFloorPercentage) || '50'
    }
  });

  const parquetPercentage = watch('parquetPercentage');
  const softFloorPercentage = 100 - Number(parquetPercentage || 0);

  const submitHandler = (data: any) => {
    // Calculate the complementary percentage
    const updatedData = {
      ...data,
      softFloorPercentage: String(100 - Number(data.parquetPercentage))
    };
    
    updateFormData(updatedData);
    
    if (onSubmit) {
      onSubmit(updatedData);
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
          <CardTitle className="text-xl font-bold">Parquet & Sol Souple</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="parquetType">Type de parquet</Label>
              <Controller
                name="parquetType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de parquet" />
                    </SelectTrigger>
                    <SelectContent>
                      {parquetOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="parquetPercentage">Pourcentage de parquet</Label>
                <span>{parquetPercentage || 0}%</span>
              </div>
              <Controller
                name="parquetPercentage"
                control={control}
                render={({ field }) => (
                  <Slider
                    defaultValue={[Number(field.value) || 50]}
                    max={100}
                    step={1}
                    onValueChange={(vals) => field.onChange(String(vals[0]))}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="softFloorType">Type de sol souple</Label>
              <Controller
                name="softFloorType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de sol souple" />
                    </SelectTrigger>
                    <SelectContent>
                      {softFloorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Pourcentage de sol souple</Label>
                <span>{softFloorPercentage}%</span>
              </div>
              <div className="h-5 w-full bg-gray-200 rounded">
                <div 
                  className="h-5 bg-gray-400 rounded" 
                  style={{ width: `${softFloorPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                (Calculé automatiquement comme le complément à 100% du parquet)
              </p>
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

export default ParquetForm;
