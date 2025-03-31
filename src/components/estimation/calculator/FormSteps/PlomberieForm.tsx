
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { calculatePlumbingCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';
import { Droplet, Waves, Gauge } from 'lucide-react';

const PlomberieForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [plumbingType, setPlumbingType] = useState<string>(
    formData.plumbingType || 'basic'
  );

  const handleSubmit = () => {
    // Get the surface area
    const surface = ensureNumber(formData.surface, 0);
    
    // Calculate the cost based on plumbing type and surface
    const additionalCost = calculatePlumbingCost(plumbingType, surface);

    // Update form data with plumbing type and additional cost
    updateFormData({
      plumbingType,
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
        <h3 className="text-lg font-medium mb-4">Plomberie</h3>
        
        <div>
          <Label className="mb-2 block">Niveau de prestation en plomberie</Label>
          <RadioGroup 
            value={plumbingType} 
            onValueChange={setPlumbingType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('basic')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Droplet className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="basic" id="plumbing-basic" className="sr-only" />
                <Label htmlFor="plumbing-basic" className="font-medium">Prestations de base</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Installation sanitaire standard conforme aux normes
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Waves className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standard" id="plumbing-standard" className="sr-only" />
                <Label htmlFor="plumbing-standard" className="font-medium">Prestations avancées</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Tuyauterie renforcée et points d'eau supplémentaires
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Gauge className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="premium" id="plumbing-premium" className="sr-only" />
                <Label htmlFor="plumbing-premium" className="font-medium">Prestations haut de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Système complet avec matériaux premium et réseaux optimisés
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${plumbingType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPlumbingType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <RadioGroupItem value="non_concerne" id="plumbing-non_concerne" className="sr-only" />
                <Label htmlFor="plumbing-non_concerne" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas d'installation de plomberie requise
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
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

export default PlomberieForm;
