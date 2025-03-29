
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Cpu, Bell, Vacuum, Thermometer } from 'lucide-react';

interface SpecialFeaturesStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const SpecialFeaturesStep: React.FC<SpecialFeaturesStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  // Initialize with form data or defaults
  const [domotic, setDomotic] = React.useState<boolean>(
    formData.domotic || false
  );
  
  const [alarm, setAlarm] = React.useState<boolean>(
    formData.alarm || false
  );
  
  const [centralVacuum, setCentralVacuum] = React.useState<boolean>(
    formData.centralVacuum || false
  );
  
  const [hasAirConditioning, setHasAirConditioning] = React.useState<boolean>(
    formData.hasAirConditioning || false
  );

  const handleSubmit = () => {
    updateFormData({ 
      domotic,
      alarm,
      centralVacuum,
      hasAirConditioning
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Équipements spéciaux</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="domotic" 
                  checked={domotic}
                  onCheckedChange={(checked) => setDomotic(checked as boolean)}
                />
                <div>
                  <Label htmlFor="domotic" className="text-base font-medium flex items-center">
                    <Cpu className="h-4 w-4 text-blue-400 mr-2" />
                    Domotique
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Système de contrôle intelligent de la maison
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="alarm" 
                  checked={alarm}
                  onCheckedChange={(checked) => setAlarm(checked as boolean)}
                />
                <div>
                  <Label htmlFor="alarm" className="text-base font-medium flex items-center">
                    <Bell className="h-4 w-4 text-red-400 mr-2" />
                    Système d'alarme
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Surveillance et sécurité
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="central-vacuum" 
                  checked={centralVacuum}
                  onCheckedChange={(checked) => setCentralVacuum(checked as boolean)}
                />
                <div>
                  <Label htmlFor="central-vacuum" className="text-base font-medium flex items-center">
                    <Vacuum className="h-4 w-4 text-gray-400 mr-2" />
                    Aspiration centralisée
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Système d'aspiration intégré
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="air-conditioning" 
                  checked={hasAirConditioning}
                  onCheckedChange={(checked) => setHasAirConditioning(checked as boolean)}
                />
                <div>
                  <Label htmlFor="air-conditioning" className="text-base font-medium flex items-center">
                    <Thermometer className="h-4 w-4 text-blue-400 mr-2" />
                    Climatisation
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Système de climatisation
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

export default SpecialFeaturesStep;
