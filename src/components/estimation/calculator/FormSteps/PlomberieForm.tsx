
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlomberieSchema } from '../types/validationSchemas';
import { PlomberieFormProps } from '../types/formTypes';

const plumbingOptions = [
  { value: 'basic', label: 'Basique' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
  { value: 'renovation', label: 'Rénovation' }
];

const PlomberieForm: React.FC<PlomberieFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(PlomberieSchema),
    defaultValues: {
      plumbingType: formData.plumbingType || 'standard'
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
          <CardTitle className="text-xl font-bold">Plomberie</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plumbingType">Type d'installation de plomberie</Label>
              <Controller
                name="plumbingType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de plomberie" />
                    </SelectTrigger>
                    <SelectContent>
                      {plumbingOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.plumbingType && (
                <p className="text-sm text-red-500">{errors.plumbingType.message?.toString()}</p>
              )}
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Basique</strong> : Installations minimalistes, fonctionnelles mais sans options particulières.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Standard</strong> : Installations de qualité moyenne avec quelques options (mitigeurs thermostatiques, etc.).
              </p>
              <p className="text-sm text-gray-500">
                <strong>Premium</strong> : Installations haut de gamme avec options avancées (distribution multi-circuits, équipements économes en eau, etc.).
              </p>
              <p className="text-sm text-gray-500">
                <strong>Rénovation</strong> : Remplacement ou modification d'installations existantes.
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

export default PlomberieForm;
