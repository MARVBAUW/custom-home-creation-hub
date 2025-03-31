
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRightIcon, ArrowLeftIcon, Palette, Droplet, Star } from 'lucide-react';
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
          <div className="space-y-3">
            <Label className="text-base font-medium">Choisissez le niveau de finition souhaité</Label>
            <RadioGroup 
              value={finishStandard} 
              onValueChange={setFinishStandard}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="basic" id="basic" />
                <Label htmlFor="basic" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Droplet className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="font-medium">Basique</p>
                    <p className="text-sm text-gray-500">Matériaux standards, finitions simples</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Palette className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium">Standard</p>
                    <p className="text-sm text-gray-500">Bon rapport qualité/prix, matériaux de qualité moyenne</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Star className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Premium</p>
                    <p className="text-sm text-gray-500">Matériaux haut de gamme, finitions soignées</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="luxury" id="luxury" />
                <Label htmlFor="luxury" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Star className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-medium">Luxe</p>
                    <p className="text-sm text-gray-500">Matériaux d'exception, finitions sur mesure</p>
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
