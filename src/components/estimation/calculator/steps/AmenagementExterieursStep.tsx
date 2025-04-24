import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ExteriorOption {
  id: string;
  label: string;
  description: string;
}

const AmenagementExterieursStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Determine initial exterior options from formData
  const initialExteriorOptions = {
    hasPool: formData.hasPool || false,
    hasJacuzzi: formData.hasJacuzzi || false,
    hasCarport: formData.hasCarport || false
  };
  
  const [exteriorOptions, setExteriorOptions] = React.useState(initialExteriorOptions);
  
  const exteriorOptionsList: ExteriorOption[] = [
    {
      id: 'hasPool',
      label: 'Piscine',
      description: 'Ajouter une piscine à votre projet'
    },
    {
      id: 'hasJacuzzi',
      label: 'Jacuzzi / Spa',
      description: 'Installer un jacuzzi ou spa extérieur'
    },
    {
      id: 'hasCarport',
      label: 'Carport / Abri voiture',
      description: 'Inclure un abri pour véhicule'
    }
  ];
  
  const handleOptionToggle = (optionId: keyof typeof exteriorOptions) => {
    setExteriorOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };
  
  const anyOptionSelected = Object.values(exteriorOptions).some(value => value);
  
  const handleSubmit = () => {
    // If any option is selected, we'll show details in the next step
    if (anyOptionSelected) {
      updateFormData({
        ...exteriorOptions,
        // Set includeLandscaping flag to indicate we need to show exterior details
        includeLandscaping: anyOptionSelected
      });
    } else {
      // No options selected, skip the details step
      updateFormData({
        hasPool: false,
        hasJacuzzi: false,
        hasCarport: false,
        includeLandscaping: false
      });
    }
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Aménagements Extérieurs</h2>
      <p className="text-gray-600 mb-6">Sélectionnez les aménagements extérieurs que vous souhaitez inclure dans votre projet</p>
      
      <div className="grid grid-cols-1 gap-4">
        {exteriorOptionsList.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              exteriorOptions[option.id as keyof typeof exteriorOptions] ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleOptionToggle(option.id as keyof typeof exteriorOptions)}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <Checkbox 
                  id={option.id}
                  checked={exteriorOptions[option.id as keyof typeof exteriorOptions]}
                  onCheckedChange={() => handleOptionToggle(option.id as keyof typeof exteriorOptions)}
                  className="mr-3"
                />
                <div>
                  <Label htmlFor={option.id} className="font-medium cursor-pointer">{option.label}</Label>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${!anyOptionSelected ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => setExteriorOptions({ hasPool: false, hasJacuzzi: false, hasCarport: false })}
        >
          <CardContent className="p-4">
            <div className="flex items-center">
              <Checkbox 
                id="none"
                checked={!anyOptionSelected}
                onCheckedChange={() => setExteriorOptions({ hasPool: false, hasJacuzzi: false, hasCarport: false })}
                className="mr-3"
              />
              <div>
                <Label htmlFor="none" className="font-medium cursor-pointer">Aucun aménagement extérieur</Label>
                <p className="text-sm text-gray-600 mt-1">Ne pas inclure d'aménagements extérieurs spécifiques</p>
              </div>
            </div>
          </CardContent>
        </Card>
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

export default AmenagementExterieursStep;
