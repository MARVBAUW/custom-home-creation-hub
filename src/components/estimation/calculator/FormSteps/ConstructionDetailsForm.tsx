
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { BaseFormProps } from '../types/formTypes';
import { toFormValue } from '../utils/typeConversions';

const ConstructionDetailsForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      constructionType: toFormValue(formData.constructionType),
      constructionStyle: toFormValue(formData.constructionStyle),
      insulationType: toFormValue(formData.insulationType),
      roofingType: toFormValue(formData.roofingType)
    }
  });

  const onSubmit = (data: any) => {
    updateFormData({
      constructionType: data.constructionType,
      constructionStyle: data.constructionStyle,
      insulationType: data.insulationType,
      roofingType: data.roofingType
    });
    goToNextStep();
  };

  const handleConstructionTypeChange = (value: string) => {
    setValue('constructionType', value);
  };

  const handleStyleChange = (value: string) => {
    setValue('constructionStyle', value);
  };

  const handleInsulationTypeChange = (value: string) => {
    setValue('insulationType', value);
  };

  const handleRoofingTypeChange = (value: string) => {
    setValue('roofingType', value);
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Détails de la construction</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="constructionType">Type de construction</Label>
              <Select 
                defaultValue={watch('constructionType')} 
                onValueChange={handleConstructionTypeChange}
              >
                <SelectTrigger id="constructionType">
                  <SelectValue placeholder="Sélectionnez un type de construction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditionnelle">Construction traditionnelle</SelectItem>
                  <SelectItem value="ossatureBois">Ossature bois</SelectItem>
                  <SelectItem value="modulaire">Construction modulaire</SelectItem>
                  <SelectItem value="ecologique">Construction écologique</SelectItem>
                </SelectContent>
              </Select>
              {errors.constructionType && (
                <p className="text-sm text-red-500">{errors.constructionType.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="constructionStyle">Style architectural</Label>
              <Select 
                defaultValue={watch('constructionStyle')} 
                onValueChange={handleStyleChange}
              >
                <SelectTrigger id="constructionStyle">
                  <SelectValue placeholder="Sélectionnez un style architectural" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contemporain">Contemporain</SelectItem>
                  <SelectItem value="traditionnel">Traditionnel</SelectItem>
                  <SelectItem value="provencal">Provençal</SelectItem>
                  <SelectItem value="moderne">Moderne</SelectItem>
                  <SelectItem value="minimaliste">Minimaliste</SelectItem>
                </SelectContent>
              </Select>
              {errors.constructionStyle && (
                <p className="text-sm text-red-500">{errors.constructionStyle.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insulationType">Type d'isolation</Label>
              <Select 
                defaultValue={watch('insulationType')} 
                onValueChange={handleInsulationTypeChange}
              >
                <SelectTrigger id="insulationType">
                  <SelectValue placeholder="Sélectionnez un type d'isolation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Isolation standard</SelectItem>
                  <SelectItem value="renforcee">Isolation renforcée</SelectItem>
                  <SelectItem value="ecologique">Isolation écologique</SelectItem>
                  <SelectItem value="performante">Isolation haute performance</SelectItem>
                </SelectContent>
              </Select>
              {errors.insulationType && (
                <p className="text-sm text-red-500">{errors.insulationType.message?.toString()}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roofingType">Type de toiture</Label>
              <Select 
                defaultValue={watch('roofingType')} 
                onValueChange={handleRoofingTypeChange}
              >
                <SelectTrigger id="roofingType">
                  <SelectValue placeholder="Sélectionnez un type de toiture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuiles">Tuiles</SelectItem>
                  <SelectItem value="ardoises">Ardoises</SelectItem>
                  <SelectItem value="zinc">Zinc</SelectItem>
                  <SelectItem value="terrasse">Toit terrasse</SelectItem>
                  <SelectItem value="vegetalisee">Toiture végétalisée</SelectItem>
                </SelectContent>
              </Select>
              {errors.roofingType && (
                <p className="text-sm text-red-500">{errors.roofingType.message?.toString()}</p>
              )}
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

export default ConstructionDetailsForm;
