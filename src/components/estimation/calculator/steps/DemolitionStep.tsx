import React from 'react';
import { BaseFormProps } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ensureNumber } from '../utils/typeConversions';

const DemolitionStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [surfaceToDemo, setSurfaceToDemo] = React.useState<string>(
    formData.surfaceToDemo ? String(formData.surfaceToDemo) : ''
  );
  
  const handleSubmit = () => {
    updateFormData({
      surfaceToDemo: ensureNumber(surfaceToDemo)
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Démolition</h2>
      
      <div className="space-y-4">
        <Label htmlFor="surface-to-demo" className="text-base font-medium">
          Surface à démolir (m²) <span className="text-red-500">*</span>
        </Label>
        
        <Input
          id="surface-to-demo"
          type="number"
          value={surfaceToDemo}
          onChange={(e) => setSurfaceToDemo(e.target.value)}
          placeholder="Surface en m²"
          className="max-w-xs"
          min="1"
        />
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
          disabled={!surfaceToDemo}
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
