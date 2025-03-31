
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ensureNumber, ensureBoolean } from '../utils/typeConversions';

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
  
  // Calculate demolition costs
  const calculateDemolitionCosts = (): number => {
    if (demolitionType === 'none') {
      return ensureNumber(formData.montantT, 0); // No change
    }
    
    const existingSurfaceValue = ensureNumber(existingSurface, 0);
    let demolitionMultiplier = 0;
    
    // Set the multiplier based on the demolition type
    switch (demolitionType) {
      case '25':
        demolitionMultiplier = 0.25;
        break;
      case '50':
        demolitionMultiplier = 0.5;
        break;
      case '75':
        demolitionMultiplier = 0.75;
        break;
      case '100':
        demolitionMultiplier = 1;
        break;
      default:
        demolitionMultiplier = 0;
    }
    
    // Calculate the demolition area and cost
    const demolitionArea = existingSurfaceValue * demolitionMultiplier;
    const demolitionCost = demolitionArea * 185; // Price per m² for demolition
    
    // Add to the existing montantT or initialize it
    const currentMontantT = ensureNumber(formData.montantT, 0);
    return currentMontantT + demolitionCost;
  };
  
  // Handle input change for existing surface
  const handleExistingSurfaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExistingSurface(e.target.value);
  };
  
  const handleSubmit = () => {
    let dataToUpdate: Partial<FormData> = {
      demolitionType
    };
    
    // Only include existingSurface if demolition is required
    if (demolitionType !== 'none') {
      dataToUpdate.existingSurface = existingSurface;
    }
    
    // Calculate and update montantT
    const updatedMontantT = calculateDemolitionCosts();
    dataToUpdate.montantT = updatedMontantT;
    
    // Update the form data
    updateFormData(dataToUpdate);
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Démolition</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          État de la démolition <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={demolitionType} 
          onValueChange={setDemolitionType}
          className="grid grid-cols-1 gap-3 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${demolitionType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDemolitionType('none')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="none" id="demolition-none" className="mr-2" />
              <Label htmlFor="demolition-none" className="cursor-pointer">Pas de démolition (terrain vierge)</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${demolitionType === '25' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDemolitionType('25')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="25" id="demolition-25" className="mr-2" />
              <Label htmlFor="demolition-25" className="cursor-pointer">Démolition des existants 25%</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${demolitionType === '50' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDemolitionType('50')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="50" id="demolition-50" className="mr-2" />
              <Label htmlFor="demolition-50" className="cursor-pointer">Démolition des existants 50%</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${demolitionType === '75' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDemolitionType('75')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="75" id="demolition-75" className="mr-2" />
              <Label htmlFor="demolition-75" className="cursor-pointer">Démolition des existants 75%</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${demolitionType === '100' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setDemolitionType('100')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="100" id="demolition-100" className="mr-2" />
              <Label htmlFor="demolition-100" className="cursor-pointer">Démolition des existants 100%</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {demolitionType !== 'none' && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="existingSurface" className="text-base font-medium">
              Surface de plancher des existants en m² <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center">
              <Input
                id="existingSurface"
                type="number"
                value={existingSurface}
                onChange={handleExistingSurfaceChange}
                placeholder="Surface en m²"
                className="flex-grow"
                min="1"
                required
              />
              <span className="ml-2 text-gray-600">m²</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-100 p-3 rounded-md text-center text-lg font-semibold">
        Total travaux : {formData.montantT ? ensureNumber(formData.montantT, 0).toLocaleString() : 0} €/HT
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
          disabled={demolitionType !== 'none' && !existingSurface}
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
