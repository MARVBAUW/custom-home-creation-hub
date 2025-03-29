
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlatrerieSchema } from '../types/validationSchemas';
import { PlatrerieFormProps } from '../types/formTypes';

const plasteringOptions = [
  { value: 'traditional', label: 'Plâtre traditionnel' },
  { value: 'plasterboard', label: 'Plaques de plâtre' },
  { value: 'mixed', label: 'Mixte' },
  { value: 'renovation', label: 'Rénovation' }
];

const PlatrerieForm: React.FC<PlatrerieFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(PlatrerieSchema),
    defaultValues: {
      plasteringType: formData.plasteringType || ''
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
          <CardTitle className="text-xl font-bold">Plâtrerie</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plasteringType">Type de plâtrerie</Label>
              <Controller
                name="plasteringType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de plâtrerie" />
                    </SelectTrigger>
                    <SelectContent>
                      {plasteringOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.plasteringType && (
                <p className="text-sm text-red-500">{errors.plasteringType.message?.toString()}</p>
              )}
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Plâtre traditionnel</strong> : Application manuelle de plâtre sur les murs et plafonds.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Plaques de plâtre</strong> : Installation de panneaux préfabriqués (placoplatre).
              </p>
              <p className="text-sm text-gray-500">
                <strong>Mixte</strong> : Combinaison des deux techniques selon les zones.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Rénovation</strong> : Reprise de plâtre existant, rebouchage, lissage.
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

export default PlatrerieForm;
