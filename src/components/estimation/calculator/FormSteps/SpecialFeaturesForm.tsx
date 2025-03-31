
import React from 'react';
import { FormData } from '../types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, Zap, Droplets, HomeIcon, Lightbulb } from 'lucide-react';

interface SpecialFeaturesFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const SpecialFeaturesForm: React.FC<SpecialFeaturesFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [solarPanels, setSolarPanels] = React.useState<boolean>(formData.solarPanels || false);
  const [rainwaterHarvesting, setRainwaterHarvesting] = React.useState<boolean>(formData.rainwaterHarvesting || false);
  const [homeAutomation, setHomeAutomation] = React.useState<boolean>(formData.homeAutomation || false);
  const [energyEfficiency, setEnergyEfficiency] = React.useState<boolean>(formData.energyEfficiency || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      solarPanels,
      rainwaterHarvesting,
      homeAutomation,
      energyEfficiency
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Fonctionnalités spéciales</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Quelles fonctionnalités spéciales souhaitez-vous inclure ?</Label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox 
                  id="solarPanels" 
                  checked={solarPanels}
                  onCheckedChange={(checked) => setSolarPanels(checked as boolean)}
                />
                <Label htmlFor="solarPanels" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p>Panneaux solaires</p>
                    <p className="text-sm text-gray-500">Production d'énergie renouvelable</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox 
                  id="rainwaterHarvesting" 
                  checked={rainwaterHarvesting}
                  onCheckedChange={(checked) => setRainwaterHarvesting(checked as boolean)}
                />
                <Label htmlFor="rainwaterHarvesting" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div>
                    <p>Récupération des eaux de pluie</p>
                    <p className="text-sm text-gray-500">Système de collecte et stockage</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox 
                  id="homeAutomation" 
                  checked={homeAutomation}
                  onCheckedChange={(checked) => setHomeAutomation(checked as boolean)}
                />
                <Label htmlFor="homeAutomation" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <HomeIcon className="h-4 w-4 text-purple-500" />
                  <div>
                    <p>Domotique</p>
                    <p className="text-sm text-gray-500">Contrôle intelligent de la maison</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox 
                  id="energyEfficiency" 
                  checked={energyEfficiency}
                  onCheckedChange={(checked) => setEnergyEfficiency(checked as boolean)}
                />
                <Label htmlFor="energyEfficiency" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Lightbulb className="h-4 w-4 text-green-500" />
                  <div>
                    <p>Haute efficacité énergétique</p>
                    <p className="text-sm text-gray-500">Isolation renforcée, matériaux écologiques</p>
                  </div>
                </Label>
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

export default SpecialFeaturesForm;
