
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ensureNumber } from '../utils/typeConversions';

interface ComblesStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const ComblesStep: React.FC<ComblesStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [atticType, setAtticType] = React.useState<string>(formData.atticType || '');
  
  // Calculate the montantT value based on selection and surface
  const calculateMontantT = (selectedAtticType: string): number => {
    if (selectedAtticType !== 'amenageables') {
      return ensureNumber(formData.montantT, 0); // No change for "combles perdus"
    }
    
    const surface = ensureNumber(formData.surface, 0);
    const levels = ensureNumber(formData.levels, 1);
    
    // Calculate for "combles amenageables" - ENTRAIT PORTEUR formula
    const additionalAmount = (surface / levels) * 70;
    
    // Add to the existing montantT or initialize it
    const currentMontantT = ensureNumber(formData.montantT, 0);
    return currentMontantT + additionalAmount;
  };
  
  const handleSubmit = () => {
    // Calculate the updated montantT value
    const updatedMontantT = calculateMontantT(atticType);
    
    // Update the form data
    updateFormData({ 
      atticType,
      montantT: updatedMontantT
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Type de comble</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Sélectionnez le type de comble <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={atticType} 
          onValueChange={setAtticType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${atticType === 'amenageables' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setAtticType('amenageables')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="amenageables" id="amenageables" className="mr-2" />
              <Label htmlFor="amenageables" className="cursor-pointer">Combles aménageables</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${atticType === 'perdus' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setAtticType('perdus')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="perdus" id="perdus" className="mr-2" />
              <Label htmlFor="perdus" className="cursor-pointer">Combles perdus</Label>
            </CardContent>
          </Card>
        </RadioGroup>
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
          disabled={!atticType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ComblesStep;
