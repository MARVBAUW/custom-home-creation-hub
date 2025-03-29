
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Droplet, Cloud, CloudDrizzle, Ban } from 'lucide-react';

const PlomberieForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  // Initialize state with the default value or the current formData value
  const [plumbingType, setPlumbingType] = useState<string>(
    defaultValues?.plumbingType || formData.plumbingType || 'standard'
  );

  const handleSubmit = () => {
    // Create the data object to pass to the submit handler
    const data = { plumbingType };
    
    // Use the provided onSubmit handler or fall back to default behavior
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData({ plumbingType });
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Type d'installation de plomberie</h2>
      <p className="text-muted-foreground">Sélectionnez le type d'installation de plomberie que vous souhaitez pour votre projet.</p>
      
      <RadioGroup value={plumbingType} onValueChange={setPlumbingType} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Droplet className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="basic" id="plumbing-basic" />
              <Label htmlFor="plumbing-basic">Prestations de base</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Installation de plomberie standard avec le minimum requis</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Cloud className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="standard" id="plumbing-standard" />
              <Label htmlFor="plumbing-standard">Prestations avancées</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Installation de plomberie confortable avec des options supplémentaires</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <CloudDrizzle className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="premium" id="plumbing-premium" />
              <Label htmlFor="plumbing-premium">Prestations haut de gamme</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Installation de plomberie haut de gamme avec éléments de qualité supérieure</p>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Ban className="h-12 w-12 text-gray-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="non_concerne" id="plumbing-non-concerne" />
              <Label htmlFor="plumbing-non-concerne">Non concerné</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Pas de travaux de plomberie nécessaires</p>
          </CardContent>
        </Card>
      </RadioGroup>
      
      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={goToPreviousStep}>
          Précédent
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default PlomberieForm;
