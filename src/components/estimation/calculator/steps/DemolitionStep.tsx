
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ensureNumber } from "../utils/typeConversions";

const DemolitionStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state with formData or default values
  const [demolitionPercent, setDemolitionPercent] = useState<string>(
    formData.demolitionPercent ? String(formData.demolitionPercent) : '0'
  );
  
  const [demolitionSurface, setDemolitionSurface] = useState<string>(
    formData.demolitionSurface ? String(formData.demolitionSurface) : '0'
  );
  
  // State to track if demolition is needed
  const [needsDemolition, setNeedsDemolition] = useState<string>(
    formData.needsDemolition || 'no'
  );
  
  // Calculate demolition surface when percentage changes
  const handlePercentChange = (value: string) => {
    setDemolitionPercent(value);
    
    if (formData.surface) {
      const percent = parseFloat(value) || 0;
      const calculatedSurface = (formData.surface * percent / 100).toFixed(1);
      setDemolitionSurface(calculatedSurface);
    }
  };
  
  // Update demolition surface directly
  const handleSurfaceChange = (value: string) => {
    setDemolitionSurface(value);
    
    if (formData.surface && formData.surface > 0) {
      const surface = parseFloat(value) || 0;
      const calculatedPercent = ((surface / formData.surface) * 100).toFixed(1);
      setDemolitionPercent(calculatedPercent);
    }
  };
  
  const handleSubmit = () => {
    // Calculate demolition cost
    let demolitionCost = 0;
    
    if (needsDemolition === 'yes') {
      // Cost calculation: demolition surface × rate per m²
      const surface = ensureNumber(demolitionSurface);
      const demolitionRate = 150; // 150€ per m² for demolition
      demolitionCost = surface * demolitionRate;
    }
    
    // Update form data
    updateFormData({
      needsDemolition,
      demolitionPercent: ensureNumber(demolitionPercent),
      demolitionSurface: ensureNumber(demolitionSurface),
      demolitionCost: demolitionCost
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Démolition</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Le projet nécessite-t-il une démolition ? <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={needsDemolition} 
          onValueChange={setNeedsDemolition}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${needsDemolition === 'yes' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setNeedsDemolition('yes')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="yes" id="demolition-yes" className="mr-2" />
              <Label htmlFor="demolition-yes" className="cursor-pointer">Oui, démolition nécessaire</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${needsDemolition === 'no' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setNeedsDemolition('no')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="no" id="demolition-no" className="mr-2" />
              <Label htmlFor="demolition-no" className="cursor-pointer">Non, pas de démolition</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {needsDemolition === 'yes' && (
          <div className="space-y-4 mt-4 p-4 border rounded-md bg-gray-50">
            <div>
              <Label htmlFor="demolition-percent" className="block mb-2">Pourcentage à démolir (%)</Label>
              <Input
                id="demolition-percent"
                type="number"
                value={demolitionPercent}
                onChange={(e) => handlePercentChange(e.target.value)}
                placeholder="Pourcentage (ex: 25)"
                className="max-w-xs"
                min="0"
                max="100"
              />
            </div>
            
            <div>
              <Label htmlFor="demolition-surface" className="block mb-2">Surface à démolir (m²)</Label>
              <Input
                id="demolition-surface"
                type="number"
                value={demolitionSurface}
                onChange={(e) => handleSurfaceChange(e.target.value)}
                placeholder="Surface (ex: 25)"
                className="max-w-xs"
                min="0"
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm">
                Coût de démolition estimé: {(ensureNumber(demolitionSurface) * 150).toFixed(0)}€ HT
              </p>
              <p className="text-xs text-gray-600 mt-1">
                (Basé sur un tarif de 150€/m²)
              </p>
            </div>
          </div>
        )}
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

export default DemolitionStep;
