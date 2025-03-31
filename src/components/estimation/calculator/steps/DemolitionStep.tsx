
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface DemolitionStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const DemolitionStep: React.FC<DemolitionStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [demolitionType, setDemolitionType] = React.useState<string>(formData.demolitionType || 'none');
  const [existingSurface, setExistingSurface] = React.useState<string | number>(formData.existingSurface || '');
  
  // Define if surface input should be shown
  const showSurfaceInput = demolitionType !== 'none';
  
  const handleSubmit = () => {
    // Calculate demolition costs based on the type and surface
    let surfaceDemo = 0;
    const surfaceValue = typeof existingSurface === 'string' ? parseFloat(existingSurface) : existingSurface;
    
    if (demolitionType !== 'none' && surfaceValue) {
      // Calculate percentage based on demolition type
      let percentage = 0;
      switch(demolitionType) {
        case 'demo25':
          percentage = 0.25;
          break;
        case 'demo50':
          percentage = 0.5;
          break;
        case 'demo75':
          percentage = 0.75;
          break;
        case 'demo100':
          percentage = 1;
          break;
        default:
          percentage = 0;
      }
      
      // Calculate demo surface and cost
      surfaceDemo = surfaceValue * percentage;
      const demoCost = surfaceDemo * 185; // Price per m²
      
      // Update total amount
      const currentMontant = formData.montantT || 0;
      const newMontant = currentMontant + demoCost;
      
      // Update form data with calculations
      updateFormData({
        demolitionType,
        existingSurface: surfaceValue,
        surfaceDemo,
        demoCost,
        montantT: newMontant
      });
    } else {
      // Just update the demolition type if no surface or "none" selected
      updateFormData({
        demolitionType,
        existingSurface: surfaceValue || 0
      });
    }
    
    // Proceed to next step
    goToNextStep();
  };

  // Demolition options
  const demolitionOptions = [
    { value: 'none', label: 'PAS DE DEMOLITION TERRAIN VIERGE' },
    { value: 'demo25', label: 'DEMOLITION DES EXISTANTS 25%' },
    { value: 'demo50', label: 'DEMOLITION DES EXISTANTS 50%' },
    { value: 'demo75', label: 'DEMOLITION DES EXISTANTS 75%' },
    { value: 'demo100', label: 'DEMOLITION DES EXISTANTS 100%' }
  ];

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Démolition</h2>
      
      <RadioGroup 
        value={demolitionType} 
        onValueChange={setDemolitionType}
        className="space-y-3"
      >
        {demolitionOptions.map((option) => (
          <div 
            key={option.value}
            className={`flex items-center space-x-2 p-3 rounded-md border 
              ${demolitionType === option.value ? 'border-blue-500 bg-blue-50' : ''}`}
          >
            <RadioGroupItem 
              value={option.value} 
              id={`demo-${option.value}`}
              className="mr-2"
            />
            <Label 
              htmlFor={`demo-${option.value}`}
              className="font-medium cursor-pointer flex-grow"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {showSurfaceInput && (
        <div className="p-4 border rounded-md bg-gray-50 mt-4">
          <Label 
            htmlFor="existingSurface" 
            className="block mb-2 font-medium"
          >
            Surface de plancher des existants en m²
          </Label>
          <Input
            id="existingSurface"
            type="number"
            value={existingSurface}
            onChange={(e) => setExistingSurface(e.target.value)}
            placeholder="Surface en m²"
            min="1"
            required={showSurfaceInput}
          />
        </div>
      )}
      
      <div className="bg-gray-100 p-3 rounded-md text-center text-lg font-semibold">
        Total travaux : {formData.montantT ? formData.montantT.toLocaleString() : 0} €/HT
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
          disabled={demolitionType === '' || (showSurfaceInput && !existingSurface)}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DemolitionStep;
