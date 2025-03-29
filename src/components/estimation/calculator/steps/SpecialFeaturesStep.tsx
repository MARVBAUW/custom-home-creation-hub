
import React, { useState } from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle, Zap, Wind, VacuumCleaner } from 'lucide-react';

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
  // Initialize state with form data or defaults
  const [domotic, setDomotic] = useState<boolean>(formData.domotic || false);
  const [alarm, setAlarm] = useState<boolean>(formData.alarm || false);
  const [centralVacuum, setCentralVacuum] = useState<boolean>(formData.centralVacuum || false);
  const [smartHome, setSmartHome] = useState<boolean>(formData.smartHome || false);
  const [solarPanels, setSolarPanels] = useState<boolean>(formData.solarPanels || false);

  const handleSubmit = () => {
    updateFormData({
      domotic,
      alarm,
      centralVacuum,
      smartHome,
      solarPanels,
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 pb-6">
          <h3 className="text-lg font-medium mb-6">Équipements spéciaux</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
              <Checkbox 
                id="domotic"
                checked={domotic}
                onCheckedChange={(checked) => setDomotic(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="domotic" className="text-base font-medium flex items-center">
                  <Home className="h-4 w-4 text-blue-500 mr-2" />
                  Domotique
                </Label>
                <p className="text-sm text-gray-500">
                  Système de contrôle intelligent pour votre maison (portes, éclairage, chauffage)
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
              <Checkbox 
                id="alarm"
                checked={alarm}
                onCheckedChange={(checked) => setAlarm(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="alarm" className="text-base font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 text-blue-500 mr-2" />
                  Système d'alarme
                </Label>
                <p className="text-sm text-gray-500">
                  Alarme anti-intrusion avec détecteurs de mouvement et sirène
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
              <Checkbox 
                id="central-vacuum"
                checked={centralVacuum}
                onCheckedChange={(checked) => setCentralVacuum(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="central-vacuum" className="text-base font-medium flex items-center">
                  <VacuumCleaner className="h-4 w-4 text-blue-500 mr-2" />
                  Aspiration centralisée
                </Label>
                <p className="text-sm text-gray-500">
                  Système d'aspiration intégré aux murs avec prises dans chaque pièce
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
              <Checkbox 
                id="smart-home"
                checked={smartHome}
                onCheckedChange={(checked) => setSmartHome(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="smart-home" className="text-base font-medium flex items-center">
                  <Zap className="h-4 w-4 text-blue-500 mr-2" />
                  Habitat connecté
                </Label>
                <p className="text-sm text-gray-500">
                  Équipements connectés (thermostats, détecteurs de fumée, caméras)
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
              <Checkbox 
                id="solar-panels"
                checked={solarPanels}
                onCheckedChange={(checked) => setSolarPanels(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="solar-panels" className="text-base font-medium flex items-center">
                  <Wind className="h-4 w-4 text-blue-500 mr-2" />
                  Panneaux solaires
                </Label>
                <p className="text-sm text-gray-500">
                  Production d'électricité ou d'eau chaude par panneaux solaires
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
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
