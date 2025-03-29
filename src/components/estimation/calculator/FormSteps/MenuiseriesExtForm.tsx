
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuiseriesExtSchema } from '../types/validationSchemas';
import { MenuiseriesExtFormProps } from '../types/formTypes';
import { toFormValue } from '../utils/typeConversions';

const windowOptions = [
  { value: 'pvc', label: 'PVC' },
  { value: 'aluminum', label: 'Aluminium' },
  { value: 'wood', label: 'Bois' },
  { value: 'mixed', label: 'Mixte (bois/alu)' },
  { value: 'steel', label: 'Acier' }
];

const shutterOptions = [
  { value: 'roller', label: 'Volets roulants' },
  { value: 'folding', label: 'Volets battants' },
  { value: 'sliding', label: 'Volets coulissants' },
  { value: 'none', label: 'Pas de volets' }
];

const MenuiseriesExtForm: React.FC<MenuiseriesExtFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(MenuiseriesExtSchema),
    defaultValues: {
      windowType: formData.windowType || '',
      shutterType: formData.shutterType || '',
      windowRenovationArea: toFormValue(formData.windowRenovationArea),
      windowNewArea: toFormValue(formData.windowNewArea)
    }
  });

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
          <CardTitle className="text-xl font-bold">Menuiseries Extérieures</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="windowType">Type de fenêtres</Label>
              <Controller
                name="windowType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de fenêtres" />
                    </SelectTrigger>
                    <SelectContent>
                      {windowOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.windowType && (
                <p className="text-sm text-red-500">{errors.windowType.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shutterType">Type de volets</Label>
              <Controller
                name="shutterType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de volets" />
                    </SelectTrigger>
                    <SelectContent>
                      {shutterOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.shutterType && (
                <p className="text-sm text-red-500">{errors.shutterType.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="windowRenovationArea">Surface fenêtres rénovation (m²)</Label>
              <Input
                id="windowRenovationArea"
                type="number"
                placeholder="Ex: 15"
                {...register("windowRenovationArea")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="windowNewArea">Surface fenêtres neuves (m²)</Label>
              <Input
                id="windowNewArea"
                type="number"
                placeholder="Ex: 25"
                {...register("windowNewArea")}
              />
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

export default MenuiseriesExtForm;
