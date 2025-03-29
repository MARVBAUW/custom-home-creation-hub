
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Waves, Utensils, Home } from 'lucide-react';

interface ExteriorFeaturesStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const ExteriorFeaturesStep: React.FC<ExteriorFeaturesStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  // Initialize with form data or defaults
  const [pool, setPool] = React.useState<boolean>(
    formData.pool || false
  );
  
  const [terrace, setTerrace] = React.useState<boolean>(
    formData.terrace || false
  );
  
  const [outdoorKitchen, setOutdoorKitchen] = React.useState<boolean>(
    formData.outdoorKitchen || false
  );

  const handleSubmit = () => {
    updateFormData({ 
      pool,
      terrace,
      outdoorKitchen
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Aménagements extérieurs</h3>
        
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
                    <Waves className="h-4 w-4 text-blue-400 mr-2" />
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
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
        >
          Précédent
        </Button>
        
        <Button 
          type="button" 
          onClick={handleSubmit}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ExteriorFeaturesStep;
