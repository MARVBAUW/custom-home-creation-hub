
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChauffageSchema } from '../types/validationSchemas';
import { ChauffageFormProps } from '../types/formTypes';

const heatingOptions = [
  { value: 'electric', label: 'Électrique' },
  { value: 'gas', label: 'Gaz' },
  { value: 'heat_pump', label: 'Pompe à chaleur' },
  { value: 'solar', label: 'Solaire' },
  { value: 'wood', label: 'Bois (poêle, chaudière)' },
  { value: 'fuel', label: 'Fioul' },
  { value: 'pellets', label: 'Granulés' },
  { value: 'geothermal', label: 'Géothermie' }
];

const ChauffageForm: React.FC<ChauffageFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(ChauffageSchema),
    defaultValues: {
      heatingType: formData.heatingType || 'pompe',
      hasAirConditioning: formData.hasAirConditioning || false
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
          <CardTitle className="text-xl font-bold">Chauffage & Climatisation</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heatingType">Type de chauffage</Label>
              <Controller
                name="heatingType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de chauffage" />
                    </SelectTrigger>
                    <SelectContent>
                      {heatingOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.heatingType && (
                <p className="text-sm text-red-500">{errors.heatingType.message?.toString()}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <Controller
                name="hasAirConditioning"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="hasAirConditioning" 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                )}
              />
              <Label htmlFor="hasAirConditioning">Climatisation</Label>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                La climatisation peut augmenter le coût du projet d'environ 5-15%, selon la surface à climatiser et le type de système choisi.
              </p>
              <p className="text-sm text-gray-500">
                Les pompes à chaleur réversibles peuvent assurer à la fois le chauffage et la climatisation, avec un meilleur rendement énergétique.
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

export default ChauffageForm;
