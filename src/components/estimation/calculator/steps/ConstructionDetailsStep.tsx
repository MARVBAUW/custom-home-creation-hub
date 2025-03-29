import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Home, Warehouse, Building, Building2 } from 'lucide-react'; // Fixed import
import { useForm } from 'react-hook-form';
import { ConstructionDetailsStepProps } from '../types/formTypes';

const ConstructionDetailsStep: React.FC<ConstructionDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  estimationType
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      constructionType: formData.constructionType,
      surface: formData.surface,
      levels: formData.levels,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms
    }
  });

  const onSubmit = (data: any) => {
    updateFormData({
      constructionType: data.constructionType,
      surface: data.surface,
      levels: data.levels,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms
    });
    goToNextStep();
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          {/* Construction Type */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Type de construction</Label>
            <RadioGroup defaultValue={formData.constructionType} className="grid grid-cols-1 gap-4 pt-2">
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="house" id="house" {...register('constructionType')} />
                <Home className="h-5 w-5 text-gray-600" />
                <Label htmlFor="house" className="cursor-pointer">Maison individuelle</Label>
              </div>
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="apartment" id="apartment" {...register('constructionType')} />
                <Building className="h-5 w-5 text-gray-600" />
                <Label htmlFor="apartment" className="cursor-pointer">Appartement</Label>
              </div>
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="building" id="building" {...register('constructionType')} />
                <Building2 className="h-5 w-5 text-gray-600" />
                <Label htmlFor="building" className="cursor-pointer">Immeuble</Label>
              </div>
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <RadioGroupItem value="commercial" id="commercial" {...register('constructionType')} />
                <Warehouse className="h-5 w-5 text-gray-600" />
                <Label htmlFor="commercial" className="cursor-pointer">Local commercial</Label>
              </div>
            </RadioGroup>
            {errors.constructionType && (
              <p className="text-sm text-red-500">Veuillez sélectionner un type de construction</p>
            )}
          </div>

          {/* Surface */}
          <div className="space-y-2">
            <Label htmlFor="surface" className="text-base font-semibold">Surface (m²)</Label>
            <Input
              id="surface"
              type="number"
              min="0"
              placeholder="Ex: 120"
              {...register('surface', { required: true, min: 1 })}
            />
            {errors.surface && (
              <p className="text-sm text-red-500">Veuillez entrer une surface valide</p>
            )}
          </div>

          {/* Levels */}
          <div className="space-y-2">
            <Label htmlFor="levels" className="text-base font-semibold">Nombre d'étages</Label>
            <Input
              id="levels"
              type="number"
              min="1"
              placeholder="Ex: 2"
              {...register('levels', { required: true, min: 1 })}
            />
            {errors.levels && (
              <p className="text-sm text-red-500">Veuillez entrer un nombre d'étages valide</p>
            )}
          </div>

          {/* Additional fields for detailed estimation */}
          {estimationType && estimationType.includes('Précise') && (
            <>
              {/* Bedrooms */}
              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="text-base font-semibold">Nombre de chambres</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  placeholder="Ex: 3"
                  {...register('bedrooms', { min: 0 })}
                />
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <Label htmlFor="bathrooms" className="text-base font-semibold">Nombre de salles de bain</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  placeholder="Ex: 2"
                  {...register('bathrooms', { min: 0 })}
                />
              </div>
            </>
          )}
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

export default ConstructionDetailsStep;
