
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Leaf, ThermometerSnowflake, ShieldCheck, Award } from 'lucide-react';
import { FormData } from '../types';
import { useEstimationCalculator } from '../useEstimationCalculator';

interface IsolationStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

const IsolationStep: React.FC<IsolationStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [insulationType, setInsulationType] = useState<string>(formData.insulationType || 'standard');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      insulationType,
    });
    goToNextStep();
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Isolation</h2>
      <p className="text-sm text-gray-600 mb-6">
        Choisissez le type d'isolation pour votre projet.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <RadioGroup 
            value={insulationType} 
            onValueChange={(value) => setInsulationType(value)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="flex flex-1 items-center gap-2 cursor-pointer">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <div>
                  <p>Standard (RT2012)</p>
                  <p className="text-sm text-gray-500">Isolation réglementaire</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="reinforced" id="reinforced" />
              <Label htmlFor="reinforced" className="flex flex-1 items-center gap-2 cursor-pointer">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <div>
                  <p>Renforcée (RE2020)</p>
                  <p className="text-sm text-gray-500">Meilleure performance thermique</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="passive" id="passive" />
              <Label htmlFor="passive" className="flex flex-1 items-center gap-2 cursor-pointer">
                <Award className="h-4 w-4 text-amber-500" />
                <div>
                  <p>Maison passive</p>
                  <p className="text-sm text-gray-500">Performance thermique maximale</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="ecological" id="ecological" />
              <Label htmlFor="ecological" className="flex flex-1 items-center gap-2 cursor-pointer">
                <Leaf className="h-4 w-4 text-green-600" />
                <div>
                  <p>Matériaux écologiques</p>
                  <p className="text-sm text-gray-500">Matériaux naturels et biosourcés</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="renovation" id="renovation" />
              <Label htmlFor="renovation" className="flex flex-1 items-center gap-2 cursor-pointer">
                <ThermometerSnowflake className="h-4 w-4 text-blue-600" />
                <div>
                  <p>Rénovation standard</p>
                  <p className="text-sm text-gray-500">Isolation pour rénovation</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Précédent
            </Button>
            <Button type="submit">
              Suivant
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IsolationStep;
