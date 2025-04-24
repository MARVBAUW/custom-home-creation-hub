import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Sun, Wind, Droplets } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface EnergyOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const EnergiesRenouvelablesStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const initialSelectedOptions = formData.renewableEnergyTypes || [];
  
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(initialSelectedOptions);
  
  const energyOptions: EnergyOption[] = [
    {
      id: 'solar_panels',
      label: 'Panneaux solaires photovoltaïques',
      icon: <Sun className="h-5 w-5 text-amber-500" />
    },
    {
      id: 'solar_thermal',
      label: 'Panneaux solaires thermiques',
      icon: <Sun className="h-5 w-5 text-orange-500" />
    },
    {
      id: 'heat_pump',
      label: 'Pompe à chaleur',
      icon: <Wind className="h-5 w-5 text-blue-500" />
    },
    {
      id: 'rainwater',
      label: 'Récupération des eaux de pluie',
      icon: <Droplets className="h-5 w-5 text-blue-400" />
    }
  ];
  
  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  const handleSubmit = () => {
    updateFormData({
      renewableEnergyTypes: selectedOptions,
      hasSolarPanels: selectedOptions.includes('solar_panels') || selectedOptions.includes('solar_thermal'),
      hasHeatPump: selectedOptions.includes('heat_pump')
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Énergies Renouvelables</h2>
      <p className="text-gray-600 mb-6">Sélectionnez les énergies renouvelables que vous souhaitez intégrer à votre projet</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {energyOptions.map((option) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-md ${selectedOptions.includes(option.id) ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => handleOptionToggle(option.id)}
            >
              <CardContent className="p-4 flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {option.icon}
                    <Label htmlFor={option.id} className="ml-2 cursor-pointer">{option.label}</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${selectedOptions.length === 0 ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setSelectedOptions([])}
          >
            <CardContent className="p-4 flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="none"
                  checked={selectedOptions.length === 0}
                  onCheckedChange={() => setSelectedOptions([])}
                  className="mr-2"
                />
                <Label htmlFor="none" className="cursor-pointer">Aucune énergie renouvelable</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          onClick={handleSubmit}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EnergiesRenouvelablesStep;
