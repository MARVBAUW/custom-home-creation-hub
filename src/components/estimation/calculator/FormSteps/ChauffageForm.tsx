
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Thermometer, Wind, Flame } from 'lucide-react';

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [heatingType, setHeatingType] = useState<string>(
    defaultValues?.heatingType || formData.heatingType || 'standard'
  );
  
  const [hasAirConditioning, setHasAirConditioning] = useState<boolean>(
    defaultValues?.hasAirConditioning !== undefined 
      ? defaultValues.hasAirConditioning 
      : !!formData.hasAirConditioning
  );

  const handleSubmit = () => {
    // Create the data object to pass to the submit handler
    const data = { 
      heatingType,
      hasAirConditioning
    };
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Système de chauffage et climatisation</h2>
      <p className="text-muted-foreground">Sélectionnez le type de chauffage souhaité et indiquez si vous voulez la climatisation.</p>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Type de chauffage</h3>
        <RadioGroup value={heatingType} onValueChange={setHeatingType} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Thermometer className="h-12 w-12 text-blue-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="standard" id="heating-standard" />
                <Label htmlFor="heating-standard">Standard</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Système de chauffage conventionnel</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'floorHeating' ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Flame className="h-12 w-12 text-blue-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="floorHeating" id="heating-floor" />
                <Label htmlFor="heating-floor">Plancher chauffant</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Chauffage au sol pour un confort optimal</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'heatPump' ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Wind className="h-12 w-12 text-blue-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="heatPump" id="heating-pump" />
                <Label htmlFor="heating-pump">Pompe à chaleur</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Solution écologique et économique</p>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">Climatisation</h3>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="airConditioning" 
            checked={hasAirConditioning}
            onCheckedChange={(checked) => setHasAirConditioning(checked === true)}
          />
          <Label htmlFor="airConditioning">Je souhaite ajouter un système de climatisation</Label>
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
