
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GrosOeuvreSchema } from '../types/validationSchemas';
import { GrosOeuvreFormProps } from '../types/formTypes';
import { toFormValue, ensureNumber } from '../utils/typeConversions';

const foundationOptions = [
  { value: 'strip', label: 'Semelles filantes' },
  { value: 'slab', label: 'Dalle pleine' },
  { value: 'piles', label: 'Pieux/pilotis' },
  { value: 'crawl_space', label: 'Vide sanitaire' },
  { value: 'basement', label: 'Sous-sol' }
];

const soilOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'clay', label: 'Argileux' },
  { value: 'rocky', label: 'Rocheux' },
  { value: 'sandy', label: 'Sableux' },
  { value: 'wet', label: 'Humide' }
];

const wallOptions = [
  { value: 'concrete_blocks', label: 'Parpaings' },
  { value: 'brick', label: 'Briques' },
  { value: 'wood_frame', label: 'Ossature bois' },
  { value: 'concrete', label: 'Béton armé' },
  { value: 'stone', label: 'Pierre' },
  { value: 'earth', label: 'Terre crue/pisé' },
  { value: 'steel_frame', label: 'Structure métallique' }
];

const basementOptions = [
  { value: 'semi', label: 'Semi-enterré' },
  { value: 'full', label: 'Totalement enterré' },
  { value: 'walkout', label: 'Partiellement enterré (accès direct)' }
];

const floorOptions = [
  { value: 'concrete', label: 'Béton' },
  { value: 'wood', label: 'Plancher bois' },
  { value: 'mixed', label: 'Mixte' }
];

const GrosOeuvreForm: React.FC<GrosOeuvreFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(GrosOeuvreSchema),
    defaultValues: {
      foundationType: formData.foundationType || '',
      soilType: formData.soilType || '',
      wallType: formData.wallType || '',
      wallThickness: toFormValue(formData.wallThickness),
      hasBasement: formData.hasBasement || false,
      basementType: formData.basementType || '',
      floorType: formData.floorType || '',
      slopedLand: formData.slopedLand || false,
      difficultAccess: formData.difficultAccess || false,
      needsDemolition: formData.needsDemolition || false,
      needsWaterManagement: formData.needsWaterManagement || false
    }
  });

  const submitHandler = (data: any) => {
    const updatedData = {
      ...data,
      wallThickness: data.wallThickness ? String(data.wallThickness) : ''
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
          <CardTitle className="text-xl font-bold">Structure & Gros Œuvre</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="foundationType">Type de fondation</Label>
              <Controller
                name="foundationType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de fondation" />
                    </SelectTrigger>
                    <SelectContent>
                      {foundationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.foundationType && (
                <p className="text-sm text-red-500">{errors.foundationType.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="soilType">Type de sol</Label>
              <Controller
                name="soilType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de sol" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.soilType && (
                <p className="text-sm text-red-500">{errors.soilType.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wallType">Type de murs</Label>
              <Controller
                name="wallType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de murs" />
                    </SelectTrigger>
                    <SelectContent>
                      {wallOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.wallType && (
                <p className="text-sm text-red-500">{errors.wallType.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wallThickness">Épaisseur des murs (cm)</Label>
              <Input
                id="wallThickness"
                type="number"
                placeholder="Ex: 20"
                {...register("wallThickness")}
              />
              {errors.wallThickness && (
                <p className="text-sm text-red-500">{errors.wallThickness.message?.toString()}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Controller
                name="hasBasement"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="hasBasement" 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                )}
              />
              <Label htmlFor="hasBasement">Sous-sol</Label>
            </div>
            
            {/* Afficher le type de sous-sol uniquement si hasBasement est true */}
            <div className="space-y-2">
              <Label htmlFor="basementType">Type de sous-sol</Label>
              <Controller
                name="basementType"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={!control._formValues.hasBasement}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de sous-sol" />
                    </SelectTrigger>
                    <SelectContent>
                      {basementOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="floorType">Type de plancher</Label>
              <Controller
                name="floorType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de plancher" />
                    </SelectTrigger>
                    <SelectContent>
                      {floorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className="space-y-3 pt-2">
              <p className="font-medium">Contraintes particulières</p>
              
              <div className="flex items-center space-x-2">
                <Controller
                  name="slopedLand"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="slopedLand" 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  )}
                />
                <Label htmlFor="slopedLand">Terrain en pente</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Controller
                  name="difficultAccess"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="difficultAccess" 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  )}
                />
                <Label htmlFor="difficultAccess">Accès difficile</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Controller
                  name="needsDemolition"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="needsDemolition" 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  )}
                />
                <Label htmlFor="needsDemolition">Travaux de démolition nécessaires</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Controller
                  name="needsWaterManagement"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="needsWaterManagement" 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  )}
                />
                <Label htmlFor="needsWaterManagement">Gestion des eaux nécessaire</Label>
              </div>
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

export default GrosOeuvreForm;
