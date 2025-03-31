
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RenovationSpecificStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const RenovationSpecificStep: React.FC<RenovationSpecificStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // State for renovation specific fields
  const [buildingCondition, setBuildingCondition] = React.useState<string>(formData.buildingCondition || '');
  const [renovationScope, setRenovationScope] = React.useState<string>(formData.renovationScope || '');
  
  const handleSubmit = () => {
    // Update form data
    updateFormData({
      buildingCondition,
      renovationScope
    });
    
    // Additional calculations based on renovation specifics can be added here
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Spécificités de rénovation</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="buildingCondition" className="text-base font-medium">
            État du bâtiment existant <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={buildingCondition} 
            onValueChange={setBuildingCondition}
          >
            <SelectTrigger id="buildingCondition">
              <SelectValue placeholder="Sélectionnez l'état du bâtiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="good">Bon état (habitable)</SelectItem>
              <SelectItem value="medium">État moyen (nécessite des travaux)</SelectItem>
              <SelectItem value="bad">Mauvais état (à rénover entièrement)</SelectItem>
              <SelectItem value="shell">Clos couvert uniquement</SelectItem>
              <SelectItem value="ruin">Ruine / Abandon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="renovationScope" className="text-base font-medium">
            Étendue de la rénovation <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={renovationScope} 
            onValueChange={setRenovationScope}
          >
            <SelectTrigger id="renovationScope">
              <SelectValue placeholder="Sélectionnez l'étendue des travaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Légère (décoration, peinture, sols)</SelectItem>
              <SelectItem value="medium">Moyenne (électricité, plomberie, cloisons)</SelectItem>
              <SelectItem value="heavy">Lourde (structure, isolation, tout corps d'état)</SelectItem>
              <SelectItem value="total">Totale (rénovation complète jusqu'au gros œuvre)</SelectItem>
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
          disabled={!buildingCondition || !renovationScope}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RenovationSpecificStep;
