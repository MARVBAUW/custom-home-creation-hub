import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pool, Utensils, Flower, Home } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AmenagementExtForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues
}) => {
  // Initialize with form data or defaults
  const [pool, setPool] = React.useState<boolean>(
    formData.pool || defaultValues?.pool || false
  );
  
  const [terrace, setTerrace] = React.useState<boolean>(
    formData.terrace || defaultValues?.terrace || false
  );
  
  const [outdoorKitchen, setOutdoorKitchen] = React.useState<boolean>(
    formData.outdoorKitchen || defaultValues?.outdoorKitchen || false
  );
  
  const [landscapingType, setLandscapingType] = React.useState<string>(
    formData.landscapingType || defaultValues?.landscapingType || ''
  );
  
  const [gardenSurface, setGardenSurface] = React.useState<string>(
    formData.gardenSurface?.toString() || defaultValues?.gardenSurface?.toString() || ''
  );
  
  const handleSubmit = () => {
    const data = {
      pool,
      terrace,
      outdoorKitchen,
      landscapingType,
      gardenSurface: gardenSurface !== '' ? Number(gardenSurface) : undefined
    };
    
    updateFormData(data);
    
    if (typeof props.onSubmit === 'function') {
      props.onSubmit(data);
    } else {
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-xl font-medium">Aménagements extérieurs</h3>
        <p className="text-gray-500">
          Sélectionnez les aménagements extérieurs que vous souhaitez inclure dans votre projet.
        </p>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="garden-surface">Surface du jardin (m²)</Label>
            <Input
              id="garden-surface"
              type="number"
              placeholder="Ex: 500"
              value={gardenSurface}
              onChange={(e) => setGardenSurface(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="landscaping-type">Type d'aménagement paysager</Label>
            <Select 
              value={landscapingType} 
              onValueChange={setLandscapingType}
            >
              <SelectTrigger id="landscaping-type">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal (pelouse simple)</SelectItem>
                <SelectItem value="standard">Standard (pelouse, arbustes)</SelectItem>
                <SelectItem value="elaborate">Élaboré (jardin paysager)</SelectItem>
                <SelectItem value="luxury">Luxe (jardin d'architecte)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="pool" 
                  checked={pool}
                  onCheckedChange={(checked) => setPool(checked as boolean)}
                />
                <div>
                  <Label htmlFor="pool" className="text-base font-medium flex items-center">
                    <Pool className="h-4 w-4 text-blue-400 mr-2" />
                    Piscine
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Piscine extérieure
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terrace" 
                  checked={terrace}
                  onCheckedChange={(checked) => setTerrace(checked as boolean)}
                />
                <div>
                  <Label htmlFor="terrace" className="text-base font-medium flex items-center">
                    <Home className="h-4 w-4 text-gray-400 mr-2" />
                    Terrasse
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Terrasse aménagée
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="outdoor-kitchen" 
                  checked={outdoorKitchen}
                  onCheckedChange={(checked) => setOutdoorKitchen(checked as boolean)}
                />
                <div>
                  <Label htmlFor="outdoor-kitchen" className="text-base font-medium flex items-center">
                    <Utensils className="h-4 w-4 text-amber-400 mr-2" />
                    Cuisine extérieure
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Cuisine d'été ou barbecue fixe
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
          >
            Précédent
          </Button>
          
          <Button 
            onClick={handleSubmit}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AmenagementExtForm;
