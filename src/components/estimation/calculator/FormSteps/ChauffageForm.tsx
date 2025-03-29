
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Thermometer, Leaf, Wallet, Ban, Wind } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  // Initialize state with the default value or the current formData value
  const [heatingType, setHeatingType] = useState<string>(
    defaultValues?.heatingType || formData.heatingType || 'standard'
  );
  
  const [hasAirConditioning, setHasAirConditioning] = useState<boolean>(
    defaultValues?.hasAirConditioning || formData.hasAirConditioning || false
  );

  const handleSubmit = () => {
    // Create the data object to pass to the submit handler
    const data = { 
      heatingType, 
      hasAirConditioning 
    };
    
    // Use the provided onSubmit handler or fall back to default behavior
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Type de chauffage</h2>
      <p className="text-muted-foreground">Sélectionnez le type de chauffage que vous préférez pour votre projet.</p>
      
      <RadioGroup value={heatingType} onValueChange={setHeatingType} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Thermometer className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="standard" id="heating-standard" />
              <Label htmlFor="heating-standard">Meilleur rapport qualité/prix</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Système de chauffage avec le meilleur rapport qualité/prix</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'eco' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Leaf className="h-12 w-12 text-green-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="eco" id="heating-eco" />
              <Label htmlFor="heating-eco">Le plus écologique</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Système de chauffage respectueux de l'environnement</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'economic' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Wallet className="h-12 w-12 text-amber-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="economic" id="heating-economic" />
              <Label htmlFor="heating-economic">Le plus économique</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Solution de chauffage au coût d'exploitation réduit</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Ban className="h-12 w-12 text-gray-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="non_concerne" id="heating-none" />
              <Label htmlFor="heating-none">Non concerné</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Pas de chauffage nécessaire pour ce projet</p>
          </CardContent>
        </Card>
      </RadioGroup>
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Climatisation</h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="air-conditioning" 
            checked={hasAirConditioning}
            onCheckedChange={(checked) => setHasAirConditioning(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="air-conditioning"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
            >
              <Wind className="h-4 w-4 mr-2 text-blue-500" />
              Inclure un système de climatisation
            </label>
            <p className="text-sm text-muted-foreground">
              Adapté pour maintenir une température idéale toute l'année
            </p>
          </div>
        </div>
      </div>
      
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

export default ChauffageForm;
