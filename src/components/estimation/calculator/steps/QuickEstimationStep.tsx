
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface QuickEstimationStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const QuickEstimationStep: React.FC<QuickEstimationStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // State for quick estimation fields
  const [quality, setQuality] = React.useState<string>(formData.qualityStandard || 'standard');
  const [complexity, setComplexity] = React.useState<string>(formData.complexity || 'medium');
  
  const handleSubmit = () => {
    // Calculate a basic estimation based on surface and quality/complexity
    const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
    
    // Base price per m² depending on quality
    let basePrice = 0;
    switch(quality) {
      case 'basic':
        basePrice = 800;
        break;
      case 'standard':
        basePrice = 1200;
        break;
      case 'premium':
        basePrice = 1800;
        break;
      case 'luxury':
        basePrice = 2500;
        break;
      default:
        basePrice = 1200;
    }
    
    // Complexity multiplier
    let complexityMultiplier = 1;
    switch(complexity) {
      case 'simple':
        complexityMultiplier = 0.9;
        break;
      case 'medium':
        complexityMultiplier = 1;
        break;
      case 'complex':
        complexityMultiplier = 1.2;
        break;
      case 'very_complex':
        complexityMultiplier = 1.5;
        break;
      default:
        complexityMultiplier = 1;
    }
    
    // Calculate total amount
    const estimatedAmount = surface * basePrice * complexityMultiplier;
    
    // Update form data with quick estimation
    updateFormData({
      qualityStandard: quality,
      complexity,
      montantT: estimatedAmount
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Estimation rapide</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="quality" className="text-base font-medium">
            Niveau de qualité souhaité <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={quality} 
            onValueChange={setQuality}
          >
            <SelectTrigger id="quality">
              <SelectValue placeholder="Sélectionnez le niveau de qualité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basique (entrée de gamme)</SelectItem>
              <SelectItem value="standard">Standard (milieu de gamme)</SelectItem>
              <SelectItem value="premium">Premium (haut de gamme)</SelectItem>
              <SelectItem value="luxury">Luxe (très haut de gamme)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="complexity" className="text-base font-medium">
            Complexité du projet <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={complexity} 
            onValueChange={setComplexity}
          >
            <SelectTrigger id="complexity">
              <SelectValue placeholder="Sélectionnez la complexité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple (peu de contraintes)</SelectItem>
              <SelectItem value="medium">Moyenne (contraintes standard)</SelectItem>
              <SelectItem value="complex">Complexe (nombreuses contraintes)</SelectItem>
              <SelectItem value="very_complex">Très complexe (contraintes exceptionnelles)</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          disabled={!quality || !complexity}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuickEstimationStep;
