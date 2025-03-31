
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ensureNumber } from '../utils/montantUtils';
import { Trees, Flower2, Droplets, CookingPot } from 'lucide-react';

const AmenagementExtForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [hasLandscaping, setHasLandscaping] = useState<boolean>(
    formData.includeLandscaping || false
  );
  
  const [hasPool, setHasPool] = useState<boolean>(
    formData.hasPool || false
  );
  
  const [hasTerrace, setHasTerrace] = useState<boolean>(
    formData.hasTerrace || false
  );
  
  const [hasOutdoorKitchen, setHasOutdoorKitchen] = useState<boolean>(
    formData.hasOutdoorKitchen || false
  );

  const handleSubmit = () => {
    // Update form data with exterior features
    updateFormData({
      includeLandscaping: hasLandscaping,
      hasPool: hasPool,
      hasTerrace: hasTerrace,
      hasOutdoorKitchen: hasOutdoorKitchen
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Aménagements extérieurs</h3>
        
        <div className="space-y-4">
          <Label className="mb-2 block">Quels aménagements extérieurs souhaitez-vous ?</Label>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="landscaping" 
              checked={hasLandscaping}
              onCheckedChange={(checked) => setHasLandscaping(checked as boolean)}
            />
            <div className="grid gap-1">
              <Label htmlFor="landscaping" className="flex items-center gap-2">
                <Trees className="h-4 w-4 text-green-500" />
                Aménagement paysager
              </Label>
              <p className="text-sm text-gray-500">
                Plantation d'arbres, arbustes, gazon, etc.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pool" 
              checked={hasPool}
              onCheckedChange={(checked) => setHasPool(checked as boolean)}
            />
            <div className="grid gap-1">
              <Label htmlFor="pool" className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                Piscine
              </Label>
              <p className="text-sm text-gray-500">
                Construction d'une piscine
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terrace" 
              checked={hasTerrace}
              onCheckedChange={(checked) => setHasTerrace(checked as boolean)}
            />
            <div className="grid gap-1">
              <Label htmlFor="terrace" className="flex items-center gap-2">
                <Flower2 className="h-4 w-4 text-yellow-500" />
                Terrasse
              </Label>
              <p className="text-sm text-gray-500">
                Aménagement d'une terrasse extérieure
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="outdoor-kitchen" 
              checked={hasOutdoorKitchen}
              onCheckedChange={(checked) => setHasOutdoorKitchen(checked as boolean)}
            />
            <div className="grid gap-1">
              <Label htmlFor="outdoor-kitchen" className="flex items-center gap-2">
                <CookingPot className="h-4 w-4 text-red-500" />
                Cuisine extérieure
              </Label>
              <p className="text-sm text-gray-500">
                Installation d'une cuisine d'été
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

export default AmenagementExtForm;
