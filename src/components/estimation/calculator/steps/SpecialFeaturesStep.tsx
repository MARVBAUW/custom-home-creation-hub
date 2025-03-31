
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRightIcon, ArrowLeftIcon, Leaf, Droplet, Sun } from 'lucide-react';
import { FormData } from '../types';

interface SpecialFeaturesStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const SpecialFeaturesStep: React.FC<SpecialFeaturesStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [solarPanels, setSolarPanels] = React.useState<boolean>(!!formData.solarPanels);
  const [rainwaterHarvesting, setRainwaterHarvesting] = React.useState<boolean>(!!formData.rainwaterHarvesting);
  const [homeAutomation, setHomeAutomation] = React.useState<boolean>(!!formData.homeAutomation);
  const [energyEfficiency, setEnergyEfficiency] = React.useState<boolean>(!!formData.energyEfficiency);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      solarPanels,
      rainwaterHarvesting,
      homeAutomation,
      energyEfficiency,
      // Auto-add eco solutions flag if any eco options are selected
      includeEcoSolutions: solarPanels || rainwaterHarvesting || energyEfficiency
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Options spéciales</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Options écologiques et spéciales</Label>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="solarPanels" 
                checked={solarPanels}
                onCheckedChange={(checked) => setSolarPanels(!!checked)}
              />
              <div>
                <Label htmlFor="solarPanels" className="text-base font-medium flex items-center">
                  <Sun className="h-4 w-4 text-amber-500 mr-2" />
                  Panneaux solaires
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Installation de panneaux solaires photovoltaïques
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="rainwaterHarvesting" 
                checked={rainwaterHarvesting}
                onCheckedChange={(checked) => setRainwaterHarvesting(!!checked)}
              />
              <div>
                <Label htmlFor="rainwaterHarvesting" className="text-base font-medium flex items-center">
                  <Droplet className="h-4 w-4 text-blue-500 mr-2" />
                  Récupération d'eau de pluie
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Système de récupération et traitement des eaux pluviales
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="homeAutomation" 
                checked={homeAutomation}
                onCheckedChange={(checked) => setHomeAutomation(!!checked)}
              />
              <div>
                <Label htmlFor="homeAutomation" className="text-base font-medium flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 text-purple-500 mr-2"
                  >
                    <path d="M5 12a7 7 0 0 1 7-7" />
                    <path d="M9 17a7 7 0 0 0 7-7" />
                    <circle cx="8" cy="17" r="2" />
                    <circle cx="17" cy="8" r="2" />
                  </svg>
                  Domotique
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Système de contrôle intelligent de la maison
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="energyEfficiency" 
                checked={energyEfficiency}
                onCheckedChange={(checked) => setEnergyEfficiency(!!checked)}
              />
              <div>
                <Label htmlFor="energyEfficiency" className="text-base font-medium flex items-center">
                  <Leaf className="h-4 w-4 text-green-500 mr-2" />
                  Solutions haute efficacité énergétique
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Matériaux et systèmes pour une meilleure performance énergétique
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SpecialFeaturesStep;
