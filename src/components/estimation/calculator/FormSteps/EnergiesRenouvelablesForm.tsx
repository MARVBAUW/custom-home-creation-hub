
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ensureNumber } from '../utils/typeConversions';
import { calculateRenewableEnergyCost } from '../utils/montantUtils';
import { BatteryCharging, Zap, Sun, Wind } from 'lucide-react';

const EnergiesRenouvelablesForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [energyType, setEnergyType] = useState<string>(
    formData.renewableEnergyType || 'standard'
  );

  const handleSubmit = () => {
    // Get the current total amount
    const currentTotal = ensureNumber(formData.montantT);
    
    // Calculate the additional cost for renewable energy
    const additionalCost = calculateRenewableEnergyCost(energyType, currentTotal);

    // Update form data with renewable energy type and additional cost
    updateFormData({
      renewableEnergyType: energyType,
      montantT: currentTotal + additionalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Énergies Renouvelables</h3>
        
        <div>
          <Label className="mb-4 block">Choisissez votre niveau d'intégration d'énergies renouvelables</Label>
          <RadioGroup 
            value={energyType} 
            onValueChange={setEnergyType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${energyType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEnergyType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <BatteryCharging className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="standard" id="energy-standard" className="sr-only" />
                <Label htmlFor="energy-standard" className="font-medium">Base Réglementaire</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum obligatoire selon la réglementation en vigueur
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-gray-500">+0%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${energyType === 'optimized' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEnergyType('optimized')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                <RadioGroupItem value="optimized" id="energy-optimized" className="sr-only" />
                <Label htmlFor="energy-optimized" className="font-medium">Optimisation Énergétique</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Amélioration de l'efficacité énergétique du bâtiment
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-green-600">+3.5% du budget</span>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${energyType === 'semiAutonomous' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEnergyType('semiAutonomous')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <Sun className="h-8 w-8 text-orange-500 mb-2" />
                <RadioGroupItem value="semiAutonomous" id="energy-semiAutonomous" className="sr-only" />
                <Label htmlFor="energy-semiAutonomous" className="font-medium">Semi Autonomie Énergétique</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Production d'une partie significative des besoins énergétiques
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-green-600">+7% du budget</span>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${energyType === 'autonomous' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEnergyType('autonomous')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <Wind className="h-8 w-8 text-emerald-500 mb-2" />
                <RadioGroupItem value="autonomous" id="energy-autonomous" className="sr-only" />
                <Label htmlFor="energy-autonomous" className="font-medium">Autonomie Énergétique</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Quasi-autosuffisance énergétique avec stockage et gestion intelligente
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-green-600">+11% du budget</span>
                </div>
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

export default EnergiesRenouvelablesForm;
