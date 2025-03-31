
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Thermometer, Leaf, Wallet, Ban, Wind } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { calculateHeatingCost, ensureNumber } from '../utils/montantUtils';

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state with the default value or the current formData value
  const [heatingType, setHeatingType] = useState<string>(
    formData.heatingType || 'standard'
  );
  
  const [hasAirConditioning, setHasAirConditioning] = useState<boolean>(
    formData.hasAirConditioning || false
  );

  const handleSubmit = () => {
    // Get the surface area
    const surface = ensureNumber(formData.surface, 0);
    
    // Calculate the cost based on heating type, air conditioning, and surface
    const additionalCost = calculateHeatingCost(heatingType, hasAirConditioning, surface);
    
    // Update form data with heating options and additional cost
    updateFormData({
      heatingType,
      hasAirConditioning,
      montantT: (formData.montantT || 0) + additionalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Type de chauffage</h3>
        
        <RadioGroup value={heatingType} onValueChange={setHeatingType} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('standard')}
          >
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Thermometer className="h-12 w-12 text-blue-500 mb-4" />
              <RadioGroupItem value="standard" id="heating-standard" className="sr-only" />
              <Label htmlFor="heating-standard" className="font-medium">Meilleur rapport qualité/prix</Label>
              <p className="text-sm text-muted-foreground mt-2">Système de chauffage avec le meilleur rapport qualité/prix</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'eco' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('eco')}
          >
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Leaf className="h-12 w-12 text-green-500 mb-4" />
              <RadioGroupItem value="eco" id="heating-eco" className="sr-only" />
              <Label htmlFor="heating-eco" className="font-medium">Le plus écologique</Label>
              <p className="text-sm text-muted-foreground mt-2">Système de chauffage respectueux de l'environnement</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'economic' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('economic')}
          >
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Wallet className="h-12 w-12 text-amber-500 mb-4" />
              <RadioGroupItem value="economic" id="heating-economic" className="sr-only" />
              <Label htmlFor="heating-economic" className="font-medium">Le plus économique</Label>
              <p className="text-sm text-muted-foreground mt-2">Solution de chauffage au coût d'exploitation réduit</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setHeatingType('non_concerne')}
          >
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Ban className="h-12 w-12 text-gray-500 mb-4" />
              <RadioGroupItem value="non_concerne" id="heating-none" className="sr-only" />
              <Label htmlFor="heating-none" className="font-medium">Non concerné</Label>
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
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Continuer
          </Button>
        </div>
        
        {formData.montantT && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Total estimé: {formData.montantT.toLocaleString()} €</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChauffageForm;
