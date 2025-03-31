
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GrosOeuvreStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const GrosOeuvreStep: React.FC<GrosOeuvreStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [wallType, setWallType] = React.useState<string>(formData.wallType || '');
  
  // Calculate the montantT value based on selection and surface
  const calculateMontantT = (selectedWallType: string): number => {
    const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
    let rate = 0;
    
    switch (selectedWallType) {
      case 'briques':
        rate = 590;
        break;
      case 'parpaing':
        rate = 580;
        break;
      case 'porotherme':
        rate = 430;
        break;
      case 'pierre':
        rate = 730;
        break;
      case 'beton':
        rate = 500;
        break;
      case 'beton_cellulaire':
        rate = 433;
        break;
      default:
        rate = 590; // Default to briques if no selection
        break;
    }
    
    // Calculate the additional amount for this step
    const additionalAmount = surface * rate;
    
    // Add to the existing montantT or initialize it
    const currentMontantT = formData.montantT || 0;
    return currentMontantT + additionalAmount;
  };
  
  const handleSubmit = () => {
    // Calculate the updated montantT value
    const updatedMontantT = calculateMontantT(wallType);
    
    // Update the form data
    updateFormData({ 
      wallType,
      montantT: updatedMontantT
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Gros Œuvre</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Composition des murs de façades <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={wallType} 
          onValueChange={setWallType}
          className="grid grid-cols-2 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'briques' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWallType('briques')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="briques" id="briques" className="mr-2" />
              <Label htmlFor="briques" className="cursor-pointer">Briques</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'parpaing' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWallType('parpaing')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="parpaing" id="parpaing" className="mr-2" />
              <Label htmlFor="parpaing" className="cursor-pointer">Parpaing</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'porotherme' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWallType('porotherme')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="porotherme" id="porotherme" className="mr-2" />
              <Label htmlFor="porotherme" className="cursor-pointer">Porotherme</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'pierre' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWallType('pierre')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="pierre" id="pierre" className="mr-2" />
              <Label htmlFor="pierre" className="cursor-pointer">Pierre</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'beton' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWallType('beton')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="beton" id="beton" className="mr-2" />
              <Label htmlFor="beton" className="cursor-pointer">Béton</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'beton_cellulaire' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setWallType('beton_cellulaire')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="beton_cellulaire" id="beton_cellulaire" className="mr-2" />
              <Label htmlFor="beton_cellulaire" className="cursor-pointer">Béton cellulaire</Label>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
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
          disabled={!wallType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GrosOeuvreStep;
