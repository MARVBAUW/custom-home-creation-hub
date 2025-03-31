
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ensureNumber } from '../utils/typeConversions';

interface CouvertureStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const CouvertureStep: React.FC<CouvertureStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [roofingType, setRoofingType] = React.useState<string>(formData.roofingType || '');
  
  // Calculate the montantT value based on selection and surface
  const calculateMontantT = (selectedRoofingType: string): number => {
    const surface = ensureNumber(formData.surface, 0);
    let rate = 0;
    
    switch (selectedRoofingType) {
      case 'tuile_plate':
        rate = 130;
        break;
      case 'tuile_ronde':
        rate = 137;
        break;
      case 'ardoise':
        rate = 210;
        break;
      case 'zinc':
        rate = 160;
        break;
      case 'chaume':
        rate = 200;
        break;
      case 'bac_acier':
        rate = 65;
        break;
      case 'etancheite_bitume':
        rate = 75;
        break;
      case 'toiture_vegetalise':
        rate = 146;
        break;
      case 'toiture_gravillonnee':
        rate = 105;
        break;
      default:
        rate = 130; // Default to tuile plate if no selection
        break;
    }
    
    // Calculate the additional amount for this step
    const additionalAmount = surface * rate;
    
    // Add to the existing montantT or initialize it
    const currentMontantT = ensureNumber(formData.montantT, 0);
    return currentMontantT + additionalAmount;
  };
  
  const handleSubmit = () => {
    // Calculate the updated montantT value
    const updatedMontantT = calculateMontantT(roofingType);
    
    // Update the form data
    updateFormData({ 
      roofingType,
      montantT: updatedMontantT
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Couverture / Étanchéité</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de couverture <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={roofingType} 
          onValueChange={setRoofingType}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'tuile_plate' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('tuile_plate')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="tuile_plate" id="tuile_plate" className="mr-2" />
              <Label htmlFor="tuile_plate" className="cursor-pointer">Tuile plate</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'tuile_ronde' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('tuile_ronde')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="tuile_ronde" id="tuile_ronde" className="mr-2" />
              <Label htmlFor="tuile_ronde" className="cursor-pointer">Tuile ronde</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'ardoise' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('ardoise')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="ardoise" id="ardoise" className="mr-2" />
              <Label htmlFor="ardoise" className="cursor-pointer">Ardoise</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'zinc' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('zinc')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="zinc" id="zinc" className="mr-2" />
              <Label htmlFor="zinc" className="cursor-pointer">Zinc joint debout</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'chaume' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('chaume')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="chaume" id="chaume" className="mr-2" />
              <Label htmlFor="chaume" className="cursor-pointer">Toit de chaume</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'bac_acier' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('bac_acier')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="bac_acier" id="bac_acier" className="mr-2" />
              <Label htmlFor="bac_acier" className="cursor-pointer">Bac acier</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'etancheite_bitume' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('etancheite_bitume')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="etancheite_bitume" id="etancheite_bitume" className="mr-2" />
              <Label htmlFor="etancheite_bitume" className="cursor-pointer">Étanchéité bitume (toiture plate)</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'toiture_vegetalise' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('toiture_vegetalise')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="toiture_vegetalise" id="toiture_vegetalise" className="mr-2" />
              <Label htmlFor="toiture_vegetalise" className="cursor-pointer">Toiture végétalisée (toiture plate)</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'toiture_gravillonnee' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setRoofingType('toiture_gravillonnee')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="toiture_gravillonnee" id="toiture_gravillonnee" className="mr-2" />
              <Label htmlFor="toiture_gravillonnee" className="cursor-pointer">Toiture gravillonnée (toiture plate)</Label>
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
          disabled={!roofingType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CouvertureStep;
