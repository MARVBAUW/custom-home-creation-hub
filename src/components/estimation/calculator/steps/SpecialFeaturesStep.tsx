
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Leaf, Sun, Wind, Droplet } from 'lucide-react';

interface SpecialFeaturesStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const SpecialFeaturesStepProps: React.FC<SpecialFeaturesStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  // Initialize with form data or defaults
  const [solarPanels, setSolarPanels] = React.useState<boolean>(
    formData.solarPanelType ? true : false
  );
  
  const [rainwaterHarvesting, setRainwaterHarvesting] = React.useState<boolean>(
    formData.rainwaterHarvesting || false
  );
  
  const [ecoInsulation, setEcoInsulation] = React.useState<boolean>(
    formData.ecoFriendlyInsulation || false
  );
  
  const handleContinue = () => {
    updateFormData({ 
      solarPanelType: solarPanels ? 'standard' : undefined,
      rainwaterHarvesting,
      ecoFriendlyInsulation: ecoInsulation
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Options écologiques et spéciales</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="solar-panels" 
                  checked={solarPanels}
                  onCheckedChange={(checked) => setSolarPanels(checked as boolean)}
                />
                <div>
                  <Label htmlFor="solar-panels" className="text-base font-medium flex items-center">
                    <Sun className="h-4 w-4 text-orange-400 mr-2" />
                    Panneaux solaires
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Installation de panneaux photovoltaïques
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="rainwater" 
                  checked={rainwaterHarvesting}
                  onCheckedChange={(checked) => setRainwaterHarvesting(checked as boolean)}
                />
                <div>
                  <Label htmlFor="rainwater" className="text-base font-medium flex items-center">
                    <Droplet className="h-4 w-4 text-blue-400 mr-2" />
                    Récupération d'eau de pluie
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Système de collecte et stockage d'eau de pluie
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="eco-insulation" 
                  checked={ecoInsulation}
                  onCheckedChange={(checked) => setEcoInsulation(checked as boolean)}
                />
                <div>
                  <Label htmlFor="eco-insulation" className="text-base font-medium flex items-center">
                    <Leaf className="h-4 w-4 text-green-400 mr-2" />
                    Isolation écologique
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Matériaux d'isolation naturels et écologiques
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleContinue}
          className="w-full"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default SpecialFeaturesStepProps;
