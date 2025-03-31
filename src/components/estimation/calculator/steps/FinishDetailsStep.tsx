
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRightIcon, ArrowLeftIcon, Star, Stars, Sparkles } from 'lucide-react';
import { FormData } from '../types';

interface FinishDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const FinishDetailsStep: React.FC<FinishDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [finishStandard, setFinishStandard] = React.useState<string>(formData.finishStandard || 'standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      finishStandard
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Niveau de finition</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Finish Standard */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Quel niveau de finition souhaitez-vous ?</Label>
            <RadioGroup 
              value={finishStandard} 
              onValueChange={setFinishStandard}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="economic" id="finishEconomic" />
                <Label htmlFor="finishEconomic" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p>Économique</p>
                    <p className="text-sm text-gray-500">Matériaux basiques, finitions simples</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="standard" id="finishStandard" />
                <Label htmlFor="finishStandard" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Stars className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p>Standard</p>
                    <p className="text-sm text-gray-500">Bon rapport qualité/prix, finitions soignées</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="premium" id="finishPremium" />
                <Label htmlFor="finishPremium" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p>Premium</p>
                    <p className="text-sm text-gray-500">Matériaux haut de gamme, finitions luxueuses</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FinishDetailsStep;
