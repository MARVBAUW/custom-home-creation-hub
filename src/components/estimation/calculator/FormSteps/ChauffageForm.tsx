
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Thermometer, Leaf, Gauge, Wind } from 'lucide-react';

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  // Initialize state with the default values or the current formData values
  const [heatingType, setHeatingType] = useState<string>(
    defaultValues?.heatingType || formData.heatingType || 'standard'
  );
  
  const [hasAirConditioning, setHasAirConditioning] = useState<boolean>(
    defaultValues?.hasAirConditioning || formData.hasAirConditioning || false
  );

  const handleSubmit = () => {
    // Create the data object to pass to the submit handler
    const data = { heatingType, hasAirConditioning };
    
    // Use the provided onSubmit handler or fall back to default behavior
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData({ heatingType, hasAirConditioning });
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Type de chauffage et climatisation</h2>
      <p className="text-muted-foreground">Sélectionnez le type de chauffage que vous souhaitez pour votre projet.</p>
      
      <RadioGroup value={heatingType} onValueChange={setHeatingType} className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Gauge className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="standard" id="heating-standard" />
              <Label htmlFor="heating-standard">Standard</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Le meilleur rapport qualité/prix</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'floorHeating' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Thermometer className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="floorHeating" id="heating-floor" />
              <Label htmlFor="heating-floor">Plancher chauffant</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Solution économique à long terme</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'heatPump' ? 'border-blue-500 bg-blue-50' : ''}`}>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Leaf className="h-12 w-12 text-blue-500 mb-4" />
            <div className="space-x-2">
              <RadioGroupItem value="heatPump" id="heating-pump" />
              <Label htmlFor="heating-pump">Pompe à chaleur</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Solution écologique pour le chauffage</p>
          </CardContent>
        </Card>
      </RadioGroup>
      
      <div className="border rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-3">
          <Checkbox 
            id="air-conditioning" 
            checked={hasAirConditioning}
            onCheckedChange={(checked) => setHasAirConditioning(checked as boolean)}
          />
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-blue-500" />
            <Label htmlFor="air-conditioning" className="font-medium">
              Inclure la climatisation
            </Label>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 ml-7">
          Ajoutez un système de climatisation pour votre confort en été
        </p>
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
