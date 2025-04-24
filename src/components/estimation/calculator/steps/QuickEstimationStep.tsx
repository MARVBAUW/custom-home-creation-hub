
import React from 'react';
import { BaseFormProps } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ensureNumber } from '../utils/typeConversions';

const QuickEstimationStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [renovationPercentage, setRenovationPercentage] = React.useState<string>(
    formData.renovationPercentage ? String(formData.renovationPercentage) : ''
  );
  const [quality, setQuality] = React.useState<string>(formData.quality || 'standard');
  
  const handleSubmit = () => {
    // Calculate quick estimation
    const surface = ensureNumber(formData.surface, 0);
    const percentage = ensureNumber(renovationPercentage, 0) / 100;
    
    let baseCost = 0;
    
    // Base cost per m² depending on project type
    switch (formData.projectType) {
      case 'renovation':
        baseCost = 900;
        break;
      case 'division':
        baseCost = 1100;
        break;
      default:
        baseCost = 900;
    }
    
    // Quality multiplier
    let qualityMultiplier = 1;
    switch (quality) {
      case 'economic':
        qualityMultiplier = 0.8;
        break;
      case 'standard':
        qualityMultiplier = 1;
        break;
      case 'premium':
        qualityMultiplier = 1.3;
        break;
      default:
        qualityMultiplier = 1;
    }
    
    // Calculate total estimation
    const totalCost = surface * baseCost * percentage * qualityMultiplier;
    
    updateFormData({
      renovationPercentage: ensureNumber(renovationPercentage),
      quality,
      montantT: totalCost
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Estimation rapide</h2>
      <p className="text-gray-600 mb-6">Quelques questions simples pour estimer votre projet de rénovation</p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="renovation-percentage" className="text-base font-medium">
            Quel pourcentage du bien est concerné par la rénovation ? <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-gray-600">Indiquez quelle proportion du bien doit être rénovée (%).</p>
          <Input
            id="renovation-percentage"
            type="number"
            value={renovationPercentage}
            onChange={(e) => setRenovationPercentage(e.target.value)}
            placeholder="Pourcentage (ex: 50)"
            className="max-w-xs"
            min="1"
            max="100"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quality" className="text-base font-medium">
            Quel niveau de finition souhaitez-vous ? <span className="text-red-500">*</span>
          </Label>
          <Select
            value={quality}
            onValueChange={setQuality}
          >
            <SelectTrigger id="quality" className="w-full max-w-xs">
              <SelectValue placeholder="Choisir un niveau de finition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economic">Économique ($)</SelectItem>
              <SelectItem value="standard">Standard ($$)</SelectItem>
              <SelectItem value="premium">Premium ($$$)</SelectItem>
            </SelectContent>
          </Select>
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
          disabled={!renovationPercentage || !quality}
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
