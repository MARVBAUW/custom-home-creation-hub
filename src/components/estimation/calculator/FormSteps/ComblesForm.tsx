
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComblesSchema } from '../types/validationSchemas';
import { ComblesFormProps } from '../types/formTypes';

const atticOptions = [
  { value: 'lost', label: 'Perdus' },
  { value: 'convertible', label: 'Aménageables' },
  { value: 'converted', label: 'Aménagés' },
  { value: 'roof_terrace', label: 'Toit terrasse' }
];

const ComblesForm: React.FC<ComblesFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(ComblesSchema),
    defaultValues: {
      atticType: formData.atticType || ''
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
          <CardTitle className="text-xl font-bold">Type de combles</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="atticType">Type de combles</Label>
              <Controller
                name="atticType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de combles" />
                    </SelectTrigger>
                    <SelectContent>
                      {atticOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.atticType && (
                <p className="text-sm text-red-500">{errors.atticType.message?.toString()}</p>
              )}
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Perdus</strong> : Combles non accessibles ou non utilisables comme espace de vie.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Aménageables</strong> : Combles avec potentiel d'aménagement mais actuellement non aménagés.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Aménagés</strong> : Combles déjà transformés en espace habitable.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Toit terrasse</strong> : Surface plane utilisable comme espace extérieur.
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

export default ComblesForm;
